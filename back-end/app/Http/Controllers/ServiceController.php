<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Service;

class ServiceController extends Controller
{
    public function index()
    {
        return response()->json(Service::all());
    }

    public function handle(Request $request, $type)
    {
        // Simulate processing time
        // sleep(1); 

        switch ($type) {
            case 'tu-vi':
                return $this->mockTuVi($request);
            case 'bat-tu':
                return $this->mockBatTu($request);
            case 'scan-face':
                return $this->mockFaceScan($request);
            case 'scan-palm':
                return $this->mockPalmScan($request);
            case 'xem-van-tay':
                return $this->mockFingerprint($request);
            case 'tarot':
                return $this->mockTarot($request);
            case 'kinh-dich':
                return $this->mockKinhDich($request);
            case 'xin-xam':
                return $this->mockXinXam($request);
            case 'la-ban':
                return $this->mockLaBan($request);
            case 'thuoc-lo-ban':
                return $this->mockThuocLoBan($request);
            case 'bat-trach':
                return $this->mockBatTrach($request);
            case 'than-so-hoc':
                return $this->mockThanSoHoc($request);
            case 'cham-diem-sim':
                return $this->mockSim($request);
            case 'lich-van-nien':
                return $this->mockCalendar($request);
            default:
                return response()->json([
                    'title' => 'Dịch vụ chưa hỗ trợ',
                    'content' => 'Tính năng đang được phát triển.',
                    'details' => []
                ]);
        }
    }

    // --- Mock Handlers ---

    private function mockTuVi($req) {
        return response()->json([
            'title' => 'Lá Số Tử Vi Trọn Đời',
            'content' => 'Bản mệnh vững vàng, cung Thân cư Tài Bạch cho thấy hậu vận sung túc. Năm nay lưu ý tháng 3 và tháng 9 âm lịch.',
            'details' => [
                'Cục: Thủy Nhị Cục',
                'Mệnh Chủ: Tham Lang',
                'Thân Chủ: Hỏa Tinh'
            ]
        ]);
    }

    private function mockBatTu($req) {
        return response()->json([
            'title' => 'Luận Giải Bát Tự (Tứ Trụ)',
            'content' => 'Thân vượng, dụng thần là Thủy/Mộc. Hành vận đang đi vào đất Tài, thuận lợi cho kinh doanh.',
            'details' => [
                'Dụng thần: Thủy',
                'Hỷ thần: Mộc',
                'Kỵ thần: Thổ'
            ]
        ]);
    }

    private function mockFaceScan($req) {
        return response()->json([
            'title' => 'Kết Quả AI Face Scan',
            'content' => 'Khuôn mặt chữ Điền, trán cao rộng thể hiện trí tuệ và khả năng lãnh đạo. Tam đình cân đối, hậu vận tốt.',
            'details' => [
                'Trán: 9/10 (Thông minh)',
                'Mắt: 8.5/10 (Thần thái)',
                'Mũi: 8/10 (Tài lộc)'
            ]
        ]);
    }

    private function mockPalmScan($req) {
        return response()->json([
            'title' => 'Luận Giải Chỉ Tay',
            'content' => 'Đường Sinh Đạo dài và rõ nét, sức khỏe tốt. Đường Trí Đạo rẽ nhánh đuôi cá, có khiếu nghệ thuật.',
            'details' => [
                'Sinh Đạo: Tốt',
                'Trí Đạo: Sáng tạo',
                'Tâm Đạo: Đa sầu đa cảm'
            ]
        ]);
    }

    private function mockFingerprint($req) {
         return response()->json([
            'title' => 'Phân Tích Sinh Trắc Vân Tay',
            'content' => 'Chủng vân tay Đại Bàng (Whorl) ở ngón cái trái cho thấy tính cách mạnh mẽ, mục tiêu rõ ràng.',
            'details' => [
                'L: Whorl',
                'R: Loop',
                'TFRC: 150 (Cao)'
            ]
        ]);
    }

