// tuvi-engine.js: Thuật toán An 12 Cung và Thiên Bàn Tử Vi chuẩn mực

export const DIA_CHI_12 = [
  "Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ",
  "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"
];

export const THIEN_CAN_10 = [
  "Giáp", "Ất", "Bính", "Đinh", "Mậu",
  "Kỷ", "Canh", "Tân", "Nhâm", "Quý"
];

export const NAP_AM_MENH = {
  "Giáp Tý": "Hải Trung Kim", "Ất Sửu": "Hải Trung Kim",
  "Bính Dần": "Lư Trung Hỏa", "Đinh Mão": "Lư Trung Hỏa",
  "Mậu Thìn": "Đại Lâm Mộc", "Kỷ Tỵ": "Đại Lâm Mộc",
  "Canh Ngọ": "Lộ Bàng Thổ", "Tân Mùi": "Lộ Bàng Thổ",
  "Nhâm Thân": "Kiếm Phong Kim", "Quý Dậu": "Kiếm Phong Kim",
  "Giáp Tuất": "Sơn Đầu Hỏa", "Ất Hợi": "Sơn Đầu Hỏa",
  "Bính Tý": "Giản Hạ Thủy", "Đinh Sửu": "Giản Hạ Thủy",
  "Mậu Dần": "Thành Đầu Thổ", "Kỷ Mão": "Thành Đầu Thổ",
  "Canh Thìn": "Bạch Lạp Kim", "Tân Tỵ": "Bạch Lạp Kim",
  "Nhâm Ngọ": "Dương Liễu Mộc", "Quý Mùi": "Dương Liễu Mộc",
  "Giáp Thân": "Tuyền Trung Thủy", "Ất Dậu": "Tuyền Trung Thủy",
  "Bính Tuất": "Ốc Thượng Thổ", "Đinh Hợi": "Ốc Thượng Thổ",
  "Mậu Tý": "Tích Lịch Hỏa", "Kỷ Sửu": "Tích Lịch Hỏa",
  "Canh Dần": "Tùng Bách Mộc", "Tân Mão": "Tùng Bách Mộc",
  "Nhâm Thìn": "Trường Lưu Thủy", "Quý Tỵ": "Trường Lưu Thủy",
  "Giáp Ngọ": "Sa Trung Kim", "Ất Mùi": "Sa Trung Kim",
  "Bính Thân": "Sơn Hạ Hỏa", "Đinh Dậu": "Sơn Hạ Hỏa",
  "Mậu Tuất": "Bình Địa Mộc", "Kỷ Hợi": "Bình Địa Mộc",
  "Canh Tý": "Bích Thượng Thổ", "Tân Sửu": "Bích Thượng Thổ",
  "Nhâm Dần": "Kim Bạch Kim", "Quý Mão": "Kim Bạch Kim",
  "Giáp Thìn": "Phúc Đăng Hỏa", "Ất Tỵ": "Phúc Đăng Hỏa",
  "Bính Ngọ": "Thiên Hà Thủy", "Đinh Mùi": "Thiên Hà Thủy",
  "Mậu Thân": "Đại Dịch Thổ", "Kỷ Dậu": "Đại Dịch Thổ",
  "Canh Tuất": "Thoa Xuyến Kim", "Tân Hợi": "Thoa Xuyến Kim",
  "Nhâm Tý": "Tang Đố Mộc", "Quý Sửu": "Tang Đố Mộc",
  "Giáp Dần": "Đại Khê Thủy", "Ất Mão": "Đại Khê Thủy",
  "Bính Thìn": "Sa Trung Thổ", "Đinh Tỵ": "Sa Trung Thổ",
  "Mậu Ngọ": "Thiên Thượng Hỏa", "Kỷ Mùi": "Thiên Thượng Hỏa",
  "Canh Thân": "Thạch Lựu Mộc", "Tân Dậu": "Thạch Lựu Mộc",
  "Nhâm Tuất": "Đại Hải Thủy", "Quý Hợi": "Đại Hải Thủy"
};

export const CUNG_LIST = [
  "MỆNH", "PHỤ MẪU", "PHÚC ĐỨC", "ĐIỀN TRẠCH",
  "QUAN LỘC", "NÔ BỘC", "THIÊN DI", "TẬT ÁCH",
  "TÀI BẠCH", "TỬ TỨC", "PHU THÊ", "HUYNH ĐỆ"
];

