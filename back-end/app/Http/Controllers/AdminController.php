<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Order;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    public function dashboard()
    {
        return response()->json([
            'total_users' => User::count(),
            'total_orders' => Order::count(),
            'total_balance' => User::sum('balance'),
            'today_revenue' => Transaction::whereDate('created_at', today())
                ->where('type', 'purchase')
                ->sum(DB::raw('ABS(amount)')),
        ]);
    }

    public function walletStatistics()
    {
        return response()->json([
            'total_balance' => User::sum('balance'),
            'total_users' => User::count(),
            'total_transactions' => Transaction::count(),
            'today_deposits' => Transaction::whereDate('created_at', today())
                ->where('type', 'deposit')
                ->sum('amount'),
            'top_users' => User::orderBy('balance', 'desc')
                ->take(10)
                ->get(['username', 'balance'])
        ]);
    }
}
