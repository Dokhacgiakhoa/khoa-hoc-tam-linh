import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <Footer className="khtl-Footer">
      <div className="container">
        <div className="row gy-4">
          {/* Cột 1 */}
          <div className="col-md-3">
            <h5 className="Footer-title">KHOA HỌC TÂM LINH</h5>
            <p className="Footer-text">
              Hệ thống ứng dụng Huyền học – Công nghệ – Trải nghiệm AI.
            </p>
            <ul className="Footer-list">
              <li>Về Khoa học Tâm Linh</li>
              <li>Tầm nhìn &amp; Sứ mệnh</li>
              <li>Câu chuyện hình thành</li>
              <li>Hợp tác &amp; Đồng hành</li>
              <li>Chính sách &amp; Bảo mật</li>
            </ul>
          </div>

          {/* Cột 2 */}
          <div className="col-md-3">
            <h6 className="Footer-title small">DỊCH VỤ</h6>
            <ul className="Footer-list">
              <li>Xem Tarot &amp; Bài Trà</li>
              <li>Xem Bản đồ sao</li>
              <li>Xem Tử vi &amp; Thần số học</li>
              <li>Xem Quẻ Kinh Dịch</li>
              <li>Đặt lịch chuyên gia</li>
            </ul>
          </div>

          {/* Cột 3 */}
          <div className="col-md-3">
            <h6 className="Footer-title small">HỌC VIỆN HUYỀN HỌC</h6>
            <ul className="Footer-list">
              <li>Ngũ Huyền Thuật: Mệnh – Tướng – Bốc – Trạch – Số</li>
              <li>Khóa học Cơ bản (miễn phí)</li>
              <li>Khóa học Nâng cao (1500–2000 Linh Tệ)</li>
              <li>Thi &amp; Chứng chỉ</li>
              <li>Diễn đàn học viên</li>
            </ul>
          </div>

          {/* Cột 4 */}
          <div className="col-md-3">
            <h6 className="Footer-title small">LIÊN HỆ</h6>
            <p className="Footer-text mb-1">
              📍 Tòa Zurich 1 – Vinhomes Ocean Park, Gia Lâm, Hà Nội
            </p>
            <p className="Footer-text mb-1">
              📞 <a href="tel:0799958589">0799 958 589</a>
            </p>
            <p className="Footer-text mb-1">
              📧{" "}
              <a href="mailto:contact@dokhacgiakhoa.vn">
                contact@dokhacgiakhoa.vn
              </a>
            </p>
            <p className="Footer-text mb-2">
              🌐{" "}
              <a
                href="https://www.khoahoctamlinh.vn"
                target="_blank"
                rel="noreferrer"
              >
                www.khoahoctamlinh.vn
              </a>
            </p>
            <div className="Footer-social d-flex gap-3">
              <a
                href="https://fb.com/dokhacgiakhoa.official"
                target="_blank"
                rel="noreferrer"
              >
                FB
              </a>
              <a
                href="https://youtube.com/@dokhacgiakhoa"
                target="_blank"
                rel="noreferrer"
              >
                YT
              </a>
              <a
                href="https://tiktok.com/@dokhacgiakhoa"
                target="_blank"
                rel="noreferrer"
              >
                TT
              </a>
              <a
                href="https://instagram.com/dokhacgiakhoa"
                target="_blank"
                rel="noreferrer"
              >
                IG
              </a>
              <a
                href="https://zalo.me/0799958589"
                target="_blank"
                rel="noreferrer"
              >
                Zalo
              </a>
            </div>
          </div>
        </div>

        {/* Google map */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="Footer-map">
              <iframe
                title="Zurich 1 - Vinhomes Ocean Park"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.3583563801747!2d105.93875807588924!3d20.98086208065768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135acf32652f20d%3A0x2e7e6ef8b73a57f5!2sZurich%201%20-%20Vinhomes%20Ocean%20Park!5e0!3m2!1svi!2s!4v1730620852393!5m2!1svi!2s"
                width="100%"
                height="260"
                style={{ border: 0, borderRadius: "12px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        {/* bottom */}
        <hr className="Footer-line" />
        <p className="Footer-copy text-center mb-0">
          © 2025 Khoa học Tâm Linh — Thiết kế &amp; phát triển bởi Đỗ Khắc Gia
          Khoa.
        </p>
      </div>
    </Footer>
  );
}

export default Footer;
