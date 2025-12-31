<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\AffiliateClick; // Ensure model exists or use DB
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AffiliateController extends Controller
{
    /**
     * Handle affiliate link click
     */
    public function handle($code, Request $request)
    {
        $user = User::where('affiliate_code', $code)->first();

        if ($user) {
            // Log click
            // Basic throttling: Check if same IP clicked in last hour
            $exists = DB::table('affiliate_clicks')
                ->where('user_id', $user->id)
                ->where('ip_address', $request->ip())
                ->where('created_at', '>=', now()->subHour())
                ->exists();

            if (!$exists) {
                DB::table('affiliate_clicks')->insert([
                    'user_id' => $user->id,
                    'ip_address' => $request->ip(),
                    'user_agent' => $request->header('User-Agent'),
                    'created_at' => now(),
                    'updated_at' => now()
                ]);
            }
        }

        // Redirect to frontend home
        return redirect(env('APP_FRONTEND_URL', 'http://localhost:3000'));
    }
}
