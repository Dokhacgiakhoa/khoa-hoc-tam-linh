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

        $result = $tasks->map(function ($task) use ($completions, $user) {
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

            // Calculate Progress
            $progress = 0;
            $target = 1;

            if ($task->title === 'Lan tỏa tâm linh') {
                $target = 5; // 5 clicks
                // Generate affiliate code if missing
                if (!$user->affiliate_code) {
                    $user->affiliate_code = \Illuminate\Support\Str::random(8);
                    $user->save();
                }

                $clicks = DB::table('affiliate_clicks')
                    ->where('user_id', $user->id)
                    ->whereBetween('created_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])
                    ->count();
                
                $progress = $clicks;
            } elseif ($task->title === 'Chuyên cần tuần') {
                $target = 5;
                // Find "Điểm danh hàng ngày" task logic
                // Assuming "Điểm danh hàng ngày" is another task. 
                // We count how many distinct days the user completed ANY daily task? 
                // Or specifically "Điểm danh hàng ngày". Let's look up that task.
                $dailyTask = Task::where('title', 'Điểm danh hàng ngày')->first();
                if ($dailyTask) {
                    $dailyCompletions = UserTaskCompletion::where('user_id', $user->id)
                        ->where('task_id', $dailyTask->id)
                        ->whereBetween('completed_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])
                        ->get();
                    
                    // Count distinct days
                    $progress = $dailyCompletions->map(function ($c) {
                        return Carbon::parse($c->completed_at)->format('Y-m-d');
                    })->unique()->count();
                }
            } elseif ($task->title === 'Điểm danh hàng ngày') {
                // If not completed today, progress is 1 so they can click "Điểm danh"
                $progress = 1; 
                $target = 1;
            } elseif ($task->title === 'Tương tác cộng đồng') {
                // Always 1 so they can see button or something? 
                // Better: if we don't have automatic tracking for comments yet, 
                // let it be a manual "I did it" or a link.
                $progress = $isCompleted ? 1 : 1; // For now let them click
                $target = 1;
            } elseif ($task->frequency === 'daily') {
                $progress = $isCompleted ? 1 : 0;
                $target = 1;
            } else {
                 // Default for others (Manual claim usually means target 1)
                 $progress = $isCompleted ? 1 : 0;
                 $target = 1;
            }

            // Define "Action URL" or instructions based on task
            $actionUrl = null;
            if ($task->title === 'Tương tác cộng đồng') {
                $actionUrl = '/bai-viet'; // Link to blog/posts
            }

            return [
                'id' => $task->id,
                'title' => $task->title,
                'description' => $task->description,
                'reward_amount' => $task->reward_amount,
                'frequency' => $task->frequency,
                'is_completed' => $isCompleted,
                'last_completed_at' => $lastCompletion ? $lastCompletion->completed_at : null,
                'progress' => $progress,
                'target' => $target,
                'action_url' => $actionUrl,
                'affiliate_code' => ($task->title === 'Lan tỏa tâm linh') ? $user->affiliate_code : null
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

        // Validate Logic Conditions
        if ($task->title === 'Chuyên cần tuần') {
            $dailyTask = Task::where('title', 'Điểm danh hàng ngày')->first();
            $progress = 0;
            if ($dailyTask) {
                 $dailyCompletions = UserTaskCompletion::where('user_id', $user->id)
                    ->where('task_id', $dailyTask->id)
                    ->whereBetween('completed_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])
                    ->get();
                $progress = $dailyCompletions->map(function ($c) {
                    return Carbon::parse($c->completed_at)->format('Y-m-d');
                })->unique()->count();
            }

            if ($progress < 5) {
                return response()->json(['error' => "Bạn chưa đủ điều kiện. Tiến độ: $progress/5 ngày."], 400);
            }
        } elseif ($task->title === 'Lan tỏa tâm linh') {
             $clicks = DB::table('affiliate_clicks')
                ->where('user_id', $user->id)
                ->whereBetween('created_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])
                ->count();
            
            if ($clicks < 5) {
                 return response()->json(['error' => "Bạn chưa đủ điều kiện. Cần đạt 5 lượt truy cập từ link chia sẻ. Hiện tại: $clicks/5."], 400);
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
