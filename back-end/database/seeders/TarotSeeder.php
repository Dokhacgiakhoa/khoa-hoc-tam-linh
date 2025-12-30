<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class TarotSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $json = File::get(database_path('data/tarot.json'));
        $cards = json_decode($json, true);

        foreach ($cards as $card) {
            DB::table('tarot_cards')->updateOrInsert(
                ['card_id' => $card['ID']],
                [
                    'order_index' => $card['SoThuTu'],
                    'name' => $card['Ten'],
                    'group' => $card['Nhom'],
                    'image' => $card['Anh'],
                    'meaning_general' => isset($card['YNghiaChung']) ? json_encode($card['YNghiaChung'], JSON_UNESCAPED_UNICODE) : null,
                    'meaning_upright' => isset($card['NghiaXuoi']) ? json_encode($card['NghiaXuoi'], JSON_UNESCAPED_UNICODE) : null,
                    'meaning_reversed' => isset($card['NghiaNguoc']) ? json_encode($card['NghiaNguoc'], JSON_UNESCAPED_UNICODE) : null,
                    'topics' => isset($card['ChuDe']) ? json_encode($card['ChuDe'], JSON_UNESCAPED_UNICODE) : null,
                    'metadata' => isset($card['Meta']) ? $card['Meta'] : null,
                    'updated_at' => now(),
                ]
            );
        }
    }
}
