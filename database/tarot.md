# Tarot Cards Table - Bài Tarot

## 📊 Schema

```sql
CREATE TABLE tarot_cards (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    card_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    group VARCHAR(50) NOT NULL,
    meaning_general TEXT NULL,
    meaning_upright TEXT NULL,
    meaning_reversed TEXT NULL,
    keywords TEXT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

---

## 🎴 Statistics

- **Total Cards:** 78
- **Major Arcana:** 22 cards
- **Minor Arcana:** 56 cards
  - Cups: 14 cards
  - Swords: 14 cards
  - Wands: 14 cards
  - Pentacles: 14 cards

---

## 🃏 Card Groups

### Major Arcana (22 lá)

| Card ID | Name               | Keywords               |
| ------- | ------------------ | ---------------------- |
| 0       | The Fool           | Khởi đầu, Phiêu lưu    |
| 1       | The Magician       | Sáng tạo, Kỹ năng      |
| 2       | The High Priestess | Trực giác, Bí ẩn       |
| ...     | ...                | ...                    |
| 21      | The World          | Hoàn thành, Thành công |

### Minor Arcana - Cups (14 lá)

Đại diện cho: Cảm xúc, Tình yêu, Quan hệ

### Minor Arcana - Swords (14 lá)

Đại diện cho: Suy nghĩ, Xung đột, Quyết định

### Minor Arcana - Wands (14 lá)

Đại diện cho: Hành động, Năng lượng, Sáng tạo

### Minor Arcana - Pentacles (14 lá)

Đại diện cho: Vật chất, Tài chính, Công việc

---

## 📱 API Endpoints

### Get All Tarot Cards

```bash
GET /api/tarot
```

**Response:**

```json
[
  {
    "id": 1,
    "card_id": "major_00",
    "name": "The Fool",
    "group": "major",
    "meaning_upright": "...",
    "meaning_reversed": "..."
  }
]
```

---

**Total Cards:** 78
**Groups:** 5 (Major + 4 suits)
