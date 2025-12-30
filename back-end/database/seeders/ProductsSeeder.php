<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class ProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Read products.json
        $json = File::get(database_path('data/products.json'));
        $products = json_decode($json, true);

        // Read service_products.json
        $serviceJson = File::get(database_path('data/service_products.json'));
        $services = json_decode($serviceJson, true);

        // Merge arrays
        $allProducts = array_merge($products, $services);

        // Mô tả chi tiết (Tối ưu hóa: gộp trực tiếp vào seeder chính)
        $descriptions = [
            'bt-01' => "Bộ bài Tarot of the Soul kết nối sâu sắc với năng lượng tâm linh. 78 lá bài vẽ tay tỉ mỉ, chất liệu cao cấp bền đẹp. Kèm hướng dẫn tiếng Việt chi tiết và hộp đựng sang trọng. Phù hợp cho người mới và chuyên gia.",
            'bt-02' => "Oracle of Light mang đến thông điệp từ nguồn năng lượng cao nhất. 44 lá bài với hình ảnh rực rỡ, truyền cảm hứng tích cực. Dễ sử dụng cho mọi cấp độ, giúp khai mở trực giác.",
            'bs-01' => "Vòng tay Kyanite xanh dương trong suốt, kết nối luân xa cổ họng. Giúp giao tiếp rõ ràng, thể hiện bản thân chân thật. Đá tự làm sạch năng lượng, không cần tẩy uế.",
            'tr-01' => "Bộ trà thiền Nhật Bản gồm ấm và 4 chén gốm thủ công. Thiết kế tối giản, thanh lịch theo triết lý Zen. Phù hợp cho nghi thức trà đạo, thiền định.",
            'hn-01' => "Hương trầm Kỳ Nam tự nhiên 20 que - hương quý hiếm nhất. Mùi thơm ngọt ngào, ấm áp, lưu lại lâu. Giúp thiền định sâu, thanh lọc không gian.",
            // ... (Các sản phẩm khác sẽ nhận mô tả mặc định nếu không có trong mảng này)
        ];

        echo "Seeding/Updating " . count($allProducts) . " products...\n";

        foreach ($allProducts as $product) {
            $pid = $product['id'];
            $detailedDesc = $descriptions[$pid] ?? ('Sản phẩm tâm linh chất lượng cao - ' . $product['name']);
            
            DB::table('products')->updateOrInsert(
                ['product_id' => $pid],
                [
                    'name' => $product['name'],
                    'price' => $product['price'],
                    'category' => $product['cat'],
                    'description' => $product['description'] ?? ('Khám phá năng lượng của ' . $product['name']),
                    'detailed_description' => $detailedDesc,
                    'image' => $product['img'],
                    'views' => rand(500, 5000),
                    'stock' => rand(10, 100),
                    'sold' => rand(5, 50),
                    'is_custom' => isset($product['madeForYou']) ? $product['madeForYou'] : false,
                    'is_featured' => (rand(1, 10) > 8),
                    'updated_at' => now(),
                ]
            );
        }

        echo "Seeded products successfully!\n";
    }
}
