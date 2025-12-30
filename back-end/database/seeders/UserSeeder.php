<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Tài khoản Quản trị viên (Chính)
        User::updateOrCreate(
            ['username' => 'admin'],
            [
                'name' => 'Administrator',
                'email' => 'admin@gmail.com',
                'password' => Hash::make('123123'),
                'role' => 'admin',
                'balance' => 999999,
                'email_verified_at' => now(),
            ]
        );

        // 2. Tài khoản Chuyên gia (Expert)
        User::updateOrCreate(
            ['username' => 'expert_khoa'],
            [
                'name' => 'Gia Khoa Expert',
                'email' => 'expert@dokhacgiakhoa.vn',
                'password' => Hash::make('123123'),
                'role' => 'expert',
                'balance' => 500000,
            ]
        );

        // 3. Tài khoản Người dùng phổ thông mẫu
        User::updateOrCreate(
            ['username' => 'hocvien'],
            [
                'name' => 'Học viên A',
                'email' => 'hocvien@fpt.edu.vn',
                'password' => Hash::make('123123'),
                'role' => 'user',
                'balance' => 10000,
            ]
        );

        // 4. Tài khoản bổ sung
        User::updateOrCreate(
            ['username' => 'suongnt'],
            [
                'name' => 'Sương Nguyễn',
                'email' => 'suong.nt@gmail.com',
                'password' => Hash::make('123123'),
                'role' => 'user',
                'balance' => 20000,
            ]
        );
    }
}
