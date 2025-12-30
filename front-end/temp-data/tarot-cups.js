// src/data/tarot-cups.js

const TAROT_CUPS = [
  {
    ID: "ace-of-cups",
    SoThuTu: 1,
    Ten: "Ace of Cups",
    Nhom: "Cups",
    Anh: "/images/tarot-cards/cups/ace-of-cups.png",
    YNghiaChung: {
      MoTa: "Cảm xúc mới, tình yêu mới, kết nối mới, trái tim mở. Lá Át của tình cảm.",
      TuKhoa: [
        "tình yêu mới",
        "trái tim mở",
        "cảm xúc dâng tràn",
        "đón nhận",
        "healing",
      ],
    },
    NghiaXuoi: {
      MoTa: "Thời điểm đẹp để yêu, làm hòa, kết nối lại, hoặc làm nội dung thiên về cảm xúc.",
      TuKhoa: ["bắt đầu tình cảm", "lành", "cho đi", "tươi mới"],
    },
    NghiaNguoc: {
      MoTa: "Cảm xúc bị chặn, yêu nhưng chưa dám thể hiện, hoặc tổn thương cũ chưa hết.",
      TuKhoa: ["đóng lòng", "chưa sẵn sàng", "tự vệ cảm xúc"],
    },
    ChuDe: {
      TinhDuyen: "Có người mới/ cảm xúc mới/ rung động mới.",
      CongViec: "Làm sản phẩm/ chiến dịch chạm cảm xúc.",
      TaiChinh: "Tiền đến từ quan hệ, từ sự thiện chí.",
      SucKhoe: "Cải thiện khi tâm trạng vui.",
    },
    Meta: "Át Cốc – mở tim.",
  },
  {
    ID: "2-of-cups",
    SoThuTu: 2,
    Ten: "Two of Cups",
    Nhom: "Cups",
    Anh: "/images/tarot-cards/cups/2-of-cups.png",
    YNghiaChung: {
      MoTa: "Kết nối 2 chiều, hợp tác hài hòa, đôi lứa, mối quan hệ đối xứng.",
      TuKhoa: [
        "đôi lứa",
        "hợp tác",
        "tương xứng",
        "cảm xúc 2 chiều",
        "kết nối",
      ],
    },
    NghiaXuoi: {
      MoTa: "Quan hệ này đáng để đầu tư. Hai bên tôn trọng và nhìn nhau ngang hàng.",
      TuKhoa: ["yêu đôi", "hòa hợp", "mutual", "bắt tay"],
    },
    NghiaNguoc: {
      MoTa: "1 bên cho nhiều hơn, hiểu lầm nhỏ, hoặc chưa đồng đều về cảm xúc.",
      TuKhoa: ["lệch pha", "hiểu lầm", "mâu thuẫn nhẹ"],
    },
    ChuDe: {
      TinhDuyen: "Cặp đôi, người yêu, bắt đầu mối quan hệ đẹp.",
      CongViec: "Hợp tác win–win.",
      TaiChinh: "Tiền đến từ hợp tác, đối tác.",
      SucKhoe: "Nên có người đồng hành.",
    },
    Meta: "Lá ‘cặp đôi chuẩn’.",
  },
  {
    ID: "3-of-cups",
    SoThuTu: 3,
    Ten: "Three of Cups",
    Nhom: "Cups",
    Anh: "/images/tarot-cards/cups/3-of-cups.png",
    YNghiaChung: {
      MoTa: "Ăn mừng, vui vẻ cùng bạn bè, cộng đồng ấm áp, người ủng hộ bạn.",
      TuKhoa: [
        "ăn mừng",
        "tình bạn",
        "cộng đồng",
        "hội nhóm",
        "tiệc tùng",
        "support",
      ],
    },
    NghiaXuoi: {
      MoTa: "Thời điểm nên kết nối cộng đồng, làm event, mở group, tụ tập.",
      TuKhoa: ["vui vẻ", "celebrate", "lan tỏa"],
    },
    NghiaNguoc: {
      MoTa: "Nói nhiều hơn làm, tham vui quá, hoặc có người thứ 3 chen vào.",
      TuKhoa: ["quá đà", "người thứ ba", "xao nhãng"],
    },
    ChuDe: {
      TinhDuyen: "Tình cảm vui vẻ, hay đi chơi, nhưng chưa chắc cam kết.",
      CongViec: "Làm cộng đồng, chăm member.",
      TaiChinh: "Thu từ event/ hội nhóm.",
      SucKhoe: "Tâm trạng tốt thì khỏe.",
    },
    Meta: "Lá ‘party’.",
  },
  {
    ID: "4-of-cups",
    SoThuTu: 4,
    Ten: "Four of Cups",
    Nhom: "Cups",
    Anh: "/images/tarot-cards/cups/4-of-cups.png",
    YNghiaChung: {
      MoTa: "Chán chường, không hứng thú, có cơ hội đưa tới nhưng bạn chưa muốn nhận.",
      TuKhoa: [
        "chán",
        "thiếu cảm hứng",
        "từ chối",
        "tạm đóng lòng",
        "muốn ở một mình",
      ],
    },
    NghiaXuoi: {
      MoTa: "Hãy kiểm tra lại cảm xúc, có thể bạn mệt nên thấy cái gì cũng không vui.",
      TuKhoa: ["tạm dừng", "nghỉ cảm xúc", "xem lại nhu cầu"],
    },
    NghiaNguoc: {
      MoTa: "Bắt đầu mở lòng lại, sẵn sàng nhận cơ hội mới.",
      TuKhoa: ["thôi chán", "tỉnh lại", "sẵn sàng"],
    },
    ChuDe: {
      TinhDuyen: "Không có hứng yêu, đang so sánh người cũ.",
      CongViec: "Thiếu hứng làm, cần việc thú vị hơn.",
      TaiChinh: "Chi tiêu cầm chừng.",
      SucKhoe: "Cần nâng mood.",
    },
    Meta: "Lá ‘em đang chán thôi’.",
  },
  {
    ID: "5-of-cups",
    SoThuTu: 5,
    Ten: "Five of Cups",
    Nhom: "Cups",
    Anh: "/images/tarot-cards/cups/5-of-cups.png",
    YNghiaChung: {
      MoTa: "Tiếc nuối, nhìn vào cái đã mất mà quên cái vẫn còn. Nỗi buồn cảm xúc.",
      TuKhoa: [
        "nuối tiếc",
        "buồn",
        "mất mát",
        "tập trung vào điều xấu",
        "thất vọng",
      ],
    },
    NghiaXuoi: {
      MoTa: "Thừa nhận nỗi buồn để đi tiếp. Đừng chỉ nhìn 3 cốc đổ, còn 2 cốc sau lưng.",
      TuKhoa: ["chữa lành", "chấp nhận", "đứng dậy"],
    },
    NghiaNguoc: {
      MoTa: "Bỏ qua quá khứ, tha thứ cho mình/ người khác.",
      TuKhoa: ["tha thứ", "buông", "hướng về phía trước"],
    },
    ChuDe: {
      TinhDuyen: "Buồn vì chuyện cũ, chưa quên người cũ.",
      CongViec: "Hối hận vì 1 quyết định.",
      TaiChinh: "Mất khoản tiền nhỏ, nhưng không phải hết.",
      SucKhoe: "Tâm trạng ảnh hưởng cơ thể.",
    },
    Meta: "Lá ‘đi qua tiếc nuối’.",
  },
  {
    ID: "6-of-cups",
    SoThuTu: 6,
    Ten: "Six of Cups",
    Nhom: "Cups",
    Anh: "/images/tarot-cards/cups/6-of-cups.png",
    YNghiaChung: {
      MoTa: "Hoài niệm, ký ức đẹp, người cũ quay lại, năng lượng trẻ thơ, gia đình.",
      TuKhoa: [
        "hoài niệm",
        "người cũ",
        "kỷ niệm",
        "tuổi thơ",
        "nhẹ nhàng",
        "chữa lành",
      ],
    },
    NghiaXuoi: {
      MoTa: "Nhìn lại để chữa lành, gặp lại người cũ, hoặc làm dự án kết nối thế hệ.",
      TuKhoa: ["ôn lại", "kết nối lại", "ấm áp"],
    },
    NghiaNguoc: {
      MoTa: "Mắc kẹt trong quá khứ, so sánh hiện tại với hồi xưa.",
      TuKhoa: ["kẹt ký ức", "so sánh", "hoài cổ quá"],
    },
    ChuDe: {
      TinhDuyen: "Người cũ liên hệ/ gặp lại.",
      CongViec: "Dự án liên quan trẻ em/ giáo dục/ ký ức thương hiệu.",
      TaiChinh: "Tiền từ gia đình hỗ trợ.",
      SucKhoe: "Làm thứ mình thích hồi nhỏ sẽ tốt.",
    },
    Meta: "Lá ‘nhớ ngày xưa’.",
  },
  {
    ID: "7-of-cups",
    SoThuTu: 7,
    Ten: "Seven of Cups",
    Nhom: "Cups",
    Anh: "/images/tarot-cards/cups/7-of-cups.png",
    YNghiaChung: {
      MoTa: "Nhiều lựa chọn, tưởng tượng, mộng mơ, nhưng cũng dễ ảo tưởng.",
      TuKhoa: [
        "nhiều khả năng",
        "mơ mộng",
        "ảo tưởng",
        "khó chọn",
        "đầu óc bay",
      ],
    },
    NghiaXuoi: {
      MoTa: "Cho phép mình mơ, nhưng phải chọn 1 hướng để làm thật.",
      TuKhoa: ["vision", "brainstorm", "chọn lọc"],
    },
    NghiaNguoc: {
      MoTa: "Thoát khỏi ảo tưởng, nhìn rõ điều gì thực sự phù hợp.",
      TuKhoa: ["tỉnh mộng", "thực tế", "loại bớt"],
    },
    ChuDe: {
      TinhDuyen: "Nhiều ‘crush’, hoặc đặt kỳ vọng hơi phim.",
      CongViec: "Nhiều ý tưởng content/ sản phẩm.",
      TaiChinh: "Đừng đầu tư lan man.",
      SucKhoe: "Thiền để bớt tán.",
    },
    Meta: "Lá ‘nhiều option quá’.",
  },
  {
    ID: "8-of-cups",
    SoThuTu: 8,
    Ten: "Eight of Cups",
    Nhom: "Cups",
    Anh: "/images/tarot-cards/cups/8-of-cups.png",
    YNghiaChung: {
      MoTa: "Rời đi dù vẫn còn tình cảm, vì biết ở lại sẽ không lớn thêm. Đi tìm điều sâu hơn.",
      TuKhoa: [
        "rời đi",
        "bỏ lại",
        "tìm ý nghĩa",
        "tạm xa",
        "hành trình nội tâm",
      ],
    },
    NghiaXuoi: {
      MoTa: "Quyết định rời khỏi những gì không còn nuôi dưỡng cảm xúc. Mạnh mẽ và tỉnh.",
      TuKhoa: ["buông", "tìm cái tốt hơn", "ra đi trong yên bình"],
    },
    NghiaNguoc: {
      MoTa: "Rời đi nửa vời, đi rồi quay lại, hoặc sợ bước ra khỏi vùng cũ.",
      TuKhoa: ["lưỡng lự", "quay lại", "sợ thay đổi"],
    },
    ChuDe: {
      TinhDuyen: "Chia tay trong văn minh.",
      CongViec: "Đổi môi trường, đổi team.",
      TaiChinh: "Dứt 1 khoản lỗ để làm lại.",
      SucKhoe: "Đi xa/ retreat sẽ tốt.",
    },
    Meta: "Lá ‘ra đi để lớn’.",
  },
  {
    ID: "9-of-cups",
    SoThuTu: 9,
    Ten: "Nine of Cups",
    Nhom: "Cups",
    Anh: "/images/tarot-cards/cups/9-of-cups.png",
    YNghiaChung: {
      MoTa: "Hài lòng, tận hưởng, ước muốn được đáp lại. Lá ‘điều ước’ của bộ Cốc.",
      TuKhoa: ["hài lòng", "điều ước", "tận hưởng", "tự thưởng", "thoải mái"],
    },
    NghiaXuoi: {
      MoTa: "Bạn xứng đáng tận hưởng thành quả. Có thể được tỏ tình/ khen/ nhận quà.",
      TuKhoa: ["thỏa mãn", "hạnh phúc", "đủ đầy"],
    },
    NghiaNguoc: {
      MoTa: "Tận hưởng quá hóa lười, hoặc vui bề ngoài chứ chưa chạm sâu.",
      TuKhoa: ["quá đà", "hưởng thụ", "thiếu ý nghĩa"],
    },
    ChuDe: {
      TinhDuyen: "Mối quan hệ vui, thoải mái, không áp lực.",
      CongViec: "Được khen, được khách hài lòng.",
      TaiChinh: "Có tiền để tự thưởng.",
      SucKhoe: "Ăn uống vui vẻ nhưng đừng quá.",
    },
    Meta: "Lá ‘wish granted’.",
  },
  {
    ID: "10-of-cups",
    SoThuTu: 10,
    Ten: "Ten of Cups",
    Nhom: "Cups",
    Anh: "/images/tarot-cards/cups/10-of-cups.png",
    YNghiaChung: {
      MoTa: "Hạnh phúc gia đình, viên mãn cảm xúc, mọi người hòa hợp. Kết thúc đẹp của bộ Cốc.",
      TuKhoa: ["viên mãn", "gia đình", "hòa hợp", "yên bình", "kết thúc đẹp"],
    },
    NghiaXuoi: {
      MoTa: "Đạt trạng thái cân bằng giữa tình cảm – gia đình – cuộc sống. Năng lượng rất lành.",
      TuKhoa: ["hạnh phúc", "ấm áp", "sum vầy"],
    },
    NghiaNguoc: {
      MoTa: "Bên ngoài trông ổn nhưng bên trong chưa hẳn. Cần nói chuyện chân thành.",
      TuKhoa: ["giả ổn", "thiếu kết nối", "kỳ vọng gia đình"],
    },
    ChuDe: {
      TinhDuyen: "Gia đình, kết hôn, sống chung.",
      CongViec: "Team hòa hợp, văn hóa tốt.",
      TaiChinh: "Chi tiêu cho gia đình.",
      SucKhoe: "Tinh thần tốt hỗ trợ thể chất.",
    },
    Meta: "Lá ‘happy ending’.",
  },
  {
    ID: "page-of-cups",
    SoThuTu: 11,
    Ten: "Page of Cups",
    Nhom: "Cups",
    Anh: "/images/tarot-cards/cups/page-of-cups.png",
    YNghiaChung: {
      MoTa: "Thông điệp tình cảm dễ thương, lời mời, lời khen, năng lượng trẻ con đáng yêu.",
      TuKhoa: [
        "tin nhắn dễ thương",
        "lời tỏ bày",
        "sáng tạo nghệ thuật",
        "nhạy cảm",
      ],
    },
    NghiaXuoi: {
      MoTa: "Cứ thể hiện cảm xúc. Làm content/ art/ music rất hợp. Năng lượng thơ.",
      TuKhoa: ["bày tỏ", "sáng tạo", "thử nghiệm cảm xúc"],
    },
    NghiaNguoc: {
      MoTa: "Nhạy cảm quá, dễ tự ái, hoặc mơ mộng mà không hành động.",
      TuKhoa: ["mít ướt", "tự ái", "thiếu thực tế"],
    },
    ChuDe: {
      TinhDuyen: "Tỏ tình, thả thính.",
      CongViec: "Dự án nghệ thuật, thiết kế, viết.",
      TaiChinh: "Thu nhập nhỏ từ đam mê.",
      SucKhoe: "Chăm phần cảm xúc sẽ khỏe hơn.",
    },
    Meta: "Lá ‘tin nhắn crush’.",
  },
  {
    ID: "knight-of-cups",
    SoThuTu: 12,
    Ten: "Knight of Cups",
    Nhom: "Cups",
    Anh: "/images/tarot-cards/cups/knight-of-cups.png",
    YNghiaChung: {
      MoTa: "Người mang đến lời mời, sự lãng mạn, muốn chinh phục bằng cảm xúc.",
      TuKhoa: ["lãng mạn", "tỏ tình", "lời mời", "theo đuổi", "điềm đạm"],
    },
    NghiaXuoi: {
      MoTa: "Cứ đi theo điều khiến trái tim rung. Rất hợp làm việc đẹp, nghệ thuật, tư vấn.",
      TuKhoa: ["theo đuổi ước mơ", "lịch thiệp", "chạm cảm xúc"],
    },
    NghiaNguoc: {
      MoTa: "Lý tưởng hóa quá, yêu hình ảnh hơn là con người thật.",
      TuKhoa: ["ảo tưởng tình yêu", "thiếu ổn định", "đổi mood"],
    },
    ChuDe: {
      TinhDuyen: "Có người theo đuổi, rất ga-lăng.",
      CongViec: "Pitch, trình bày, làm dự án đẹp.",
      TaiChinh: "Kiếm từ dịch vụ mềm, tư vấn.",
      SucKhoe: "Giữ cảm xúc ổn định.",
    },
    Meta: "Lá ‘chàng thơ’.",
  },
  {
    ID: "queen-of-cups",
    SoThuTu: 13,
    Ten: "Queen of Cups",
    Nhom: "Cups",
    Anh: "/images/tarot-cards/cups/queen-of-cups.png",
    YNghiaChung: {
      MoTa: "Trực giác mạnh, biết lắng nghe, giàu tình thương, chữa lành cảm xúc người khác.",
      TuKhoa: ["trực giác", "nữ tính", "chữa lành", "thấu cảm", "lắng nghe"],
    },
    NghiaXuoi: {
      MoTa: "Bạn đủ sâu để nâng đỡ người khác. Hợp làm healer, tư vấn tâm lý, mentor cảm xúc.",
      TuKhoa: ["yêu thương", "lắng nghe", "nâng đỡ"],
    },
    NghiaNguoc: {
      MoTa: "Quá nhạy cảm, dễ bị trôi theo cảm xúc người khác.",
      TuKhoa: ["cuốn theo", "quá mơ", "mood swing"],
    },
    ChuDe: {
      TinhDuyen: "Ấm áp, chung thủy, yêu bằng trực giác.",
      CongViec: "Làm trong ngành chăm sóc/ tư vấn/ nghệ thuật.",
      TaiChinh: "Thu nhập từ chăm sóc – dịch vụ mềm.",
      SucKhoe: "Thiền, yoga, nước.",
    },
    Meta: "Lá ‘mẹ nước’.",
  },
  {
    ID: "king-of-cups",
    SoThuTu: 14,
    Ten: "King of Cups",
    Nhom: "Cups",
    Anh: "/images/tarot-cards/cups/king-of-cups.png",
    YNghiaChung: {
      MoTa: "Làm chủ cảm xúc, bình tĩnh, khôn ngoan, biết dung hòa. Năng lượng trưởng thành của cảm xúc.",
      TuKhoa: [
        "điềm tĩnh",
        "trưởng thành",
        "cân bằng",
        "lãnh đạo cảm xúc",
        "thấu hiểu",
      ],
    },
    NghiaXuoi: {
      MoTa: "Dẫn dắt người khác bằng sự bao dung. Rất hợp vai trò cố vấn/ thầy/ người trị liệu.",
      TuKhoa: ["điều tiết cảm xúc", "chín chắn", "đáng tin"],
    },
    NghiaNguoc: {
      MoTa: "Giấu cảm xúc, kiềm nén quá, hoặc dùng cảm xúc để điều khiển người khác.",
      TuKhoa: ["kiềm nén", "thao túng cảm xúc", "giả điềm tĩnh"],
    },
    ChuDe: {
      TinhDuyen: "Người đàn ông tình cảm nhưng kín.",
      CongViec: "Lãnh đạo đội ngũ dịch vụ/ chăm sóc khách hàng.",
      TaiChinh: "Ổn định, chi tiêu dựa trên giá trị.",
      SucKhoe: "Giữ tâm bình an.",
    },
    Meta: "Lá ‘làm chủ trái tim’.",
  },
];

export default TAROT_CUPS;
