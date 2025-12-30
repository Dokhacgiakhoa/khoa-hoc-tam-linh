# Hệ thống Thanh toán & Ví Linh Tệ

## 📊 Tổng quan

Hệ thống sử dụng **Linh Tệ** (Spiritual Currency) làm đơn vị tiền tệ nội bộ. Users có thể nạp, rút, và sử dụng Linh Tệ để:

- 🛍️ Mua sản phẩm tâm linh
- 🎓 Đăng ký khóa học
- 🔮 Sử dụng dịch vụ cao cấp
- 📦 Mua gói dịch vụ

---

## 💳 Wallet (Ví điện tử)

### Balance Field trong Users Table

```sql
balance DECIMAL(10,2) DEFAULT 0.00
```

- **Tên field:** `balance`
- **Kiểu dữ liệu:** DECIMAL(10,2)
- **Giá trị mặc định:** 0.00
- **Đơn vị:** Linh Tệ
- **Giới hạn:** 0 - 99,999,999.99

### Số dư hiện tại của Users

| Username | Balance    | Formatted         |
| -------- | ---------- | ----------------- |
| giakhoa  | 1000000.00 | 1,000,000 Linh Tệ |
| hocvien  | 500.00     | 500 Linh Tệ       |
| suongnt  | 1200.00    | 1,200 Linh Tệ     |

**Tổng số dư hệ thống:** 1,001,700 Linh Tệ

---

## 💸 Transactions (Giao dịch)

### Transaction Types

| Type              | Mô tả               | Amount | Ảnh hưởng Balance |
| ----------------- | ------------------- | ------ | ----------------- |
| `deposit`         | Nạp tiền vào ví     | +      | Tăng              |
| `withdraw`        | Rút tiền từ ví      | -      | Giảm              |
| `purchase`        | Mua sản phẩm        | -      | Giảm              |
| `refund`          | Hoàn tiền           | +      | Tăng              |
| `course_payment`  | Thanh toán khóa học | -      | Giảm              |
| `service_payment` | Thanh toán dịch vụ  | -      | Giảm              |
| `bonus`           | Thưởng từ hệ thống  | +      | Tăng              |
| `commission`      | Hoa hồng            | +      | Tăng              |

### Sample Transactions

```sql
INSERT INTO transactions (user_id, type, amount, description) VALUES
(1, 'deposit', 500000, 'Nạp tiền lần đầu'),
(1, 'purchase', -150000, 'Mua bộ Tarot Rider-Waite'),
(2, 'deposit', 500, 'Nạp tiền vào ví'),
(2, 'course_payment', -299, 'Đăng ký khóa Tarot Chuyên sâu'),
(3, 'bonus', 1200, 'Thưởng đăng ký mới');
```

---

## 🔄 API Endpoints - Wallet & Transactions

### 1. Xem số dư ví

```bash
GET http://localhost:8000/api/wallet
Authorization: Bearer {token}
```

**Response:**

```json
{
  "balance": 1000000,
  "formatted": "1,000,000 Linh Tệ",
  "user": {
    "id": 1,
    "name": "Gia Khoa",
    "username": "giakhoa"
  }
}
```

---

### 2. Nạp tiền vào ví

```bash
POST http://localhost:8000/api/wallet/deposit
Authorization: Bearer {token}
Content-Type: application/json

{
  "amount": 100000
}
```

**Response:**

```json
{
  "message": "Nạp tiền thành công!",
  "transaction": {
    "id": 1,
    "user_id": 1,
    "type": "deposit",
    "amount": 100000,
    "description": "Nạp tiền vào ví",
    "created_at": "2025-12-28 21:45:00"
  },
  "new_balance": 1100000
}
```

**Validation:**

- `amount` phải là số dương
- `amount` >= 1000 (tối thiểu 1,000 Linh Tệ)
- `amount` <= 10000000 (tối đa 10,000,000 Linh Tệ mỗi lần)

---

### 3. Rút tiền từ ví

