# Khoa Học Tâm Linh - Nền Tảng Huyền Học & Thương Mại Số

Dự án là một hệ sinh thái kết hợp giữa kiến thức huyền học Phương Đông/Phương Tây (Tử Vi, Thần Số, Tarot...) và nền tảng thương mại điện tử hiện đại, mang đến trải nghiệm tâm linh số hóa độc đáo.

## ✨ Điểm hay và thú vị của sản phẩm

1.  **Sự kết hợp Độc đáo**:

    - Kết hợp giữa **E-learning** (Học viện Live), **E-commerce** (Cửa hàng vật phẩm), và **Consulting** (Dịch vụ xem số/bói bài).
    - Hệ thống tiền tệ riêng (**Linh Tệ 🔮**) tạo cảm giác "gamification" cho người dùng khi nạp tiền và chi tiêu.

2.  **Trải nghiệm Người dùng (UX) hiện đại**:

    - Giao diện Dark Mode huyền bí, sử dụng hiệu ứng Glassmorphism và Neon Gold sang trọng.
    - Tương tác mượt mà: Mở khóa dịch vụ, Thêm vào giỏ hàng, Thanh toán ví điện tử tích hợp ngay trong ứng dụng.

3.  **Hệ thống Bảo mật & Tiện ích**:
    - **Đăng nhập QR Code**: Tính năng đăng nhập nhanh từ thiết bị di động (mô phỏng).
    - **Bảo vệ Dịch vụ (ServiceGuard)**: Cơ chế khóa nội dung cao cấp, yêu cầu người dùng mở khóa để truy cập, giúp tối ưu hóa doanh thu.

---

## 🛠 Những kiến thức công nghệ kỹ thuật học được

Trong quá trình xây dựng sản phẩm, đội ngũ đã nắm vững và áp dụng các công nghệ:

1.  **Frontend (ReactJS)**:

    - Quản lý State phức tạp với Context API (Auth, Alert, Cart).
    - Xử lý routing động và bảo vệ route (Protected Routes).
    - Tích hợp thư viện đồ thị và animation để hiển thị dữ liệu huyền học trực quan.

2.  **Backend (Laravel)**:

    - Xây dựng RESTful API chuẩn mực.
    - Xử lý logic phức tạp: Tính toán giỏ hàng, xác thực quyền sở hữu (Ownership Check), và quản lý giao dịch ví.
    - Tối ưu hóa Database với MySQL, xử lý các trường dữ liệu JSON cho đơn hàng linh hoạt.

3.  **Tích hợp Hệ thống**:
    - Cơ chế **Secure Auth (Sanctum)**: Token-based authentication.
    - Kỹ thuật xử lý bất đồng bộ (Async/Await) giữa Frontend và Backend để đảm bảo UX không bị gián đoạn.

---

## ❤️ Điều tâm đắc nhất

Điều khiến chúng tôi tâm đắc nhất là **sự liền mạch trong trải nghiệm người dùng ("Flow")**.
Từ lúc người dùng đăng nhập -> Nạp tiền vào ví -> Mở khóa dịch vụ -> Sử dụng dịch vụ; mọi bước đều diễn ra tự nhiên, không có cảm giác bị ngắt quãng bởi các lỗi kỹ thuật hay giao diện khó hiểu. Việc xây dựng thành công cơ chế **"Dùng thử -> Mở khóa -> Sở hữu vĩnh viễn"** là một điểm sáng lớn của dự án.

---

## 🧩 Những khó khăn gặp phải

1.  **Đồng bộ dữ liệu Phức tạp**:

    - Việc xử lý logic check quyền sở hữu (`checkOwnership`) gặp khó khăn do sự khác biệt kiểu dữ liệu (String ID vs Integer ID) trong Database.
    - _Giải pháp_: Đã chuẩn hóa toàn bộ ID sang dạng String (`sv-thansohoc`) và viết script migration để sửa dữ liệu cũ.

2.  **Xử lý Thanh toán & Giỏ hàng**:

    - Kết hợp giữa mua vật phẩm (số lượng nhiều) và mua dịch vụ (mở khóa 1 lần) trong cùng một giỏ hàng đòi hỏi logic xử lý riêng biệt.
    - _Giải pháp_: Tùy biến Frontend để tự động ẩn selector số lượng đối với dịch vụ, và điều hướng thông minh.

3.  **Deploy & Môi trường**:
    - Xung đột cổng (Port conflict) khi chạy local.
    - _Giải pháp_: Cấu hình linh hoạt port server và client để tránh xung đột.

---

## 🚀 Kế hoạch phát triển trong tương lai

1.  **Mở rộng Hệ sinh thái Huyền học**:

    - Tích hợp AI (ChatGPT/Gemini) để tự động luận giải lá số Tử Vi và Thần Số Học chi tiết hơn.
    - Thêm tính năng "Phòng Chat Trực Tiếp" với chuyên gia (Booking service).

2.  **Gamification Nâng cao**:

    - Hệ thống Nhiệm vụ hàng ngày (Daily Quests) để người dùng kiếm Linh Tệ miễn phí.
    - Bảng xếp hạng (Leaderboard) tu hành/học tập cho học viên.

3.  **Mobile App**:
    - Phát triển phiên bản React Native để mang trải nghiệm lên iOS và Android native.

---

_Dự án được thực hiện với niềm đam mê công nghệ và văn hóa phương Đông._
