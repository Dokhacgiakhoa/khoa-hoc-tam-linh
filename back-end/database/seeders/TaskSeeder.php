<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Task;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tasks = [
            // Daily Tasks (1 Linh Te)
            [
                'title' => 'Điểm danh hàng ngày',
                'description' => 'Đăng nhập vào hệ thống mỗi ngày để nhận quà.',
                'reward_amount' => 1,
                'frequency' => 'daily',
                'type' => 'manual',
            ],
            [
                'title' => 'Tương tác cộng đồng',
                'description' => 'Tham gia thảo luận hoặc bình luận trên website.',
                'reward_amount' => 1,
                'frequency' => 'daily',
                'type' => 'manual',
            ],
            // Weekly Tasks (5 Linh Te)
            [
                'title' => 'Chuyên cần tuần',
                'description' => 'Hoàn thành ít nhất 5 ngày điểm danh trong tuần.',
                'reward_amount' => 5,
                'frequency' => 'weekly',
                'type' => 'manual',
            ],
            [
                'title' => 'Lan tỏa tâm linh',
                'description' => 'Chia sẻ link website lên mạng xã hội.',
                'reward_amount' => 5,
                'frequency' => 'weekly',
                'type' => 'manual',
            ],
            // Monthly Tasks (10 Linh Te)
            [
                'title' => 'Đại sứ Linh Tệ',
                'description' => 'Giới thiệu bạn mới tham gia cộng đồng.',
                'reward_amount' => 10,
                'frequency' => 'monthly',
                'type' => 'manual',
            ],
            [
                'title' => 'Học viên ưu tú',
                'description' => 'Hoàn thành ít nhất 1 khóa học trong tháng.',
                'reward_amount' => 10,
                'frequency' => 'monthly',
                'type' => 'manual',
            ],
        ];

        foreach ($tasks as $task) {
            Task::create($task);
        }
    }
}
