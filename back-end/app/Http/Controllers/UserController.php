<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class UserController extends Controller
{
    public function adminIndex()
    {
        return response()->json(User::all());
    }

    /**
     * Update user (Admin only)
     */
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        
        $validated = $request->validate([
            'name' => 'nullable|string|max:255',
            'username' => 'nullable|string|max:50|unique:users,username,' . $user->id,
            'email' => 'nullable|email|unique:users,email,' . $user->id,
            'role' => 'nullable|in:user,admin,expert',
            'level' => 'nullable|string|max:50',
            'balance' => 'nullable|numeric|min:0',
        ]);

        $user->update($validated);
        
        return response()->json([
            'message' => 'Cập nhật người dùng thành công!',
            'user' => $user->fresh()
        ]);
    }

    /**
     * Delete user (Admin only)
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        
        // Don't delete self
        if ($user->id === auth()->id()) {
            return response()->json(['error' => 'Bạn không thể tự xóa chính mình.'], 400);
        }

        $user->delete();
        
        return response()->json(['message' => 'Đã xóa người dùng thành công!']);
    }

    // Upload avatar
    public function uploadAvatar(Request $request)
    {
        $request->validate([
            'avatar' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $user = $request->user();
        
        if ($user->avatar && file_exists(public_path($user->avatar))) {
            unlink(public_path($user->avatar));
        }
        
        $file = $request->file('avatar');
        $filename = 'avatar_' . $user->id . '_' . time() . '.' . $file->getClientOriginalExtension();
        $file->move(public_path('avatars'), $filename);
        
        $avatarUrl = '/avatars/' . $filename;
        $user->avatar = $avatarUrl;
        $user->save();
        
        return response()->json([
            'message' => 'Upload ảnh thành công!',
            'avatar_url' => $avatarUrl
        ]);
    }

    // Cập nhật thông tin cá nhân (User)
    public function updateProfile(Request $request)
    {
        $user = $request->user();
        
        $validated = $request->validate([
            'full_name' => 'nullable|string|max:255',
            'username' => 'nullable|string|max:50|unique:users,username,' . $user->id,
            'phone' => 'nullable|string|max:20',
            'gender' => 'nullable|in:male,female,other',
            'date_of_birth' => 'nullable|date',
            'birth_time' => 'nullable|string|max:10',
            'address' => 'nullable|string|max:500',
            'avatar' => 'nullable|string',
        ]);

        // Map full_name to name column
        if (isset($validated['full_name'])) {
            $validated['name'] = $validated['full_name'];
            unset($validated['full_name']);
        }

        $user->fill($validated)->save();

        return response()->json([
            'message' => 'Cập nhật hồ sơ thành công!',
            'user' => $user->fresh()
        ]);
    }
}
