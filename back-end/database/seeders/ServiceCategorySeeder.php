<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\ServiceCategory;
use App\Models\Service;

class ServiceCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Category Groups from Frontend (dich-vu.js)
        $groups = [
            [
                'slug' => 'menh',
                'name' => 'MỆNH (Destiny)',
                'sub_title' => 'Tử Vi Đẩu Số · Bát Tự · Quản lý hồ sơ',
                'description' => 'Thấu hiểu bản mệnh và chu kỳ đời người thông qua các hệ thống mệnh lý phương Đông.',
                'image' => '/images/banners/menh-huyen-thuat.png'
            ],
            [
                'slug' => 'tuong',
                'name' => 'TƯỚNG (AI Scanner)',
                'sub_title' => 'Scan Khuôn Mặt · Scan Chỉ Tay · Xem Vân Tay',
                'description' => 'Ứng dụng AI phân tích hình tướng, nhận diện khí sắc và dự đoán xu hướng tính cách.',
                'image' => '/images/banners/tuong-huyen-thuat.png'
            ],
            [
                'slug' => 'boc',
                'name' => 'BỐC (Oracle Tool)',
                'sub_title' => 'Tarot · Gieo Quẻ Dịch · Xin Xâm',
                'description' => 'Các công cụ dự đoán xác suất và kết nối trực giác giúp đưa ra quyết định nhanh chóng.',
                'image' => '/images/banners/boc-huyen-thuat.png'
            ],
            [
                'slug' => 'trach',
                'name' => 'TRẠCH (Feng Shui)',
                'sub_title' => 'La Bàn AR · Thước Lỗ Ban · Bát Trạch',
                'description' => 'Tối ưu hóa không gian sống và luân chuyển năng lượng theo phong thủy học.',
                'image' => '/images/banners/trach-huyen-thuat.png'
            ],
            [
                'slug' => 'so',
                'name' => 'SỐ (Numerology)',
                'sub_title' => 'Thần Số Học · Chấm điểm SIM · Lịch Vạn Niên',
                'description' => 'Khám phá năng lượng của các con số ảnh hưởng đến cuộc sống và thời vận.',
                'image' => '/images/banners/so-huyen-thuat.png'
            ],
        ];

        foreach ($groups as $group) {
            ServiceCategory::updateOrCreate(
                ['slug' => $group['slug']],
                $group
            );
        }

        // Migrate existing services
        $services = Service::all();
        foreach ($services as $svc) {
            if ($svc->category && !$svc->category_id) {
                $cat = ServiceCategory::where('slug', $svc->category)->first();
                if ($cat) {
                    $svc->category_id = $cat->id;
                    $svc->save();
                    $this->command->info("Migrated service {$svc->name} to category {$cat->name}");
                } else {
                    $this->command->warn("Category '{$svc->category}' not found for service {$svc->name}");
                }
            }
        }
    }
}
