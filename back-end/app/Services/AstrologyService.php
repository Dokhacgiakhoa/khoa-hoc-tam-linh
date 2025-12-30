<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class AstrologyService
{
    protected $baseUrl = 'https://api.freeastrologyapi.com/v1';
    protected $apiKey;

    public function __construct()
    {
        // Bạn cần thay key này bằng key thật khi deploy
        $this->apiKey = env('ASTROLOGY_API_KEY', 'default_mock_key');
    }

    /**
     * Lấy dữ liệu Bản đồ sao (Natal Planet Positions)
     */
    public function getNatalChart($data)
    {
        // Giả sử API yêu cầu các tham số: year, month, day, hour, min, lat, lon, tzone
        $response = Http::withHeaders([
            'x-api-key' => $this->apiKey,
            'Content-Type' => 'application/json'
        ])->post($this->baseUrl . '/natal-planetary-positions', [
            'year' => (int)$data['year'],
            'month' => (int)$data['month'],
            'day' => (int)$data['day'],
            'hour' => (int)$data['hour'],
            'min' => (int)$data['min'],
            'lat' => (float)$data['lat'],
            'lon' => (float)$data['lon'],
            'tzone' => (float)$data['tzone'],
        ]);

        return $response->json();
    }

    /**
     * Lấy hình ảnh biểu đồ SVG
     */
    public function getWheelChart($data)
    {
        $response = Http::withHeaders([
            'x-api-key' => $this->apiKey,
            'Content-Type' => 'application/json'
        ])->post($this->baseUrl . '/natal-wheel-chart', [
            'year' => (int)$data['year'],
            'month' => (int)$data['month'],
            'day' => (int)$data['day'],
            'hour' => (int)$data['hour'],
            'min' => (int)$data['min'],
            'lat' => (float)$data['lat'],
            'lon' => (float)$data['lon'],
            'tzone' => (float)$data['tzone'],
        ]);

        return $response->json();
    }
}
