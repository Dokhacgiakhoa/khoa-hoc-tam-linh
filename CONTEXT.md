# 🧠 CONTEXT - Cấu Hình & Tiêu Chuẩn Dự Án

File này lưu trữ toàn bộ bối cảnh kỹ thuật, cấu hình chuẩn và các quy tắc để đảm bảo dự án luôn chạy đúng, clean và dễ bảo trì. Đây là "nguồn sự thật duy nhất" (Single Source of Truth) cho dự án.

---

## 🚀 1. Công Nghệ & Kiến Trúc

- **Mô hình**: Monorepo (Frontend và Backend tách biệt).
- **Backend**: Laravel 12.x (Sanctum Auth).
- **Frontend**: React 18.x (Bootstrap 5, Axios).
- **Database**: SQL Server/MySQL (XAMPP/SSMS). Tên DB: `khoa-hoc-tam-linh`.
- **Cơ chế xác thực**: Sanctum Token (Lưu tại `localStorage` với key `auth_token`).

---

## 🛠️ 2. Cấu Hình Sống Còn (Critical Core)

### 🔹 2.1. Đồng Bộ Token (Axios Interceptor)

Mọi request từ Frontend phải tự động đính kèm Token nếu có. Cấu hình tại `src/index.js`:

```javascript
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

### 🔹 2.2. Đồng Bộ Trạng Thái Toàn Cục (Event Sync)

Sử dụng sự kiện `userChanged` để đồng bộ dữ liệu giữa các component (Navbar, Dashboard, Profile) mà không cần reload:

```javascript
// Phát hành:
localStorage.setItem("user", JSON.stringify(data));
window.dispatchEvent(new Event("userChanged"));

// Lắng nghe:
window.addEventListener("userChanged", () => {
  /* Logic update state */
});
```

### 🔹 2.3. Kết Nối & Proxy

- **Development**: Dùng `"proxy": "http://localhost:8000"` trong `package.json` của React.
- **Lưu ý**: Tuyệt đối KHÔNG ghi cứng `baseURL = "http://localhost:8000"` trong Axios khi ở môi trường Dev để tránh lỗi CORS và Network Error.

---

## 🗄️ 3. Cấu Trúc Dữ Liệu & Backend

### 🔹 3.1. Bảng `users` chuẩn

Mọi bảng User phải bao gồm các trường phục vụ thuật đoán mệnh:

- `name` (Database thực tế) <-> `full_name` (Frontend hiển thị).
- `phone`, `address`, `gender` (Enum: male, female, other).
- `date_of_birth` (DATE), `birth_time` (VARCHAR - định dạng HH:mm).
- `avatar`, `balance` (Linh Tệ).

### 🔹 3.2. Quy tắc Controller

- **Mapping**: Luôn `unset('full_name')` trước khi `update()` để tránh lỗi SQL nếu cột không tồn tại.
- **Response**: Luôn trả về `$user->fresh()` sau khi update để frontend có data mới nhất.
- **Namespace**: Đảm bảo mọi Controller đều có `namespace App\Http\Controllers;`.

---

## 🎨 4. Tiêu Chuẩn Giao Diện (Design System)

- **Thẩm mỹ**: Premium, Dark Mode, Glassmorphism.
- **Màu sắc**: Đen tím (#1a0033), Vàng Gold (#ffd700).
- **Hiệu ứng**: 3D Cards, Blur Glass, Smooth Animation.
- **Tiêu chuẩn Code CSS**:
  - Dùng Vanilla CSS kết hợp Bootstrap Utility.
  - Các Card thông tin phải có hiệu ứng Hover và Shadow Gold.

---

## 🚫 5. Lỗi Cần Tránh (Anti-Patterns)

1. **Lỗi 401 (Unauthorized)**: Thường do Token Key không khớp (dùng `auth_token`, không dùng `token` hay `access_token`).
2. **Lỗi 422 (Validation)**: Kiểm tra lại validate trong `UserController.php`.
3. **Lỗi Persistence**: Xảy ra khi State của React không được cập nhật sau khi gọi API thành công. Luôn dùng `useEffect` lắng nghe `userChanged`.
4. **Lỗi Encode**: Khi nạp dữ liệu từ JSON vào Database, đảm bảo file `.json` là UTF-8 để tránh lỗi phông chữ tiếng Việt.

---

_Dự án này được thiết kế để chuẩn hóa dữ liệu huyền học và khoa học tâm linh._
