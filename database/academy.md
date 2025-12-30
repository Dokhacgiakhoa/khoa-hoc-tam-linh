# Academy Tables - Học viện Huyền học

## 📊 Schemas

### 1. Course Categories

```sql
CREATE TABLE course_categories (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT NULL,
    icon VARCHAR(255) NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

### 2. Courses

```sql
CREATE TABLE courses (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    category_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    summary TEXT NULL,
    description TEXT NULL,
    thumbnail VARCHAR(255) NULL,
    price DECIMAL(15,2) DEFAULT 0,
    level ENUM('Cơ bản', 'Trung cấp', 'Cao cấp') DEFAULT 'Cơ bản',
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (category_id) REFERENCES course_categories(id)
);
```

### 3. Lessons

```sql
CREATE TABLE lessons (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    course_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NULL,
    video_url VARCHAR(255) NULL,
    `order` INT DEFAULT 0,
    is_preview BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);
```

---

## 🎓 Course Categories (5 danh mục)

| ID  | Name               | Slug  | Icon | Courses |
| --- | ------------------ | ----- | ---- | ------- |
| 1   | MỆNH (Destiny)     | menh  | 📜   | 1       |
| 2   | TƯỚNG (AI Scanner) | tuong | 🎭   | 1       |
| 3   | BỐC (Oracle Tool)  | boc   | 🃏   | 1       |
| 4   | TRẠCH (Feng Shui)  | trach | 🏮   | 1       |
| 5   | SỐ (Numerology)    | so    | 🔢   | 1       |

---

## 📚 Courses (5 khóa học)

| ID  | Title                            | Slug                 | Category | Price | Level     |
| --- | -------------------------------- | -------------------- | -------- | ----- | --------- |
| 1   | Tử Vi Đẩu Số Nhập Môn            | tu-vi-nhap-mon       | MỆNH     | 0     | Cơ bản    |
| 2   | Nhân Tướng Học Hiện Đại          | nhan-tuong-hien-dai  | TƯỚNG    | 199   | Cơ bản    |
| 3   | Tarot: Từ Trực Giác đến Tri Thức | tarot-chuyen-sau     | BỐC      | 299   | Trung cấp |
| 4   | Phong Thủy Bát Trạch Cơ Bản      | phong-thuy-bat-trach | TRẠCH    | 0     | Cơ bản    |
| 5   | Thần Số Học Pytago               | than-so-hoc-pytago   | SỐ       | 150   | Cơ bản    |

---

## 📖 Lessons

**Total:** 15 bài học (mỗi khóa học có 3 bài)

**Ví dụ - Khóa Tử Vi:**

1. Tổng quan về Tử Vi Đẩu Số
2. Âm Dương Ngũ Hành trong Tử Vi
3. Cách thức an lá số thủ công

---

## 📱 API Endpoints

### Get Categories

```bash
GET /api/academy/categories
```

### Get Courses by Category

```bash
GET /api/academy/category/{slug}
```

### Get Course Detail

```bash
GET /api/academy/course/{slug}
```

---

**Total Categories:** 5
**Total Courses:** 5
**Total Lessons:** 15
