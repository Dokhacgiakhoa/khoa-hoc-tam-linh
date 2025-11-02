import React from "react";
import "./TrangChu.css";

const TrangChu = () => {
  return (
    <div className="khtl-home">
      {/* 1. HERO / BANNER */}
      <section className="hero-section" id="hero">
        <div className="hero-overlay" />
        {/* video / background */}
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          poster="https://placehold.co/1600x900/0f0a1e/ffffff?text=Khoa+hoc+Tam+Linh"
        >
          <source
            src="https://videos.pexels.com/video-files/6898851/6898851-hd_1920_1080_30fps.mp4"
            type="video/mp4"
          />
        </video>

        <div className="hero-content container">
          <p className="hero-badge">Hệ sinh thái AI Tâm linh · 2025</p>
          <h1 className="hero-title">
            Khoa học Tâm Linh
            <span>Hệ sinh thái huyền học – dịch vụ – học viện – cửa hàng</span>
          </h1>
          <p className="hero-text">
            Trải nghiệm Tarot & Bài Trà, bản đồ sao, mệnh & lá số, đặt lịch
            chuyên gia, Học viện Ngũ Huyền Thuật, cùng cửa hàng năng lượng – tất
            cả trên một hệ thống duy nhất.
          </p>
          <div className="hero-actions">
            <a href="/dich-vu" className="btn-primary">
              🔮 Trải nghiệm miễn phí
            </a>
            <a href="/gioi-thieu" className="btn-secondary">
              ✨ Khám phá hệ sinh thái
            </a>
          </div>
          <div className="hero-meta">
            <span>AI Tarot · Bản đồ sao · Mệnh lý</span>
            <span>Học viện Huyền học</span>
            <span>Ví Linh Tệ</span>
          </div>
        </div>
      </section>

      {/* 2. GIỚI THIỆU HỆ SINH THÁI */}
      <section className="ecosystem-section container" id="ecosystem">
        <header className="section-head">
          <p className="section-badge">Hệ sinh thái</p>
          <h2>4 trụ cột của Khoa học Tâm Linh</h2>
          <p>
            Dịch vụ tâm linh chuẩn hóa – Cửa hàng năng lượng – Học viện huyền
            học – Tài khoản & Ví Linh Tệ để kết nối toàn bộ trải nghiệm.
          </p>
        </header>

        <div className="ecosystem-grid">
          <a href="/dich-vu" className="ecosystem-card">
            <div className="icon-wrap">🔮</div>
            <h3>Dịch vụ Tâm linh AI</h3>
            <p>
              Tarot, Bài Trà, Kinh Dịch, Tử vi & Thần số, Mệnh & Lá số, đặt lịch
              chuyên gia.
            </p>
            <span className="card-link">Vào danh mục dịch vụ →</span>
          </a>
          <a href="/cua-hang" className="ecosystem-card">
            <div className="icon-wrap">🛒</div>
            <h3>Cửa hàng Năng lượng</h3>
            <p>
              Bài tâm linh, phụ kiện, hương – trầm – trà đạo, bộ sưu tập & cao
              cấp, chế tác riêng.
            </p>
            <span className="card-link">Khám phá sản phẩm →</span>
          </a>
          <a href="/hoc-vien" className="ecosystem-card">
            <div className="icon-wrap">📚</div>
            <h3>Học viện Huyền học</h3>
            <p>
              Ngũ Huyền Thuật: Mệnh – Tướng – Bốc – Trạch – Số. Có cấp bậc học
              viên & thi chứng chỉ.
            </p>
            <span className="card-link">Vào học viện →</span>
          </a>
          <a href="/tai-khoan" className="ecosystem-card">
            <div className="icon-wrap">💠</div>
            <h3>Tài khoản & Ví Linh Tệ</h3>
            <p>
              Hồ sơ, cấp độ, hộp thư, giỏ hàng, nhiệm vụ, bảo mật 2FA, thanh
              toán Linh Tệ.
            </p>
            <span className="card-link">Xem bảng điều khiển →</span>
          </a>
        </div>
      </section>

      {/* 3. DỊCH VỤ NỔI BẬT */}
      <section className="services-section" id="services">
        <div className="container services-wrapper">
          <header className="section-head center">
            <p className="section-badge">Dịch vụ nổi bật</p>
            <h2>Thực hành tâm linh hiện đại, cá nhân hóa</h2>
            <p>
              Các dịch vụ cốt lõi được AI hỗ trợ, nội dung được chuẩn hóa theo
              hệ thống huyền học và trải nghiệm dễ dùng trên web/app.
            </p>
          </header>

          <div className="services-grid">
            {/* Tarot & Bài Trà */}
            <div className="service-card">
              <div className="service-media">
                <img
                  src="https://placehold.co/640x360/120c24/ffffff?text=Tarot+%26+Bai+Tra"
                  alt="Tarot & Bài Trà"
                  loading="lazy"
                />
              </div>
              <div className="service-body">
                <h3>Tarot & Bài Trà</h3>
                <p>
                  Trải bài nhanh, giải thích ý nghĩa lá, gợi ý hành động. Có bản
                  miễn phí và gói chuyên gia.
                </p>
                <a href="/dich-vu/tarot" className="text-link">
                  Dùng Tarot ngay →
                </a>
              </div>
            </div>

            {/* Mệnh & Lá số */}
            <div className="service-card">
              <div className="service-media">
                <img
                  src="https://placehold.co/640x360/162238/ffffff?text=Menh+%26+La+so"
                  alt="Mệnh & Lá số"
                  loading="lazy"
                />
              </div>
              <div className="service-body">
                <h3>Mệnh & Lá số</h3>
                <p>
                  Tử vi, Bát tự, Thần số học, Ngũ hành – Can chi – Cung mệnh, dự
                  báo thời vận kết hợp AI.
                </p>
                <a href="/dich-vu/menh-la-so" className="text-link">
                  Lên lá số →
                </a>
              </div>
            </div>

            {/* Đặt lịch chuyên gia */}
            <div className="service-card">
              <div className="service-media">
                <img
                  src="https://placehold.co/640x360/412676/ffffff?text=Dat+lich+chuyen+gia"
                  alt="Đặt lịch chuyên gia"
                  loading="lazy"
                />
              </div>
              <div className="service-body">
                <h3>Đặt lịch chuyên gia</h3>
                <p>
                  Chọn cố vấn, chuyên gia huyền học, phong thủy, ứng dụng mệnh
                  lý cho cá nhân và doanh nghiệp.
                </p>
                <a href="/dich-vu/dat-lich" className="text-link">
                  Đặt lịch ngay →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SẢN PHẨM TIÊU BIỂU */}
      <section className="products-section" id="products">
        <div className="container">
          <header className="section-head">
            <p className="section-badge">Cửa hàng năng lượng</p>
            <h2>Sản phẩm tiêu biểu</h2>
            <p>
              Tarot of the Soul, vòng đá mệnh, combo hương – trầm – trà đạo, chế
              tác riêng theo năng lượng & bản mệnh.
            </p>
          </header>

          <div className="products-row">
            <article className="product-card">
              <div className="product-thumb">
                <img
                  src="https://placehold.co/320x200/0f0a1e/ffffff?text=Tarot+of+the+Soul"
                  alt="Tarot of the Soul"
                  loading="lazy"
                />
              </div>
              <div className="product-body">
                <h3>Tarot of the Soul</h3>
                <p>
                  Bộ bài độc quyền trên hệ thống, hướng tới thực hành và kết nối
                  nội tâm.
                </p>
                <span className="price">420.000đ</span>
                <a href="/cua-hang/tarot-of-the-soul" className="text-link">
                  Xem chi tiết →
                </a>
              </div>
            </article>

            <article className="product-card">
              <div className="product-thumb">
                <img
                  src="https://placehold.co/320x200/162238/ffffff?text=Vong+da+Menh+Kim"
                  alt="Vòng đá Mệnh Kim"
                  loading="lazy"
                />
              </div>
              <div className="product-body">
                <h3>Vòng đá Mệnh Kim</h3>
                <p>
                  Chọn đá theo mệnh, tùy chỉnh kích thước, thêm bùa chú & năng
                  lượng.
                </p>
                <span className="price">590.000đ</span>
                <a href="/cua-hang/vong-da-menh" className="text-link">
                  Chọn mệnh →
                </a>
              </div>
            </article>

            <article className="product-card">
              <div className="product-thumb">
                <img
                  src="https://placehold.co/320x200/412676/ffffff?text=Combo+Huong+Tram+Nen"
                  alt="Combo Hương – Trầm – Nến"
                  loading="lazy"
                />
              </div>
              <div className="product-body">
                <h3>Combo Hương – Trầm – Nến</h3>
                <p>
                  Thanh tịnh không gian thiền, có combo cho doanh nghiệp & quà
                  tặng.
                </p>
                <span className="price">360.000đ</span>
                <a href="/cua-hang/huong-tram" className="text-link">
                  Mua combo →
                </a>
              </div>
            </article>

            <article className="product-card highlight">
              <div className="product-thumb">
                <img
                  src="https://placehold.co/320x200/ffd700/0f0a1e?text=Che+tac+rieng"
                  alt="Chế tác riêng"
                  loading="lazy"
                />
              </div>
              <div className="product-body">
                <h3>Chế tác riêng ✴️</h3>
                <p>
                  Sản phẩm thủ công, cá nhân hóa theo mệnh, vật liệu, lời khắc,
                  biểu tượng.
                </p>
                <span className="price">Theo yêu cầu</span>
                <a href="/cua-hang/che-tac-rieng" className="text-link">
                  Đặt chế tác →
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 5. HỌC VIỆN HUYỀN HỌC */}
      <section className="academy-section" id="academy">
        <div className="academy-overlay" />
        <div className="container academy-content">
          <header className="section-head light">
            <p className="section-badge">Học viện huyền học</p>
            <h2>Ngũ Huyền Thuật · Mệnh – Tướng – Bốc – Trạch – Số</h2>
            <p>
              Hệ thống đào tạo cốt lõi của dự án Khoa học Tâm Linh. Có cấp bậc
              học viên (Tân học → Thực hành → Hành giả → Hướng đạo → Bậc Thầy).
            </p>
          </header>

          <div className="academy-grid">
            <div className="academy-card">
              <h3>MỆNH</h3>
              <p>
                Tử Vi, Bát Tự, Thần Số Học, Ngũ Hành – Can Chi, ứng dụng mệnh
                lý.
              </p>
            </div>
            <div className="academy-card">
              <h3>TƯỚNG</h3>
              <p>
                Nhân tướng học, thủ tướng/chỉ tay, tướng tâm lý, hình tướng –
                thần thái.
              </p>
            </div>
            <div className="academy-card">
              <h3>BỐC</h3>
              <p>
                Tarot, bài Tây, Kinh Dịch thực hành, Lục Hào, bói Quan Âm – giải
                mộng.
              </p>
            </div>
            <div className="academy-card">
              <h3>TRẠCH</h3>
              <p>
                Phong thủy Bát trạch, Huyền không phi tinh, âm trạch/dương
                trạch, nghề nghiệp.
              </p>
            </div>
            <div className="academy-card">
              <h3>SỐ</h3>
              <p>
                Kỳ Môn Độn Giáp, Bát Cực Linh Số, Thái Ất, Kinh Dịch 64 quẻ.
              </p>
            </div>
          </div>

          <div className="academy-actions">
            <a href="/hoc-vien" className="btn-primary">
              🎓 Đăng ký học viện
            </a>
            <a href="/hoc-vien#chuong-trinh" className="btn-secondary">
              Xem lộ trình học →
            </a>
          </div>
        </div>
      </section>

      {/* 6. HỢP TÁC & ĐỒNG HÀNH */}
      <section className="partners-section" id="partners">
        <div className="container">
          <header className="section-head center">
            <p className="section-badge">Hợp tác & Đồng hành</p>
            <h2>3 nhóm đối tượng chính</h2>
            <p>
              Hệ thống được thiết kế để mở với cộng tác viên – dev – kiểm duyệt,
              nhà đầu tư/đối tác kinh doanh và khách hàng/học viên.
            </p>
          </header>

          <div className="partners-grid">
            <div className="partner-card">
              <h3>Nhóm Đồng hành</h3>
              <p>
                Cộng tác viên nội dung, dev, kiểm duyệt viên tham gia phát triển
                hệ thống.
              </p>
              <a href="/lien-he#dong-hanh" className="text-link">
                Tham gia đội ngũ →
              </a>
            </div>
            <div className="partner-card">
              <h3>Nhóm Đầu tư</h3>
              <p>
                Nhà đầu tư và đối tác kinh doanh, mở rộng thị trường Việt – Úc –
                quốc tế.
              </p>
              <a href="/lien-he#dau-tu" className="text-link">
                Gửi đề xuất →
              </a>
            </div>
            <div className="partner-card">
              <h3>Nhóm Khách hàng</h3>
              <p>
                Người dùng dịch vụ, học viên, khách mua hàng tâm linh cần hỗ trợ
                và CSKH.
              </p>
              <a href="/lien-he#khach-hang" className="text-link">
                Liên hệ ngay →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. LIÊN HỆ NHANH & BẢN ĐỒ */}
      <section className="contact-section" id="contact">
        <div className="container contact-wrapper">
          <div className="contact-info">
            <h2>Liên hệ nhanh</h2>
            <p>Zurich 1, Vinhomes Ocean Park, Gia Lâm, Hà Nội</p>
            <ul className="contact-list">
              <li>
                📞 Hotline/Zalo: <a href="tel:0799958589">0799 958 589</a>
              </li>
              <li>
                ✉ Email:{" "}
                <a href="mailto:contact@dokhacgiakhoa.vn">
                  contact@dokhacgiakhoa.vn
                </a>
              </li>
              <li>🌐 Facebook · YouTube · TikTok · Instagram · Zalo</li>
            </ul>
            <a href="/lien-he" className="btn-secondary">
              Mở trang Liên hệ
            </a>
          </div>
          <div className="contact-map">
            <iframe
              title="Google Map Zurich 1 Vinhomes Ocean Park"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.11146944847!2d105.942972!3d21.028511!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab4874f393e1%3A0x5bca9e5078e1bc0a!2sVinhomes%20Ocean%20Park!5e0!3m2!1svi!2svi!4v1703220000000"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TrangChu;
