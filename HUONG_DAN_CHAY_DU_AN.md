# Hướng Dẫn Chạy Dự Án (Khoa Học Tâm Linh)

Tài liệu này hướng dẫn cách cài đặt và chạy toàn bộ dự án (Backend Laravel & Frontend React) trên môi trường local.

## 1. Yêu Cầu Hệ Thống (Prerequisites)

Hãy đảm bảo máy tính của bạn đã cài đặt các phần mềm sau:

- **PHP**: >= 8.1 (Khuyên dùng XAMPP hoặc Laragon).
- **Composer**: [Tải tại đây](https://getcomposer.org/).
- **Node.js**: >= 16 (Khuyên dùng bản LTS). [Tải tại đây](https://nodejs.org/).
- **MySQL**: (Đi kèm với XAMPP/Laragon).

---

## 2. Cài Đặt & Chạy Backend (Laravel)

Thư mục: `back-end`

### Bước 1: Cài đặt dependencies

Mở terminal tại thư mục `back-end` và chạy:

```bash
composer install
```

### Bước 2: Cấu hình môi trường

Copy file môi trường mẫu và tạo key ứng dụng:

```bash
cp .env.example .env
php artisan key:generate
```

_Lưu ý: Mở file `.env` và cấu hình thông tin Database (DB_DATABASE, DB_USERNAME, DB_PASSWORD) cho phù hợp với máy của bạn. Mặc định là:_

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=khoa_hoc_tam_linh
DB_USERNAME=root
DB_PASSWORD=
```

### Bước 3: Khởi tạo Database

Chạy migration để tạo bảng và seed dữ liệu mẫu:

```bash
php artisan migrate --seed
```

### Bước 4: Chạy Server

Khởi động server Laravel (Mặc định chạy ở port 8000, nhưng dự án nãy có thể cần port 8001 tuỳ cấu hình, hãy kiểm tra nếu frontend gọi API lỗi):

```bash
php artisan serve --port=8001
```

_Backend sẽ chạy tại: `http://localhost:8001`_

---

## 3. Cài Đặt & Chạy Frontend (React)

Thư mục: `front-end`

### Bước 1: Cài đặt packages

Mở terminal (mới) tại thư mục `front-end` và chạy:

```bash
npm install
```

_(Nếu gặp lỗi conflict, thử dùng `npm install --legacy-peer-deps`)_

### Bước 2: Chạy ứng dụng

```bash
npm start
```

_Frontend sẽ tự động mở tại: `http://localhost:3000`_

---

## 4. Tài Khoản Test (Demo)

Dữ liệu mẫu sau khi chạy `db:seed`:

- **Admin**:
  - Email: `admin@example.com`
  - Pass: `password`
- **User**:
  - Email: `user@example.com`
  - Pass: `password`

---

## 5. Các Vấn Đề Thường Gặp (Troubleshooting)

- **Lỗi CORS**: Đảm bảo Backend đang chạy đúng port mà Frontend gọi (thường là 8001). Kiểm tra `front-end/package.json` phần `proxy` xem đang trỏ về đâu.
- **Lỗi Database**: Đảm bảo MySQL đang chạy (bật XAMPP/Laragon).
- **Lỗi Node Sass/Gyp**: Nếu cài `npm install` lỗi, hãy thử cài lại node_modules hoặc dùng node version phù hợp.
