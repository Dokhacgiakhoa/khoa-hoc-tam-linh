# Bảng 64 Quẻ Kinh Dịch (I Ching Hexagrams)

## 📊 Schema Table `iching_hexagrams`

```sql
CREATE TABLE iching_hexagrams (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    hexagram_number INT UNIQUE NOT NULL, -- 1 đến 64
    name_vi VARCHAR(100) NOT NULL, -- 'Thuần Càn', 'Thuần Khôn', 'Thủy Lôi Truân'
    name_chinese VARCHAR(50) NOT NULL, -- '乾', '坤', '屯'
    pinyin VARCHAR(50) NULL,
    upper_trigram VARCHAR(20) NOT NULL, -- Ngoại quái (Càn, Đoài, Ly, Chấn, Tốn, Khảm, Cấn, Khôn)
    lower_trigram VARCHAR(20) NOT NULL, -- Nội quái
    binary_code CHAR(6) NOT NULL, -- '111111' (Càn), '000000' (Khôn)
    
    general_meaning TEXT NOT NULL, -- Ý nghĩa tổng quan
    judgment TEXT NOT NULL,        -- Lời Thoán
    image_meaning TEXT NOT NULL,   -- Lời Tượng
    lines_explanation JSON NOT NULL, -- Giải nghĩa chi tiết 6 hào (Hào 1 -> 6)
    action_advice TEXT NOT NULL,   -- Lời khuyên hành động
    tags JSON NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,

    INDEX idx_hex_number (hexagram_number),
    INDEX idx_hex_upper (upper_trigram),
    INDEX idx_hex_lower (lower_trigram)
);
```

---

## 🔮 Cấu Trúc Bát Quái & Biểu Diễn Nhị Phân (Binary Representation)

| Quái Tượng | Tên Quái | Ngũ Hành | Số Nhị Phân (3-bit) |
| :--- | :--- | :--- | :--- |
| ☰ | **Càn (Trời)** | Kim | `111` |
| ☱ | **Đoài (Đầm)** | Kim | `110` |
| ☲ | **Ly (Lửa)** | Hỏa | `101` |
| ☳ | **Chấn (Sấm)** | Mộc | `100` |
| ☴ | **Tốn (Gió)** | Mộc | `011` |
| ☵ | **Khảm (Nước)** | Thủy | `010` |
| ☶ | **Cấn (Núi)** | Thổ | `001` |
| ☷ | **Khôn (Đất)** | Thổ | `000` |

---

## ⚡ Giải Thuật Gieo Quẻ (Oracle Logic)

1. Gieo 3 đồng xu 6 lần từ dưới lên trên (Hào 1 $\rightarrow$ Hào 6).
2. Quy ước điểm: Sấp = 2, Ngửa = 3.
   - Tổng = 6: **Hào Âm Động** (--) $\times$ $\rightarrow$ Biến thành Hào Dương (+).
   - Tổng = 7: **Hào Dương Tĩnh** (+).
   - Tổng = 8: **Hào Âm Tĩnh** (--).
   - Tổng = 9: **Hào Dương Động** (+) $\bigcirc$ $\rightarrow$ Biến thành Hào Âm (--).
3. Lập ra **Quẻ Chủ (Gốc)** $\rightarrow$ Tìm trong `iching_hexagrams`.
4. Đổi các Hào Động thành Hào Biến $\rightarrow$ Lập ra **Quẻ Biến (Tương Lai)** $\rightarrow$ Gửi toàn bộ dữ liệu vào AI Engine (Gemini/LLM) để luận giải.
