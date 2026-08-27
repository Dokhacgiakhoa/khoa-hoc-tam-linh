<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Traits\ApiResponse;
use App\Services\EsotericService;
use App\Services\AstrologyService;
use App\Models\KnowledgeBase;
use App\Models\IChingHexagram;
use App\Helpers\LunarCalendar;
use Illuminate\Http\Request;
use Exception;

class EsotericController extends Controller
{
    use ApiResponse;

    protected $astrologyService;
    protected $esotericService;

    public function __construct(AstrologyService $astrologyService, EsotericService $esotericService)
    {
        $this->astrologyService = $astrologyService;
        $this->esotericService = $esotericService;
    }

    /**
     * Lập lá số Tử vi
     */
    public function lapLaSo(Request $request)
    {
        try {
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
                'Cung Phúc Đức' => ['vũ khúc', 'thiên phủ'],
                'Cung Điền Trạch' => ['thái âm'],
                'Cung Quan Lộc' => ['liêm trinh', 'thiên tướng'],
                'Cung Nô Bộc' => ['cự môn'],
                'Cung Thiên Di' => ['thiên cơ', 'thiên lương'],
                'Cung Tật Ách' => ['phá quân'],
                'Cung Tài Bạch' => ['tử vi', 'thất sát'],
                'Cung Tử Tức' => ['thiên đồng'],
                'Cung Phu Thê' => ['vô chính diệu'],
                'Cung Huynh Đệ' => ['thiên khôi', 'thiên việt'],
            ];

            $interpretations = KnowledgeBase::where('category', 'tuvi')
                ->whereIn('slug', $stars['Cung Mệnh'])
                ->get();

            return $this->successResponse([
                'input' => $data,
                'lunar_date' => $lunar,
                'can_chi' => $canChi,
                'la_so' => $stars,
                'interpretations' => $interpretations,
            ], 'Lá số đã được lập thành công.');
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 400);
        }
    }

    /**
     * Astrology Natal Data (Bản đồ sao)
     */
    public function getNatalData(Request $request)
    {
        try {
            $data = $request->validate([
                'year' => 'required|integer',
                'month' => 'required|integer',
                'day' => 'required|integer',
                'hour' => 'required|integer',
                'min' => 'required|integer',
                'lat' => 'nullable|numeric',
                'lon' => 'nullable|numeric',
                'tzone' => 'nullable|numeric',
            ]);

            $result = $this->astrologyService->getNatalChart($data);
            $signSlug = strtolower($result['sun_sign'] ?? 'aries');
            $interpretation = KnowledgeBase::where('category', 'astrology')
                ->where('slug', $signSlug)
                ->first();

            return $this->successResponse([
                'data' => $result,
                'interpretation' => $interpretation
            ], 'Lập bản đồ sao thành công.');
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 400);
        }
    }

    /**
     * Numerology Calculation (Thần số học mở rộng)
     */
    public function calculateNumerology(Request $request)
    {
        try {
            $request->validate([
                'date' => 'required|date',
                'name' => 'nullable|string',
            ]);

            $dob = $request->input('date');
            $name = $request->input('name', '');

            $result = $this->esotericService->calculateNumerology($dob, $name);
            $lifePath = $result['life_path_number'];

            $interpretation = KnowledgeBase::where('category', 'numerology')
                ->where('slug', 'lp-' . $lifePath)
                ->first();

            $result['knowledge_base'] = $interpretation ? [
                'title' => $interpretation->title,
                'content' => $interpretation->content,
                'metadata' => $interpretation->metadata,
            ] : null;

            return $this->successResponse($result, 'Tính toán Thần số học thành công.');
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 400);
        }
    }

    /**
     * Gieo quẻ Kinh Dịch (I Ching Oracle)
     */
    public function castIChing(Request $request)
    {
        try {
            $result = $this->esotericService->castIChing();
            return $this->successResponse($result, 'Gieo quẻ Kinh Dịch thành công.');
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 400);
        }
    }

    /**
     * Lấy danh sách 64 Quẻ Kinh Dịch
     */
    public function getHexagrams(Request $request)
    {
        try {
            $hexagrams = IChingHexagram::orderBy('hexagram_number', 'asc')->get();
            return $this->successResponse($hexagrams, 'Lấy danh sách quẻ thành công.');
        } catch (Exception $e) {
            return $this->errorResponse($e->getMessage(), 400);
        }
    }
}
