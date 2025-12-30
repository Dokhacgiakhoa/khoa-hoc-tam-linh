<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Order;
use App\Models\Product;

echo "Fixing Order Items from ID(int) to ProductID(string)...\n";

$orders = Order::all();
$fixedCount = 0;

foreach ($orders as $order) {
    if (!$order->items) continue;
    
    $items = json_decode($order->items, true);
    if (!is_array($items)) continue;

    $updated = false;
    foreach ($items as &$item) {
        // If ID is numeric (integer stored as number or string number)
        if (isset($item['id']) && is_numeric($item['id'])) {
            $dbId = (int)$item['id'];
            $prod = Product::find($dbId); // Find by PK (db_id)
            
            if ($prod) {
                echo "Order #{$order->id}: Converting ID {$dbId} -> {$prod->product_id}\n";
                $item['id'] = $prod->product_id;
                $updated = true;
            } else {
                echo "Warning: Product with DB_ID {$dbId} not found for Order #{$order->id}\n";
            }
        }
    }

    if ($updated) {
        $order->items = json_encode($items);
        $order->save();
        $fixedCount++;
    }
}

echo "Done. Fixed {$fixedCount} orders.\n";
