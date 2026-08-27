<?php

namespace App\Services;

use App\Models\IChingHexagram;
use Illuminate\Support\Facades\DB;
use Exception;

class EsotericService
{
    /**
     * Thuật toán Thần Số Học Pythagoras (Numerology)
     */
    public function calculateNumerology(string $dob, string $fullName = ''): array
    {
        // Phân tích ngày sinh YYYY-MM-DD
        $parts = explode('-', $dob);
        if (count($parts) !== 3) {
            throw new Exception('Định dạng ngày sinh không hợp lệ (cần YYYY-MM-DD)');
        }

        $year = (int)$parts[0];
        $month = (int)$parts[1];
        $day = (int)$parts[2];

        // 1. Tính Số Chủ Đạo (Life Path Number)
        $sumDigits = function ($num) {
            $sum = 0;
            while ($num > 0) {
                $sum += $num % 10;
                $num = (int)($num / 10);
            }
            return $sum;
        };

        $reduceToSingle = function ($num) use (&$reduceToSingle, $sumDigits) {
            if ($num === 11 || $num === 22 || $num === 33) {
                return $num; // Master Numbers
            }
            if ($num < 10) {
                return $num;
            }
            return $reduceToSingle($sumDigits($num));
        };

        $sumDay = $reduceToSingle($sumDigits($day));
        $sumMonth = $reduceToSingle($sumDigits($month));
        $sumYear = $reduceToSingle($sumDigits($year));
        $lifePathNumber = $reduceToSingle($sumDay + $sumMonth + $sumYear);

        // 2. Biểu đồ ngày sinh (Birth Chart Matrix 3x3)
        $chartCount = array_fill(1, 9, 0);
        $dobString = sprintf('%02d%02d%04d', $day, $month, $year);
        for ($i = 0; $i < strlen($dobString); $i++) {
            $d = (int)$dobString[$i];
            if ($d >= 1 && $d <= 9) {
                $chartCount[$d]++;
            }
        }

        // 3. Kim tự tháp 4 đỉnh cao (Pinnacles)
        $peak1 = $reduceToSingle($sumDay + $sumMonth);
        $peak2 = $reduceToSingle($sumDay + $sumYear);
        $peak3 = $reduceToSingle($peak1 + $peak2);
        $peak4 = $reduceToSingle($sumMonth + $sumYear);

        $age1 = 36 - $lifePathNumber;
        $age2 = $age1 + 9;
        $age3 = $age2 + 9;
        $age4 = $age3 + 9;

        // Mô tả số chủ đạo
        $lifePathMeanings = [
            1 => ['title' => 'Nhà Lãnh Đạo Tiên Phong', 'desc' => 'Tự chủ, quyết đoán, độc lập, có năng lực lãnh đạo và tiên phong mở đường.'],
            2 => ['title' => 'Sứ Giả Hòa Bình & Trực Giác', 'desc' => 'Nhạy cảm, giàu lòng trắc ẩn, yêu hòa bình, có khả năng kết nối và hòa giải xuất sắc.'],
            3 => ['title' => 'Nghệ Sĩ Biểu Đạt & Sáng Tạo', 'desc' => 'Hoạt ngôn, sáng tạo nghệ thuật, truyền cảm hứng, vui vẻ và thích giao tiếp.'],
            4 => ['title' => 'Bậc Thầy Kiến Tạo & Kỷ Luật', 'desc' => 'Thực tế, vững chãi, tổ chức kỷ luật cao, tỉ mỉ và đáng tin cậy trong mọi việc.'],
            5 => ['title' => 'Nhà Thám Hiểm Tự Do & Đột Phá', 'desc' => 'Yêu tự do, thích phiêu lưu, linh hoạt thích nghi, tràn đầy năng lượng và tài hoa.'],
            6 => ['title' => 'Người Chăm Sóc & Tình Yêu Thương', 'desc' => 'Giàu trách nhiệm, yêu gia đình, bao dung, có khiếu thẩm mỹ và phụng sự cộng đồng.'],
            7 => ['title' => 'Nhà Thông Thái & Triết Học', 'desc' => 'Thích chiêm nghiệm, tìm kiếm chân lý, trực giác tâm linh sâu sắc, tư duy phân tích sắc bén.'],
            8 => ['title' => 'Bậc Thầy Quyền Lực & Tài Chính', 'desc' => 'Độc lập, tham vọng, có khả năng quản lý tài chính xuất chúng, bản lĩnh thương trường.'],
            9 => ['title' => 'Nhà Nhân Đạo & Lý Tưởng Cao Đẹp', 'desc' => 'Bác ái, trách nhiệm xã hội, có lý tưởng cao cả, sẵn sàng cống hiến vì nhân loại.'],
            11 => ['title' => 'Bậc Thầy Trực Giác (Master 11)', 'desc' => 'Năng lượng tâm linh cực cao, trực giác siêu phàm, nhạy bén và có sứ mệnh dẫn dắt tinh thần.'],
            22 => ['title' => 'Bậc Thầy Kiến Tạo Thế Giới (Master 22)', 'desc' => 'Khả năng biến ước mơ vĩ đại thành hiện thực, tư duy tầm vóc quốc tế và xây dựng hệ thống bền vững.'],
            33 => ['title' => 'Bậc Thầy Khai Sáng & Chữa Lành (Master 33)', 'desc' => 'Năng lượng tình yêu thương thuần khiết, vị tha tối thượng, chữa lành và nâng đỡ tâm hồn con người.']
        ];

        return [
            'life_path_number' => $lifePathNumber,
            'life_path_info' => $lifePathMeanings[$lifePathNumber] ?? $lifePathMeanings[1],
            'birth_chart' => $chartCount,
            'pinnacles' => [
                ['peak' => 1, 'number' => $peak1, 'age_milestone' => "Từ 0 - {$age1} tuổi"],
                ['peak' => 2, 'number' => $peak2, 'age_milestone' => "Từ {$age1} - {$age2} tuổi"],
                ['peak' => 3, 'number' => $peak3, 'age_milestone' => "Từ {$age2} - {$age3} tuổi"],
                ['peak' => 4, 'number' => $peak4, 'age_milestone' => "Từ {$age3} - {$age4} tuổi"],
            ],
            'calculated_at' => now()->toIso8601String()
        ];
    }

