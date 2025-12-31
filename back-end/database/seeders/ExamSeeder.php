<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Exam;
use App\Models\Question;

class ExamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Data derived from ThiChungChi.js
        $examsData = [
            // MỆNH
            [
                'slug' => 'menh-basic',
                'title' => 'Tử Vi Cơ Bản',
                'description' => 'Kiểm tra kiến thức nền tảng về 12 cung, ngũ hành và các sao chính.',
                'level' => 'Cơ bản',
                'category' => 'Mệnh (Destiny)',
                'duration' => 45,
                'passing_score' => 70,
                'prerequisites' => [['slug' => 'tu-vi-nhap-mon', 'label' => 'Tử Vi Nhập Môn']],
                'questions_count' => 30
            ],
            [
                'slug' => 'menh-inter',
                'title' => 'Bát Tự Trung Cấp',
                'description' => 'Phân tích dụng thần, hỷ thần và luận đoán vận hạn cơ bản.',
                'level' => 'Trung cấp',
                'category' => 'Mệnh (Destiny)',
                'duration' => 60,
                'passing_score' => 80,
                'prerequisites' => [
                    ['slug' => 'tu-vi-nhap-mon', 'label' => 'Tử Vi Nhập Môn'],
                    ['slug' => 'bat-tu-can-ban', 'label' => 'Bát Tự Căn Bản']
                ],
                'questions_count' => 40
            ],
            [
                'slug' => 'menh-adv',
                'title' => 'Tổng hợp Mệnh Học',
                'description' => 'Kỳ thi cấp chứng chỉ Đạo sư Mệnh Học danh giá nhất.',
                'level' => 'Cao cấp',
                'category' => 'Mệnh (Destiny)',
                'duration' => 90,
                'passing_score' => 90,
                'prerequisites' => [
                    ['slug' => 'tu-vi-nhap-mon', 'label' => 'Tử Vi Nhập Môn'],
                    ['slug' => 'bat-tu-can-ban', 'label' => 'Bát Tự Căn Bản'],
                    ['slug' => 'nhan-tuong-hien-dai', 'label' => 'Nhân Tướng Học']
                ],
                'questions_count' => 50
            ],

            // TƯỚNG
            [
                'slug' => 'tuong-basic',
                'title' => 'Nhân Tướng Nhập Môn',
                'description' => 'Nhận diện các bộ vị cơ bản trên khuôn mặt và ý nghĩa.',
                'level' => 'Cơ bản',
                'category' => 'Tướng (Physiognomy)',
                'duration' => 40,
                'passing_score' => 70,
                'prerequisites' => [['slug' => 'nhan-tuong-hien-dai', 'label' => 'Nhân Tướng']],
                'questions_count' => 25
            ],
            [
                'slug' => 'tuong-inter',
                'title' => 'Tam Đình Ngũ Nhạc',
                'description' => 'Luận giải chi tiết về Tam Đình, Ngũ Nhạc, Tứ Đậu.',
                'level' => 'Trung cấp',
                'category' => 'Tướng (Physiognomy)',
                'duration' => 55,
                'passing_score' => 80,
                'prerequisites' => [['slug' => 'nhan-tuong-hien-dai', 'label' => 'Nhân Tướng']],
                'questions_count' => 35
            ],
            [
                'slug' => 'tuong-adv',
                'title' => 'Khí Sắc & Thần Thái',
                'description' => 'Kỹ thuật xem khí sắc, thần thái nhận diện cát hung cấp tốc.',
                'level' => 'Cao cấp',
                'category' => 'Tướng (Physiognomy)',
                'duration' => 80,
                'passing_score' => 90,
                'prerequisites' => [['slug' => 'nhan-tuong-hien-dai', 'label' => 'Nhân Tướng']],
                'questions_count' => 45
            ],

            // BỐC
            [
                'slug' => 'boc-basic',
                'title' => 'Tarot 22 Lá Chính',
                'description' => 'Ý nghĩa xuôi ngược của bộ 22 lá Major Arcana.',
                'level' => 'Cơ bản',
                'category' => 'Bốc (Divination)',
                'duration' => 45,
                'passing_score' => 70,
                'prerequisites' => [['slug' => 'tarot-chuyen-sau', 'label' => 'Hành Trình Chàng Khờ']],
                'questions_count' => 30
            ],
            [
                'slug' => 'boc-inter',
                'title' => 'Kinh Dịch 64 Quẻ',
                'description' => 'Hệ thống 64 quẻ Kinh Dịch và cách luận giải cơ bản.',
                'level' => 'Trung cấp',
                'category' => 'Bốc (Divination)',
                'duration' => 65,
                'passing_score' => 80,
                'prerequisites' => [
                    ['slug' => 'kinh-dich-du-doan', 'label' => 'Kinh Dịch Dự Đoán'],
                    ['slug' => 'tarot-chuyen-sau', 'label' => 'Thấu Hiểu Trực Giác']
                ],
                'questions_count' => 40
            ],
            [
                'slug' => 'boc-adv',
                'title' => 'Tổng hợp Bốc Thuật',
                'description' => 'Kết hợp Tarot và Dịch Lý trong tư vấn thực chiến.',
                'level' => 'Cao cấp',
                'category' => 'Bốc (Divination)',
                'duration' => 90,
                'passing_score' => 90,
                'prerequisites' => [
                    ['slug' => 'kinh-dich-du-doan', 'label' => 'Kinh Dịch Dự Đoán'],
                    ['slug' => 'tarot-chuyen-sau', 'label' => 'Thấu Hiểu Trực Giác'],
                    ['slug' => 'tu-vi-nhap-mon', 'label' => 'Tử Vi Nhập Môn']
                ],
                'questions_count' => 50
            ],

            // TRẠCH
            [
                'slug' => 'trach-basic',
                'title' => 'Phong Thủy Cơ Bản',
                'description' => 'Kiến thức về Loan Đầu, Hình Thế và sát khí cơ bản.',
                'level' => 'Cơ bản',
                'category' => 'Trạch (Feng Shui)',
                'duration' => 40,
                'passing_score' => 70,
                'prerequisites' => [['slug' => 'phong-thuy-bat-trach', 'label' => 'Phong Thủy Bát Trạch']],
                'questions_count' => 28
            ],
            [
                'slug' => 'trach-inter',
                'title' => 'Bát Trạch Minh Kính',
                'description' => 'Tính toán Đông/Tây Tứ Trạch, bố trí bếp, giường, ban thờ.',
                'level' => 'Trung cấp',
                'category' => 'Trạch (Feng Shui)',
                'duration' => 60,
                'passing_score' => 80,
                'prerequisites' => [['slug' => 'phong-thuy-bat-trach', 'label' => 'Phong Thủy Bát Trạch']],
                'questions_count' => 38
            ],
            [
                'slug' => 'trach-adv',
                'title' => 'Phi Tinh & La Bàn',
                'description' => 'Huyền Không Phi Tinh và cách sử dụng La Bàn chuyên sâu.',
                'level' => 'Cao cấp',
                'category' => 'Trạch (Feng Shui)',
                'duration' => 85,
                'passing_score' => 90,
                'prerequisites' => [
                    ['slug' => 'phong-thuy-bat-trach', 'label' => 'Phong Thủy Bát Trạch'],
                    ['slug' => 'bat-tu-can-ban', 'label' => 'Bát Tự Căn Bản']
                ],
                'questions_count' => 48
            ],

             // SỐ
            [
                'slug' => 'so-basic',
                'title' => 'Thần Số Pytago',
                'description' => 'Tính toán các chỉ số cơ bản: Đường đời, Sứ mệnh, Linh hồn.',
                'level' => 'Cơ bản',
                'category' => 'Số (Numerology)',
                'duration' => 35,
                'passing_score' => 70,
                'prerequisites' => [['slug' => 'than-so-hoc-pytago', 'label' => 'Con Số Chủ Đạo']],
                'questions_count' => 25
            ],
            [
                'slug' => 'so-inter',
                'title' => 'Biểu Đồ Ngày Sinh',
                'description' => 'Phân tích các mũi tên chỉ cá tính và các con số thiếu.',
                'level' => 'Trung cấp',
                'category' => 'Số (Numerology)',
                'duration' => 50,
                'passing_score' => 80,
                'prerequisites' => [['slug' => 'than-so-hoc-pytago', 'label' => 'Con Số Chủ Đạo']],
                'questions_count' => 35
            ],
            [
                'slug' => 'so-adv',
                'title' => 'Chu Kỳ Vận Mệnh',
                'description' => 'Dự báo năm cá nhân, tháng cá nhân và 4 đỉnh cao cuộc đời.',
                'level' => 'Cao cấp',
                'category' => 'Số (Numerology)',
                'duration' => 75,
                'passing_score' => 90,
                'prerequisites' => [
                    ['slug' => 'than-so-hoc-pytago', 'label' => 'Con Số Chủ Đạo'],
                    ['slug' => 'nhan-tuong-hien-dai', 'label' => 'Nhân Tướng Học']
                ],
                'questions_count' => 45
            ],
        ];

        foreach ($examsData as $data) {
            $exam = Exam::updateOrCreate(
                ['slug' => $data['slug']],
                [
                    'title' => $data['title'],
                    'description' => $data['description'],
                    'level' => $data['level'],
                    'category' => $data['category'],
                    'duration' => $data['duration'],
                    'passing_score' => $data['passing_score'],
                    'prerequisites' => $data['prerequisites']
                ]
            );

            // Generate Mock Questions
            if ($exam->questions()->count() == 0) {
                // Determine a nice topic based on title
                $topic = str_replace(['Cơ Bản', 'Trung Cấp', 'Cao Cấp', 'Nhập Môn'], '', $data['title']);
                
                for ($i = 1; $i <= $data['questions_count']; $i++) {
                    Question::create([
                        'exam_id' => $exam->id,
                        'content' => "Câu hỏi số {$i}: Đâu là ý nghĩa đúng của {$topic} trong trường hợp này?",
                        'options' => [
                            "A" => "Đây là phương án A cho câu hỏi về {$topic}",
                            "B" => "Đây là phương án B (có thể đúng)",
                            "C" => "Đây là phương án C (sai)",
                            "D" => "Đây là phương án D (sai)"
                        ],
                        'correct_answer' => ['A', 'B', 'C', 'D'][array_rand(['A', 'B', 'C', 'D'])],
                        'type' => 'multiple_choice'
                    ]);
                }
            }
        }
    }
}
