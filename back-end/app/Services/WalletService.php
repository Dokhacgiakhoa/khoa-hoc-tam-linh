<?php

namespace App\Services;

use App\Models\User;
use App\Models\Transaction;
use App\Models\Notification;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Exception;

class WalletService
{
    /**
     * Nạp tiền vào ví người dùng (Deposit)
     */
    public function deposit(User $user, float $amount, string $paymentMethod = 'manual', string $description = 'Nạp tiền vào ví'): array
    {
        if ($amount <= 0) {
            throw new Exception('Số tiền nạp phải lớn hơn 0');
        }

        return DB::transaction(function () use ($user, $amount, $paymentMethod, $description) {
            // Lock bản ghi user để tránh race condition
            $lockedUser = User::where('id', $user->id)->lockForUpdate()->first();

            $balanceBefore = $lockedUser->balance;
            $balanceAfter = $balanceBefore + $amount;

            $lockedUser->balance = $balanceAfter;
            $lockedUser->save();

            $txCode = 'TX-DEP-' . date('Ymd') . '-' . strtoupper(Str::random(6));

            $transaction = Transaction::create([
                'user_id' => $lockedUser->id,
                'transaction_code' => $txCode,
                'type' => 'deposit',
                'amount' => $amount,
                'balance_before' => $balanceBefore,
                'balance_after' => $balanceAfter,
                'status' => 'completed',
                'payment_method' => $paymentMethod,
                'description' => $description,
            ]);

            Notification::create([
                'user_id' => $lockedUser->id,
                'title' => 'Nạp Linh Tệ thành công 🔮',
                'message' => "Bạn đã nạp thành công " . number_format($amount) . " Linh Tệ vào ví. Số dư mới: " . number_format($balanceAfter) . " Linh Tệ.",
                'type' => 'success',
                'data' => ['transaction_id' => $transaction->id, 'tx_code' => $txCode]
            ]);

            return [
                'transaction' => $transaction,
                'new_balance' => $balanceAfter,
                'balance_before' => $balanceBefore,
            ];
        });
    }

    /**
     * Khấu trừ tiền từ ví người dùng (Deduct / Purchase)
     */
    public function deduct(User $user, float $amount, string $type = 'purchase', string $description = 'Thanh toán dịch vụ', array $metadata = []): array
    {
        if ($amount <= 0) {
            throw new Exception('Số tiền thanh toán phải lớn hơn 0');
        }

        return DB::transaction(function () use ($user, $amount, $type, $description, $metadata) {
            $lockedUser = User::where('id', $user->id)->lockForUpdate()->first();

            if ($lockedUser->balance < $amount) {
                throw new Exception("Số dư ví không đủ (Hiện có: " . number_format($lockedUser->balance) . " Linh Tệ, Cần: " . number_format($amount) . " Linh Tệ)");
            }

            $balanceBefore = $lockedUser->balance;
            $balanceAfter = $balanceBefore - $amount;

            $lockedUser->balance = $balanceAfter;
            $lockedUser->save();

            $txCode = 'TX-PAY-' . date('Ymd') . '-' . strtoupper(Str::random(6));

            $transaction = Transaction::create([
                'user_id' => $lockedUser->id,
                'transaction_code' => $txCode,
                'type' => $type,
                'amount' => -$amount,
                'balance_before' => $balanceBefore,
                'balance_after' => $balanceAfter,
                'status' => 'completed',
                'payment_method' => 'wallet',
                'description' => $description,
                'metadata' => !empty($metadata) ? $metadata : null,
            ]);

            return [
                'transaction' => $transaction,
                'new_balance' => $balanceAfter,
                'balance_before' => $balanceBefore,
            ];
        });
    }
}
