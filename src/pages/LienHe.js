// src/pages/LienHe.js
import React, { useState } from "react";
import "./LienHe.css";

const LienHe = () => {
  const [activeTab, setActiveTab] = useState("dong-hanh");

  const renderForm = () => {
    switch (activeTab) {
      case "dong-hanh":
        return (
          <form className="lh-form">
            <div className="lh-form-grid">
              <div className="lh-form-group">
                <label>Họ và tên *</label>
                <input type="text" placeholder="Nhập họ tên của bạn" required />
              </div>
              <div className="lh-form-group">
                <label>Email *</label>
                <input type="email" placeholder="you@example.com" required />
              </div>
              <div className="lh-form-group">
                <label>Số điện thoại *</label>
                <input type="tel" placeholder="0799 958 589" required />
              </div>
              <div className="lh-form-group">
                <label>Vai trò muốn tham gia *</label>
                <select defaultValue="ctv">
                  <option value="ctv">Cộng tác viên</option>
                  <option value="dev">Dev / Kỹ thuật</option>
                  <option value="kiem-duyet">Kiểm duyệt viên</option>
                  <option value="khac">Khác...</option>
                </select>
              </div>
            </div>
            <div className="lh-form-group">
              <label>Ghi chú thêm</label>
              <textarea
                rows="4"
                placeholder="Mô tả ngắn về kỹ năng, kinh nghiệm hoặc mong muốn hợp tác"
              ></textarea>
            </div>
            <button type="submit" className="lh-btn-gold">
              Gửi đăng ký đồng hành
            </button>
          </form>
        );
      case "dau-tu":
        return (
          <form className="lh-form">
            <div className="lh-form-grid">
              <div className="lh-form-group">
                <label>Họ và tên / Tên tổ chức *</label>
                <input
                  type="text"
                  placeholder="VD: Nguyễn Văn A / Công ty ABC"
                  required
                />
              </div>
              <div className="lh-form-group">
                <label>Email liên hệ *</label>
                <input type="email" placeholder="invest@company.com" required />
              </div>
              <div className="lh-form-group">
                <label>Số điện thoại *</label>
                <input type="tel" placeholder="+84 ..." required />
              </div>
              <div className="lh-form-group">
                <label>Mục đích *</label>
                <select defaultValue="nha-dau-tu">
                  <option value="nha-dau-tu">Nhà đầu tư</option>
                  <option value="doi-tac-kinh-doanh">Đối tác kinh doanh</option>
                  <option value="tai-tro">Tài trợ / Đồng hành</option>
                </select>
              </div>
            </div>
            <div className="lh-form-group">
              <label>Mô tả ngắn dự án / đề xuất *</label>
              <textarea
                rows="4"
                placeholder="Cho chúng tôi biết bạn muốn hợp tác ở giai đoạn nào, ngân sách dự kiến, hình thức đầu tư..."
              ></textarea>
            </div>
            <button type="submit" className="lh-btn-gold">
              Gửi đề xuất hợp tác
            </button>
          </form>
        );
      case "khach-hang":
      default:
        return (
          <form className="lh-form">
            <div className="lh-form-grid">
              <div className="lh-form-group">
                <label>Họ và tên *</label>
                <input type="text" placeholder="Nhập họ tên của bạn" required />
              </div>
              <div className="lh-form-group">
                <label>Email *</label>
                <input type="email" placeholder="you@example.com" required />
              </div>
              <div className="lh-form-group">
                <label>Số điện thoại / Zalo *</label>
                <input type="tel" placeholder="0799 958 589" required />
              </div>
              <div className="lh-form-group">
                <label>Nhóm cần hỗ trợ *</label>
                <select defaultValue="tai-khoan">
                  <option value="tai-khoan">Tài khoản, đăng nhập, 2FA</option>
                  <option value="dich-vu">
                    Dịch vụ Tarot, Lá số, Đặt lịch
                  </option>
                  <option value="hoc-vien">
                    Học viên, khóa học, chứng chỉ
                  </option>
                  <option value="cua-hang">
                    Cửa hàng, đơn hàng, thanh toán
                  </option>
                  <option value="vi-linh-te">Ví Linh Tệ / COD</option>
                </select>
              </div>
            </div>
            <div className="lh-form-group">
              <label>Nội dung cần hỗ trợ *</label>
              <textarea
                rows="4"
                placeholder="Mô tả chi tiết vấn đề bạn đang gặp phải để đội ngũ hỗ trợ nhanh hơn"
              ></textarea>
            </div>
            <button type="submit" className="lh-btn-gold">
              Gửi yêu cầu hỗ trợ
            </button>
          </form>
        );
    }
  };

  return (
    <div className="lienhe-page">
      {/* Hero */}
      <section className="lh-hero">
        <div className="lh-hero-overlay" />
        <div className="lh-hero-content container">
          <p className="lh-badge">Liên hệ • Khoa học Tâm linh</p>
          <h1>Hợp tác, đầu tư và hỗ trợ hệ sinh thái Tâm linh AI</h1>
          <p className="lh-subtitle">
            Trang này dành cho 3 nhóm: <strong>Đồng hành</strong> (CTV, Dev,
            Kiểm duyệt viên),
            <strong> Đầu tư</strong> (nhà đầu tư, đối tác kinh doanh) và
            <strong> Khách hàng</strong> (người dùng, học viên, khách mua hàng).
          </p>
          <div className="lh-hero-actions">
            <button
              className={
                activeTab === "khach-hang" ? "lh-btn-gold" : "lh-btn-outline"
              }
              onClick={() => setActiveTab("khach-hang")}
            >
              Cần hỗ trợ ngay
            </button>
            <a href="#lh-info" className="lh-text-link">
              Xem thông tin liên hệ ↓
            </a>
          </div>
        </div>
      </section>

      {/* Main */}
      <section className="lh-main container">
        <div className="lh-left">
          <div className="lh-tabs">
            <button
              className={activeTab === "dong-hanh" ? "active" : ""}
              onClick={() => setActiveTab("dong-hanh")}
            >
              1. Nhóm Đồng hành
              <span>Cộng tác viên • Dev • Kiểm duyệt viên</span>
            </button>
            <button
              className={activeTab === "dau-tu" ? "active" : ""}
              onClick={() => setActiveTab("dau-tu")}
            >
              2. Nhóm Đầu tư
              <span>Nhà đầu tư • Đối tác kinh doanh</span>
            </button>
            <button
              className={activeTab === "khach-hang" ? "active" : ""}
              onClick={() => setActiveTab("khach-hang")}
            >
              3. Nhóm Khách hàng
              <span>Dịch vụ • Học viện • Cửa hàng • Ví Linh Tệ</span>
            </button>
          </div>

          <div className="lh-form-wrapper">
            {renderForm()}
            <p className="lh-note">
              * Sau khi gửi, đội ngũ sẽ phản hồi qua email/Zalo đã cung cấp.
              Thời gian xử lý trong giờ hành chính (GMT+7).
            </p>
          </div>
        </div>

        <div className="lh-right" id="lh-info">
          <div className="lh-card">
            <h3>Thông tin liên hệ</h3>
            <p>
              <strong>Địa chỉ:</strong> Zurich 1, Vinhomes Ocean Park, Gia Lâm,
              Hà Nội
            </p>
            <p>
              <strong>Hotline/Zalo:</strong>{" "}
              <a href="tel:0799958589">0799 958 589</a>
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:contact@dokhacgiakhoa.vn">
                contact@dokhacgiakhoa.vn
              </a>
            </p>
            <p>
              <strong>Website:</strong> khoahoctamlinh.vn
            </p>
            <p>
              <strong>Mạng xã hội:</strong> Facebook, YouTube, TikTok,
              Instagram, Zalo
            </p>
          </div>

          <div className="lh-card">
            <h3>Chính sách & Bảo mật</h3>
            <ul className="lh-list">
              <li>Cam kết bảo mật thông tin người dùng</li>
              <li>Hợp tác rõ ràng, có điều khoản</li>
              <li>Hỗ trợ học viên và khách hàng ưu tiên</li>
              <li>Hỗ trợ nhà đầu tư theo lộ trình</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="lh-map-section">
        <div className="container">
          <h2>Bản đồ & Văn phòng làm việc</h2>
          <p>Zurich 1, Vinhomes Ocean Park, Gia Lâm, Hà Nội</p>
        </div>
        <div className="lh-map-wrapper">
          <iframe
            title="Google Map Zurich 1 Ocean Park"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3726.9861266534207!2d105.9482555760353!3d20.92970908068464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135a96f9e1184db%3A0xe2f25ef8773f771e!2sVinhomes%20Ocean%20Park!5e0!3m2!1svi!2svi!4v1700000000000!5m2!1svi!2svi"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default LienHe;
