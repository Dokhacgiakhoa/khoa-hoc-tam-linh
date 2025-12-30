<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use App\Models\UserTaskCompletion;
use App\Models\Transaction;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class TaskController extends Controller
{
    /**
     * Get list of tasks with completion status for logged user
     */
    public function index()
    {
        $user = Auth::user();
        $tasks = Task::all();

        $completions = UserTaskCompletion::where('user_id', $user->id)
            ->get()
            ->groupBy('task_id');

        $result = $tasks->map(function ($task) use ($completions) {
            $taskCompletions = $completions->get($task->id, collect());
            
            // Check if completed based on frequency
            $isCompleted = false;
            $lastCompletion = $taskCompletions->sortByDesc('completed_at')->first();

            if ($lastCompletion) {
                $completedAt = Carbon::parse($lastCompletion->completed_at);
                $now = Carbon::now();

                if ($task->frequency === 'daily') {
                    $isCompleted = $completedAt->isToday();
                } elseif ($task->frequency === 'weekly') {
                    $isCompleted = $completedAt->isSameWeek($now);
                } elseif ($task->frequency === 'monthly') {
                    $isCompleted = $completedAt->isSameMonth($now);
                }
            }

            return [
                'id' => $task->id,
                'title' => $task->title,
                'description' => $task->description,
                'reward_amount' => $task->reward_amount,
                'frequency' => $task->frequency,
                'is_completed' => $isCompleted,
                'last_completed_at' => $lastCompletion ? $lastCompletion->completed_at : null
            ];
        });

        return response()->json($result);
    }

    /**
     * Claim reward for a manual task
     */
    public function claim($id)
    {
        $user = Auth::user();
        $task = Task::findOrFail($id);

        // Check if already completed in the current period
        $lastCompletion = UserTaskCompletion::where('user_id', $user->id)
            ->where('task_id', $task->id)
            ->orderBy('completed_at', 'desc')
            ->first();

        if ($lastCompletion) {
            $completedAt = Carbon::parse($lastCompletion->completed_at);
            $now = Carbon::now();
            $alreadyDone = false;

            if ($task->frequency === 'daily') {
                $alreadyDone = $completedAt->isToday();
            } elseif ($task->frequency === 'weekly') {
                $alreadyDone = $completedAt->isSameWeek($now);
            } elseif ($task->frequency === 'monthly') {
                $alreadyDone = $completedAt->isSameMonth($now);
            }

            if ($alreadyDone) {
                return response()->json(['error' => 'Nhiệm vụ này đã được nhận thưởng trong chu kỳ này.'], 400);
            }
        }

        return DB::transaction(function () use ($user, $task) {
            // Reward in Linh Te. 1 Linh Te = 1000 balance units
            $rewardFull = $task->reward_amount * 1000;

            $user->balance += $rewardFull;
            $user->save();

            UserTaskCompletion::create([
                'user_id' => $user->id,
                'task_id' => $task->id,
                'completed_at' => now()
            ]);

            Transaction::create([
                'user_id' => $user->id,
                'type' => 'bonus',
                'amount' => $rewardFull,
                'description' => "Thưởng nhiệm vụ: {$task->title}"
            ]);

            Notification::create([
                'user_id' => $user->id,
                'title' => 'Nhận thưởng thành công 🎁',
                'message' => "Chúc mừng! Bạn đã nhận được {$task->reward_amount} Linh Tệ từ nhiệm vụ '{$task->title}'.",
                'type' => 'success'
            ]);

            return response()->json([
                'message' => 'Nhận thưởng thành công!',
                'reward' => $task->reward_amount,
                'new_balance' => $user->balance
            ]);
        });
    }
}
