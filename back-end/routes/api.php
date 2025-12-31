<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



use App\Http\Controllers\ProductController;
use App\Http\Controllers\TarotController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\TwoFactorController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\WalletController;
use App\Http\Controllers\Api\EsotericController;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\TaskController;
use App\Http\Controllers\Api\AcademyController;

// Public Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/auth/check-availability', [AuthController::class, 'checkAvailability']);

// QR Login (Public)
Route::get('/auth/qr/generate', [TwoFactorController::class, 'generateQr']);
Route::get('/auth/qr/check/{sessionId}', [TwoFactorController::class, 'checkQr']);

// Affiliate
Route::get('/ref/{code}', [App\Http\Controllers\Api\AffiliateController::class, 'handle']);

Route::get('/test', function () {
    return response()->json([
        'message' => 'Kết nối Backend thành công!',
        'time' => now()->toDateTimeString()
    ]);
});

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::get('/tarot', [TarotController::class, 'index']);
Route::get('/services', [ServiceController::class, 'index']);
Route::post('/services/{type}', [ServiceController::class, 'handle']); // Generic Service Handler
Route::get('/admin/users', [UserController::class, 'adminIndex']);

// Astrology & Horoscope
Route::post('/astrology/natal', [EsotericController::class, 'getNatalData']);
Route::post('/tu-vi/lap-la-so', [EsotericController::class, 'lapLaSo']);
Route::post('/numerology/calculate', [EsotericController::class, 'calculateNumerology']);

// Học viện (Academy)
Route::get('/academy/categories', [AcademyController::class, 'getCategories']);
Route::get('/academy/category/{slug}', [AcademyController::class, 'getCoursesByCategory']);
Route::get('/academy/course/{slug}', [AcademyController::class, 'getCourseDetail']);

// Protected Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    
    // User Profile
    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/checkout', [OrderController::class, 'checkout']);
    Route::post('/user/avatar', [UserController::class, 'uploadAvatar']);
    Route::put('/user/profile', [UserController::class, 'updateProfile']);
    
    // Wallet
    Route::get('/wallet', [WalletController::class, 'getWallet']);
    Route::post('/wallet/deposit', [WalletController::class, 'deposit']);
    Route::get('/wallet/transactions', [WalletController::class, 'getTransactions']);

    // Purchase
    Route::post('/products/{id}/purchase', [ProductController::class, 'purchase']);
    Route::get('/products/{id}/check-ownership', [ProductController::class, 'checkOwnership']);

    // 2FA
    Route::post('/2fa/setup', [TwoFactorController::class, 'setup']);
    Route::post('/2fa/confirm', [TwoFactorController::class, 'confirm']);
    
    // QR Approve
    Route::post('/auth/qr/approve', [TwoFactorController::class, 'approveQr']);

    // Notifications (Inbox)
    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::get('/notifications/unread-count', [NotificationController::class, 'unreadCount']);
    Route::post('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);
    Route::post('/notifications/read-all', [NotificationController::class, 'markAllAsRead']);
    Route::delete('/notifications/{id}', [NotificationController::class, 'destroy']);

    // Tasks (Quest System)
    Route::get('/tasks', [TaskController::class, 'index']);
    Route::post('/tasks/{id}/claim', [TaskController::class, 'claim']);

    // Academy Progress
    Route::post('/academy/lessons/complete', [AcademyController::class, 'markLessonComplete']);
    Route::get('/academy/courses/{id}/progress', [AcademyController::class, 'getCourseProgress']);
    Route::get('/academy/my-progress', [AcademyController::class, 'getMyLearningProgress']);
    
    // Academy Purchase
    Route::post('/academy/courses/{id}/purchase', [AcademyController::class, 'purchaseCourse']);

    // Certification Exams
    Route::get('/exams', [App\Http\Controllers\ExamController::class, 'index']);
    Route::get('/exams/history', [App\Http\Controllers\ExamController::class, 'history']);
    Route::get('/exams/{id}', [App\Http\Controllers\ExamController::class, 'show']);
    Route::get('/exams/{id}/take', [App\Http\Controllers\ExamController::class, 'take']);
    Route::post('/exams/{id}/submit', [App\Http\Controllers\ExamController::class, 'submit']);
});

use App\Http\Controllers\AdminController;

// Admin routes
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    Route::get('/dashboard', [AdminController::class, 'dashboard']);
    Route::get('/wallet/statistics', [AdminController::class, 'walletStatistics']);
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);
});
