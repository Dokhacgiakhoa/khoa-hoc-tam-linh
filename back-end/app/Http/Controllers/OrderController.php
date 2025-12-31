<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Product;
use App\Models\Transaction;
use App\Models\Notification;
use App\Models\Course;
use App\Models\Service; // Added import for Service
use App\Models\OrderItem;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use App\Models\CourseEnrollment; // Added

class OrderController extends Controller
{
    public function index()
    {
        return response()->json(Order::where('user_id', auth()->id())->orderBy('created_at', 'desc')->get());
    }

    public function show($id)
    {
        $order = Order::findOrFail($id);
        return response()->json($order);
    }

    public function updateStatus(Request $request, $id)
    {
        $order = Order::findOrFail($id);
        $request->validate([
            'status' => 'required|string'
        ]);

        $order->status = $request->status;
        $order->save();

        return response()->json([
            'message' => 'Cập nhật trạng thái thành công!',
            'order' => $order
        ]);
    }

    public function checkout(Request $request)
    {
        $request->validate([
            'items' => 'required|array',
            'items.*.id' => 'required',
            'items.*.quantity' => 'required|integer|min:1',
            'coupon' => 'nullable|string'
        ]);

        $user = $request->user();
        $items = $request->items;
        $coupon = $request->coupon;
        
        $totalPrice = 0;
        $orderItems = [];
        $dbProducts = [];

        // 1. Calculate Total & Verify Stock
        foreach ($items as $item) {
            $type = $item['type'] ?? 'product';

            if ($type === 'course') {
                $course = Course::find($item['id']);
                if (!$course) {
                    return response()->json(['message' => "Khóa học ID {$item['id']} không tồn tại"], 400);
                }

                // Check if already enrolled
                $existingEnrollment = CourseEnrollment::where('user_id', $user->id)
                    ->where('course_id', $course->id)
                    ->exists();

                if ($existingEnrollment) {
                    return response()->json(['message' => "Bạn đã sở hữu khóa học '{$course->title}' rồi. Một tài khoản chỉ được mua 1 lần."], 400);
                }

                $totalPrice += $course->price * $item['quantity'];

                $dbProducts[] = [
                    'type' => 'course',
                    'entity' => $course,
                    'quantity' => 1 // Force quantity to 1 for courses
                ];

                $orderItems[] = [
                    'id' => $course->id,
                    'type' => 'course',
                    'name' => $course->title,
                    'quantity' => 1, // Force quantity to 1
                    'price' => $course->price,
                    'image' => $course->thumbnail,
                    'slug' => $course->slug
                ];



            } elseif ($type === 'service') {
                $service = Service::where('service_id', $item['id'])->orWhere('id', $item['id'])->first();
                 if (!$service) {
                    return response()->json(['message' => "Dịch vụ ID {$item['id']} không tồn tại"], 400);
                }

                $totalPrice += $service->price * $item['quantity'];

                $dbProducts[] = [
                    'type' => 'service',
                    'entity' => $service,
                    'quantity' => $item['quantity']
                ];

                $orderItems[] = [
                    'id' => $service->service_id,
                    'type' => 'service',
                    'name' => $service->name,
                    'quantity' => $item['quantity'],
                    'price' => $service->price,
                    // Services might not have images or slugs in the same way, handle optional
                    'image' => $service->icon ?? null
                ];

            } else {
                // Default: Product
                // Find by db_id first as frontend sends likely db_id, but product_id is string. 
                // Checking ProductCard.js, it sends product.id which is db_id.
                $product = \App\Models\Product::where('db_id', $item['id'])
                    ->orWhere('product_id', $item['id'])
                    ->first();

                if (!$product) {
                    return response()->json(['message' => "Sản phẩm ID {$item['id']} không tồn tại"], 400);
                }

                if ($product->stock < $item['quantity']) {
                    return response()->json(['message' => "Sản phẩm {$product->name} không đủ số lượng trong kho"], 400);
                }

                $totalPrice += $product->price * $item['quantity'];
                
                $dbProducts[] = [
                    'type' => 'product',
                    'entity' => $product,
                    'quantity' => $item['quantity']
                ];

                $orderItems[] = [
                    'id' => $product->product_id,
                    'type' => 'product',
                    'name' => $product->name,
                    'quantity' => $item['quantity'],
                    'price' => $product->price,
                    'image' => $product->image
                ];
            }
        }

        // 2. Apply Discount
        $discount = 0;
        if ($coupon) {
            $code = strtoupper(trim($coupon));
            if ($code === 'NEWYEAR2026') {
                $discount = $totalPrice * 0.2;
            } elseif ($code === 'VIPMEMBER') {
                 $discount = 50000;
            } elseif ($code === 'FREESHIP') {
                // Logic freeship (ignored for now as wallet payment usually digital)
            }
        }
        
        $finalTotal = max(0, $totalPrice - $discount);

        // 3. Check Balance
        if ($user->balance < $finalTotal) {
             return response()->json(['message' => 'Số dư trong ví không đủ thanh toán.'], 400);
        }

        // 4. Process Transaction
        return DB::transaction(function () use ($user, $finalTotal, $dbProducts, $orderItems, $coupon, $totalPrice) {
            // Deduct balance
            $user->balance -= $finalTotal;
            $user->save();

            // Deduct stock & Process Enrollments
            foreach ($dbProducts as $p) {
                if ($p['type'] === 'product') {
                    $product = $p['entity'];
                    $product->stock -= $p['quantity'];
                    $product->sold += $p['quantity'];
                    $product->save();
                } elseif ($p['type'] === 'course') {
                    $course = $p['entity'];
                    // Auto enroll
                    DB::table('course_enrollments')->updateOrInsert(
                        ['user_id' => $user->id, 'course_id' => $course->id],
                        ['status' => 'active', 'paid_amount' => $course->price, 'enrolled_at' => now(), 'updated_at' => now()]
                    );
                } elseif ($p['type'] === 'service') {
                    // Logic for service activation if needed (e.g. create a service_usage record)
                    // For now, we just acknowledge payment. 
                    // Future: Add 'service_enrollments' or similar.
                }
            }

            // Create Order
            $order = Order::create([
                'user_id' => $user->id,
                'order_id' => 'ORD-' . strtoupper(Str::random(10)),
                'customer_name' => $user->name,
                'items' => $orderItems, // Keep for snapshot compatibility
                'total' => $finalTotal,
                'coupon_code' => $coupon,
                'discount_amount' => $discountValue ?? 0,
                'method' => 'wallet',
                'status' => 'paid'
            ]);

            // Save Order Items
            foreach ($dbProducts as $p) {
                // $p['entity'] is the Model (Product or Course)
                // $p['type'] is 'product' or 'course'
                // $p['quantity']
                $itemEntity = $p['entity'];
                
                \App\Models\OrderItem::create([
                    'order_id' => $order->id,
                    'buyable_type' => get_class($itemEntity),
                    'buyable_id' => $itemEntity->id, // Assuming all models use 'id' as PK or handled by Eloquent
                    'name' => $itemEntity->name ?? $itemEntity->title, // Product has name, Course has title
                    'price' => $itemEntity->price,
                    'quantity' => $p['quantity']
                ]);
            }

            // Create Transaction
            Transaction::create([
                'user_id' => $user->id,
                'type' => 'purchase',
                'amount' => -$finalTotal,
                'description' => "Thanh toán đơn hàng " . $order->order_id . ($coupon ? " (Tự động giảm giá: $coupon)" : "")
            ]);

            // Create Notification
            Notification::create([
                'user_id' => $user->id,
                'title' => 'Thanh toán thành công',
                'message' => "Bạn đã thanh toán đơn hàng {$order->order_id}. Tổng tiền: " . number_format($finalTotal) . " Linh Tệ.",
                'type' => 'success',
                'data' => ['order_id' => $order->id]
            ]);

            return response()->json([
                'message' => 'Thanh toán thành công!',
                'order' => $order,
                'new_balance' => $user->balance
            ]);
        });
    }
}
