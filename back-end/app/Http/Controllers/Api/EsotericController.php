<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Helpers\LunarCalendar;
use App\Models\KnowledgeBase;
use App\Services\AstrologyService;

class EsotericController extends Controller
{
    protected $astrologyService;

    public function __construct(AstrologyService $astrologyService)
    {
        $this->astrologyService = $astrologyService;
    }

    /**
     * Lập lá số Tử vi
     */
    public function lapLaSo(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'gender' => 'required|string',
            'year' => 'required|integer',
            'month' => 'required|integer',
            'day' => 'required|integer',
            'hour' => 'required|integer',
            'min' => 'required|integer',
        ]);

        $lunar = LunarCalendar::convertSolarToLunar($data['day'], $data['month'], $data['year']);
        $canChi = LunarCalendar::getCanChi($data['year'], $data['month'], $data['day'], $data['hour']);

        $stars = [
            'Cung Mệnh' => ['tu-vi', 'tham-lang'],
            'Cung Phụ Mẫu' => ['thái dương'],
        ];

        $interpretations = KnowledgeBase::where('category', 'tuvi')
            ->whereIn('slug', $stars['Cung Mệnh'])
            ->get();

        return response()->json([
            'success' => true,
            'input' => $data,
            'lunar_date' => $lunar,
            'can_chi' => $canChi,
            'la_so' => $stars,
            'interpretations' => $interpretations,
            'message' => 'Lá số đã được lập thành công.'
        ]);
    }

    /**
     * Astrology Natal Data
     */
    public function getNatalData(Request $request)
    {
        $data = $request->validate([
            'year' => 'required|integer',
            'month' => 'required|integer',
            'day' => 'required|integer',
            'hour' => 'required|integer',
            'min' => 'required|integer',
            'lat' => 'required|numeric',
            'lon' => 'required|numeric',
            'tzone' => 'required|numeric',
        ]);

        $result = $this->astrologyService->getNatalChart($data);
        $signSlug = strtolower($result['sun_sign'] ?? 'aries');
        $interpretation = KnowledgeBase::where('category', 'astrology')
            ->where('slug', $signSlug)
            ->first();

        return response()->json([
            'data' => $result,
            'interpretation' => $interpretation
        ]);
    }

    /**
     * Numerology Calculation
     */
    public function calculateNumerology(Request $request)
    {
        $data = $request->validate([
            'date' => 'required|date'
        ]);

        $dateStr = date('Ymd', strtotime($data['date']));
        $lifePath = $this->calculateLifePath($dateStr);

        $interpretation = KnowledgeBase::where('category', 'numerology')
            ->where('slug', 'lp-' . $lifePath)
            ->first();

        return response()->json([
            'life_path_number' => $lifePath,
            'title' => $interpretation ? $interpretation->title : "Con số $lifePath",
            'interpretation' => $interpretation ? $interpretation->content : "Bản luận giải đang được cập nhật.",
            'metadata' => $interpretation ? $interpretation->metadata : null
        ]);
    }

    private function calculateLifePath($dateStr)
    {
        $sum = array_sum(str_split($dateStr));
        while ($sum > 9 && !in_array($sum, [11, 22, 33])) {
            $sum = array_sum(str_split((string)$sum));
        }
        return $sum;
    }
}
