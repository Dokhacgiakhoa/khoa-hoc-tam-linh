<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use App\Models\Notification;


class WalletController extends Controller
{
    public function getWallet(Request $request)
    {
        $user = $request->user();
        return response()->json([
            'balance' => $user->balance,
            'formatted' => number_format($user->balance) . ' Linh Tệ',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'username' => $user->username
            ]
        ]);
    }

    public function deposit(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric|min:1000|max:100000000'
        ]);

        $user = $request->user();
        $amount = $request->amount;

        $user->balance += $amount;
        $user->save();

        $transaction = Transaction::create([
            'user_id' => $user->id,
            'type' => 'deposit',
            'amount' => $amount,
            'description' => 'Nạp tiền vào ví'
        ]);

        Notification::create([
            'user_id' => $user->id,
            'title' => 'Nạp tiền thành công',
            'message' => 'Bạn đã nạp thành công ' . number_format($amount) . ' vào ví Linh Tệ.',
            'type' => 'success',
            'data' => ['transaction_id' => $transaction->id]
        ]);

        return response()->json([
            'message' => 'Nạp tiền thành công!',
            'transaction' => $transaction,
            'new_balance' => $user->balance
        ]);
    }


    public function getTransactions(Request $request)
    {
        $user = $request->user();
        
        $query = Transaction::where('user_id', $user->id);

        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        if ($request->has('from_date')) {
            $query->whereDate('created_at', '>=', $request->from_date);
        }
        if ($request->has('to_date')) {
            $query->whereDate('created_at', '<=', $request->to_date);
        }

        $transactions = $query->orderBy('created_at', 'desc')
            ->paginate($request->per_page ?? 20);

        return response()->json($transactions);
    }
}
