<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class TwoFactorController extends Controller
{
    // --- 2FA Logic (Real Google Authenticator) ---

    // Setup 2FA: Trả về Secret và QR Code SVG
    public function setup(Request $request)
    {
        $user = $request->user();
        $google2fa = new \PragmaRX\Google2FA\Google2FA();

        // 1. Tạo Secret Key (nếu chưa có)
        // Nếu user đã có secret (đang setup lại), có thể dùng lại hoặc tạo mới. Demo: tạo mới.
        $secret = $google2fa->generateSecretKey();
        
        // 2. Tạo QR Code (Inline SVG)
        // Cần cài bacon/bacon-qr-code
        $qrImage = $google2fa->getQRCodeInline(
            'KhoaHocTamLinh',
            $user->email,
            $secret
        );

        return response()->json([
            'secret' => $secret,
            'qr_code_url' => $qrImage, // Trả về chuỗi SVG thay vì URL
            'manual_entry_key' => $secret
        ]);
    }

    // Xác nhận và Bật 2FA
    public function confirm(Request $request)
    {
        $request->validate(['code' => 'required', 'secret' => 'required']);
        
        $google2fa = new \PragmaRX\Google2FA\Google2FA();
        
        // Validate OTP
        $valid = $google2fa->verifyKey($request->secret, $request->code);

        if (!$valid) {
             return response()->json(['message' => 'Mã OTP không đúng.'], 400);   
        }

        $user = $request->user();
        $user->two_factor_secret = $request->secret;
        $user->two_factor_confirmed_at = now();
        $user->save();

        return response()->json(['message' => 'Đã bật xác thực 2 lớp thành công!']);
    }

    // --- QR Login Logic ---

    // Tạo mã QR Login Session
    public function generateQr()
    {
        $sessionId = Str::uuid()->toString();
        Cache::put("qr_login_{$sessionId}", 'waiting', 300); // 5 phút

        return response()->json([
            'session_id' => $sessionId,
            'qr_url' => "https://chart.googleapis.com/chart?chs=200x200&chld=M|0&cht=qr&chl=LOGIN:{$sessionId}"
        ]);
    }

    // Kiểm tra trạng thái QR (Polling)
    public function checkQr($sessionId)
    {
        $status = Cache::get("qr_login_{$sessionId}");

        if (!$status) {
            return response()->json(['status' => 'expired']);
        }

        if ($status === 'waiting') {
            return response()->json(['status' => 'waiting']);
        }

        // Nếu status là userId -> Đã approve
        $userId = $status;
        $user = User::find($userId);
        
        if ($user) {
            $token = $user->createToken('qr_login_token')->plainTextToken;
            // Xóa cache sau khi login xong
            Cache::forget("qr_login_{$sessionId}");
            
            return response()->json([
                'status' => 'authenticated',
                'user' => $user,
                'access_token' => $token
            ]);
        }

        return response()->json(['status' => 'error']);
    }

    // App Mobile (Giả lập) chấp thuận đăng nhập
    public function approveQr(Request $request)
    {
        $request->validate(['session_id' => 'required']);
        
        $sessionId = $request->session_id;
        $status = Cache::get("qr_login_{$sessionId}");

        if (!$status || $status !== 'waiting') {
             return response()->json(['message' => 'Mã QR không hợp lệ hoặc đã hết hạn'], 400);
        }

        // Gán userId vào cache
        Cache::put("qr_login_{$sessionId}", $request->user()->id, 300);

        return response()->json(['message' => 'Đã phê duyệt đăng nhập!']);
    }
}