```bash
POST http://localhost:8000/api/wallet/withdraw
Authorization: Bearer {token}
Content-Type: application/json

{
  "amount": 50000,
  "bank_account": "1234567890",
  "bank_name": "Vietcombank"
}
```

**Response:**

```json
{
  "message": "Yêu cầu rút tiền đã được ghi nhận!",
  "transaction": {
    "id": 2,
    "user_id": 1,
    "type": "withdraw",
    "amount": -50000,
    "description": "Rút tiền về Vietcombank - 1234567890",
    "created_at": "2025-12-28 21:46:00"
  },
  "new_balance": 1050000,
  "status": "pending",
  "note": "Yêu cầu sẽ được xử lý trong 1-3 ngày làm việc"
}
```

**Validation:**

- `amount` phải là số dương
- `amount` >= 50000 (tối thiểu 50,000 Linh Tệ)
- `amount` <= balance (không được vượt quá số dư)
- `bank_account` bắt buộc
- `bank_name` bắt buộc

---

### 4. Lịch sử giao dịch

```bash
GET http://localhost:8000/api/wallet/transactions
Authorization: Bearer {token}
```

**Query Parameters:**

- `page` - Trang hiện tại (default: 1)
- `per_page` - Số giao dịch mỗi trang (default: 20)
- `type` - Lọc theo loại giao dịch
- `from_date` - Từ ngày (YYYY-MM-DD)
- `to_date` - Đến ngày (YYYY-MM-DD)

**Response:**

```json
{
  "current_page": 1,
  "data": [
    {
      "id": 1,
      "type": "deposit",
      "amount": 100000,
      "description": "Nạp tiền vào ví",
      "created_at": "2025-12-28 21:45:00"
    },
    {
      "id": 2,
      "type": "purchase",
      "amount": -50000,
      "description": "Mua Bộ Tarot Rider-Waite",
      "created_at": "2025-12-28 20:30:00"
    }
  ],
  "total": 15,
  "per_page": 20,
  "last_page": 1
}
```

---

## 💳 Phương thức thanh toán

### 1. Thanh toán bằng Linh Tệ (Wallet)

**Ưu điểm:**

- ✅ Thanh toán tức thì
- ✅ Không phí giao dịch
- ✅ Bảo mật cao
- ✅ Lịch sử rõ ràng

**Quy trình:**

1. User có đủ số dư trong ví
2. Chọn sản phẩm/dịch vụ
3. Xác nhận thanh toán
4. Hệ thống trừ tiền từ ví
5. Tạo transaction record
6. Cập nhật balance

---

### 2. Nạp tiền qua Cổng thanh toán

**Các phương thức hỗ trợ:**

- 💳 **Thẻ ATM nội địa** (Napas)
- 💳 **Thẻ Visa/Mastercard**
- 📱 **Ví điện tử** (MoMo, ZaloPay, VNPay)
- 🏦 **Chuyển khoản ngân hàng**
- 🏪 **Thanh toán tại cửa hàng tiện lợi**

**Tỷ giá quy đổi:**

```
1 VNĐ = 1 Linh Tệ
```

**Ví dụ:**

- Nạp 100,000 VNĐ → Nhận 100,000 Linh Tệ
- Nạp 500,000 VNĐ → Nhận 500,000 Linh Tệ

**Phí giao dịch:**

- Thẻ ATM: 1.1% (tối thiểu 2,200 VNĐ)
- Visa/Mastercard: 2.2%
- Ví điện tử: 0% (miễn phí)
- Chuyển khoản: 0% (miễn phí)

---

## 🎁 Chương trình khuyến mãi

### Nạp tiền lần đầu

```
Nạp >= 100,000 → Tặng 10,000 Linh Tệ
Nạp >= 500,000 → Tặng 75,000 Linh Tệ
Nạp >= 1,000,000 → Tặng 200,000 Linh Tệ
```

### Nạp tiền định kỳ

```
Nạp mỗi tháng >= 200,000 → Tặng 5% giá trị nạp
```

