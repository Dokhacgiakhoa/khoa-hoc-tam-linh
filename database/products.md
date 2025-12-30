# Products Table - Sản phẩm & Cửa hàng

## 📊 Schema

```sql
CREATE TABLE products (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    product_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(15,2) NOT NULL,
    category VARCHAR(100) NULL,
    description TEXT NULL,
    image VARCHAR(255) NULL,
    stock INT DEFAULT 0,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

---

## 🛍️ Statistics

- **Total Products:** 72
- **Categories:**
  - Tarot Decks
  - Oracle Cards
  - Books
  - Crystals
  - Incense
  - Candles
  - Spiritual Tools

---

## 📦 Sample Products

| ID  | Product ID | Name              | Price     | Category     | Stock |
| --- | ---------- | ----------------- | --------- | ------------ | ----- |
| 1   | PROD001    | Tarot of the Soul | 450,000   | Tarot Decks  | 50    |
| 2   | PROD002    | Oracle of Light   | 350,000   | Oracle Cards | 30    |
| 3   | PROD003    | Crystal Ball      | 1,200,000 | Crystals     | 10    |
| 4   | PROD004    | Incense Set       | 120,000   | Incense      | 100   |

---

## 📱 API Endpoints

### Get All Products

```bash
GET /api/products
```

**Response:**

```json
[
  {
    "id": 1,
    "product_id": "PROD001",
    "name": "Tarot of the Soul",
    "price": 450000,
    "category": "Tarot Decks",
    "stock": 50
  }
]
```

### Get Product by ID

```bash
GET /api/products/{id}
```

### Purchase Product

```bash
POST /api/products/{id}/purchase
Authorization: Bearer {token}
{
  "quantity": 1,
  "payment_method": "wallet"
}
```

---

**Total Products:** 72
**Total Categories:** 7+
