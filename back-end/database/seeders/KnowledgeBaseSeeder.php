<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\KnowledgeBase;

class KnowledgeBaseSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            // === THẦN SỐ HỌC ===
            [
                'category' => 'numerology',
                'type' => 'lifepath',
                'slug' => 'lp-1',
                'title' => 'Số Chủ Đạo 1: Nhà Lãnh Đạo Tiên Phong',
                'content' => 'Người mang số 1 là những người có tố chất lãnh đạo bẩm sinh. Họ độc lập, tự tin và có ý chí sắt đá. Họ luôn muốn là người dẫn đầu và không ngại khai phá những con đường mới.',
                'metadata' => json_encode(['strengths' => ['Tự quyết', 'Sáng tạo'], 'weaknesses' => ['Cái tôi cao', 'Nóng nảy']])
            ],
            [
                'category' => 'numerology',
                'type' => 'lifepath',
                'slug' => 'lp-2',
                'title' => 'Số Chủ Đạo 2: Người Hòa Giải Nhạy Cảm',
                'content' => 'Số 2 là đại diện cho sự hòa hợp, trực giác và kết nối. Bạn là người lắng nghe tuyệt vời và có khả năng xoa dịu các xung đột.',
                'metadata' => json_encode(['strengths' => ['Thấu cảm', 'Kiên nhẫn'], 'weaknesses' => ['Dễ bị tổn thương', 'Do dự']])
            ],
            [
                'category' => 'numerology',
                'type' => 'lifepath',
                'slug' => 'lp-3',
                'title' => 'Số Chủ Đạo 3: Nhà Truyền Cảm Hứng',
                'content' => 'Trí tuệ, khả năng giao tiếp và sự lạc quan là vũ khí của bạn. Bạn sinh ra để tỏa sáng và mang lại niềm vui cho mọi người qua nghệ thuật hoặc lời nói.',
                'metadata' => json_encode(['strengths' => ['Hoạt ngôn', 'Sáng tạo'], 'weaknesses' => ['Thiếu tập trung', 'Nông nổi']])
            ],
            [
                'category' => 'numerology',
                'type' => 'lifepath',
                'slug' => 'lp-7',
                'title' => 'Số Chủ Đạo 7: Người Tìm Kiếm Chân Lý',
                'content' => 'Bạn là người có trí tuệ sâu sắc, thích chiêm nghiệm và khám phá những bí ẩn của cuộc đời. Bạn có xu hướng tự học và có đức tin mạnh mẽ.',
                'metadata' => json_encode(['strengths' => ['Phân tích', 'Tâm linh'], 'weaknesses' => ['Khép kín', 'Khắt khe']])
            ],

            // === CHIÊM TINH (ASTROLOGY) ===
            [
                'category' => 'astrology',
                'type' => 'sign',
                'slug' => 'aries',
                'title' => 'Cung Bạch Dương (Aries)',
                'content' => 'Bạch Dương là cung đầu tiên, đại diện cho sức sống mãnh liệt, đam mê và sự dũng cảm. Bạn luôn sẵn sàng hành động nhanh chóng.',
                'metadata' => json_encode(['element' => 'Fire', 'symbol' => 'Ram'])
            ],
            [
                'category' => 'astrology',
                'type' => 'house',
                'slug' => 'house-1',
                'title' => 'Nhà 1: Nhà của Bản Thân',
                'content' => 'Nhà 1 đại diện cho diện mạo, cá tính bên ngoài và cách người khác nhìn nhận bạn ngay từ cái nhìn đầu tiên.',
                'metadata' => json_encode(['ruler' => 'Mars'])
            ],

            // === TỬ VI (VIETNAMESE HOROSCOPE) ===
            [
                'category' => 'tuvi',
                'type' => 'star',
                'slug' => 'tu-vi',
                'title' => 'Sao Tử Vi (Đế Tinh)',
                'content' => 'Sao Tử Vi là ngôi sao quyền lực nhất, chủ về sự uy quyền, phúc lộc và quản lý. Người có Tử Vi tại cung Mệnh thường có tư chất lãnh đạo.',
                'metadata' => json_encode(['rank' => '1', 'element' => 'Thổ'])
            ],
            [
                'category' => 'tuvi',
                'type' => 'star',
                'slug' => 'tham-lang',
                'title' => 'Sao Tham Lang (Đào Hoa Tinh)',
                'content' => 'Tham Lang chủ về dục vọng, nghệ thuật và sự khéo léo. Nếu ở trạng thái tốt, nó mang lại sự thông minh và tài hoa.',
                'metadata' => json_encode(['rank' => 'Main', 'element' => 'Thủy'])
            ],
        ];

        foreach ($data as $item) {
            KnowledgeBase::updateOrCreate(['slug' => $item['slug']], $item);
        }
    }
}