---

## 🔒 Bảo mật & Quy định

### Bảo mật

- ✅ Tất cả giao dịch yêu cầu authentication
- ✅ Mã hóa thông tin thanh toán
- ✅ 2FA cho giao dịch lớn (>= 1,000,000)
- ✅ Xác nhận qua email/SMS
- ✅ Giới hạn số lần giao dịch mỗi ngày

### Quy định

#### 1. Nạp tiền

- Tối thiểu: 1,000 Linh Tệ
- Tối đa: 10,000,000 Linh Tệ/lần
- Giới hạn: 50,000,000 Linh Tệ/ngày

#### 2. Rút tiền

- Tối thiểu: 50,000 Linh Tệ
- Tối đa: 5,000,000 Linh Tệ/lần
- Thời gian xử lý: 1-3 ngày làm việc
- Phí rút: 1% (tối thiểu 10,000 Linh Tệ)

#### 3. Hoàn tiền

- Sản phẩm lỗi: 100% trong 7 ngày
- Khóa học: 50% trong 3 ngày đầu
- Dịch vụ: Theo chính sách từng dịch vụ

---

## 🛠️ Testing Wallet Features

### Test Deposit

```bash
# 1. Login as user
POST http://localhost:8000/api/login
Content-Type: application/json

{
  "email": "hocvien@fpt.edu.vn",
  "password": "password"
}

# 2. Deposit 100,000
POST http://localhost:8000/api/wallet/deposit
Authorization: Bearer {token}
Content-Type: application/json

{
  "amount": 100000
}

# 3. Check new balance
GET http://localhost:8000/api/wallet
Authorization: Bearer {token}
```

### Test Transaction History

```bash
# Get all transactions
GET http://localhost:8000/api/wallet/transactions
Authorization: Bearer {token}

# Filter by type
GET http://localhost:8000/api/wallet/transactions?type=deposit

# Filter by date range
GET http://localhost:8000/api/wallet/transactions?from_date=2025-12-01&to_date=2025-12-31
```

---

## 📊 Database Queries - Wallet Operations

### Tính tổng số dư tất cả users

```sql
SELECT SUM(balance) as total_balance FROM users;
```

**Result:** 1,001,700 Linh Tệ

---

### Top 10 users có số dư cao nhất

```sql
SELECT username, name, balance
FROM users
ORDER BY balance DESC
LIMIT 10;
```

---

### Tổng giao dịch theo loại

```sql
SELECT
    type,
    COUNT(*) as count,
    SUM(amount) as total_amount
FROM transactions
GROUP BY type
ORDER BY total_amount DESC;
```

---

### Lịch sử giao dịch của user

```sql
SELECT
    t.id,
    t.type,
    t.amount,
    t.description,
    t.created_at,
    u.username
FROM transactions t
JOIN users u ON t.user_id = u.id
WHERE u.id = 1
ORDER BY t.created_at DESC;
```

---

### Giao dịch trong tháng hiện tại

```sql
SELECT
    DATE(created_at) as date,
    type,
    COUNT(*) as count,
    SUM(amount) as total
FROM transactions
WHERE MONTH(created_at) = MONTH(CURRENT_DATE())
  AND YEAR(created_at) = YEAR(CURRENT_DATE())
GROUP BY DATE(created_at), type
ORDER BY date DESC;
```

---

## 📱 Frontend Integration

### Wallet Component Example

```javascript
// Get wallet balance
const getWalletBalance = async () => {
  const response = await axios.get("/api/wallet", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.balance;
};

// Deposit money
const depositMoney = async (amount) => {
  const response = await axios.post(
    "/api/wallet/deposit",
    { amount },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

// Get transaction history
const getTransactions = async (page = 1) => {
  const response = await axios.get(`/api/wallet/transactions?page=${page}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
```

---

**Last Updated:** 2025-12-28
**Currency:** Linh Tệ (Spiritual Currency)
**Exchange Rate:** 1 VNĐ = 1 Linh Tệ
