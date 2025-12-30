<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$userId = 1; // Admin
$user = \App\Models\User::find($userId);
echo "User: {$user->name} (ID: {$user->id})\n";

$orders = \App\Models\Order::where('user_id', $userId)->get();
echo "Total Orders: " . $orders->count() . "\n";

foreach ($orders as $order) {
    echo "--------------------------------------------------\n";
    echo "Order #{$order->id} | Status: {$order->status} | Total: {$order->total}\n";
    echo "Raw Items: " . $order->items . "\n";
    
    $items = json_decode($order->items, true);
    $containsTarget = false;
    foreach ($items as $item) {
        if (isset($item['id']) && $item['id'] === 'sv-thansohoc') {
            $containsTarget = true;
            echo "  [FOUND] sv-thansohoc in items!\n";
        }
    }
    
    if ($containsTarget) {
        if ($order->status === 'paid') {
            echo "  => SHOULD UNLOCK (Status is paid)\n";
        } else {
            echo "  => LOCKED (Status is '{$order->status}', needs 'paid')\n";
        }
    }
}
