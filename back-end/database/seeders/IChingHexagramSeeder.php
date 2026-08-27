<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\IChingHexagram;
use Illuminate\Support\Facades\DB;

class IChingHexagramSeeder extends Seeder
{
    public function run(): void
    {
        $hexagrams = [
            [
                'hexagram_number' => 1,
                'name_vi' => 'Thuần Càn (Bát Thuần Càn)',
                'name_chinese' => '乾',
                'pinyin' => 'Qián',
                'upper_trigram' => 'Càn (Trời)',
                'lower_trigram' => 'Càn (Trời)',
                'binary_code' => '111111',
                'general_meaning' => 'Tượng trưng cho Trời, sức mạnh sáng tạo tối thượng, sự cương kiện, hanh thông và phát triển mạnh mẽ.',
                'judgment' => 'Nguyên Hanh Lợi Trinh: Bắt đầu vĩ đại, hanh thông trọn vẹn, thuận theo lẽ phải và giữ vững sự chính trực bền lâu.',
                'image_meaning' => 'Thiên hành kiện, quân tử dĩ tự cường bất tức (Trời vận hành mạnh mẽ không ngừng, người quân tử noi theo đó mà tự lực tự cường, không ngừng vươn lên).',
                'lines_explanation' => [
                    ['line' => 1, 'text' => 'Sơ Cửu: Tiềm long vật dụng (Rồng còn ẩn dưới nước sâu, chớ nên hành động vội vã).'],
                    ['line' => 2, 'text' => 'Cửu Nhị: Hiện long tại điền, lợi kiến đại nhân (Rồng đã xuất hiện ở cánh đồng, lợi về việc gặp bậc đại nhân).'],
                    ['line' => 3, 'text' => 'Cửu Tam: Quân tử chung nhật càn càn, tịch dịch nhược (Người quân tử cả ngày nỗ lực phấn đấu, tối đến vẫn thận trọng).'],
                    ['line' => 4, 'text' => 'Cửu Tứ: Hoặc dược tại uyên, vô cữu (Có khi bay nhảy trên vực sâu, biết thời thế tiến lui thì không có lỗi).'],
                    ['line' => 5, 'text' => 'Cửu Ngũ: Phi long tại thiên, lợi kiến đại nhân (Rồng bay lượn trên trời cao, đạt đến đỉnh cao sự nghiệp, gặp quý nhân).'],
                    ['line' => 6, 'text' => 'Thượng Cửu: Kháng long hữu hối (Rồng bay quá cao sẽ có lúc hối hận, kiêu ngạo ắt chuốc lấy thất bại).']
                ],
                'action_advice' => 'Thời cơ đại cát, tràn đầy năng lượng sáng tạo. Cần giữ đức chính trực, khiêm tốn, tránh kiêu căng tự phụ khi đang ở đỉnh cao.',
                'tags' => ['Trời', 'Cương kiện', 'Khởi đầu', 'Đại cát', 'Lãnh đạo']
            ],
            [
                'hexagram_number' => 2,
                'name_vi' => 'Thuần Khôn (Bát Thuần Khôn)',
                'name_chinese' => '坤',
                'pinyin' => 'Kūn',
                'upper_trigram' => 'Khôn (Đất)',
                'lower_trigram' => 'Khôn (Đất)',
                'binary_code' => '000000',
                'general_meaning' => 'Tượng trưng cho Đất Mẹ, sự nhu thuận, bao dung, nuôi dưỡng muôn loài và tiếp nhận năng lượng sáng tạo.',
                'judgment' => 'Nguyên Hanh, Lợi tẫn mã chi trinh: Đại hanh thông, lợi cho sự chính bền của ngựa cái. Đi trước ắt lạc đường, theo sau ắt được bạn.',
                'image_meaning' => 'Địa thế khôn, quân tử dĩ hậu đức tải vật (Đất có thế nâng đỡ vạn vật, người quân tử lấy đức dày mà bao dung, gánh vác việc đời).',
                'lines_explanation' => [
                    ['line' => 1, 'text' => 'Sơ Lục: Lý sương, kiên băng chí (Giẫm lên sương mai ắt biết băng tuyết sắp đến, nhìn điềm nhỏ đoán việc lớn).'],
                    ['line' => 2, 'text' => 'Lục Nhị: Trực, phương, đại, bất tập vô bất lợi (Ngay thẳng, vuông vắn, rộng lớn, không cần học tập vẫn chẳng có gì bất lợi).'],
                    ['line' => 3, 'text' => 'Lục Tam: Hàm chương khả trinh, hoặc tùng vương sự, vô thành hữu chung (Ngậm tài đức giữ bền, theo việc triều chính không cầu công lao riêng mà kết quả tốt).'],
                    ['line' => 4, 'text' => 'Lục Tứ: Quát nang, vô cữu vô dự (Buộc miệng túi lại, kín đáo giữ mình thì không lỗi lầm cũng không chuốc tiếng tăm phiền toái).'],
                    ['line' => 5, 'text' => 'Lục Ngũ: Hoàng thường, nguyên cát (Áo xiêm màu vàng, điềm đại cát vì đức khiêm tốn và trang nhã).'],
                    ['line' => 6, 'text' => 'Thượng Lục: Long chiến vu dã, kỳ huyết huyền hoàng (Rồng đánh nhau nơi đồng nội, máu chảy đen vàng, cực âm sinh loạn).']
                ],
                'action_advice' => 'Nên dùng sự mềm mỏng, nhẫn nại và lắng nghe để ứng biến. Tránh tranh đoạt vị trí tiên phong; làm hậu thuẫn vững chắc sẽ đạt thành công vang dội.',
                'tags' => ['Đất', 'Nhu thuận', 'Bao dung', 'Nuôi dưỡng', 'Kiên nhẫn']
            ],
            [
                'hexagram_number' => 3,
                'name_vi' => 'Thủy Lôi Truân',
                'name_chinese' => '屯',
                'pinyin' => 'Zhūn',
                'upper_trigram' => 'Khảm (Nước)',
                'lower_trigram' => 'Chấn (Sấm)',
                'binary_code' => '010001',
                'general_meaning' => 'Mầm cây non đang đội đất vươn lên trong giông bão; giai đoạn khởi đầu gian nan trắc trở nhưng ẩn chứa tiềm năng to lớn.',
                'judgment' => 'Nguyên Hanh Lợi Trinh, Vật dụng hữu du vãng, Lợi kiến hầu (Khởi đầu hanh thông nếu bền chí, chớ vội tiến hành việc lớn ngay, lợi về việc gây dựng vây cánh).',
                'image_meaning' => 'Vân lôi Truân, quân tử dĩ kinh luân (Mây nước và sấm sét giao hòa, người quân tử ra sức chỉnh đốn tổ chức và chuẩn bị nội lực).',
                'lines_explanation' => [
                    ['line' => 1, 'text' => 'Sơ Cửu: Bàn hoàn, lợi cư trinh, lợi kiến hầu (Còn do dự ngập ngừng, nên giữ lòng ngay thẳng, tìm người trợ giúp).'],
                    ['line' => 2, 'text' => 'Lục Nhị: Truân như chuyên như, ban mã như (Khó khăn dồn dập, xe ngựa dùng dằng, giữ trinh tiết thì mười năm sau ắt thành).'],
                    ['line' => 3, 'text' => 'Lục Tam: Tức lộc vô ngu, duy nhập vu lâm trung (Đuổi hươu không người dẫn đường, lạc vào rừng sâu, người trí thức nên dừng lại).'],
                    ['line' => 4, 'text' => 'Lục Tứ: Thừa mã ban như, cầu hôn cấu, vãng cát vô bất lợi (Ngựa đi dùng dằng, cầu tìm sự kết giao tốt đẹp, tiến hành ắt cát tường).'],
                    ['line' => 5, 'text' => 'Cửu Ngũ: Truân kỳ cao, tiểu trinh cát, đại trinh hung (Ân trạch chưa thấm sâu, việc nhỏ thì tốt, việc lớn hấp tấp thì xấu).'],
                    ['line' => 6, 'text' => 'Thượng Lục: Thừa mã ban như, khấp huyết liên như (Cưỡi ngựa dùng dằng, lệ máu tuôn rơi, gian nan đến cùng cực nên tìm đường thoát).']
                ],
                'action_advice' => 'Khởi đầu khó khăn là quy luật tất yếu. Đừng nản lòng, hãy tích lũy nội lực, tìm kiếm đồng minh và chờ đợi thời điểm chín muồi.',
                'tags' => ['Khởi nghiệp', 'Gian nan', 'Tiềm năng', 'Nhẫn nại', 'Chờ thời']
            ],
            [
                'hexagram_number' => 4,
                'name_vi' => 'Sơn Thủy Mông',
                'name_chinese' => '蒙',
                'pinyin' => 'Méng',
                'upper_trigram' => 'Cấn (Núi)',
                'lower_trigram' => 'Khảm (Nước)',
                'binary_code' => '010010',
                'general_meaning' => 'Tượng dòng suối chảy dưới chân núi chưa tìm thấy lối ra; đại diện cho sự ngây thơ, mông muội cần được khai sáng học hỏi.',
                'judgment' => 'Hanh. Phỉ ngã cầu đồng mông, đồng mông cầu ngã. Sơ phệ cáo, tái tam độc, độc tắc bất cáo (Hanh thông. Không phải ta cầu kẻ mông muội mà kẻ mông muội đến cầu học hỏi ta. Thành tâm thì chỉ dạy, bất kính hỏi đi hỏi lại thì không dạy).',
                'image_meaning' => 'Sơn hạ xuất tuyền, Mông; quân tử dĩ quả hành dục đức (Dưới chân núi suối phun trào, người quân tử quyết đoán hành động để bồi dưỡng đức tính).',
                'lines_explanation' => [
                    ['line' => 1, 'text' => 'Sơ Lục: Phát mông, lợi dụng hình nhân, dĩ khuyết cốc (Mở mang mông muội, dùng kỷ luật để răn đe thói xấu).'],
                    ['line' => 2, 'text' => 'Cửu Nhị: Bao mông cát, nạp phụ cát, tử khắc gia (Bao dung kẻ mông muội thì tốt lành, lấy được vợ hiền quán xuyến gia đình).'],
                    ['line' => 3, 'text' => 'Lục Tam: Vật dụng thủ nữ, kiến kim phu, bất hữu cung (Chớ lấy người con gái thấy kẻ giàu có liền quên mất nết na).'],
                    ['line' => 4, 'text' => 'Lục Tứ: Khốn mông, lận (Bị giam hãm trong sự mông muội, đáng tiếc hận).'],
                    ['line' => 5, 'text' => 'Lục Ngũ: Đồng mông, cát (Sự ngây thơ chân thật, biết khiêm tốn cầu học thì tốt lành).'],
                    ['line' => 6, 'text' => 'Thượng Cửu: Kích mông, bất lợi vi khấu, lợi ngự khấu (Đánh phá sự mông muội, chớ làm điều bạo ngược mà nên phòng ngừa sai lầm).']
                ],
                'action_advice' => 'Cần tôn sư trọng đạo, khiêm tốn học hỏi người đi trước. Tránh bảo thủ tự phụ khi kiến thức và kinh nghiệm còn non trẻ.',
                'tags' => ['Khai sáng', 'Học tập', 'Tôn sư', 'Kiến thức', 'Khiêm tốn']
            ],
            [
                'hexagram_number' => 11,
                'name_vi' => 'Địa Thiên Thái',
                'name_chinese' => '泰',
                'pinyin' => 'Tài',
                'upper_trigram' => 'Khôn (Đất)',
                'lower_trigram' => 'Càn (Trời)',
                'binary_code' => '111000',
                'general_meaning' => 'Khí Trời giáng xuống giao hòa cùng Đất Mẹ bốc lên; âm dương hòa hợp, thái bình thịnh trị, vạn sự hanh thông như ý.',
                'judgment' => 'Tiểu vãng đại lai, cát hanh: Kẻ tiểu nhân lùi xa, người quân tử tiến tới, điềm lành lớn, mọi việc hanh thông rực rỡ.',
                'image_meaning' => 'Thiên địa giao Thái, hậu dĩ tài thành thiên địa chi đạo (Trời Đất giao cảm sinh cảnh Thái bình, đấng minh quân thuận theo đạo trời đất mà làm lợi cho muôn dân).',
                'lines_explanation' => [
                    ['line' => 1, 'text' => 'Sơ Cửu: Bạt mao như, dĩ kỳ vĩ, chinh cát (Nhổ cỏ tranh kéo theo cả rễ, cùng bè bạn đồng lòng tiến lên thì tốt lành).'],
                    ['line' => 2, 'text' => 'Cửu Nhị: Bao hoang, dụng bằng hà, bất hà di, bằng vong, đắc thượng vu trung hành (Bao dung kẻ thô lỗ, quả cảm lội sông, không quên người xa, không bè phái, giữ đạo trung dung).'],
                    ['line' => 3, 'text' => 'Cửu Tam: Vô bình bất bì, vô vãng bất phục, gian trinh vô cữu (Chẳng có đất phẳng nào không dốc, chẳng có đi mà không có lại, giữ lòng kiên định thì không lỗi).'],
                    ['line' => 4, 'text' => 'Lục Tứ: Phiên phiên, bất phú dĩ kỳ lân, bất giới dĩ phu (Bay lượn nhẹ nhàng, không cậy giàu sang mà hòa đồng cùng hàng xóm).'],
                    ['line' => 5, 'text' => 'Lục Ngũ: Đế Ất quy muội, dĩ chỉ nguyên cát (Vua Đế Ất gả em gái, được hạnh phúc trọn vẹn và đại cát).'],
                    ['line' => 6, 'text' => 'Thượng Lục: Thành phục vu hoàng, vật dụng sư (Thành lũy sụp đổ xuống hào rãnh, thời thịnh sắp suy, chớ dấy động binh đao).']
                ],
                'action_advice' => 'Thời vận đại cát hanh thông, công việc kinh doanh và tình cảm đều thuận lợi. Hãy tận dụng thời cơ để mở rộng và liên kết đối tác.',
                'tags' => ['Thịnh vượng', 'Thái bình', 'Hòa hợp', 'Đại cát', 'Thành công']
            ],
            [
                'hexagram_number' => 12,
                'name_vi' => 'Thiên Địa Bĩ',
                'name_chinese' => '否',
                'pinyin' => 'Pǐ',
                'upper_trigram' => 'Càn (Trời)',
                'lower_trigram' => 'Khôn (Đất)',
                'binary_code' => '000111',
                'general_meaning' => 'Trời ở trên cao ngạo, Đất ở dưới thấp; âm dương bế tắc không giao hòa; thời kỳ thoái trào, tiểu nhân đắc chí, quân tử ẩn nhẫn.',
                'judgment' => 'Bĩ chi phỉ nhân, bất lợi quân tử trinh, đại vãng tiểu lai (Thời Bĩ không phải lúc người quân tử hành sự, đại đạo suy vi, tiểu nhân lấn lướt).',
                'image_meaning' => 'Thiên địa bất giao, Bĩ; quân tử dĩ kiệm đức tị nan (Trời Đất không giao cảm, người quân tử thu mình tiết kiệm đức hạnh để tránh tai họa).',
                'lines_explanation' => [
                    ['line' => 1, 'text' => 'Sơ Lục: Bạt mao như, dĩ kỳ vĩ, trinh cát hanh (Nhổ cỏ kéo cả rễ, cùng nhau ẩn nhẫn giữ bền đạo nghĩa thì lành).'],
                    ['line' => 2, 'text' => 'Lục Nhị: Bao thừa, tiểu nhân cát, hanh; đại nhân bĩ (Bợ đỡ kẻ quyền thế, tiểu nhân được lợi, người quân tử nên kiên nhẫn chịu gian nan).'],
                    ['line' => 3, 'text' => 'Lục Tam: Bao tu (Ôm giữ nỗi hổ thẹn vì theo kẻ xấu).'],
                    ['line' => 4, 'text' => 'Cửu Tứ: Hữu mệnh vô cữu, trù ly chỉ (Vâng mệnh trời sửa đổi thì không lỗi, bạn bè cùng hưởng phúc).'],
                    ['line' => 5, 'text' => 'Cửu Ngũ: Hưu bĩ, đại nhân cát. Kỳ vong kỳ vong, hệ vu bao tang (Chấm dứt thời bế tắc, bậc đại nhân gặp cát tường. Luôn lo sợ mất thì giữ được bền vững như buộc vào gốc dâu).'],
                    ['line' => 6, 'text' => 'Thượng Cửu: Khuynh bĩ, tiên bĩ hậu hỷ (Lật đổ thời Bĩ, trước bế tắc sau ắt vui mừng đại hỷ).']
                ],
                'action_advice' => 'Thời điểm nên phòng thủ, bảo toàn lực lượng, trau dồi tri thức. Không nên đầu tư mạo hiểm hay dấn thân vào các cuộc tranh chấp.',
                'tags' => ['Bế tắc', 'Ẩn nhẫn', 'Phòng thủ', 'Thận trọng', 'Chờ chuyển vận']
            ]
        ];

        foreach ($hexagrams as $data) {
            IChingHexagram::updateOrCreate(
                ['hexagram_number' => $data['hexagram_number']],
                $data
            );
        }
    }
}