    private function mockTarot($req) {
        $cards = ['Fool', 'Magician', 'High Priestess', 'Empress', 'Emperor', 'Lovers', 'Chariot', 'Strength', 'Hermit', 'Wheel of Fortune'];
        $draw = $cards[array_rand($cards)];
        return response()->json([
            'title' => 'Lá Bài: The ' . $draw,
            'content' => 'Lá bài này báo hiệu một khởi đầu mới đầy hứa hẹn nhưng cũng cần sự thận trọng. Hãy tin vào trực giác của bạn.',
            'details' => [
                'Vị trí: Hiện tại',
                'Lời khuyên: Hành động ngay',
                'Cảnh báo: Đừng vội vàng'
            ]
        ]);
    }

    private function mockKinhDich($req) {
         return response()->json([
            'title' => 'Quẻ Địa Thiên Thái',
            'content' => 'Quẻ Cát. Thời vận đang lên, mọi việc hanh thông, thuận lợi. Tiểu vãng đại lai.',
            'details' => [
                'Thượng quái: Khôn (Địa)',
                'Hạ quái: Càn (Thiên)',
                'Hào động: Không'
            ]
        ]);
    }

    private function mockXinXam($req) {
         return response()->json([
            'title' => 'Xâm Số 1 - Thượng Thượng',
            'content' => 'Thánh ý ban cho quẻ đại cát. Công danh toại nguyện, gia đạo bình an, bệnh tật tiêu trừ.',
            'details' => [
                'Cầu tài: Đắc lợi',
                'Cầu danh: Thăng tiến',
                'Hôn nhân: Hợp hòa'
            ]
        ]);
    }

    private function mockLaBan($req) {
         return response()->json([
            'title' => 'Hướng Nhà Hợp Tuổi',
            'content' => 'Gia chủ thuộc Đông Tứ Mệnh. Hướng hiện tại là Sinh Khí, rất tốt cho tài lộc và sức khỏe.',
            'details' => [
                'Quái số: 9 (Ly)',
                'Hướng tốt: Đông, Đông Nam',
                'Kỵ: Tây Bắc'
            ]
        ]);
    }

    private function mockThuocLoBan($req) {
        $dim = $req->input('dimension');
        return response()->json([
            'title' => "Kích thước {$dim}cm",
            'content' => 'Cung Tài - Tiến Bảo. Đây là kích thước rất đẹp, mang lại của cải và may mắn.',
            'details' => [
                'Thước 52.2: Đỏ (Tốt)',
                'Thước 42.9: Đỏ (Tốt)',
                'Ý nghĩa: Tiền của đến nhà'
            ]
        ]);
    }

    private function mockBatTrach($req) {
         return response()->json([
            'title' => 'Bát Trạch Minh Kính',
            'content' => 'Cung Phục Vị. Chủ về sự yên ổn, tĩnh tại, có quý nhân phù trợ.',
            'details' => [
                'Sao: Tả Bồ',
                'Hành: Thủy',
                'Cát hung: Tốt vừa'
            ]
        ]);
    }

    // --- DETAILED IMPLEMENTATIONS FOR HIGHLIGHTED SERVICES ---

