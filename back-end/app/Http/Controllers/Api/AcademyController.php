<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CourseCategory;
use App\Models\Course;
use App\Models\Lesson;
use Illuminate\Support\Facades\DB;

class AcademyController extends Controller
{
    public function getCategories()
    {
        return response()->json(CourseCategory::withCount('courses')->get());
    }

    public function getCoursesByCategory($slug)
    {
        $category = CourseCategory::where('slug', $slug)->firstOrFail();
        $courses = Course::where('category_id', $category->id)
            ->where('is_published', true)
            ->withCount('lessons')
            ->get();
            
        $user = auth('sanctum')->user();
        
        $courses->transform(function ($course) use ($user) {
            $course->progress_percent = 0;
            $course->is_enrolled = false;
            
            if ($user) {
                // Check if user is enrolled
                if ($course->price == 0) {
                    $course->is_enrolled = true;
                } else {
                    $course->is_enrolled = DB::table('course_enrollments')
                        ->where('user_id', $user->id)
                        ->where('course_id', $course->id)
                        ->where('status', 'active')
                        ->exists();
                }
                
                if ($course->lessons_count > 0) {
                    $completedCount = DB::table('lesson_completions')
                        ->where('user_id', $user->id)
                        ->join('lessons', 'lesson_completions.lesson_id', '=', 'lessons.id')
                        ->where('lessons.course_id', $course->id)
                        ->count();
                    $course->progress_percent = round(($completedCount / $course->lessons_count) * 100);
                }
            }
            return $course;
        });

        return response()->json([
            'category' => $category,
            'courses' => $courses
        ]);
    }


    public function getCourseDetail($slug)
    {
        $course = Course::with(['lessons', 'category'])->where('slug', $slug)->firstOrFail();
        $user = auth('sanctum')->user();
        
        $course->is_enrolled = false;
        if ($user) {
            if ($course->price == 0) {
                $course->is_enrolled = true;
            } else {
                $course->is_enrolled = DB::table('course_enrollments')
                    ->where('user_id', $user->id)
                    ->where('course_id', $course->id)
                    ->where('status', 'active')
                    ->exists();
            }
        }
        
        return response()->json($course);
    }

    public function markLessonComplete(Request $request)
    {
        $user = $request->user();
        if (!$user) return response()->json(['message' => 'Unauthorized'], 401);

        $lessonId = $request->input('lesson_id');
        $completed = $request->boolean('completed', true);

        if ($completed) {
            DB::table('lesson_completions')->updateOrInsert(
                ['user_id' => $user->id, 'lesson_id' => $lessonId],
                ['completed_at' => now(), 'updated_at' => now()]
            );
        } else {
            DB::table('lesson_completions')
                ->where('user_id', $user->id)
                ->where('lesson_id', $lessonId)
                ->delete();
        }

        return response()->json(['success' => true]);
    }

    public function getCourseProgress(Request $request, $courseId)
    {
        $user = $request->user();
        if (!$user) return response()->json([]);

        $completedIds = DB::table('lesson_completions')
            ->where('user_id', $user->id)
            ->join('lessons', 'lesson_completions.lesson_id', '=', 'lessons.id')
            ->where('lessons.course_id', $courseId)
            ->pluck('lesson_id');

        return response()->json($completedIds);
    }

    public function getMyLearningProgress(Request $request) 
    {
        $user = $request->user();
        if (!$user) return response()->json([]);

        // Get all courses that user has at least started
        $startedCourseIds = DB::table('lesson_completions')
            ->where('user_id', $user->id)
            ->join('lessons', 'lesson_completions.lesson_id', '=', 'lessons.id')
            ->select('lessons.course_id')
            ->distinct()
            ->pluck('course_id');

        $courses = Course::whereIn('id', $startedCourseIds)
            ->withCount('lessons')
            ->get();

        $progressData = $courses->map(function ($course) use ($user) {
            $completedCount = DB::table('lesson_completions')
                ->where('user_id', $user->id)
                ->join('lessons', 'lesson_completions.lesson_id', '=', 'lessons.id')
                ->where('lessons.course_id', $course->id)
                ->count();
            
            $percent = $course->lessons_count > 0 
                ? round(($completedCount / $course->lessons_count) * 100) 
                : 0;

            return [
                'course_id' => $course->id,
                'slug' => $course->slug,
                'title' => $course->title,
                'progress_percent' => $percent,
                'is_completed' => $percent == 100
            ];
        });

        return response()->json($progressData);
    }

    public function purchaseCourse(Request $request, $courseId)
    {
        $user = $request->user();
        if (!$user) return response()->json(['message' => 'Unauthorized'], 401);

        $course = Course::findOrFail($courseId);

        // Check if course is free
        if ($course->price == 0) {
            return response()->json(['message' => 'This course is free'], 400);
        }

        // Check if already enrolled
        $existing = DB::table('course_enrollments')
            ->where('user_id', $user->id)
            ->where('course_id', $course->id)
            ->where('status', 'active')
            ->exists();

        if ($existing) {
            return response()->json(['message' => 'You are already enrolled in this course'], 400);
        }

        // Check wallet balance
        $wallet = DB::table('wallets')->where('user_id', $user->id)->first();
        if (!$wallet || $wallet->balance < $course->price) {
            return response()->json([
                'message' => 'Insufficient balance',
                'required' => $course->price,
                'current' => $wallet->balance ?? 0
            ], 400);
        }

        DB::beginTransaction();
        try {
            // Deduct from wallet
            DB::table('wallets')
                ->where('user_id', $user->id)
                ->decrement('balance', $course->price);

            // Create enrollment
            DB::table('course_enrollments')->insert([
                'user_id' => $user->id,
                'course_id' => $course->id,
                'paid_amount' => $course->price,
                'status' => 'active',
                'enrolled_at' => now(),
                'created_at' => now(),
                'updated_at' => now()
            ]);

            // Create transaction record
            DB::table('transactions')->insert([
                'user_id' => $user->id,
                'amount' => -$course->price,
                'type' => 'course_purchase',
                'description' => 'Mua khóa học: ' . $course->title,
                'created_at' => now(),
                'updated_at' => now()
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Course purchased successfully',
                'enrollment' => [
                    'course_id' => $course->id,
                    'course_title' => $course->title,
                    'paid_amount' => $course->price
                ]
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Purchase failed: ' . $e->getMessage()], 500);
        }
    }
}
