// File tổng: gom đủ 78 lá từ 5 file phụ
// Lưu ý: đảm bảo 5 file này tồn tại cùng thư mục:
// - ./tarot-major.js
// - ./tarot-wands.js
// - ./tarot-cups.js
// - ./tarot-swords.js
// - ./tarot-pentacles.js

import TAROT_MAJOR from "./tarot-major";
import TAROT_WANDS from "./tarot-wands";
import TAROT_CUPS from "./tarot-cups";
import TAROT_SWORDS from "./tarot-swords";
import TAROT_PENTACLES from "./tarot-pentacles";

// Gộp thành 1 mảng 78 lá
const TAROT_78 = [
  ...TAROT_MAJOR,
  ...TAROT_WANDS,
  ...TAROT_CUPS,
  ...TAROT_SWORDS,
  ...TAROT_PENTACLES,
];

// Export mặc định
export default TAROT_78;

// (tuỳ chọn) export từng bộ nếu muốn import riêng
export { TAROT_MAJOR, TAROT_WANDS, TAROT_CUPS, TAROT_SWORDS, TAROT_PENTACLES };
