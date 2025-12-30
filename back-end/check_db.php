<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

try {
    \Illuminate\Support\Facades\DB::connection()->getPdo();
    echo "Database Connection: OK\n";
} catch (\Exception $e) {
    die("Database Connection: FAIL - " . $e->getMessage() . "\n");
}

$user = \App\Models\User::where('username', 'admin')->first();
if ($user) {
    echo "User [admin]: FOUND (ID: " . $user->id . ")\n";
    if (\Illuminate\Support\Facades\Hash::check('123123', $user->password)) {
        echo "Password [123123]: MATCH\n";
    } else {
        echo "Password [123123]: MISMATCH\n";
    }
} else {
    echo "User [admin]: NOT FOUND\n";
}
