import React from "react";
import { Link } from "react-router-dom";
import "./gioi-thieu.css";

/**
 * File: src/pages/gioi-thieu/gioi-thieu.js
 * Trang Giới thiệu (landing) – theo cấu trúc đã lưu:
 * - Hero
 * - Giới thiệu chung (khái niệm, giá trị cốt lõi, tầm nhìn & sứ mệnh, câu chuyện)
 * - Hệ sinh thái: Dịch vụ – Cửa hàng – Học viện – Tài khoản/Ví Linh Tệ
 * - 3 nhóm đối tượng: Đồng hành – Đầu tư – Khách hàng
 * - Đội ngũ & Cố vấn
 * - Hợp tác & Đồng hành (quy trình)
 * - Chính sách & Bảo mật
 * - Liên hệ nhanh + Google Map Zurich 1 (full width)
 */

function GioiThieu() {
  return (
    <main id="gioi-thieu" className="khctl-page">
      {/* === HERO === */}
      <section className="about-hero">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-7">
              <h1 className="hero-title mb-2">Giới thiệu</h1>
              <p className="about-sub">
                Hệ sinh thái <strong>Khoa học Tâm Linh</strong> – kết hợp tri
                thức huyền học và công nghệ AI để mang lại trải nghiệm{" "}
                <em>khoa học, dễ tiếp cận, không mê tín</em>.
              </p>
              <div className="d-flex gap-2 mt-3">
                <Link to="/dich-vu" className="btn btn-gold">
                  Khám phá dịch vụ
                </Link>
                <Link to="/lien-he" className="btn btn-outline-gold">
                  Tham gia đồng hành
                </Link>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="about-hero-media card-3d">
                <div className="card-media">
                  <img
                    src={
                      process.env.PUBLIC_URL + "/images/hero-gioi-thieu.webp"
                    }
                    alt="Khoa học Tâm Linh – Hero"
                  />
                </div>
                <div className="card-body">
                  <div className="card-text opacity-90">
                    Video/ảnh minh họa hệ sinh thái (có thể thay bằng video
                    ngắn).
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === GIỚI THIỆU CHUNG === */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">Tổng quan hệ sinh thái</h2>
            <p className="section-desc">
              Kết nối Dịch vụ Tâm linh AI, Cửa hàng Năng lượng, Học viện Huyền
              học, và Tài khoản/Ví Linh Tệ trong một trải nghiệm thống nhất.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-6 col-xl-3">
              <div className="card-3d h-100">
                <div className="card-body">
                  <h3 className="feature-title">Khái niệm</h3>
                  <p className="card-text">
                    Số hóa tâm linh → tiếp cận bằng tư duy duy vật & dữ liệu,
                    tránh thần bí hóa.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-xl-3">
              <div className="card-3d h-100">
                <div className="card-body">
                  <h3 className="feature-title">Giá trị cốt lõi</h3>
                  <ul className="kv-list">
                    <li>Khoa học & minh bạch</li>
                    <li>Ứng dụng thực tế</li>
                    <li>Tôn trọng văn hóa</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-xl-3">
              <div className="card-3d h-100">
                <div className="card-body">
                  <h3 className="feature-title">Tầm nhìn & Sứ mệnh</h3>
                  <p className="card-text">
                    Đưa huyền học trở nên dễ học – dễ hiểu – có ích; dùng AI để
                    cá nhân hóa.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-xl-3">
              <div className="card-3d h-100">
                <div className="card-body">
                  <h3 className="feature-title">Câu chuyện</h3>
                  <p className="card-text">
                    Từ niềm tin “tri thức phải hữu dụng” đến hệ sinh thái số hóa
                    toàn diện.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === HỆ SINH THÁI === */}
      <section className="section alt">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">Hệ sinh thái</h2>
            <p className="section-desc">Bốn trụ chính được kết nối chặt chẽ.</p>
          </div>
          <div className="row g-4">
            {[
              {
                to: "/dich-vu",
                title: "Dịch vụ Tâm linh AI",
                text: "Tarot & Bài Trà, Bản đồ sao, Tử vi & Thần số học, Đặt lịch chuyên gia.",
              },
              {
                to: "/cua-hang",
                title: "Cửa hàng Năng lượng",
                text: "Bài Tâm linh, Phụ kiện, Hương–Trầm–Trà đạo, Bộ sưu tập & Cao cấp, Set quà, Chế tác riêng.",
              },
              {
                to: "/hoc-vien-huyen-hoc",
                title: "Học viện Huyền học",
                text: "Ngũ Huyền Thuật: Mệnh – Tướng – Bốc – Trạch – Số; lộ trình từ Tân học đến Bậc Thầy.",
              },
              {
                to: "/tai-khoan",
                title: "Tài khoản & Ví Linh Tệ",
                text: "Hồ sơ & cấp độ, ví token, nhiệm vụ, hộp thư, bảo mật 2FA.",
              },
            ].map((item, i) => (
              <div className="col-md-6 col-xl-3" key={i}>
                <div className="card-3d h-100">
                  <div className="card-body">
                    <h3 className="feature-title">{item.title}</h3>
                    <p className="card-text">{item.text}</p>
                    <div className="d-flex">
                      <Link to={item.to} className="btn btn-gold">
                        Xem chi tiết
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === 3 NHÓM ĐỐI TƯỢNG === */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">Ai nên tham gia?</h2>
            <p className="section-desc">
              Ba nhóm chính: Đồng hành – Đầu tư – Khách hàng / Học viên.
            </p>
          </div>

          <div className="row g-4">
            {/* Đồng hành */}
            <div className="col-md-6 col-xl-4">
              <div className="card-3d h-100">
                <div className="card-body">
                  <h3 className="feature-title">Nhóm Đồng hành</h3>
                  <ul className="kv-list">
                    <li>Cộng tác viên nội dung</li>
                    <li>Dev (Frontend/Backend/AI)</li>
                    <li>Kiểm duyệt viên cộng đồng</li>
                  </ul>
                  <div className="d-flex">
                    <Link to="/lien-he" className="btn btn-outline-gold">
                      Ứng tuyển
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Đầu tư */}
            <div className="col-md-6 col-xl-4">
              <div className="card-3d h-100">
                <div className="card-body">
                  <h3 className="feature-title">Nhóm Đầu tư</h3>
                  <ul className="kv-list">
                    <li>Nhà đầu tư</li>
                    <li>Đối tác kinh doanh</li>
                    <li>Liên kết sản phẩm – kênh phân phối</li>
                  </ul>
                  <div className="d-flex">
                    <Link to="/lien-he" className="btn btn-outline-gold">
                      Kết nối ngay
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Khách hàng */}
            <div className="col-md-6 col-xl-4">
              <div className="card-3d h-100">
                <div className="card-body">
                  <h3 className="feature-title">Khách hàng / Học viên</h3>
                  <ul className="kv-list">
                    <li>Trải nghiệm dịch vụ AI</li>
                    <li>Học viện Huyền học – lộ trình rõ ràng</li>
                    <li>Mua sắm sản phẩm năng lượng</li>
                  </ul>
                  <div className="d-flex gap-2">
                    <Link to="/dich-vu" className="btn btn-gold">
                      Dùng thử
                    </Link>
                    <Link
                      to="/hoc-vien-huyen-hoc"
                      className="btn btn-outline-gold"
                    >
                      Xem Học viện
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === ĐỘI NGŨ & CỐ VẤN === */}
      <section className="section alt">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">Đội ngũ & Cố vấn</h2>
            <p className="section-desc">Một số gương mặt tiêu biểu.</p>
          </div>

          <div className="row g-4">
            <div className="col-md-6 col-xl-3">
              <div className="member card-3d h-100 text-center">
                <div className="card-media">
                  <img
                    src={process.env.PUBLIC_URL + "/images/team-khoa.webp"}
                    alt="Đỗ Khắc Gia Khoa"
                  />
                </div>
                <div className="card-body">
                  <h3 className="member-name">Đỗ Khắc Gia Khoa</h3>
                  <div className="member-role opacity-90">
                    Founder – Dev & Chiến lược AI
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-xl-3">
              <div className="member card-3d h-100 text-center">
                <div className="card-media">
                  <img
                    src={process.env.PUBLIC_URL + "/images/team-tuanh.webp"}
                    alt="Đỗ Thị Tú Anh"
                  />
                </div>
                <div className="card-body">
                  <h3 className="member-name">Đỗ Thị Tú Anh</h3>
                  <div className="member-role opacity-90">
                    Cố vấn – Truyền thông & Kết nối
                  </div>
                </div>
              </div>
            </div>

            {/* Có thể bổ sung thêm advisor/mentor khác sau */}
          </div>
        </div>
      </section>

      {/* === HỢP TÁC & ĐỒNG HÀNH === */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">Hợp tác & Đồng hành</h2>
            <p className="section-desc">Quy trình 4 bước nhanh gọn.</p>
          </div>

          <div className="row g-4">
            {[
              {
                step: "01",
                title: "Kết nối",
                text: "Điền form / liên hệ trực tiếp.",
              },
              {
                step: "02",
                title: "Trao đổi",
                text: "Nhu cầu – năng lực – phạm vi.",
              },
              {
                step: "03",
                title: "Thử việc/POC",
                text: "Task ngắn để kiểm chứng.",
              },
              {
                step: "04",
                title: "Ký kết",
                text: "Chính sách, KPI & lộ trình.",
              },
            ].map((s, i) => (
              <div className="col-md-6 col-xl-3" key={i}>
                <div className="step card-3d h-100">
                  <div className="card-body">
                    <div className="step-index">{s.step}</div>
                    <h3 className="feature-title mb-1">{s.title}</h3>
                    <p className="card-text">{s.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="d-flex gap-2 justify-content-center mt-3">
            <Link to="/lien-he" className="btn btn-gold">
              Đăng ký đối tác
            </Link>
            <Link to="/lien-he" className="btn btn-outline-gold">
              Liên hệ nhanh
            </Link>
          </div>
        </div>
      </section>

      {/* === CHÍNH SÁCH & BẢO MẬT === */}
      <section className="section alt">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">Chính sách & Bảo mật</h2>
          </div>
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="card-3d h-100">
                <div className="card-body">
                  <h3 className="feature-title">Nguyên tắc sử dụng</h3>
                  <ul className="kv-list">
                    <li>Tôn trọng cộng đồng & bản quyền.</li>
                    <li>Minh bạch thông tin dịch vụ & thanh toán.</li>
                    <li>Bảo vệ dữ liệu cá nhân, 2FA khuyến nghị.</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card-3d h-100">
                <div className="card-body">
                  <h3 className="feature-title">Tuyên bố bảo mật</h3>
                  <p className="card-text">
                    Dữ liệu chỉ dùng cho mục đích trải nghiệm & cải thiện dịch
                    vụ; tuân thủ pháp luật hiện hành và chính sách nội bộ.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === LIÊN HỆ NHANH + MAP === */}
      <section className="section contact-quick">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">Liên hệ nhanh</h2>
          </div>

          <div className="row g-4 align-items-center">
            <div className="col-lg-5">
              <div className="card-3d h-100">
                <div className="card-body">
                  <ul className="contact-list">
                    <li>
                      <strong>Địa chỉ:</strong> Zurich 1, Vinhomes Ocean Park,
                      Gia Lâm, Hà Nội
                    </li>
                    <li>
                      <strong>Hotline/Zalo:</strong> 0799 958 589
                    </li>
                    <li>
                      <strong>Email:</strong> contact@dokhacgiakhoa.vn
                    </li>
                    <li>
                      <strong>Website:</strong> www.khoahoctamlinh.vn
                    </li>
                    <li>
                      <strong>Mạng xã hội:</strong> Facebook · YouTube · TikTok
                      · Instagram · Zalo
                    </li>
                  </ul>
                  <div className="d-flex gap-2">
                    <Link to="/lien-he" className="btn btn-gold">
                      Gửi yêu cầu
                    </Link>
                    <Link to="/tai-khoan" className="btn btn-outline-gold">
                      Đăng nhập
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="map-wrap card-3d">
                <div className="map-embed">
                  <iframe
                    title="Google Map – Zurich 1, Vinhomes Ocean Park"
                    loading="lazy"
                    allowFullScreen
                    src="https://www.google.com/maps?q=Zurich%201%2C%20Vinhomes%20Ocean%20Park%2C%20Gia%20L%C3%A2m%2C%20H%C3%A0%20N%E1%BB%99i&output=embed"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default GioiThieu;
