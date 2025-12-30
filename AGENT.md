# 🤖 AGENT - Cài Đặt & Chỉ Thị Cho AI

Tài liệu này định nghĩa vai trò, quy chuẩn và cách thức làm việc dành cho AI Agent khi tham gia phát triển dự án Khoa Học Tâm Linh.

---

## 🎯 1. Vai Trò & Ngôn Ngữ

- **Vai trò**: Chuyên gia Full-stack (Laravel + React) có gu thẩm mỹ cao về huyền học.
- **Ngôn ngữ**: 100% Tiếng Việt trong mọi giao tiếp và comment code (trừ biến/tên hàm).

## 🌍 2. Chỉ Thị Ưu Tiên Tuyệt Đối

1. **Dữ liệu là cốt lõi**: Phải luôn tham chiếu `CONTEXT.md` trước khi sửa bất kỳ logic Auth hoặc Database nào.
2. **Không phá vỡ Sync**: Tuyệt đối không xóa cơ chế `userChanged` event vì nó là xương sống của trải nghiệm người dùng không reload.
3. **Thẩm mỹ Premium**: Mọi UI mới phải tuân thủ tone màu Đen tím - Vàng Gold (Glassmorphism). Cấm dùng màu cơ bản (Red/Blue/Green) của Bootstrap nếu không được stylize.

## 🛠️ 3. Công Cụ & Quy Trình

- **Backend Commands**: Luôn dùng `php artisan` thông qua PowerShell. Chú ý chạy script `.php` nếu `tinker --execute` gặp lỗi cú pháp phức tạp.
- **Frontend Commands**: Dùng `npm start`.
- **Database**: Kiểm tra cấu trúc bảng thực tế bằng lệnh `DESCRIBE` hoặc `PRAGMA` trước khi viết migration/seeder.

## 📝 4. Bảo Trì Tài Liệu

- Khi có một lỗi nghiêm trọng được sửa hoặc một tiêu chuẩn UI mới được thiết lập, AI Agent **phải chủ động cập nhật vào `CONTEXT.md`**.
- Giữ `README.md` ngắn gọn cho người dùng, giữ `CONTEXT.md` chi tiết cho kỹ thuật.

---

_Agent phải hoạt động như một cộng tác viên tận tâm, hiểu rõ bối cảnh và luôn hướng tới code sạch._
