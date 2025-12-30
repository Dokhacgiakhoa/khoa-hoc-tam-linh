<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'status' => 'success',
        'message' => 'Backend API Server is running!',
        'api_test_url' => url('/api/test')
    ]);
});
