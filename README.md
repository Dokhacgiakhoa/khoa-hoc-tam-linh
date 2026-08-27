# 🔮 KHOA HỌC TÂM LINH (ESOTERIC SCIENCE ECOSYSTEM)

> **Nền tảng "Tâm Linh Số" kết hợp tri thức huyền học phương Đông với công nghệ phần mềm hiện đại (Data Science, 3D Interactive, Clean Architecture & AI-Ready).**

---

## 📺 1. Video Giới Thiệu & Trải Nghiệm Sản Phẩm

🎬 **Link Video Demo:** [https://www.youtube.com/watch?v=p2mQK-6XpcI](https://www.youtube.com/watch?v=p2mQK-6XpcI)

---

## 🌟 2. Điểm Nổi Bật Của Hệ Sinh Thái

* 🎨 **Giao diện Mystic Luxury 2.0**: Thiết kế Dark Mode kết hợp sắc Vàng Hoàng Kim (`#ffd700`), hiệu ứng Glassmorphism tinh xảo, thẻ bài 3D và khung chờ tải Shimmer.
* 📜 **Khoa Học Hóa Tri Thức Cổ Thư**:
  * **Kinh Dịch Gieo Quẻ 3D**: Mô phỏng gieo 3 đồng xu 6 lần, kiến lập Quẻ Chủ, bắt Hào Động và sinh Quẻ Biến theo chuẩn 64 Quẻ Kinh Dịch.
  * **Thần Số Học Pythagoras**: Trực quan hóa Ma trận ngày sinh 3x3 và Kim Tự Tháp 4 Đỉnh Cao cuộc đời.
  * **Tử Vi & Bản Đồ Sao**: Lập lá số Bát Tự, Can Chi, 12 Cung vị và các vòng sao.
  * **Trải Bài Tarot 3D**: Bộ 78 lá bài Major & Minor Arcana với hiệu ứng lật bài xoay chiều và phân tích đa khía cạnh (Tình duyên, Sự nghiệp, Tài chính, Sức khỏe).
* 🎓 **Học Viện Huyền Học & Khảo Thí Trắc Nghiệm**: Lộ trình học từ cơ bản đến chuyên sâu, hệ thống thi online có bấm giờ và cấp Chứng Chỉ Số (Certificate).
* 🛍️ **Thương Mại Đa Năng (Polymorphic Commerce)**: Giỏ hàng thông minh hỗ trợ mua cùng lúc Vật phẩm phong thủy vật lý, Khóa học và Dịch vụ số.
* 💳 **Sổ Cái Ví Linh Tệ (Financial Ledger)**: Hệ thống tiền tệ nội bộ được bảo vệ bởi Pessimistic Locking và ACID Transactions, chống race condition / double spending.
* 🛡️ **Bảo Mật & Định Danh Toàn Diện**: Xác thực 2 lớp (2FA Google Authenticator), Đăng nhập QR Code, Tiếp thị liên kết (Affiliate) và Hệ thống Nhiệm vụ nhận thưởng (Gamification).

---

## 🏛️ 3. Kiến Trúc Kỹ Thuật (System Architecture)

```
khoa-hoc-tam-linh/
├── back-end/               # Laravel 12.x RESTful API Clean Architecture
│   ├── app/
│   │   ├── Http/Controllers/  # Controllers (ApiResponse Trait)
│   │   ├── Models/            # Eloquent ORM (Polymorphic Relations)
│   │   ├── Services/          # Service Layer (WalletService, EsotericService)
│   │   └── Traits/            # ApiResponse Trait chuẩn hóa JSON
│   ├── database/
│   │   ├── migrations/        # 15+ Migrations (Composite Indexes, Constraints)
│   │   └── seeders/           # Seeders nạp tri thức Kinh Dịch, Tarot, Khóa học
│   └── routes/api.php         # API Endpoints
├── front-end/              # React 18.x Mystic Luxury UI/UX
│   ├── src/
│   │   ├── components/        # Reusable UI (Navbar, SkeletonLoader, ServiceGuard...)
│   │   ├── contexts/          # Context API (Auth, Alert, Cart)
│   │   ├── data/              # 78 Lá bài Tarot & Tri thức huyền học
│   │   ├── pages/             # Trang chủ, Dịch vụ, Học viện, Cửa hàng, Tài khoản
│   │   └── services/          # Centralized Axios Client (Auto Bearer Token & 401 Catch)
└── database/                  # Tài liệu chi tiết 15 bảng cơ sở dữ liệu
```

---

## 🚀 4. Hướng Dẫn Cài Đặt & Khởi Chạy (Quick Start)

### 📋 Yêu cầu môi trường
* **Node.js**: v16+ & **npm**
* **PHP**: v8.1+ & **Composer**
* **MySQL**: v8.0+ (qua XAMPP hoặc MySQL Service)

### 🔹 Bước 1: Khởi động Backend (Laravel)
```bash
cd back-end
composer install
cp .env.example .env

# Tạo Key và Migrate cơ sở dữ liệu
php artisan key:generate
php artisan migrate --seed

# Khởi chạy Backend server tại cổng 8001
php artisan serve --port=8001
```

### 🔹 Bước 2: Khởi động Frontend (React)
```bash
cd front-end
npm install
npm start
```
🌐 **Truy cập ứng dụng tại:** [http://localhost:3000/khoa-hoc-tam-linh](http://localhost:3000/khoa-hoc-tam-linh)

---

## 🔐 5. Tài Khoản Trải Nghiệm Mẫu

| Vai trò | Email | Tên đăng nhập | Mật khẩu | Số dư Linh Tệ |
| :--- | :--- | :--- | :--- | :--- |
| **Quản trị viên (Admin)** | `admin@dokhacgiakhoa.vn` | `giakhoa` | `password` | **1,000,000 🔮** |
| **Học viên mẫu (User)** | `hocvien@fpt.edu.vn` | `hocvien` | `password` | **500 🔮** |

---

## 🧑‍💻 6. Thông Tin Tác Giả & Bản Quyền

* **Tác giả / Full-stack Developer**: **Đỗ Khắc Gia Khoa**
* **Đơn vị đào tạo**: FPT Aptech
* **Email liên hệ**: [contact@dokhacgiakhoa.vn](mailto:contact@dokhacgiakhoa.vn)
* **GitHub Repository**: [https://github.com/Dokhacgiakhoa/khoa-hoc-tam-linh](https://github.com/Dokhacgiakhoa/khoa-hoc-tam-linh)

---

_Dự án được xây dựng với mục tiêu "Số hóa tâm linh - Nâng tầm trí tuệ bằng khoa học và công nghệ"._
