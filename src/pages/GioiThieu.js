// src/pages/GioiThieu.js
import React from "react";
import "./GioiThieu.css";

const GioiThieu = () => {
  return (
    <div className="gt-page">
      {/* HERO */}
      <section className="gt-hero" id="top">
        <div className="gt-hero-overlay" />
        <div className="gt-hero-content container-gt">
          <p className="gt-badge">Hệ sinh thái AI Tâm linh</p>
          <h1 className="gt-title">
            Khoa học Tâm Linh
            <span> – Hệ sinh thái huyền học, dịch vụ & học viện</span>
          </h1>
          <p className="gt-subtitle">
            Nền tảng tích hợp Tarot – Mệnh lý – Phong thủy – Cửa hàng năng lượng
            – Học viện Huyền học, vận hành bằng AI và ví Linh Tệ.
          </p>
          <div className="gt-actions">
            <a href="#he-sinh-thai" className="btn-gt primary">
              Khám phá hệ sinh thái
            </a>
            <a href="#doi-tac" className="btn-gt ghost">
              Tham gia đồng hành
            </a>
          </div>
        </div>
      </section>

      {/* GIỚI THIỆU CHUNG */}
      <section className="gt-section" id="gioi-thieu">
        <div className="container-gt gt-grid-2">
          <div>
            <h2 className="gt-heading">Giới thiệu chung</h2>
            <p className="gt-text">
              “Khoa học Tâm Linh” là dự án được xây dựng để chuẩn hóa, số hóa và
              hiện đại hóa kho tri thức huyền học Đông – Tây, đồng thời kết nối
              với nhu cầu thực tế của người dùng Việt: xem Tarot, đọc lá số, tư
              vấn phong thủy, học tập và mua sắm sản phẩm tâm linh – tất cả trên
              một nền tảng.
            </p>
            <p className="gt-text">
              Dự án được thiết kế theo mô hình hệ sinh thái: <b>Dịch vụ</b> →{" "}
              <b>Cửa hàng</b> →<b>Học viện Huyền học</b> →{" "}
              <b>Tài khoản & Ví Linh Tệ</b>. Người dùng chỉ cần 1 tài khoản để
              trải nghiệm toàn bộ.
            </p>
          </div>
          <div className="gt-cards">
            <div className="gt-mini-card">
              <p className="gt-mini-label">Tầm nhìn</p>
              <h3>
                Trở thành hệ sinh thái huyền học số hóa hàng đầu tại Việt Nam.
              </h3>
            </div>
            <div className="gt-mini-card">
              <p className="gt-mini-label">Sứ mệnh</p>
              <h3>
                Đưa huyền học về đúng bản chất: khoa học – ứng dụng – dẫn dắt –
                có trách nhiệm – minh bạch.
              </h3>
            </div>
            <div className="gt-mini-card">
              <p className="gt-mini-label">Giá trị cốt lõi</p>
              <ul>
                <li>Chân – Chính – An – Thực</li>
                <li>Minh bạch dịch vụ</li>
                <li>Lấy người dùng làm trung tâm</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* HỆ SINH THÁI */}
      <section className="gt-section" id="he-sinh-thai">
        <div className="container-gt">
          <h2 className="gt-heading center">Hệ sinh thái Khoa học Tâm Linh</h2>
          <p className="gt-text center max-700">
            4 trụ chính – đồng bộ màu sắc, trải nghiệm và tài khoản.
          </p>
          <div className="gt-ecosystem">
            <div className="gt-eco-item">
              <h3>Dịch vụ Tâm linh AI</h3>
              <p>
                Tarot & Bài Trà, Mệnh & Lá số, Quẻ Kinh Dịch, Đặt lịch chuyên
                gia. Gợi ý bởi AI, thanh toán bằng Linh Tệ.
              </p>
              <span className="gt-tag">Dịch vụ</span>
            </div>
            <div className="gt-eco-item">
              <h3>Cửa hàng Năng lượng</h3>
              <p>
                Bài Tarot, phụ kiện tâm linh, hương – trầm – trà đạo, bộ sưu tập
                & chế tác riêng theo mệnh.
              </p>
              <span className="gt-tag">Cửa hàng</span>
            </div>
            <div className="gt-eco-item">
              <h3>Học viện Huyền học</h3>
              <p>
                Đào tạo theo Ngũ Huyền Thuật: Mệnh – Tướng – Bốc – Trạch – Số.
                Có cấp bậc & chứng chỉ nội bộ.
              </p>
              <span className="gt-tag">Học viện</span>
            </div>
            <div className="gt-eco-item">
              <h3>Tài khoản & Ví Linh Tệ</h3>
              <p>
                1 tài khoản dùng cho mọi phân hệ. Có 2FA, nhiệm vụ, hộp thư, giỏ
                hàng, lịch sử giao dịch.
              </p>
              <span className="gt-tag">Tài khoản</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3 NHÓM ĐỐI TƯỢNG */}
      <section className="gt-section" id="doi-tuong">
        <div className="container-gt">
          <h2 className="gt-heading center">Dành cho 3 nhóm đối tượng</h2>
          <p className="gt-text center max-700">
            Trang Giới thiệu này phục vụ 3 nhóm chính giống như Trang Liên hệ.
          </p>
          <div className="gt-roles">
            <div className="gt-role-box">
              <p className="gt-role-badge">Nhóm Đồng hành</p>
              <h3>Cộng tác viên, Dev, Kiểm duyệt viên</h3>
              <p>
                Tham gia phát triển hệ thống, bổ sung nội dung huyền học, kiểm
                duyệt bài viết, phát triển AI và tính năng mới.
              </p>
              <ul className="gt-role-list">
                <li>Tham gia từng module</li>
                <li>Được credit trong hệ thống</li>
                <li>Chia sẻ doanh thu theo sản phẩm</li>
              </ul>
              <a href="#lien-he" className="btn-gt small">
                Gửi đề xuất
              </a>
            </div>

            <div className="gt-role-box gt-role-highlight">
              <p className="gt-role-badge">Nhóm Đầu tư</p>
              <h3>Nhà đầu tư & Đối tác kinh doanh</h3>
              <p>
                Kết nối để mở rộng sản phẩm (tour tâm linh, workshop, offline),
                tích hợp thanh toán, mở rộng thị trường Việt – Úc.
              </p>
              <ul className="gt-role-list">
                <li>Mô hình doanh thu rõ ràng</li>
                <li>Branding cố định</li>
                <li>Có lộ trình mở rộng</li>
              </ul>
              <a href="#doi-tac" className="btn-gt primary small">
                Nhận deck giới thiệu
              </a>
            </div>

            <div className="gt-role-box">
              <p className="gt-role-badge">Nhóm Khách hàng</p>
              <h3>Người dùng & Học viên</h3>
              <p>
                Sử dụng dịch vụ xem, mua sản phẩm năng lượng, đăng ký học từng
                bộ môn trong Ngũ Huyền Thuật.
              </p>
              <ul className="gt-role-list">
                <li>Trải nghiệm miễn phí một phần</li>
                <li>Có hệ thống bài học</li>
                <li>Hỗ trợ trực tiếp qua hộp thư</li>
              </ul>
              <a href="#he-sinh-thai" className="btn-gt small">
                Xem hệ sinh thái
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ĐỘI NGŨ & CỐ VẤN */}
      <section className="gt-section" id="doi-ngu">
        <div className="container-gt gt-grid-2 gap-40">
          <div>
            <h2 className="gt-heading">Đội ngũ & Cố vấn</h2>
            <p className="gt-text">
              Dự án được khởi xướng và phát triển bởi <b>Đỗ Khắc Gia Khoa</b>{" "}
              (Developer & AI Integration). Phần kết nối, truyền thông, hợp tác
              và mạng lưới do <b>bà Đỗ Thị Tú Anh</b> phụ trách (Cố vấn chiến
              lược, truyền thông & kết nối kinh doanh).
            </p>
            <p className="gt-text">
              Các cộng tác viên sẽ được ghi nhận trong từng module (Dịch vụ, Cửa
              hàng, Học viện, Tài khoản).
            </p>
          </div>
          <div className="gt-team-cards">
            <div className="gt-team-card">
              <h3>Đỗ Khắc Gia Khoa</h3>
              <p className="gt-team-role">Founder – Dev – AI Integration</p>
              <p className="gt-team-text">
                Xây dựng toàn bộ kiến trúc React, định nghĩa Navbar 7 mục, mega
                menu 4 nhóm, hệ thống học viện Ngũ Huyền Thuật và ví Linh Tệ.
              </p>
            </div>
            <div className="gt-team-card">
              <h3>Đỗ Thị Tú Anh</h3>
              <p className="gt-team-role">Cố vấn chiến lược & Truyền thông</p>
              <p className="gt-team-text">
                Kết nối mạng lưới doanh nhân, đầu tư, đào tạo, triển khai hợp
                tác và dẫn dắt truyền thông.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HỢP TÁC & ĐỒNG HÀNH */}
      <section className="gt-section" id="doi-tac">
        <div className="container-gt gt-grid-2">
          <div>
            <h2 className="gt-heading">Hợp tác & Đồng hành</h2>
            <p className="gt-text">
              Chúng tôi mở cổng hợp tác cho các đơn vị, doanh nhân, chuyên gia
              huyền học, cộng đồng tâm linh, nền tảng thanh toán, đơn vị tổ chức
              workshop/retreat và các nhóm quan tâm tới thị trường Việt – Úc.
            </p>
            <p className="gt-text">
              Mỗi hợp tác sẽ có form rõ ràng, minh bạch, có thể tích hợp ngay
              vào hệ thống (dịch vụ, cửa hàng, học viện).
            </p>
            <ul className="gt-bullet">
              <li>Hợp tác dịch vụ tâm linh</li>
              <li>Hợp tác đào tạo & cấp chứng chỉ nội bộ</li>
              <li>
                Hợp tác sản phẩm vật lý (hương – trầm – trà, chế tác riêng)
              </li>
              <li>Hợp tác truyền thông, KOL, cộng đồng</li>
            </ul>
          </div>
          <div className="gt-form-box">
            <h3>Gửi yêu cầu hợp tác</h3>
            <p>Điền nhanh thông tin để đội ngũ liên hệ lại.</p>
            <form className="gt-form">
              <input type="text" placeholder="Tên của bạn / đơn vị" required />
              <input type="email" placeholder="Email liên hệ" required />
              <input type="tel" placeholder="Số điện thoại / Zalo" />
              <select>
                <option>Chọn nhóm hợp tác</option>
                <option>Dịch vụ Tâm linh</option>
                <option>Cửa hàng & sản phẩm</option>
                <option>Học viện Huyền học</option>
                <option>Đầu tư – mở rộng</option>
              </select>
              <textarea rows="4" placeholder="Mô tả nhanh nhu cầu của bạn..." />
              <button type="submit" className="btn-gt primary full">
                Gửi yêu cầu
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* CHÍNH SÁCH & BẢO MẬT */}
      <section className="gt-section" id="chinh-sach">
        <div className="container-gt">
          <h2 className="gt-heading center">Chính sách & Bảo mật</h2>
          <p className="gt-text center max-700">
            Áp dụng chính sách sử dụng giống như trên Trang Liên hệ. Dữ liệu
            người dùng được bảo vệ, có cảnh báo nếu chưa bật 2FA.
          </p>
          <div className="gt-policy-cards">
            <div className="gt-policy-card">
              <h3>Minh bạch dịch vụ</h3>
              <p>
                Mọi gói xem, gói học, gói sản phẩm đều có mô tả & giá rõ ràng.
              </p>
            </div>
            <div className="gt-policy-card">
              <h3>Bảo mật tài khoản</h3>
              <p>
                Hỗ trợ Email OTP, App OTP (Google Auth/Authy). Gửi mã khôi phục.
                Tài khoản dùng cho toàn hệ thống.
              </p>
            </div>
            <div className="gt-policy-card">
              <h3>Quyền riêng tư</h3>
              <p>
                Không chia sẻ dữ liệu mệnh lý, lá số, tarot, phong thủy cho bên
                thứ 3 nếu không có sự đồng ý.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LIÊN HỆ NHANH */}
      <section className="gt-section" id="lien-he">
        <div className="container-gt gt-contact">
          <div>
            <h2 className="gt-heading">Liên hệ nhanh</h2>
            <p className="gt-text">
              Địa chỉ: <b>Zurich 1, Vinhomes Ocean Park, Gia Lâm, Hà Nội</b>
            </p>
            <p className="gt-text">
              Hotline/Zalo: <b>0799 958 589</b>
            </p>
            <p className="gt-text">
              Email: <b>contact@dokhacgiakhoa.vn</b>
            </p>
            <p className="gt-text">
              Mạng xã hội: Facebook, YouTube, TikTok, Instagram, Zalo.
            </p>
          </div>
          <div className="gt-map-box">
            {/* cậu thay iframe Google Map Zurich 1 bản thật vào đây */}
            <div className="gt-map-placeholder">
              Google Map – Zurich 1, Vinhomes Ocean Park
            </div>
          </div>
        </div>
      </section>

      {/* FOOT NOTE */}
      <footer className="gt-footer">
        © 2025 Khoa học Tâm Linh – Thiết kế & phát triển bởi Đỗ Khắc Gia Khoa.
      </footer>
    </div>
  );
};

export default GioiThieu;
