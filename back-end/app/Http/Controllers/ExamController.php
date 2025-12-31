<?php

namespace App\Http\Controllers;

use App\Models\Exam;
use App\Models\UserExam;
use App\Models\Question;
use App\Models\Certificate;
use App\Models\Course;
use App\Models\CourseEnrollment;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class ExamController extends Controller
{
    // 1. Get List of Exams (Grouped or Flat)
    public function index()
    {
        $exams = Exam::all();
        // Frontend expects: [{ category: '...', icon: '...', color: '...', exams: [] }]
        // But for simplicity/flexibility, let's return a flat list and let Frontend map it OR return the structure directly.
        // Given ThiChungChi.js has strict constants for icons/colors, passing just the Exam data is cleaner.
        // ThiChungChi.js can merge this data with its UI constants.
        return response()->json($exams);
    }

    // 2. Get Single Exam Info (Check Prerequisites)
    public function show($id)
    {
        $exam = Exam::where('id', $id)->orWhere('slug', $id)->firstOrFail();
        
        // Check pre-requisites logic
        $user = auth()->user();
        $prerequisites = $exam->prerequisites ?? [];
        $isEligible = true;

        if (!$user) {
            $isEligible = false;
        } else {
            foreach ($prerequisites as $prereq) {
                // Find course
                $course = Course::where('slug', $prereq['slug'])->withCount('lessons')->first();
                if ($course) {
                    // Check if enrolled
                    $enrollment = CourseEnrollment::where('user_id', $user->id)
                        ->where('course_id', $course->id)
                        ->where('status', 'active')
                        ->exists();

                    if (!$enrollment) {
                        $isEligible = false;
                        break;
                    }

                    // Check completion (Lessons completed vs Total Lessons)
                    if ($course->lessons_count > 0) {
                        $completedCount = DB::table('lesson_completions')
                            ->where('user_id', $user->id)
                            ->join('lessons', 'lesson_completions.lesson_id', '=', 'lessons.id')
                            ->where('lessons.course_id', $course->id)
                            ->count();
                        
                        if ($completedCount < $course->lessons_count) {
                            $isEligible = false; // Not completed yet
                            break;
                        }
                    }
                    // If lesson_count is 0, we assume it's valid if enrolled, or invalid. 
                    // Let's assume valid if enrolled for empty courses (rare).
                }
            }
        }

        return response()->json([
            'exam' => $exam,
            'is_eligible' => $isEligible
        ]);
    }

    // 3. Start Exam / Get Questions (Must be eligible)
    public function take($id)
    {
        $exam = Exam::where('id', $id)->orWhere('slug', $id)->firstOrFail();
        
        // Strict eligibility check
        $user = auth()->user();
        $prerequisites = $exam->prerequisites ?? [];
        
        foreach ($prerequisites as $prereq) {
            $course = Course::where('slug', $prereq['slug'])->withCount('lessons')->first();
            if ($course) {
                // Check Enrolled
                $enrolled = CourseEnrollment::where('user_id', $user->id)
                    ->where('course_id', $course->id)
                    ->where('status', 'active')
                    ->exists();
                
                if (!$enrolled) {
                     return response()->json(['message' => 'Bạn chưa đăng ký khóa học điều kiện: ' . $course->title], 403);
                }

                // Check Completion
                 if ($course->lessons_count > 0) {
                    $completedCount = DB::table('lesson_completions')
                        ->where('user_id', $user->id)
                        ->join('lessons', 'lesson_completions.lesson_id', '=', 'lessons.id')
                        ->where('lessons.course_id', $course->id)
                        ->count();
                    
                    if ($completedCount < $course->lessons_count) {
                         return response()->json(['message' => 'Bạn chưa hoàn thành khóa học điều kiện: ' . $course->title], 403);
                    }
                }
            }
        }

        // Return questions WITHOUT correct_answer
        $questions = $exam->questions()->inRandomOrder()->get()->map(function($q) {
            return [
                'id' => $q->id,
                'content' => $q->content,
                'options' => $q->options,
                'type' => $q->type
            ];
        });

        return response()->json([
            'exam' => $exam,
            'questions' => $questions
        ]);
    }

    // 4. Submit Exam
    public function submit(Request $request, $id)
    {
        $request->validate([
            'answers' => 'required|array' 
            // answers: { question_id: "A", ... }
        ]);

        $exam = Exam::where('id', $id)->orWhere('slug', $id)->firstOrFail();
        $questions = $exam->questions;
        $userAnswers = $request->answers;
        
        $correctCount = 0;
        $totalQuestions = $questions->count();

        foreach ($questions as $q) {
             if (isset($userAnswers[$q->id]) && $userAnswers[$q->id] === $q->correct_answer) {
                 $correctCount++;
             }
        }

        $score = ($totalQuestions > 0) ? round(($correctCount / $totalQuestions) * 100) : 0;
        $passed = $score >= $exam->passing_score;

        // Save Result
        $userExam = UserExam::create([
            'user_id' => auth()->id(),
            'exam_id' => $exam->id,
            'score' => $score,
            'status' => $passed ? 'passed' : 'failed',
            'completed_at' => now()
        ]);

        // Issue Certificate if passed & not already issued
        $cert = null;
        if ($passed) {
             $existingCert = Certificate::where('user_id', auth()->id())->where('exam_id', $exam->id)->first();
             if (!$existingCert) {
                 $certCode = 'CERT-' . strtoupper(Str::random(8)) . '-' . $exam->id;
                 $cert = Certificate::create([
                     'user_id' => auth()->id(),
                     'exam_id' => $exam->id,
                     'code' => $certCode,
                     'issued_at' => now()
                 ]);
             } else {
                 $cert = $existingCert;
             }
        }

        return response()->json([
            'score' => $score,
            'passed' => $passed,
            'correct_count' => $correctCount,
            'total' => $totalQuestions,
            'certificate' => $cert
        ]);
    }

    // 5. User History
    public function history()
    {
        $history = UserExam::where('user_id', auth()->id())
            ->with('exam')
            ->orderBy('created_at', 'desc')
            ->get();
            
        return response()->json($history);
    }
}
