<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;
use App\Services\WalletService;
use App\Traits\ApiResponse;
use Exception;

class WalletController extends Controller
{
    use ApiResponse;

    protected $walletService;

    public function __construct(WalletService $walletService)
    {
        $this->walletService = $walletService;
    }

    /**
     * Lấy thông tin ví và số dư
     */
    public function getWallet(Request $request)
    {
        $user = $request->user();
        return $this->successResponse([
            'balance' => (float)$user->balance,
            'frozen_balance' => (float)($user->frozen_balance ?? 0),
            'formatted' => number_format($user->balance) . ' Linh Tệ',
            'user' => [
                'id' => $user->id,
                'uuid' => $user->uuid,
                'name' => $user->name,
                'username' => $user->username,
                'spiritual_level' => $user->spiritual_level ?? 'Tân Học',
            ]
        ], 'Lấy thông tin ví thành công.');
    }

    /**
     * Nạp tiền vào ví
     */
    public function deposit(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric|min:1000|max:100000000',
            'payment_method' => 'nullable|string'
        ]);

        try {
            $user = $request->user();
            $amount = (float)$request->amount;
            $paymentMethod = $request->input('payment_method', 'manual');

            $result = $this->walletService->deposit($user, $amount, $paymentMethod, 'Nạp tiền vào ví Linh Tệ');

            return $this->successResponse($result, 'Nạp Linh Tệ thành công!');
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 400);
        }
    }

    /**
     * Lịch sử giao dịch ví
     */
    public function getTransactions(Request $request)
    {
        $user = $request->user();
        
        $query = Transaction::where('user_id', $user->id);

        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        if ($request->filled('from_date')) {
            $query->whereDate('created_at', '>=', $request->from_date);
        }
        if ($request->filled('to_date')) {
            $query->whereDate('created_at', '<=', $request->to_date);
        }

        $transactions = $query->orderBy('created_at', 'desc')
            ->paginate($request->per_page ?? 20);

        return $this->paginatedResponse($transactions, 'Lấy lịch sử giao dịch thành công.');
    }
}
