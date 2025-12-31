<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Service;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Service Data from Frontend (dich-vu.js)
        $services = [
            // MỆNH
            [
                'service_id' => 'sv-tuvi',
                'name' => 'Lập lá số Tử Vi',
                'price' => 495000,
                'category' => 'menh',
                'description' => 'Lập lá số Tử Vi trọn đời, luận giải chi tiết.'
            ],
            [
                'service_id' => 'sv-battu',
                'name' => 'Luận giải Bát Tự',
                'price' => 299000,
                'category' => 'menh',
                'description' => 'Phân tích ngũ hành, dụng thần, hỷ thần.'
            ],
             // TƯỚNG
             [
                'service_id' => 'sv-facescan',
                'name' => 'AI Face Scan',
                'price' => 99000,
                'category' => 'tuong',
                'description' => 'Quét khuôn mặt bằng AI, dự đoán tướng pháp.'
            ],
            [
                'service_id' => 'sv-palmscan',
                'name' => 'Xem Chỉ Tay',
                'price' => 199000,
                'category' => 'tuong',
                'description' => 'Phân tích đường chỉ tay, vận mệnh.'
            ],
            [
                'service_id' => 'sv-vantay',
                'name' => 'Xem Vân Tay',
                'price' => 150000,
                'category' => 'tuong',
                'description' => 'Sinh trắc vân tay, khám phá tiềm năng.'
            ],
            // BỐC
            [
                'service_id' => 'sv-tarot',
                'name' => 'Bói Bài Tarot',
                'price' => 250000,
                'category' => 'boc',
                'description' => 'Trải bài Tarot online, giải đáp thắc mắc.'
            ],
            [
                'service_id' => 'sv-kinhdich',
                'name' => 'Gieo Quẻ Dịch',
                'price' => 100000,
                'category' => 'boc',
                'description' => 'Gieo quẻ Kinh Dịch dự đoán cát hung.'
            ],
            [
                'service_id' => 'sv-xin-xam',
                'name' => 'Xin Xâm Quan Thánh',
                'price' => 0, // Free
                'category' => 'boc',
                'description' => 'Xin xăm hàng ngày.'
            ],
            // TRẠCH
            [
                'service_id' => 'sv-laban',
                'name' => 'La Bàn AR',
                'price' => 50000,
                'category' => 'trach',
                'description' => 'La bàn phong thủy AR xác định hướng tốt xấu.'
            ],
            [
                'service_id' => 'sv-thuocloban',
                'name' => 'Thước Lỗ Ban',
                'price' => 0, // Free
                'category' => 'trach',
                'description' => 'Tra cứu thước Lỗ Ban online.'
            ],
            // SỐ
            [
                'service_id' => 'sv-thansohoc',
                'name' => 'Tra cứu Thần Số',
                'price' => 299000,
                'category' => 'so',
                'description' => 'Báo cáo chi tiết Thần Số Học.'
            ],
            [
                'service_id' => 'sv-sim',
                'name' => 'Chọn SIM Phong Thủy',
                'price' => 99000,
                'category' => 'so',
                'description' => 'Chấm điểm SIM, gợi ý số đẹp.'
            ],
             [
                'service_id' => 'sv-lichvannien',
                'name' => 'Lịch Vạn Niên',
                'price' => 0, // Free
                'category' => 'so',
                'description' => 'Xem ngày tốt xấu, lịch âm dương.'
            ],
        ];

        foreach ($services as $svc) {
            Service::updateOrCreate(
                ['service_id' => $svc['service_id']],
                $svc
            );
        }
    }
}
