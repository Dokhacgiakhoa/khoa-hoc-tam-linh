<?php

use App\Models\Product;
use Illuminate\Support\Facades\Schema;

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

try {
    if (!Schema::hasTable('products')) {
        echo "Table 'products' does NOT exist. Migration needed.\n";
        exit(1);
    }

    $count = Product::count();
    echo "Table 'products' exists. Count: " . $count . "\n";

    if ($count === 0) {
        echo "No products found. Please run 'php artisan migrate --seed'.\n";
    } else {
        echo "Products found:\n";
        foreach (Product::take(5)->get() as $product) {
            echo "- " . $product->name . " (Price: " . $product->price . ")\n";
        }
    }
} catch (\Exception $e) {
    echo "Database Error: " . $e->getMessage() . "\n";
}