    /**
     * Thuật toán Gieo Quẻ Kinh Dịch (I Ching Oracle)
     */
    public function castIChing(): array
    {
        // Gieo 3 đồng xu 6 lần (Hào 1 đến Hào 6)
        $lines = [];
        $binaryBase = '';
        $binaryChanged = '';
        $movingLines = [];

        for ($i = 1; $i <= 6; $i++) {
            // Mỗi đồng xu: 2 (Sấp) hoặc 3 (Ngửa)
            $c1 = rand(0, 1) === 0 ? 2 : 3;
            $c2 = rand(0, 1) === 0 ? 2 : 3;
            $c3 = rand(0, 1) === 0 ? 2 : 3;
            $sum = $c1 + $c2 + $c3;

            $isMoving = false;
            $baseBit = '0';
            $changedBit = '0';
            $type = '';

            switch ($sum) {
                case 6: // Lão Âm -> Biến Dương
                    $baseBit = '0';
                    $changedBit = '1';
                    $isMoving = true;
                    $type = 'Lão Âm (Hào Âm Động)';
                    $movingLines[] = $i;
                    break;
                case 7: // Thiếu Dương -> Tĩnh
                    $baseBit = '1';
                    $changedBit = '1';
                    $type = 'Thiếu Dương (Hào Dương Tĩnh)';
                    break;
                case 8: // Thiếu Âm -> Tĩnh
                    $baseBit = '0';
                    $changedBit = '0';
                    $type = 'Thiếu Âm (Hào Âm Tĩnh)';
                    break;
                case 9: // Lão Dương -> Biến Âm
                    $baseBit = '1';
                    $changedBit = '0';
                    $isMoving = true;
                    $type = 'Lão Dương (Hào Dương Động)';
                    $movingLines[] = $i;
                    break;
            }

            $binaryBase = $baseBit . $binaryBase;
            $binaryChanged = $changedBit . $binaryChanged;

            $lines[] = [
                'line_number' => $i,
                'sum_score' => $sum,
                'type' => $type,
                'is_moving' => $isMoving,
                'base_state' => $baseBit === '1' ? 'Dương' : 'Âm',
                'changed_state' => $changedBit === '1' ? 'Dương' : 'Âm',
            ];
        }

        // Tìm Quẻ Chủ và Quẻ Biến trong Database
        $primaryHexagram = IChingHexagram::where('binary_code', $binaryBase)->first();
        $changedHexagram = !empty($movingLines) ? IChingHexagram::where('binary_code', $binaryChanged)->first() : null;

        return [
            'lines' => $lines,
            'moving_lines' => $movingLines,
            'primary_hexagram' => $primaryHexagram ?? [
                'hexagram_number' => 1,
                'name_vi' => 'Thuần Càn',
                'general_meaning' => 'Cương kiện hanh thông'
            ],
            'changed_hexagram' => $changedHexagram,
            'has_changed_hexagram' => !empty($movingLines) && $changedHexagram !== null,
        ];
    }
}
