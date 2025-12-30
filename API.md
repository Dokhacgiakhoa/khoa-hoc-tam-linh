# Tài liệu API

## Xác thực (Authentication)

| Phương thức | Endpoint                       | Mô tả                                        | Trạng thái       |
| :---------- | :----------------------------- | :------------------------------------------- | :--------------- |
| POST        | `/api/register`                | Đăng ký người dùng mới                       | ✅ Hoạt động     |
| POST        | `/api/login`                   | Đăng nhập bằng email/mật khẩu                | ✅ Hoạt động     |
| POST        | `/api/logout`                  | Đăng xuất (cần token xác thực)               | 🔐 Cần đăng nhập |
| POST        | `/api/auth/check-availability` | Kiểm tra email/tên đăng nhập đã tồn tại chưa | ✅ Hoạt động     |
| GET         | `/api/user`                    | Lấy thông tin người dùng hiện tại            | 🔐 Cần đăng nhập |

### Đăng nhập QR

| Phương thức | Endpoint                         | Mô tả                                             | Trạng thái       |
| :---------- | :------------------------------- | :------------------------------------------------ | :--------------- |
| GET         | `/api/auth/qr/generate`          | Tạo mã session ID cho QR                          | ✅ Hoạt động     |
| GET         | `/api/auth/qr/check/{sessionId}` | Kiểm tra trạng thái session QR                    | ✅ Hoạt động     |
| POST        | `/api/auth/qr/approve`           | Chấp thuận đăng nhập QR từ mobile (cần đăng nhập) | 🔐 Cần đăng nhập |

### Xác thực 2 bước (2FA)

| Phương thức | Endpoint           | Mô tả                            | Trạng thái       |
| :---------- | :----------------- | :------------------------------- | :--------------- |
| POST        | `/api/2fa/setup`   | Cài đặt 2FA (Trả về Secret/QR)   | 🔐 Cần đăng nhập |
| POST        | `/api/2fa/confirm` | Xác nhận cài đặt 2FA bằng mã OTP | 🔐 Cần đăng nhập |

## Sản phẩm & Thương mại

| Phương thức | Endpoint                             | Mô tả                                               | Trạng thái       |
| :---------- | :----------------------------------- | :-------------------------------------------------- | :--------------- |
| GET         | `/api/products`                      | Danh sách tất cả sản phẩm                           | ✅ Hoạt động     |
| GET         | `/api/products/{id}`                 | Lấy chi tiết sản phẩm                               | ✅ Hoạt động     |
| POST        | `/api/products/{id}/purchase`        | Mua sản phẩm (Cần đăng nhập)                        | 🔐 Cần đăng nhập |
| GET         | `/api/products/{id}/check-ownership` | Kiểm tra người dùng đã sở hữu sản phẩm/dịch vụ chưa | 🔐 Cần đăng nhập |
| GET         | `/api/orders`                        | Danh sách lịch sử đơn hàng của người dùng           | 🔐 Cần đăng nhập |

## Ví (Wallet)

| Phương thức | Endpoint                   | Mô tả                    | Trạng thái       |
| :---------- | :------------------------- | :----------------------- | :--------------- |
| GET         | `/api/wallet`              | Xem số dư ví             | 🔐 Cần đăng nhập |
| POST        | `/api/wallet/deposit`      | Nạp tiền (Tạo giao dịch) | 🔐 Cần đăng nhập |
| GET         | `/api/wallet/transactions` | Xem lịch sử giao dịch    | 🔐 Cần đăng nhập |

## Dịch vụ Huyền học

| Phương thức | Endpoint                    | Mô tả                         | Trạng thái       |
| :---------- | :-------------------------- | :---------------------------- | :--------------- |
| GET         | `/api/services`             | Danh sách các dịch vụ hiện có | ✅ Hoạt động     |
| POST        | `/api/services/{type}`      | Xử lý dịch vụ chung           | 🔐 Cần đăng nhập |
| GET         | `/api/tarot`                | Dịch vụ bói Tarot             | ✅ Hoạt động     |
| POST        | `/api/astrology/natal`      | Tính toán Bản Đồ Sao          | ✅ Hoạt động     |
| POST        | `/api/tu-vi/lap-la-so`      | Lập lá số Tử Vi               | ✅ Hoạt động     |
| POST        | `/api/numerology/calculate` | Tính toán Thần Số Học         | ✅ Hoạt động     |

