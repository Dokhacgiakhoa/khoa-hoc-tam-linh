<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class LocalizeTarotCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'tarot:localize';
    protected $description = 'Cập nhật tên tiếng Việt cho 78 lá bài Tarot';

    public function handle()
    {
        $jsonPath = base_path('database/data/tarot.json');
        if (!file_exists($jsonPath)) {
            $this->error("Không tìm thấy file tarot.json");
            return;
        }

        $tarotData = json_decode(file_get_contents($jsonPath), true);
        
        $mapping = [
            // Major
            "0-the-fool" => ["Ten" => "Chàng Khờ (The Fool)", "Nhom" => "Ẩn Chính"],
            "1-the-magician" => ["Ten" => "Pháp Sư (The Magician)", "Nhom" => "Ẩn Chính"],
            "2-the-high-priestess" => ["Ten" => "Nữ Đại Tư Tế (The High Priestess)", "Nhom" => "Ẩn Chính"],
            "3-the-empress" => ["Ten" => "Nữ Hoàng (The Empress)", "Nhom" => "Ẩn Chính"],
            "4-the-emperor" => ["Ten" => "Hoàng Đế (The Emperor)", "Nhom" => "Ẩn Chính"],
            "5-the-hierophant" => ["Ten" => "Tư Tế (The Hierophant)", "Nhom" => "Ẩn Chính"],
            "6-the-lovers" => ["Ten" => "Tình Nhân (The Lovers)", "Nhom" => "Ẩn Chính"],
            "7-the-chariot" => ["Ten" => "Cỗ Xe Chiến Thắng (The Chariot)", "Nhom" => "Ẩn Chính"],
            "8-the-strength" => ["Ten" => "Sức Mạnh (Strength)", "Nhom" => "Ẩn Chính"],
            "9-the-hermit" => ["Ten" => "Ẩn Sĩ (The Hermit)", "Nhom" => "Ẩn Chính"],
            "10-wheel-of-fortune" => ["Ten" => "Bánh Xe Số Phận (Wheel of Fortune)", "Nhom" => "Ẩn Chính"],
            "11-justice" => ["Ten" => "Công Lý (Justice)", "Nhom" => "Ẩn Chính"],
            "12-the-hanged-man" => ["Ten" => "Người Treo (The Hanged Man)", "Nhom" => "Ẩn Chính"],
            "13-death" => ["Ten" => "Cái Chết (Death)", "Nhom" => "Ẩn Chính"],
            "14-temperance" => ["Ten" => "Tiết Chế (Temperance)", "Nhom" => "Ẩn Chính"],
            "15-the-devil" => ["Ten" => "Ác Quỷ (The Devil)", "Nhom" => "Ẩn Chính"],
            "16-the-tower" => ["Ten" => "Tòa Tháp (The Tower)", "Nhom" => "Ẩn Chính"],
            "17-the-star" => ["Ten" => "Ngôi Sao (The Star)", "Nhom" => "Ẩn Chính"],
            "18-the-moon" => ["Ten" => "Mặt Trăng (The Moon)", "Nhom" => "Ẩn Chính"],
            "19-the-sun" => ["Ten" => "Mặt Trời (The Sun)", "Nhom" => "Ẩn Chính"],
            "20-judgement" => ["Ten" => "Phán Xét (Judgement)", "Nhom" => "Ẩn Chính"],
            "21-the-world" => ["Ten" => "Thế Giới (The World)", "Nhom" => "Ẩn Chính"],
        ];

        // Minor mapping pattern
        $suits = [
            'wands' => ['Ten' => 'Gậy', 'Nhom' => 'Bộ Gậy'],
            'cups' => ['Ten' => 'Cốc', 'Nhom' => 'Bộ Cốc'],
            'swords' => ['Ten' => 'Kiếm', 'Nhom' => 'Bộ Kiếm'],
            'pentacles' => ['Ten' => 'Tiền', 'Nhom' => 'Bộ Tiền']
        ];

        $ranks = [
            'ace' => 'Át',
            '2' => '2', '3' => '3', '4' => '4', '5' => '5',
            '6' => '6', '7' => '7', '8' => '8', '9' => '9', '10' => '10',
            'page' => 'Nhóc',
            'knight' => 'Hiệp Sĩ',
            'queen' => 'Hoàng Hậu',
            'king' => 'Đức Vua'
        ];

        foreach ($tarotData as &$card) {
            $id = $card['ID'];
            if (isset($mapping[$id])) {
                $card['Ten'] = $mapping[$id]['Ten'];
                $card['Nhom'] = $mapping[$id]['Nhom'];
            } else {
                foreach ($suits as $suitKey => $suitVal) {
                    if (str_contains(strtolower($id), $suitKey)) {
                        foreach ($ranks as $rankKey => $rankVal) {
                            if (str_starts_with(strtolower($id), $rankKey)) {
                                $englishName = ucwords(str_replace('-', ' ', $id));
                                $card['Ten'] = "{$rankVal} {$suitVal['Ten']} ({$englishName})";
                                $card['Nhom'] = $suitVal['Nhom'];
                                break 2;
                            }
                        }
                    }
                }
            }
        }

        file_put_contents($jsonPath, json_encode($tarotData, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
        $this->info("Đã cập nhật tarot.json sang tiếng Việt.");
        
        // Refresh database
        $this->call('migrate:fresh', ['--seed' => true]);
        $this->info("Đã cập nhật Database thành công.");
    }
}
