# Khoa Học Tâm Linh - Hệ Sinh Thái Huyền Học & Thương Mại Số

Dự án **Khoa Học Tâm Linh** là nền tảng kết hợp công nghệ hiện đại với tri thức huyền học phương Đông, mang đến trải nghiệm tâm linh số hóa khoa học, minh bạch và tiện lợi.

---

## ✨ Tính Năng Nổi Bật (Features)

### 1. Dịch Vụ Tâm Linh Số (Digital Services)

- **Tử Vi & Thần Số Học**: Luận giải chi tiết lá số, con số chủ đạo với giao diện trực quan.
- **Gieo Quẻ Kinh Dịch**: Mô phỏng gieo tiền xu 3D chân thực, lập quẻ và luận giải theo Kinh Dịch.
- **Tarot & Bói Bài**: Trải bài Tarot online với hiệu ứng lật bài mượt mà.
- **ServiceGuard**: Cơ chế bảo vệ nội dung cao cấp, yêu cầu mở khóa (thanh toán) để xem kết quả chi tiết.

### 2. Học Viện Huyền Học (Academy)

- **Hệ thống Khóa học**: Các khóa học từ cơ bản đến nâng cao về Tử Vi, Phong Thủy, Tarot.
- **Thi Chứng Chỉ (Exams)**:
  - Hệ thống bài thi trắc nghiệm online.
  - Điều kiện tiên quyết: Phải hoàn thành khóa học trước khi thi.
  - Cấp chứng chỉ số (Certificate) khi vượt qua bài thi.

### 3. Thương Mại Điện Tử (E-commerce)

- **Cửa Hàng Vật Phẩm**: Mua sắm vật phẩm phong thủy, đá quý, vòng tay.
- **Giỏ Hàng Thông Minh**: Hỗ trợ mua cùng lúc Dịch vụ (Digital) và Vật phẩm (Physical).
- **Ví Linh Tệ 🔮**: Đơn vị tiền tệ riêng của hệ thống.
  - Nạp tiền vào ví.
  - Thanh toán dịch vụ/sản phẩm bằng số dư ví.
  - Hiển thị số dư thực tế và dự tính sau khi mua.

### 4. Hệ Thống Tài Khoản & Bảo Mật

- **Xác thực 2 lớp (2FA)**: Bảo vệ tài khoản bằng Google Authenticator.
- **Đăng nhập QR Code**: Quét mã QR để đăng nhập nhanh (Simulation).
- **Tiếp thị Liên kết (Affiliate)**: Chia sẻ mã giới thiệu để nhận hoa hồng/Linh Tệ.
- **Hệ thống Nhiệm vụ (Quests)**: Làm nhiệm vụ điểm danh, tương tác để nhận thưởng.

---

## 🛠 Công Nghệ Sử Dụng (Tech Stack)

### Frontend

- **ReactJS**: Framework chính.
- **Context API**: Quản lý state toàn cục (Auth, Cart, Alert).
- **Axios**: Giao tiếp API.
- **CSS Modules/Custom CSS**: Giao diện Dark/Gold Luxury, Glassmorphism.
- **Chart.js** (hoặc thư viện tương đương): Vẽ biểu đồ Thần số/Tử vi.

### Backend

- **Laravel 10+**: Framework PHP mạnh mẽ.
- **MySQL**: Cơ sở dữ liệu quan hệ.
- **Sanctum**: Xác thực Token API (Bearer Token).
- **Polymorphic Relations**: Quản lý linh hoạt `order_items` (Product vs Service vs Course).

---

## 🚀 Hướng Dẫn Cài Đặt (Installation)

### Yêu cầu hệ thống

- **Node.js**: v14 trở lên.
- **PHP**: v8.1 trở lên.
- **Composer**: Quản lý thư viện PHP.
- **MySQL**: Database server.

### 1. Cài đặt Backend (Laravel)

```bash
cd back-end
# Cài đặt thư viện
composer install

# Cấu hình môi trường
cp .env.example .env
# (Chỉnh sửa thông tin DB trong file .env)

# Tạo Key và Migrate Database
php artisan key:generate
php artisan migrate --seed
# (Lệnh --seed sẽ tạo dữ liệu mẫu: User admin, Sản phẩm, Dịch vụ...)

# Chạy Server
php artisan serve
# Server sẽ chạy tại: http://127.0.0.1:8000 (hoặc 8001 tuỳ cấu hình)
```

### 2. Cài đặt Frontend (React)

```bash
cd front-end
# Cài đặt thư viện
npm install

# Chạy ứng dụng
npm start
# App sẽ chạy tại: http://localhost:3000
```

---

## 📂 Cấu Trúc Dự Án

```
khoa-hoc-tam-linh/
├── back-end/               # Laravel API Code
│   ├── app/
│   │   ├── Http/Controllers/  # Logic điều khiển (API)
│   │   ├── Models/            # Class ánh xạ Database
│   ├── database/           # Migrations & Seeders
│   ├── routes/
│   │   └── api.php         # Định nghĩa các API endpoints
│   └── ...
├── front-end/              # React App Code
│   ├── src/
│   │   ├── components/     # Các thành phần tái sử dụng (Navbar, ServiceGuard...)
│   │   ├── contexts/       # Global State (AuthContext, AlertContext...)
│   │   ├── pages/          # Các trang chính (TrangChu, DichVu, TaiKhoan...)
│   │   └── ...
│   └── ...
└── README.md               # Tài liệu này
```

---

## 👥 Đội Ngũ Phát Triển

- **Founder & Fullstack Dev**: Đỗ Khắc Gia Khoa
- **Marketing & Content**: Lê Chí Phương, Đỗ Tú Anh...

---

_Dự án được xây dựng với mục tiêu "Số hóa tâm linh - Nâng tầm trí tuệ"._
