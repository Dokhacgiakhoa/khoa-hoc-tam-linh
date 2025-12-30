# Users Table - Quản lý Người dùng

## 📊 Schema

```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    email_verified_at TIMESTAMP NULL,
    password VARCHAR(255) NOT NULL,
    avatar VARCHAR(255) NULL,
    phone VARCHAR(20) NULL,
    date_of_birth DATE NULL,
    gender ENUM('male', 'female', 'other') NULL,
    role ENUM('user', 'admin', 'expert') DEFAULT 'user',
    level VARCHAR(50) DEFAULT 'Tân học',
    balance DECIMAL(10,2) DEFAULT 0.00,
    two_factor_secret TEXT NULL,
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    last_login_at TIMESTAMP NULL,
    remember_token VARCHAR(100) NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

---

## 👥 Sample Data

| ID  | Username | Name         | Email                  | Role  | Balance   | Level   |
| --- | -------- | ------------ | ---------------------- | ----- | --------- | ------- |
| 1   | giakhoa  | Gia Khoa     | admin@dokhacgiakhoa.vn | admin | 1,000,000 | Tân học |
| 2   | hocvien  | Học viên A   | hocvien@fpt.edu.vn     | user  | 500       | Tân học |
| 3   | suongnt  | Sương Nguyễn | suong.nt@gmail.com     | user  | 1,200     | Tân học |

**Default Password:** `password`

---

## 🔐 Thông tin Đăng nhập

### 1. Admin Account

```
Email:    admin@dokhacgiakhoa.vn
Username: giakhoa
Password: password
Role:     admin
Balance:  1,000,000 Linh Tệ
```

**Quyền hạn:**

- ✅ Quản lý toàn bộ hệ thống
- ✅ Quản lý users (CRUD)
- ✅ Quản lý orders, products, services
- ✅ Truy cập admin dashboard: `/admin`
- ✅ Xem báo cáo thống kê

---

### 2. User Account - Học viên

```
Email:    hocvien@fpt.edu.vn
Username: hocvien
Password: password
Role:     user
Balance:  500 Linh Tệ
```

**Quyền hạn:**

- ✅ Xem và mua sản phẩm
- ✅ Sử dụng dịch vụ Tarot
- ✅ Đăng ký khóa học
- ✅ Quản lý profile
- ✅ Nạp tiền, xem giao dịch
- ❌ Không truy cập admin

---

### 3. User Account - Sương

```
Email:    suong.nt@gmail.com
Username: suongnt
Password: password
Role:     user
Balance:  1,200 Linh Tệ
```

---

## 📱 API Endpoints

### Login

```bash
POST /api/login
{
  "email": "admin@dokhacgiakhoa.vn",
  "password": "password"
}
```

### Register

```bash
POST /api/register
{
  "name": "New User",
  "email": "newuser@example.com",
  "password": "password",
  "password_confirmation": "password"
}
```

### Get User Info

```bash
GET /api/user
Authorization: Bearer {token}
```

### Update Profile

```bash
PUT /api/user/profile
Authorization: Bearer {token}
{
  "name": "Updated Name",
  "phone": "0123456789"
}
```

---

## 🔒 Security

- **Password:** bcrypt hashing
- **Authentication:** Laravel Sanctum
- **2FA:** Google Authenticator support
- **Sessions:** Database-based

---

**Total Users:** 3
**Admin:** 1
**Regular Users:** 2
