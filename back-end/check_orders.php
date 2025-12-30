<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$user = \App\Models\User::find(1);
if (!$user) die("Admin not found\n");

echo "Checking Orders for User: {$user->name} (ID: {$user->id})\n";
$orders = \App\Models\Order::where('user_id', $user->id)->get();
echo "Total Orders: " . $orders->count() . "\n";

foreach ($orders as $order) {
    echo "- Order #{$order->id} ({$order->status}): {$order->items}\n";
    if (strpos($order->items, 'sv-thansohoc') !== false) {
        echo "  [!!!] FOUND 'sv-thansohoc' in this order!\n";
    }
}
