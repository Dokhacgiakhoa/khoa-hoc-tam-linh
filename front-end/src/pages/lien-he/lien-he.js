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
          {[
            {
              title: "Nhóm Đồng hành",
              desc: "Dành cho Cộng tác viên, Dev và Kiểm duyệt viên – những người cùng phát triển hệ sinh thái.",
              cta: "Đăng ký đồng hành",
              icon: "🤝",
              id: "form-dong-hanh",
            },
            {
              title: "Nhóm Đầu tư",
              desc: "Dành cho Nhà đầu tư và Đối tác mong muốn hợp tác phát triển mô hình công nghệ – tâm linh.",
              cta: "Kết nối đầu tư",
              icon: "💼",
              id: "form-dau-tu",
            },
            {
              title: "Nhóm Khách hàng",
              desc: "Dành cho người dùng, học viên cần hỗ trợ về dịch vụ, tài khoản hoặc ví Linh Tệ.",
              cta: "Gửi yêu cầu hỗ trợ",
              icon: "🌙",
              id: "form-khach-hang",
            },
          ].map((item, i) => (
            <div className="col-md-4" key={i}>
              <div className="glass-card contact-group-card h-100 p-4 text-center hover-up">
                <div className="fs-1 mb-3">{item.icon}</div>
                <h3 className="fw-semibold text-gold mb-3">{item.title}</h3>
                <p className="opacity-75 mb-4">{item.desc}</p>
                <div className="mt-auto">
                  <a
                    href={`#${item.id}`}
                    className="btn btn-outline-gold w-100"
                  >
                    {item.cta}
                  </a>
                </div>
              </div>
            </div>
          ))}
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
                  <strong>Địa chỉ:</strong> FPT Academy International, 13 Trịnh
                  Văn Bô, Nam Từ Liêm, Hà Nội
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
                  title="Google Map - FPT Academy International"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8638558832!2d105.744598415332!3d21.038132792613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454b991d80fd5%3A0x530c45fa987abb80!2zRlBUIFBvbHl0ZWNobmljIEjDoCBO4buZaQ!5e0!3m2!1svi!2s!4v1699999999999"
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
    </section>
  );
}
