# Services & Orders Tables

## 📊 Services Schema

```sql
CREATE TABLE services (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    service_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(15,2) NOT NULL,
    description TEXT NULL,
    category VARCHAR(255) NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

---

## 📦 Orders Schema

```sql
CREATE TABLE orders (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    order_id VARCHAR(255) UNIQUE NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    items VARCHAR(255) NOT NULL,
    total DECIMAL(15,2) NOT NULL,
    method VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

---

## 🔮 Service Categories

- Tarot Reading
- Tử Vi
- Bát Tự
- Face Scanning (AI)
- Palm Reading
- Feng Shui Consultation
- Numerology

---

## 📊 Order Status

| Status     | Description   |
| ---------- | ------------- |
| pending    | Chờ xử lý     |
| paid       | Đã thanh toán |
| processing | Đang xử lý    |
| completed  | Hoàn thành    |
| cancelled  | Đã hủy        |
| refunded   | Đã hoàn tiền  |

---

## 📱 API Endpoints

### Get Services

```bash
GET /api/services
```

### Get Orders

```bash
GET /api/orders
```

### Get Admin Orders

```bash
GET /api/admin/orders
Authorization: Bearer {admin_token}
```

---

**Services:** Multiple categories
**Orders:** Tracked with status
