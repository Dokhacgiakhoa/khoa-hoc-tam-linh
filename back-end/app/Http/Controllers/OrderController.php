use App\Models\Order;

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
}
