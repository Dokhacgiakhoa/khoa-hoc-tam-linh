<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\ProductCategory;
use App\Models\Product;
use Illuminate\Support\Str;

class ProductCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Constants from frontend
        $categories = [
           "bai-tam-linh" => "Bài Tâm Linh",
           "phu-kien-tam-linh" => "Phụ Kiện Tâm Linh",
           "huong-tram" => "Hương & Trầm",
           "tra-dao" => "Trà Đạo & Thiền Trà",
           "bo-suu-tap-cao-cap" => "Bộ Sưu Tập & Cao Cấp",
           "set-qua-tang" => "Set Quà Tặng",
        ];

        foreach ($categories as $slug => $name) {
            ProductCategory::updateOrCreate(
                ['slug' => $slug],
                [
                    'name' => $name,
                    'icon' => null, // Can map icons later if needed
                    'description' => "Danh mục {$name}"
                ]
            );
        }

        // Migrate existing products
        $products = Product::all();
        foreach ($products as $product) {
            if ($product->category && !$product->category_id) {
                // Find category by slug (assuming product->category stored the slug or matching key)
                // In products.json, category was likely the slug key (e.g. 'bai-tam-linh')
                $cat = ProductCategory::where('slug', $product->category)->first();
                
                if ($cat) {
                    $product->category_id = $cat->id;
                    $product->save();
                    $this->command->info("Migrated product {$product->name} to category {$cat->name}");
                } else {
                    $this->command->warn("Category '{$product->category}' not found for product {$product->name}");
                }
            }
        }
    }
}