    private function mockThanSoHoc($req) {
        $date = $req->input('date'); // YYYY-MM-DD
        if (!$date) $number = 10;
        else {
            // Calculate Life Path Number
            $digits = str_split(str_replace('-', '', $date));
            $sum = array_sum($digits);
            while ($sum > 11 && $sum != 22) {
                $sum = array_sum(str_split((string)$sum));
            }
            $number = $sum;
        }

        $meanings = [
            2 => 'Người hòa giải, nhạy cảm và giàu lòng trắc ẩn.',
            3 => 'Người truyền cảm hứng, vui vẻ và sáng tạo.',
            4 => 'Người thực tế, chăm chỉ và đáng tin cậy.',
            5 => 'Người yêu tự do, thích phiêu lưu và đa tài.',
            6 => 'Người chăm sóc, giàu tình yêu thương và trách nhiệm.',
            7 => 'Người tri thức, thích phân tích và đơn độc.',
            8 => 'Người điều hành, mạnh mẽ và tham vọng tài chính.',
            9 => 'Người nhân đạo, bao dung và có lý tưởng lớn.',
            10 => 'Người linh hoạt, dễ thích nghi và được yêu mến.',
            11 => 'Bậc thầy trực giác, tâm linh và nhạy bén.',
            22 => 'Kiến tạo đại lao, người xây dựng những giấc mơ lớn.'
        ];

        $content = $meanings[$number] ?? 'Một con số bí ẩn đầy tiềm năng.';

        return response()->json([
            'title' => "Số Chủ Đạo: {$number}",
            'content' => $content,
            'details' => [
                'Tính cách: ' . ($number % 2 == 0 ? 'Hướng nội, ổn định' : 'Hướng ngoại, năng động'),
                'Nghề nghiệp: ' . ($number == 10 || $number == 8 ? 'Kinh doanh, Quản lý' : 'Nghệ thuật, Giáo dục'),
                'Năm cá nhân 2025: Số ' . (($number + 9) % 9 ?: 9) // Mock calculation
            ],
            'extra_data' => [
                'matrix' => [
                    1 => rand(0,3), 2 => rand(0,2), 3 => rand(0,2),
                    4 => rand(0,1), 5 => rand(0,2), 6 => rand(0,1),
                    7 => rand(0,1), 8 => rand(0,2), 9 => rand(0,3)
                ]
            ]
        ]);
    }

    private function mockSim($req) {
        $phone = $req->input('phone');
        $score = 50;
        
        // Simple mock logic for score
        if (strpos($phone, '68') !== false) $score += 15;
        if (strpos($phone, '79') !== false) $score += 15;
        if (strpos($phone, '88') !== false) $score += 10;
        if (strpos($phone, '99') !== false) $score += 10;
        if (strpos($phone, '49') !== false) $score -= 10;
        if (strpos($phone, '53') !== false) $score -= 10;
        
        $score = min(max($score + rand(-5, 5), 10), 99);

        // Determine Element based on last digit
        $lastDigit = substr($phone, -1);
        $elements = ['Kim', 'Thủy', 'Thổ', 'Mộc', 'Hỏa', 'Thổ', 'Kim', 'Thủy', 'Mộc', 'Hỏa'];
        $element = $elements[$lastDigit] ?? 'Thổ';

        $verdict = $score >= 80 ? 'SIM Đại Cát' : ($score >= 60 ? 'SIM Khá' : 'SIM Bình Thường');

        return response()->json([
            'title' => "Luận SIM: {$phone}",
            'content' => "Số SIM này đạt {$score}/100 điểm. Được đánh giá là {$verdict}. Số đuôi {$lastDigit} thuộc hành {$element}, bổ trợ tốt cho bản mệnh.",
            'details' => [
                "Điểm số: {$score}/100",
                "Ngũ hành: {$element}",
                "Cát hung: {$verdict}"
            ],
            'extra_data' => [
                'lucky_patterns' => $score > 70 ? ['Tài Lộc', 'Sinh Khí'] : ['Bình Hòa']
            ]
        ]);
    }

    private function mockCalendar($req) {
        $date = $req->input('date');
        $lunarDay = rand(1, 29);
        $lunarMonth = rand(1, 12);
        
        $zodiacHours = ['Tí', 'Sửu', 'Mão', 'Ngọ', 'Thân', 'Dậu'];
        $luckyHours = implode(', ', array_rand(array_flip($zodiacHours), 4));

        return response()->json([
            'title' => "Lịch ngày {$date}",
            'content' => "Ngày {$lunarDay} tháng {$lunarMonth} Âm lịch. Ngày Hoàng Đạo (Kim Đường). Rất tốt cho việc xuất hành, cầu tài.",
            'details' => [
                "Âm lịch: {$lunarDay}/{$lunarMonth}",
                "Giờ tốt: {$luckyHours}",
                "Trực: Thành (Mọi việc làm đều tốt)"
            ],
            'extra_data' => [
                'should_do' => ['Cưới hỏi', 'Động thổ', 'Khai trương'],
                'scoid_avoid' => ['Kiện tụng', 'Tranh chấp']
            ]
        ]);
    }
}
