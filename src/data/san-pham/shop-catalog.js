// 6 danh mục bán đại trà
import { SAN_PHAM_BAI_TAM_LINH } from "./san-pham-bai-tam-linh";
import { SAN_PHAM_PHU_KIEN_TAM_LINH } from "./san-pham-phu-kien-tam-linh";
import { SAN_PHAM_HUONG_TRAM } from "./san-pham-huong-va-tram";
import { SAN_PHAM_TRA_DAO } from "./san-pham-tra-dao";
import { SAN_PHAM_CAO_CAP } from "./san-pham-cao-cap";
import { SAN_PHAM_SET_QUA_TANG } from "./san-pham-set-qua-tang";

// (Tuỳ chọn) dữ liệu “Chế tác riêng” – không bán đại trà
// import { SAN_PHAM_CHE_TAC_RIENG } from "./san-pham-che-tac-rieng";

export const CATEGORY_LABEL = {
  "bai-tam-linh": "Bài Tâm Linh",
  "phu-kien-tam-linh": "Phụ Kiện Tâm Linh",
  "huong-tram": "Hương & Trầm",
  "tra-dao": "Trà Đạo & Thiền Trà",
  "bo-suu-tap-cao-cap": "Bộ Sưu Tập & Cao Cấp",
  "set-qua-tang": "Set Quà Tặng",
  // "che-tac-rieng": "Chế Tác Riêng",
};

// 6 slug thương mại (dùng cho toolbar lọc)
export const COMMERCIAL_CATEGORIES = [
  "bai-tam-linh",
  "phu-kien-tam-linh",
  "huong-tram",
  "tra-dao",
  "bo-suu-tap-cao-cap",
  "set-qua-tang",
];

// Danh mục để render theo thứ tự
export const CATALOG = [
  {
    cat: "bai-tam-linh",
    title: "🔮 Bài Tâm Linh",
    items: SAN_PHAM_BAI_TAM_LINH,
  },
  {
    cat: "phu-kien-tam-linh",
    title: "💎 Phụ Kiện Tâm Linh",
    items: SAN_PHAM_PHU_KIEN_TAM_LINH,
  },
  { cat: "huong-tram", title: "🕯️ Hương & Trầm", items: SAN_PHAM_HUONG_TRAM },
  { cat: "tra-dao", title: "🍵 Trà Đạo & Thiền Trà", items: SAN_PHAM_TRA_DAO },
  {
    cat: "bo-suu-tap-cao-cap",
    title: "✨ Bộ Sưu Tập & Cao Cấp",
    items: SAN_PHAM_CAO_CAP,
  },
  {
    cat: "set-qua-tang",
    title: "🎁 Set Quà Tặng",
    items: SAN_PHAM_SET_QUA_TANG,
  },
];

// Gom “Tất cả” tại thời điểm import (không copy thủ công)
export function getAllProducts({ includeMadeToOrder = false } = {}) {
  const all = [
    ...SAN_PHAM_BAI_TAM_LINH,
    ...SAN_PHAM_PHU_KIEN_TAM_LINH,
    ...SAN_PHAM_HUONG_TRAM,
    ...SAN_PHAM_TRA_DAO,
    ...SAN_PHAM_CAO_CAP,
    ...SAN_PHAM_SET_QUA_TANG,
  ];
  // if (includeMadeToOrder) all.push(...SAN_PHAM_CHE_TAC_RIENG);
  return all;
}
