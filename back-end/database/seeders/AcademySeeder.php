<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class AcademySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'MỆNH (Destiny)',
                'slug' => 'menh',
                'description' => 'Mệnh lý là học thuyết về chu kỳ và bản tính con người dựa trên thời gian sinh. Khám phá các môn Tử Vi, Bát Tự để thấu hiểu vận mệnh và quản lý hồ sơ người thân hiệu quả.',
                'icon' => '📜',
                'image' => '/images/banners/menh-huyen-thuat.png'
            ],
            [
                'name' => 'TƯỚNG (AI Scanner)',
                'slug' => 'tuong',
                'description' => 'Giải mã ngôn ngữ của hình tướng qua sự kết hợp giữa tri thức cổ xưa và công nghệ AI hiện đại. Phân tích khuôn mặt, chỉ tay để nhận diện tiềm năng và khí sắc.',
                'icon' => '🎭',
                'image' => '/images/banners/tuong-huyen-thuat.png'
            ],
            [
                'name' => 'BỐC (Oracle Tool)',
                'slug' => 'boc',
                'description' => 'Môn học về sự ngẫu nhiên và trực giác. Sử dụng Tarot, Kinh Dịch và các công cụ dự đoán để tìm kiếm câu trả lời cho những băn khoăn trong cuộc sống.',
                'icon' => '🃏',
                'image' => '/images/banners/boc-huyen-thuat.png'
            ],
            [
                'name' => 'TRẠCH (Feng Shui)',
                'slug' => 'trach',
                'description' => 'Khoa học về không gian và môi trường sống. Học cách ứng dụng La Bàn, Thước Lỗ Ban và Bát Trạch để hài hòa năng lượng nơi ở và làm việc.',
                'icon' => '🏮',
                'image' => '/images/banners/trach-huyen-thuat.png'
            ],
            [
                'name' => 'SỐ (Numerology)',
                'slug' => 'so',
                'description' => 'Năng lượng của các con số ảnh hưởng đến định hướng cuộc đời. Tìm hiểu Thần số học Pytago và ứng dụng số học trong đời sống hàng ngày.',
                'icon' => '🔢',
                'image' => '/images/banners/so-huyen-thuat.png'
            ],
        ];

        foreach ($categories as $cat) {
            DB::table('course_categories')->updateOrInsert(['slug' => $cat['slug']], $cat);
        }

        $cats = DB::table('course_categories')->pluck('id', 'slug');

        // --- PREPARE TAROT LESSONS ---
        $tarotCards = DB::table('tarot_cards')->orderBy('id')->get();
        $tarotLessons = [];

        // Video học Tarot nhập môn (Index-based from Playlist)
        $playlistId = 'PLez4BA028nWSkV4Kl3jhIBHJFShNo1DZp';
        $basePlaylist = "https://www.youtube.com/embed/videoseries?list={$playlistId}";

        // 1. Hệ thống 22 lá Ẩn chính (Index 1)
        $tarotLessons[] = [
            'title' => 'Hệ thống 22 lá Ẩn chính',
            'content' => "Bộ Ẩn Chính (Major Arcana) là linh hồn của bộ bài Tarot, bao gồm 22 lá bài được đánh số từ 0 đến 21.\\n\\nChúng đại diện cho những bài học nghiệp quả, những sự kiện trọng đại và hành trình phát triển tâm linh của mỗi con người (Hành trình của The Fool).\\n\\nKhi một lá Ẩn Chính xuất hiện trong trải bài, nó thường ám chỉ những vấn đề lớn, những bước ngoặt quan trọng hoặc những năng lượng chủ đạo đang chi phối cuộc sống của bạn.",
            'video_url' => "{$basePlaylist}&index=1"
        ];

        // 2. 4 Bộ Ẩn phụ: Gậy, Ly, Kiếm, Tiền (Index 2)
        $tarotLessons[] = [
            'title' => '4 Bộ Ẩn phụ: Gậy, Ly, Kiếm, Tiền',
            'content' => "Bộ Ẩn Phụ (Minor Arcana) gồm 56 lá bài, chia làm 4 bộ (Suits), mô tả những khía cạnh đời thường, chi tiết và cụ thể hơn so với Ẩn Chính.\\n\\n🔥 **Bộ Gậy (Wands):** Đại diện cho Lửa. Nói về hành động, đam mê, sự nghiệp, sáng tạo và ý chí.\\n\\n💧 **Bộ Ly (Cups):** Đại diện cho Nước. Nói về cảm xúc, tình yêu, trực giác, và các mối quan hệ.\\n\\n⚔️ **Bộ Kiếm (Swords):** Đại diện cho Khí. Nói về tư duy, trí tuệ, giao tiếp, xung đột và sự thật.\\n\\n💰 **Bộ Tiền (Pentacles):** Đại diện cho Đất. Nói về vật chất, tiền bạc, sức khỏe, công việc và sự ổn định.",
             'video_url' => "{$basePlaylist}&index=2"
        ];

        // 3. Kỹ thuật trải bài và kết nối (Index 3)
        $tarotLessons[] = [
            'title' => 'Kỹ thuật trải bài và kết nối',
            'content' => "Trước khi xem bài, việc kết nối năng lượng với bộ bài là vô cùng quan trọng.\\n\\n**Các bước cơ bản:**\\n1. **Thanh tẩy:** Sử dụng đá thạch anh, xô thơm hoặc đơn giản là gõ nhẹ vào bộ bài để xua tan năng lượng cũ.\\n2. **Tráo bài:** Tập trung vào câu hỏi hoặc vấn đề cần xem. Tráo bài một cách thoải mái cho đến khi bạn cảm thấy 'đủ'.\\n3. **Kinh bài:** Chia bộ bài làm 3 phần và tụ lại, hoặc trải ra theo hình nan quạt để rút.\\n\\nQuan trọng nhất là giữ tâm trí tĩnh lặng và tôn trọng bộ bài.",
             'video_url' => "{$basePlaylist}&index=3"
        ];

        // 4. 22 Lá Ẩn Chính (Major Arcana) - Tổng quan (Index 4)
        $tarotLessons[] = [
            'title' => '22 Lá Ẩn Chính (Major Arcana)',
            'content' => "Trong phần này, chúng ta sẽ đi sâu vào ý nghĩa của từng lá bài trong bộ Ẩn Chính.\\n\\nTừ sự khởi đầu ngây thơ của **The Fool (0)**, qua sự quyền lực của **The Emperor (4)**, sự sụp đổ của **The Tower (16)**, đến sự trọn vẹn của **The World (21)**.\\n\\nMỗi lá bài là một Archetype (nguyên mẫu) tâm lý mà bất kỳ ai cũng sẽ trải qua trong đời.",
             'video_url' => "{$basePlaylist}&index=4"
        ];

         // 5. Trải bài 3 lá cơ bản (Index 5)
        $tarotLessons[] = [
            'title' => 'Trải bài 3 lá cơ bản',
            'content' => "Trải bài 3 lá (Three-Card Spread) là kỹ thuật đơn giản nhưng quyền năng nhất cho người mới bắt đầu.\\n\\n**Các biến thể phổ biến:**\\n- **Quá khứ - Hiện tại - Tương lai:** Giúp nhìn nhận dòng chảy thời gian của sự việc.\\n- **Tình huống - Hành động - Kết quả:** Đưa ra lời khuyên cụ thể cho một vấn đề.\\n- **Bạn - Người ấy - Mối quan hệ:** Dùng trong xem tình cảm.\\n- **Điểm mạnh - Điểm yếu - Lời khuyên:** Dùng để thấu hiểu bản thân.",
             'video_url' => "{$basePlaylist}&index=5"
        ];
        
        // 6. Intro to The Journey (Keep generic playlist or Index 1?)
        // Let's keep it as generic playlist access for now since user only specified first 5 explicitly
        $introVideo = $basePlaylist; 
        $cardVideo = $basePlaylist;

        $tarotLessons[] = [
            'title' => 'Giới thiệu: Hành trình của The Fool',
            'content' => "Chào mừng bạn đến với khóa học Tarot chuyên sâu.\\n\\nTrong khóa học này, chúng ta sẽ cùng nhau đi qua 78 lá bài, từ những bài học lớn của bộ Ẩn Chính (Major Arcana) đến những khía cạnh đời thường của bộ Ẩn Phụ (Minor Arcana).\\n\\nHãy bắt đầu với tâm thế cởi mở và trực giác nhạy bén.",
            'video_url' => $introVideo
        ];

        // 7. Major Arcana Cards
        foreach ($tarotCards->where('group', 'Ẩn Chính') as $card) {
            $desc = json_decode($card->meaning_general)->MoTa ?? '';
            $tarotLessons[] = [
                'title' => "Ẩn Chính: " . $card->name,
                'content' => "[TAROT_CARD:{$card->card_id}] " . $desc,
                'video_url' => $cardVideo
            ];
        }

        // 8. Minor Arcana (Suits)
        $suits = ['Bộ Gậy', 'Bộ Cốc', 'Bộ Kiếm', 'Bộ Tiền'];
        foreach ($suits as $suit) {
             foreach ($tarotCards->where('group', $suit) as $card) {
                $desc = json_decode($card->meaning_general)->MoTa ?? '';
                $tarotLessons[] = [
                    'title' => "{$suit}: " . $card->name,
                    'content' => "[TAROT_CARD:{$card->card_id}] " . $desc,
                    'video_url' => $cardVideo
                ];
             }
        }

        $courses = [
            // MỆNH
            [
                'category_id' => $cats['menh'], 
                'title' => 'Tử Vi Đẩu Số: Nhập Môn Học Đồ', 
                'slug' => 'tu-vi-nhap-mon', 
                'price' => 1497000,
                'summary' => 'Nền tảng về 12 cung bản mệnh, các chính tinh và phụ tinh cơ bản.',
                'level' => 'Cơ bản',
                'lessons' => [
                    ['title' => 'Tổng quan về Tử Vi', 'content' => 'Lịch sử và các trường phái Tử Vi chính.'],
                    ['title' => 'Thập Nhị Cung', 'content' => 'Ý nghĩa 12 cung trên lá số Tử Vi.'],
                    ['title' => 'Lục Thân và Bản Thân', 'content' => 'Mối quan hệ gia đình qua các cung Mệnh, Di, Thê...']
                ]
            ],
            [
                'category_id' => $cats['menh'], 
                'title' => 'Bát Tự Hà Lạc Căn Bản', 
                'slug' => 'bat-tu-can-ban', 
                'price' => 497000,
                'summary' => 'Giải mã vận mệnh qua Thiên Can và Địa Chi của giờ ngày tháng năm sinh.',
                'level' => 'Cơ bản',
                'lessons' => [
                    ['title' => 'Hệ thống Thiên Can Địa Chi', 'content' => 'Học về 10 Can và 12 Chi.'],
                    ['title' => 'Ngũ Hành vượng tướng hưu tù', 'content' => 'Đánh giá năng lượng của các hành theo mùa.'],
                ]
            ],
            // TƯỚNG
            [
                'category_id' => $cats['tuong'], 
                'title' => 'Nhân Tướng Học & AI Scanner', 
                'slug' => 'nhan-tuong-hien-dai', 
                'price' => 199,
                'summary' => 'Học cách nhận diện tính cách qua ngũ quan với sự hỗ trợ của AI.',
                'level' => 'Cơ bản',
                'lessons' => [
                    ['title' => 'Ngũ Quan và Lục Phủ', 'content' => 'Chi tiết về Mắt, Mũi, Tai, Miệng, Lông mày.'],
                    ['title' => 'AI và Diện Tướng', 'content' => 'Cách sử dụng công cụ AI để phân tích tỷ lệ khuôn mặt.'],
                ]
            ],
            // BỐC
            [
                'category_id' => $cats['boc'], 
                'title' => 'Tarot: Hành Trình Chàng Khờ', 
                'slug' => 'tarot-chuyen-sau', 
                'price' => 987000,
                'summary' => 'Làm chủ 22 lá Ẩn chính và kết nối trực giác cá nhân.',
                'level' => 'Trung cấp',
                'lessons' => [] // Will be populated dynamically
            ],
            [
                'category_id' => $cats['boc'], 
                'title' => 'Kinh Dịch: Dự Đoán Cát Hung', 
                'slug' => 'kinh-dich-du-doan', 
                'price' => 0,
                'summary' => 'Tìm hiểu về 64 quẻ dịch và cách gieo quẻ bằng đồng xu.',
                'level' => 'Cơ bản',
                'lessons' => [
                    ['title' => 'Bát Quái và Tiên Thiên', 'content' => '8 đơn quái cơ bản.'],
                    ['title' => 'Phương pháp gieo quẻ', 'content' => 'Thực hành gieo quẻ bằng 3 đồng xu.'],
                ]
            ],
            // TRẠCH
            [
                'category_id' => $cats['trach'], 
                'title' => 'Phong Thủy Bát Trạch Minh Cảnh', 
                'slug' => 'phong-thuy-bat-trach', 
                'price' => 0,
                'summary' => 'Xác định hướng nhà, cung mệnh và cách bố trí vật phẩm hóa giải.',
                'level' => 'Cơ bản',
                'lessons' => [
                    ['title' => 'Đông Tứ Trạch và Tây Tứ Trạch', 'content' => 'Phân nhóm cung mệnh theo hướng.'],
                    ['title' => 'La Bàn và Thước Lỗ Ban', 'content' => 'Công cụ đo đạc trong phong thủy hiện đại.'],
                ]
            ],
            // SỐ
            [
                'category_id' => $cats['so'], 
                'title' => 'Thần Số Học: Con Số Chủ Đạo', 
                'slug' => 'than-so-hoc-pytago', 
                'price' => 150,
                'summary' => 'Khám phá năng lượng của tên gọi và ngày sinh theo hệ thống Pytago.',
                'level' => 'Cơ bản',
                'lessons' => [
                    ['title' => 'Cách tính Chỉ số Đường đời', 'content' => 'Công thức và ý nghĩa các con số từ 2-11.'],
                    ['title' => 'Biểu đồ Ngày sinh', 'content' => 'Phân tích các mũi tên sức mạnh và mũi tên trống.'],
                ]
            ],
        ];

        foreach ($courses as $cData) {
            // Inject Tarot Lessons if it's the Tarot course
            if ($cData['slug'] === 'tarot-chuyen-sau') {
                $cData['lessons'] = $tarotLessons;
            }

            $lessons = $cData['lessons'];
            unset($cData['lessons']);
            
            DB::table('courses')->updateOrInsert(['slug' => $cData['slug']], array_merge($cData, [
                'description' => 'Khóa học chuyên sâu từ Học viện Ngũ Huyền Thuật giúp bạn làm chủ ' . $cData['title'],
                'is_published' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]));

            $actualCourseId = DB::table('courses')->where('slug', $cData['slug'])->value('id');

            foreach ($lessons as $index => $lesson) {
                DB::table('lessons')->updateOrInsert(
                    ['course_id' => $actualCourseId, 'title' => $lesson['title']],
                    array_merge($lesson, [
                        'order' => $index,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ])
                );
            }
        }
    }
}
