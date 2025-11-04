import React from "react";
import { Link } from "react-router-dom";
import "./dich-vu.css";

/**
 * File: src/pages/dich-vu/dich-vu.js
 * Asset mẫu (đặt trong public/):
 * - /media/services/hero-services.webp
 * - /media/services/tarot.webp
 * - /media/services/menh.webp
 * - /media/services/chuyen-gia.webp
 * - /media/services/goi-dich-vu.webp
 */

function DichVu() {
  return (
    <main id="dich-vu" className="khctl-page">
      {/* HERO */}
      <section className="dv-hero">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-7">
              <h1 className="dv-title">
                Dịch vụ Tâm linh AI – Minh bạch, có căn cứ
              </h1>
              <p className="dv-sub">
                Tarot & Bài Trà · Mệnh & Lá số · Đặt lịch chuyên gia · Gói dịch
                vụ. Tư duy dữ liệu, tránh mê tín, bảo mật 2FA.
              </p>
              <div className="d-flex gap-3 flex-wrap mt-3">
                <a href="#tarot" className="btn btn-gold">
                  Trải nghiệm miễn phí
                </a>
                <a href="#menh" className="btn btn-outline-gold">
                  Khám phá Lá số
                </a>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="dv-hero-media rounded-4">
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/media/services/hero-services.webp"
                  }
                  alt="Dịch vụ Tâm linh AI"
                  className="img-fluid rounded-4 shadow-soft"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LƯỢC ĐỒ NHANH */}
      <section className="section section-quick">
        <div className="container">
          <div className="row g-3">
            <div className="col-6 col-md-3">
              <a href="#tarot" className="pill w-100 text-center">
                🔮 Tarot & Bài Trà
              </a>
            </div>
            <div className="col-6 col-md-3">
              <a href="#menh" className="pill w-100 text-center">
                🪐 Mệnh & Lá số
              </a>
            </div>
            <div className="col-6 col-md-3">
              <a href="#chuyen-gia" className="pill w-100 text-center">
                👤 Đặt lịch chuyên gia
              </a>
            </div>
            <div className="col-6 col-md-3">
              <a href="#goi" className="pill w-100 text-center">
                💼 Gói dịch vụ
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TAROT & BÀI TRÀ */}
      <section id="tarot" className="section section-feature alt">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <img
                src={process.env.PUBLIC_URL + "/media/services/tarot.webp"}
                alt="Tarot & Bài Trà"
                className="img-fluid rounded-4 shadow-soft"
              />
            </div>
            <div className="col-lg-6">
              <h2 className="feature-title">Tarot & Bài Trà</h2>
              <p className="feature-text">
                Đọc bằng AI + khung lý giải có kiểm chứng. Nhận insight trong 30
                giây, phù hợp cho quyết định nhanh và phản tư cá nhân.
              </p>
              <ul className="kv-list">
                <li>Bốc 1 lá miễn phí (demo)</li>
                <li>Trải bài 3–5–10 lá (chuyên sâu)</li>
                <li>Lưu lịch sử & gợi ý hành động</li>
              </ul>
              <div className="d-flex gap-2 flex-wrap">
                {/* Nếu sau này có route riêng cho tarot free thì đổi Link tới route đó */}
                <a href="#tarot" className="btn btn-gold">
                  Bốc 1 lá miễn phí
                </a>
                <Link to="/tai-khoan" className="btn btn-outline-gold">
                  Đăng nhập để lưu
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MỆNH & LÁ SỐ */}
      <section id="menh" className="section section-feature">
        <div className="container">
          <div className="row align-items-center g-5 flex-lg-row-reverse">
            <div className="col-lg-6">
              <img
                src={process.env.PUBLIC_URL + "/media/services/menh.webp"}
                alt="Mệnh & Lá số"
                className="img-fluid rounded-4 shadow-soft"
              />
            </div>
            <div className="col-lg-6">
              <h2 className="feature-title">Mệnh & Lá số</h2>
              <p className="feature-text">
                Tử Vi, Bát Tự, Thần Số – biểu đồ trực quan, từ nền tảng Ngũ
                Hành–Can Chi đến ứng dụng nghề nghiệp, đối tác, thời vận.
              </p>
              <ul className="kv-list">
                <li>Lập bản đồ sao cơ bản</li>
                <li>Bát Tự/Tử Vi phân tích nâng cao</li>
                <li>Xuất file kết quả (PDF) *(sẽ tích hợp)*</li>
              </ul>
              <div className="d-flex gap-2 flex-wrap">
                <a href="#menh" className="btn btn-outline-gold">
                  Lập bản đồ sao
                </a>
                <Link to="/hoc-vien-huyen-hoc" className="btn btn-gold">
                  Tìm hiểu môn học
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ĐẶT LỊCH CHUYÊN GIA */}
      <section id="chuyen-gia" className="section section-feature alt">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <img
                src={process.env.PUBLIC_URL + "/media/services/chuyen-gia.webp"}
                alt="Đặt lịch chuyên gia"
                className="img-fluid rounded-4 shadow-soft"
              />
            </div>
            <div className="col-lg-6">
              <h2 className="feature-title">Đặt lịch chuyên gia</h2>
              <p className="feature-text">
                Chọn khung giờ, mục tiêu tư vấn; nhận định hướng hành động rõ
                ràng. Tích hợp 2FA, nhắc lịch qua email *(kế hoạch)*.
              </p>
              <ul className="kv-list">
                <li>Tarot chuyên sâu / Mệnh lý ứng dụng</li>
                <li>1–1 online/offline</li>
                <li>Thanh toán COD/MoMo/Linh Tệ *(kế hoạch)*</li>
              </ul>
              <div className="d-flex gap-2 flex-wrap">
                <Link to="/tai-khoan" className="btn btn-gold">
                  Đăng nhập để đặt lịch
                </Link>
                <a href="#goi" className="btn btn-outline-gold">
                  Xem gói phù hợp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GÓI DỊCH VỤ */}
      <section id="goi" className="section section-packages">
        <div className="container">
          <div className="section-head text-center">
            <h2 className="section-title">Gói dịch vụ</h2>
            <p className="section-desc">
              Linh hoạt theo nhu cầu: dùng thử – tiêu chuẩn – chuyên sâu – hợp
              tác doanh nghiệp.
            </p>
          </div>

          <div className="row g-4">
            {/* Free / Dùng thử */}
            <div className="col-12 col-md-6 col-xl-3">
              <div className="card-3d h-100 dv-plan">
                <div className="card-body">
                  <h3 className="plan-name">Dùng thử</h3>
                  <p className="plan-price">0đ</p>
                  <ul className="plan-list">
                    <li>Tarot 1 lá miễn phí</li>
                    <li>Xem giới thiệu Lá số</li>
                    <li>Chưa lưu lịch sử</li>
                  </ul>
                  <a href="#tarot" className="btn btn-gold w-100">
                    Bắt đầu
                  </a>
                </div>
              </div>
            </div>

            {/* Tiêu chuẩn */}
            <div className="col-12 col-md-6 col-xl-3">
              <div className="card-3d h-100 dv-plan">
                <div className="card-body">
                  <h3 className="plan-name">Tiêu chuẩn</h3>
                  <p className="plan-price">199k</p>
                  <ul className="plan-list">
                    <li>Trải bài 3–5 lá</li>
                    <li>Lưu lịch sử 30 ngày</li>
                    <li>Ưu tiên hỗ trợ email</li>
                  </ul>
                  <Link to="/tai-khoan" className="btn btn-outline-gold w-100">
                    Đăng nhập mua
                  </Link>
                </div>
              </div>
            </div>

            {/* Chuyên sâu */}
            <div className="col-12 col-md-6 col-xl-3">
              <div className="card-3d h-100 dv-plan featured">
                <div className="card-body">
                  <div className="plan-badge">Phổ biến</div>
                  <h3 className="plan-name">Chuyên sâu</h3>
                  <p className="plan-price">499k</p>
                  <ul className="plan-list">
                    <li>Trải bài 10 lá / Lá số nâng cao</li>
                    <li>Lưu lịch sử 90 ngày</li>
                    <li>Gợi ý hành động từ AI</li>
                  </ul>
                  <Link to="/tai-khoan" className="btn btn-gold w-100">
                    Chọn gói này
                  </Link>
                </div>
              </div>
            </div>

            {/* Doanh nghiệp / Đối tác */}
            <div className="col-12 col-md-6 col-xl-3">
              <div className="card-3d h-100 dv-plan">
                <div className="card-body">
                  <h3 className="plan-name">Đối tác</h3>
                  <p className="plan-price">Tùy chỉnh</p>
                  <ul className="plan-list">
                    <li>Workshop Tarot/Mệnh lý</li>
                    <li>Tùy chỉnh báo cáo</li>
                    <li>Hóa đơn & hợp đồng</li>
                  </ul>
                  <Link to="/lien-he" className="btn btn-outline-gold w-100">
                    Liên hệ hợp tác
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <p className="text-center mt-3 small text-muted">
            * Giá và phương thức thanh toán sẽ đồng bộ với Ví Linh Tệ / COD /
            MoMo khi triển khai.
          </p>
        </div>
      </section>
    </main>
  );
}

export default DichVu;
