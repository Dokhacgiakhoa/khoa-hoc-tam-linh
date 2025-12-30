<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    // Đăng ký
    public function register(Request $request)
    {
        $validated = $request->validate([
            'username' => [
                'required', 
                'string', 
                'max:50', 
                'unique:users', 
                'regex:/^[a-z0-9_]+$/'
            ],
            'email' => 'required|string|email|max:255|unique:users',
            'phone' => 'nullable|string|max:20',
            'password' => 'required|string|min:6',
        ], [
            'username.unique' => 'Tên tài khoản đã tồn tại',
            'username.regex' => 'Tên đăng nhập chỉ được chứa chữ cái (không dấu), số và dấu gạch dưới, viết liền.',
            'email.unique' => 'Email đã tồn tại',
        ]);

        $user = User::create([
            'name' => $validated['username'], // Gán tạm tên là username
            'username' => $validated['username'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'password' => Hash::make($validated['password']),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Đăng ký thành công!',
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    // Đăng nhập
    public function login(Request $request)
    {
        $loginField = filter_var($request->input('email'), FILTER_VALIDATE_EMAIL) ? 'email' : 'username';

        if (!Auth::attempt([$loginField => $request->input('email'), 'password' => $request->input('password')])) {
            return response()->json([
                'message' => 'Thông tin đăng nhập không chính xác',
            ], 401);
        }

        $user = User::where($loginField, $request['email'])->firstOrFail();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Đăng nhập thành công!',
            'user' => $user,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    // Đăng xuất
    public function logout(Request $request)
    {
        // Xóa tất cả token của user
        $request->user()->tokens()->delete();

        return response()->json([
            'message' => 'Đăng xuất thành công!',
        ]);
    }

    // Lấy thông tin User hiện tại
    public function user(Request $request)
    {
        return $request->user();
    }

    public function checkAvailability(Request $request)
    {
        $type = $request->input('type');
        $value = $request->input('value');

        if (!in_array($type, ['username', 'email'])) {
            return response()->json(['available' => false, 'message' => 'Invalid type'], 400);
        }

        $exists = \App\Models\User::where($type, $value)->exists();

        return response()->json([
            'available' => !$exists
        ]);
    }
}
