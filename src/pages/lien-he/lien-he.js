import React from "react";
import "./lien-he.css";

export default function LienHe() {
  return (
    <section id="lien-he" className="lien-he-page">
      {/* ===== HERO SECTION ===== */}
      <header className="lien-he-hero text-center text-white py-5">
        <div className="container">
          <h1 className="fw-bold display-5 mb-3">Liên hệ & Đồng hành</h1>
          <p className="lead opacity-75 mx-auto" style={{ maxWidth: "720px" }}>
            Kết nối cùng hệ sinh thái Khoa học Tâm Linh – nơi giao thoa giữa tri
            thức, năng lượng và công nghệ. Hãy chọn nhóm phù hợp để bắt đầu hành
            trình cùng chúng tôi.
          </p>
        </div>
      </header>

      {/* ===== NHÓM LIÊN HỆ ===== */}
      <div className="container py-5">
        <div className="row g-4">
          {/* 1️⃣ NHÓM ĐỒNG HÀNH */}
          <div className="col-md-4">
            <div className="card-3d h-100 p-4 d-flex flex-column">
              <h3 className="fw-semibold text-gold mb-3">Nhóm Đồng hành 🤝</h3>
              <p className="flex-grow-1">
                Dành cho <strong>Cộng tác viên, Dev</strong> và{" "}
                <strong>Kiểm duyệt viên</strong> – những người cùng phát triển
                hệ sinh thái và lan tỏa giá trị huyền học hiện đại.
              </p>
              <a href="#form-dong-hanh" className="kh-cta mt-auto">
                Đăng ký đồng hành
              </a>
            </div>
          </div>

          {/* 2️⃣ NHÓM ĐẦU TƯ */}
          <div className="col-md-4">
            <div className="card-3d h-100 p-4 d-flex flex-column">
              <h3 className="fw-semibold text-gold mb-3">Nhóm Đầu tư 💼</h3>
              <p className="flex-grow-1">
                Dành cho <strong>Nhà đầu tư</strong> và{" "}
                <strong>Đối tác kinh doanh</strong> mong muốn hợp tác phát triển
                mô hình công nghệ – tâm linh, mở rộng thị trường và hệ sinh thái
                Linh Tệ.
              </p>
              <a href="#form-dau-tu" className="kh-cta mt-auto">
                Kết nối đầu tư
              </a>
            </div>
          </div>

          {/* 3️⃣ NHÓM KHÁCH HÀNG */}
          <div className="col-md-4">
            <div className="card-3d h-100 p-4 d-flex flex-column">
              <h3 className="fw-semibold text-gold mb-3">Nhóm Khách hàng 🌙</h3>
              <p className="flex-grow-1">
                Dành cho <strong>người dùng, học viên,</strong> và{" "}
                <strong>khách mua hàng</strong> cần hỗ trợ về dịch vụ, tài khoản
                hoặc ví Linh Tệ.
              </p>
              <a href="#form-khach-hang" className="kh-cta mt-auto">
                Gửi yêu cầu hỗ trợ
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ===== THÔNG TIN LIÊN HỆ ===== */}
      <div className="lien-he-info text-white py-5">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-md-6">
              <h2 className="fw-bold mb-3">Thông tin liên hệ</h2>
              <ul className="list-unstyled mb-4">
                <li>
                  <strong>Địa chỉ:</strong> Zurich 1, Vinhomes Ocean Park, Gia
                  Lâm, Hà Nội
                </li>
                <li>
                  <strong>Hotline/Zalo:</strong> 0799 958 589
                </li>
                <li>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:contact@dokhacgiakhoa.vn"
                    className="link-gold"
                  >
                    contact@dokhacgiakhoa.vn
                  </a>
                </li>
                <li>
                  <strong>Website:</strong>{" "}
                  <a
                    href="https://www.khoahoctamlinh.vn"
                    target="_blank"
                    rel="noreferrer"
                    className="link-gold"
                  >
                    www.khoahoctamlinh.vn
                  </a>
                </li>
              </ul>

              <div className="social-links d-flex gap-3">
                <a href="https://facebook.com" className="link-gold">
                  Facebook
                </a>
                <a href="https://youtube.com" className="link-gold">
                  YouTube
                </a>
                <a href="https://tiktok.com" className="link-gold">
                  TikTok
                </a>
                <a href="https://instagram.com" className="link-gold">
                  Instagram
                </a>
                <a href="https://zalo.me/0799958589" className="link-gold">
                  Zalo
                </a>
              </div>
            </div>

            <div className="col-md-6">
              <div className="map-wrapper rounded-4 overflow-hidden shadow">
                <iframe
                  title="Google Map - Zurich 1 Ocean Park"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.992481258448!2d105.946438!3d20.971048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135a6d5a3e6b9b3%3A0x76c8dfc0e5b9bca!2sZurich%201%20-%20Vinhomes%20Ocean%20Park!5e0!3m2!1svi!2s!4v1696431234567!5m2!1svi!2s"
                  width="100%"
                  height="320"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== COPYRIGHT ===== */}
      <footer className="text-center text-white py-4 border-top border-light-subtle">
        <small>
          © 2025 Khoa học Tâm Linh – Thiết kế & phát triển bởi Đỗ Khắc Gia Khoa
        </small>
      </footer>
    </section>
  );
}
