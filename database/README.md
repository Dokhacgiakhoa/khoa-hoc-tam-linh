# Database MySQL - Khoa Học Tâm Linh

## 📊 Tổng quan

Database MySQL cho dự án **Khoa Học Tâm Linh** - Hệ thống ứng dụng web về khoa học tâm linh.

### Connection Details

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=khoa_hoc_tam_linh
DB_USERNAME=root
DB_PASSWORD=
```

### Database Server

- **Type:** MySQL 8.0+
- **Server:** XAMPP
- **Charset:** utf8mb4
- **Collation:** utf8mb4_unicode_ci

---

## 📁 Cấu trúc Documentation

Thông tin database được chia thành các file riêng theo chức năng:

### 📄 Files

1. **[users.md](./users.md)** - Quản lý người dùng

   - Users table schema
   - Thông tin đăng nhập (Admin, Users)
   - Authentication & Authorization
   - User roles & permissions

2. **[products.md](./products.md)** - Sản phẩm & Cửa hàng

   - Products table (72 sản phẩm)
   - Categories
   - Stock management

3. **[academy.md](./academy.md)** - Học viện Huyền học

   - Course Categories (5 danh mục)
   - Courses (5 khóa học)
   - Lessons (15 bài học)

4. **[services.md](./services.md)** - Dịch vụ

   - Services table
   - Service categories
   - Pricing

5. **[orders.md](./orders.md)** - Đơn hàng & Giao dịch

   - Orders table
   - Order status
   - Payment methods

6. **[tarot.md](./tarot.md)** - Bài Tarot

   - Tarot Cards (78 lá bài)
   - Major Arcana (22 lá)
   - Minor Arcana (56 lá)

7. **[wallet-transactions.md](./wallet-transactions.md)** - Ví & Giao dịch

   - Transactions table
   - Wallet balance
   - Payment system
   - Nạp rút Linh Tệ

8. **[system-tables.md](./system-tables.md)** - Bảng hệ thống
   - Knowledge Base
   - Cache
   - Sessions
   - Personal Access Tokens

---

## 🗄️ Database Schema Overview

### Tables (13 tables)

| #   | Table                  | Records | Description       |
| --- | ---------------------- | ------- | ----------------- |
| 1   | users                  | 3       | Người dùng        |
| 2   | products               | 72      | Sản phẩm          |
| 3   | tarot_cards            | 78      | Bài Tarot         |
| 4   | course_categories      | 5       | Danh mục khóa học |
| 5   | courses                | 5       | Khóa học          |
| 6   | lessons                | 15      | Bài học           |
| 7   | services               | -       | Dịch vụ           |
| 8   | orders                 | -       | Đơn hàng          |
| 9   | transactions           | -       | Giao dịch         |
| 10  | knowledge_base         | -       | Cơ sở tri thức    |
| 11  | cache                  | -       | Cache             |
| 12  | sessions               | -       | Sessions          |
| 13  | personal_access_tokens | -       | API tokens        |

---

## 🚀 Quick Start

### 1. Start MySQL (XAMPP)

```
Open XAMPP Control Panel → Start MySQL
```

### 2. Create Database

```bash
cd d:\Github\khoa-hoc-tam-linh\back-end
php create_database.php
```

### 3. Run Migrations

```bash
php artisan migrate:fresh --seed --force
```

### 4. Start Backend

```bash
php artisan serve
```

### 5. Test Connection

```
http://localhost:8000/api/test
```

---

## 🔧 Database Maintenance

### Backup Database

```bash
# Export database
mysqldump -u root khoa_hoc_tam_linh > backup.sql

# Import database
mysql -u root khoa_hoc_tam_linh < backup.sql
```

### Reset Database

```bash
# Drop all tables and recreate
php artisan migrate:fresh --seed --force
```

### Check Database Status

```bash
# Check migrations
php artisan migrate:status

# Check data using custom script
php check_data.php
```

---

## 📊 Database Statistics

- **Total Tables:** 13
- **Total Users:** 3
- **Total Products:** 72
- **Total Tarot Cards:** 78
- **Total Academy Categories:** 5
- **Total Courses:** 5
- **Total Lessons:** 15
- **Database Size:** ~2-3 MB (with sample data)
- **Total Balance:** 1,001,700 Linh Tệ

---

## 📝 Relationships

```
users
  └─ transactions (user_id)

course_categories
  └─ courses (category_id)
      └─ lessons (course_id)
```

---

## 🔐 Security

- **Password Hashing:** bcrypt (Laravel default)
- **API Authentication:** Laravel Sanctum
- **2FA Support:** Google Authenticator
- **Session Management:** Database sessions

---

**Last Updated:** 2025-12-28
**Database Version:** MySQL 8.0+
**Laravel Version:** 12.x