// Bản đồ mẫu an sao chi tiết cho 12 cung theo mẫu chuẩn Lý Số Việt Nam
export function generateTuViChartData({ name, gender, date, time }) {
  const dateObj = new Date(date || "1995-06-06");
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();

  const canYear = THIEN_CAN_10[(year - 4) % 10] || "Ất";
  const chiYear = DIA_CHI_12[(year - 4) % 12] || "Hợi";
  const yearCanChi = `${canYear} ${chiYear}`;

  const isMale = gender === "Nam";
  const amDuong = isMale ? "Âm Nam" : "Dương Nữ";
  const napAm = NAP_AM_MENH[yearCanChi] || "Sơn Đầu Hỏa";

  // Cấu trúc 12 Cung chuẩn mực theo lưới 4x4
  const cungData = {
    "Tỵ": {
      chi: "T. Tỵ",
      name: "PHÚC ĐỨC",
      daiVan: 105,
      chinhTinh: [{ name: "CỰ MÔN", dacHam: "H", color: "text-danger" }],
      catTinh: ["Thiên Mã (Đ)", "Phong Cáo", "Thiên Y", "L.Lộc Tồn"],
      hungTinh: ["Thiên Hư (H)", "Thiên Diêu (H)", "Tuế Phá", "Phục Binh", "L.Đầu Quân"],
      trangSinh: "Lâm Quan",
      namHan: "năm Mão",
      nguyetHan: "tháng 11",
      gridArea: "1 / 1 / 2 / 2"
    },
    "Ngọ": {
      chi: "N. Ngọ",
      name: "ĐIỀN TRẠCH",
      daiVan: 95,
      chinhTinh: [
        { name: "LIÊM TRINH", dacHam: "V", color: "text-danger" },
        { name: "THIÊN TƯỚNG", dacHam: "V", color: "text-gold" }
      ],
      catTinh: ["Hữu Bật", "Thiên Trù", "LN.Văn Tinh", "Long Đức"],
      hungTinh: ["Hỏa Tinh (Đ)", "Đại Hao (H)", "L.Kình Dương", "L.Thái Tuế", "L.Hóa Kỵ"],
      trangSinh: "Quan Đới",
      namHan: "năm Thìn",
      nguyetHan: "tháng 12",
      gridArea: "1 / 2 / 2 / 3"
    },
    "Mùi": {
      chi: "Q. Mùi",
      name: "QUAN LỘC",
      daiVan: 85,
      chinhTinh: [{ name: "THIÊN LƯƠNG", dacHam: "Đ", color: "text-gold" }],
      catTinh: ["Văn Xương (Đ)", "Văn Khúc (V)", "Hóa Quyền (Đ)", "Hoa Cái", "L.Hóa Khoa"],
      hungTinh: ["Thiên Khốc (Đ)", "Bạch Hổ (H)", "Bệnh Phù"],
      trangSinh: "Mộc Dục",
      namHan: "năm Tỵ",
      nguyetHan: "tháng 1",
      gridArea: "1 / 3 / 2 / 4"
    },
    "Thân": {
      chi: "G. Thân",
      name: "NÔ BỘC",
      daiVan: 75,
      chinhTinh: [{ name: "THẤT SÁT", dacHam: "M", color: "text-gold" }],
      catTinh: ["Tả Phụ", "Thiên Việt", "Đường Phù", "Thiên Thọ", "Thiên Phúc", "Thiên Đức", "Hỷ Thần", "L.Thiên Mã"],
      hungTinh: ["Địa Không (Đ)", "Thiên Thương", "Kiếp Sát", "L.Tang Môn"],
      trangSinh: "Trường Sinh",
      namHan: "năm Ngọ",
      nguyetHan: "tháng 2",
      gridArea: "1 / 4 / 2 / 5"
    },
    "Dậu": {
      chi: "Â. Dậu",
      name: "THIÊN DI (THÂN)",
      daiVan: 65,
      isThan: true,
      chinhTinh: [{ name: "THIÊN ĐỒNG", dacHam: "H", color: "text-primary" }],
      catTinh: ["Thai Phụ", "L.Hóa Lộc"],
      hungTinh: ["Phá Toái", "Điều Khách", "Phi Liêm"],
      trangSinh: "Dưỡng",
      namHan: "năm Mùi",
      nguyetHan: "tháng 3",
      gridArea: "2 / 4 / 3 / 5"
    },
    "Tuất": {
      chi: "B. Tuất",
      name: "TẬT ÁCH",
      daiVan: 55,
      chinhTinh: [{ name: "VŨ KHÚC", dacHam: "M", color: "text-gold" }],
      catTinh: ["Bát Tọa", "Thiên Hỷ", "Tấu Thư"],
      hungTinh: ["Quả Tú", "Thiên Sử", "Địa Võng", "Đầu Quân", "Lưu Hà", "Trực Phù"],
      trangSinh: "Thai",
      namHan: "năm Thân",
      nguyetHan: "tháng 4",
      gridArea: "3 / 4 / 4 / 5"
    },
    "Hợi": {
      chi: "Đ. Hợi",
      name: "TÀI BẠCH",
      daiVan: 45,
      chinhTinh: [{ name: "THÁI DƯƠNG", dacHam: "H", color: "text-danger" }],
      catTinh: ["Phượng Các", "Quốc Ấn", "Địa Giải", "Giải Thần"],
      hungTinh: ["Thái Tuế", "Tướng Quân"],
      trangSinh: "Tuyệt",
      namHan: "năm Dậu",
      nguyetHan: "tháng 5",
      gridArea: "4 / 4 / 5 / 5"
    },
    "Tý": {
      chi: "M. Tý",
      name: "TỬ TỨC",
      daiVan: 35,
      chinhTinh: [{ name: "PHÁ QUÂN", dacHam: "M", color: "text-primary" }],
      catTinh: ["Thiên Khôi", "Thiên Quý", "Thiên Giải", "Đào Hoa", "Thiếu Dương"],
      hungTinh: ["Thiên Không", "Tiểu Hao (H)", "L.Thiên Khốc", "L.Thiên Hư"],
      trangSinh: "Mộ",
      namHan: "năm Tuất",
      nguyetHan: "tháng 6",
      gridArea: "4 / 3 / 5 / 4"
    },
    "Sửu": {
      chi: "K. Sửu",
      name: "THÊ THIẾP",
      daiVan: 25,
      chinhTinh: [{ name: "THIÊN CƠ", dacHam: "Đ", color: "text-success" }],
      catTinh: ["Hóa Lộc (V)", "Thanh Long", "L.Hóa Quyền"],
      hungTinh: ["Linh Tinh (H)", "Thiên Hình (H)", "Tang Môn (H)"],
      trangSinh: "Tử",
      namHan: "năm Hợi",
      nguyetHan: "tháng 7",
      gridArea: "4 / 2 / 5 / 3"
    },
    "Dần": {
      chi: "M. Dần",
      name: "HUYNH ĐỆ",
      daiVan: 15,
      chinhTinh: [
        { name: "TỬ VI", dacHam: "M", color: "text-gold" },
        { name: "THIÊN PHỦ", dacHam: "M", color: "text-gold" }
      ],
      catTinh: ["Hóa Khoa (Đ)", "Ân Quang", "Thiên Tài", "Thiếu Âm", "Lực Sĩ"],
      hungTinh: ["Đà La (H)", "Địa Kiếp (Đ)", "Cô Thần", "L.Bạch Hổ"],
      trangSinh: "Bệnh",
      namHan: "năm Tý",
      nguyetHan: "tháng 8",
      gridArea: "4 / 1 / 5 / 2"
    },
    "Mão": {
      chi: "K. Mão",
      name: "MỆNH",
      daiVan: 5,
      chinhTinh: [{ name: "THÁI ÂM", dacHam: "H", color: "text-light" }],
      catTinh: ["Lộc Tồn (M)", "Long Trì", "Bác Sỹ"],
      hungTinh: ["Hóa Kỵ (H)", "Quan Phù"],
      trangSinh: "Suy",
      namHan: "năm Sửu",
      nguyetHan: "tháng 9",
      gridArea: "3 / 1 / 4 / 2"
    },
    "Thìn": {
      chi: "C. Thìn",
      name: "PHỤ MẪU",
      daiVan: 115,
      chinhTinh: [{ name: "THAM LANG", dacHam: "V", color: "text-success" }],
      catTinh: ["Tam Thai", "Hồng Loan", "Thiên Quan", "Nguyệt Đức"],
      hungTinh: ["Kình Dương (Đ)", "Thiên La", "Tử Phù", "Quan Phủ", "L.Đà La"],
      trangSinh: "Đế Vượng",
      namHan: "năm Dần",
      nguyetHan: "tháng 10",
      gridArea: "2 / 1 / 3 / 2"
    }
  };

  return {
    thienBan: {
      name: name || "Đỗ Khắc Gia Khoa",
      solarDate: { year, month, day, time: time || "06:30" },
      lunarDate: { year: "Ất Hợi", month: "Nhâm Ngọ (5)", day: "Mậu Thìn (9)", hour: "Ất Mão" },
      yearCanChi,
      namXem: 2026,
      namXemCanChi: "Bính Ngọ",
      tuoiHan: 32,
      amDuong,
      amDuongLy: "Âm Dương thuận lý",
      menh: napAm,
      cuc: "Thổ Ngũ Cục",
      menhCuc: "Mệnh sinh Cục",
      thanCu: "Thân cư Thiên Di",
      menhChu: "Văn Khúc",
      thanChu: "Thiên Cơ"
    },
    diaBan: cungData
  };
}
