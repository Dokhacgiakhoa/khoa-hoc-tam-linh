<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Order;
use App\Models\Transaction;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\Notification;


class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::query();

        // Support for featured products (most viewed)
        if ($request->has('featured') && $request->featured === 'true') {
            $limit = $request->input('limit', 5);
            $products = $query->orderBy('views', 'desc')
                             ->limit($limit)
                             ->get();
        } else {
            $products = $query->get();
        }

        return response()->json($products);
    }

    public function show($id)
    {
        $product = Product::where('product_id', $id)->first();
        if (!$product) {
            return response()->json(['error' => 'Sản phẩm không tồn tại'], 404);
        }
        return response()->json($product);
    }

    public function purchase(Request $request, $id)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1'
        ]);

        $product = Product::where('product_id', $id)->first();
        if (!$product) {
            return response()->json(['error' => 'Sản phẩm không tồn tại'], 404);
        }

        if ($product->stock < $request->quantity) {
            return response()->json(['error' => 'Số lượng trong kho không đủ'], 400);
        }

        $user = $request->user();
        $totalPrice = $product->price * $request->quantity;

        if ($user->balance < $totalPrice) {
            return response()->json(['error' => 'Số dư trong ví không đủ'], 400);
        }

        return DB::transaction(function () use ($user, $product, $request, $totalPrice) {
            // Deduct balance
            $user->balance -= $totalPrice;
            $user->save();

            // Deduct stock
            $product->stock -= $request->quantity;
            $product->save();

            // Create order
            $order = Order::create([
                'user_id' => $user->id,
                'order_id' => 'ORD-' . strtoupper(Str::random(10)),
                'customer_name' => $user->name,
                'items' => json_encode([
                    [
                        'id' => $product->product_id,
                        'name' => $product->name,
                        'quantity' => $request->quantity,
                        'price' => $product->price
                    ]
                ]),
                'total' => $totalPrice,
                'method' => 'wallet',
                'status' => 'paid'
            ]);

            // Create transaction
            Transaction::create([
                'user_id' => $user->id,
                'type' => 'purchase',
                'amount' => -$totalPrice,
                'description' => "Mua {$request->quantity} x {$product->name}"
            ]);

            Notification::create([
                'user_id' => $user->id,
                'title' => 'Mua hàng thành công',
                'message' => "Bạn đã mua thành công {$request->quantity} x {$product->name}. Đơn hàng {$order->order_id} đã được thanh toán.",
                'type' => 'success',
                'data' => ['order_id' => $order->id, 'product_id' => $product->id]
            ]);

            return response()->json([
                'message' => 'Mua hàng thành công!',
                'order' => $order,
                'new_balance' => $user->balance
            ]);
        });
    }

    public function checkOwnership(Request $request, $id)
    {
        $user = $request->user();
        
        $orders = Order::where('user_id', $user->id)
            ->where('status', 'paid')
            ->get();

        foreach ($orders as $order) {
            $items = json_decode($order->items, true);
            if (is_array($items)) {
                foreach ($items as $item) {
                    if (isset($item['id']) && (string)$item['id'] === (string)$id) {
                        return response()->json(['managed' => true, 'owned' => true]);
                    }
                }
            }
        }

        return response()->json(['managed' => true, 'owned' => false]);
    }
}