## Học Viện (Academy)

| Phương thức | Endpoint                             | Mô tả                               | Trạng thái       |
| :---------- | :----------------------------------- | :---------------------------------- | :--------------- |
| GET         | `/api/academy/categories`            | Danh sách danh mục khóa học         | ✅ Hoạt động     |
| GET         | `/api/academy/category/{slug}`       | Lấy khóa học theo danh mục          | ✅ Hoạt động     |
| GET         | `/api/academy/course/{slug}`         | Lấy chi tiết khóa học               | ✅ Hoạt động     |
| POST        | `/api/academy/courses/{id}/purchase` | Đăng ký/Mua khóa học                | 🔐 Cần đăng nhập |
| POST        | `/api/academy/lessons/complete`      | Đánh dấu bài học đã hoàn thành      | 🔐 Cần đăng nhập |
| GET         | `/api/academy/courses/{id}/progress` | Xem tiến độ học của khóa học cụ thể | 🔐 Cần đăng nhập |
| GET         | `/api/academy/my-progress`           | Xem tổng quan tiến độ học tập       | 🔐 Cần đăng nhập |

## Hệ thống Người dùng

| Phương thức | Endpoint                          | Mô tả                        | Trạng thái       |
| :---------- | :-------------------------------- | :--------------------------- | :--------------- |
| POST        | `/api/user/avatar`                | Tải lên ảnh đại diện         | 🔐 Cần đăng nhập |
| PUT         | `/api/user/profile`               | Cập nhật thông tin hồ sơ     | 🔐 Cần đăng nhập |
| GET         | `/api/notifications`              | Danh sách thông báo          | 🔐 Cần đăng nhập |
| GET         | `/api/notifications/unread-count` | Đếm số thông báo chưa đọc    | 🔐 Cần đăng nhập |
| POST        | `/api/notifications/{id}/read`    | Đánh dấu thông báo đã đọc    | 🔐 Cần đăng nhập |
| POST        | `/api/notifications/read-all`     | Đánh dấu tất cả là đã đọc    | 🔐 Cần đăng nhập |
| DELETE      | `/api/notifications/{id}`         | Xóa thông báo                | 🔐 Cần đăng nhập |
| GET         | `/api/tasks`                      | Danh sách nhiệm vụ hàng ngày | 🔐 Cần đăng nhập |
| POST        | `/api/tasks/{id}/claim`           | Nhận thưởng nhiệm vụ         | 🔐 Cần đăng nhập |

## Quản trị (Admin)

| Phương thức | Endpoint                       | Mô tả                       | Trạng thái           |
| :---------- | :----------------------------- | :-------------------------- | :------------------- |
| GET         | `/api/admin/dashboard`         | Thống kê Dashboard Admin    | 🔐 Hoạt động (Admin) |
| GET         | `/api/admin/wallet/statistics` | Thống kê hệ thống ví        | 🔐 Hoạt động (Admin) |
| GET         | `/api/admin/users`             | Danh sách tất cả người dùng | 🔐 Hoạt động (Admin) |
| PUT         | `/api/admin/users/{id}`        | Cập nhật người dùng (Admin) | 🔐 Hoạt động (Admin) |
| DELETE      | `/api/admin/users/{id}`        | Xóa người dùng (Admin)      | 🔐 Hoạt động (Admin) |

## Hệ thống

| Phương thức | Endpoint    | Mô tả                    | Trạng thái   |
| :---------- | :---------- | :----------------------- | :----------- |
| GET         | `/api/test` | Kiểm tra kết nối Backend | ✅ Hoạt động |
