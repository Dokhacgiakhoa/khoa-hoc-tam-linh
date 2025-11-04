import React from "react";
import { Link } from "react-router-dom";
import "./trang-chu.css";

/**
 * File: src/pages/trang-chu/trang-chu.js
 * Asset cần ở public/:
 * - /media/hero.mp4
 * - /images/banners/banner-trang-chu.png
 * - /images/banners/trang-chu-*.png
 * - /images/products/product-1.webp … product-5.webp
 */

function Home() {
  return (
    <main id="trang-chu" className="khctl-page">
      {/* HERO */}
      <section
        className="hero position-relative overflow-hidden"
        aria-label="Hero"
      >
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-hidden="true"
          poster={
            process.env.PUBLIC_URL + "/images/banners/banner-trang-chu.png"
          }
        >
          <source
            src={process.env.PUBLIC_URL + "/media/hero.mp4"}
            type="video/mp4"
          />
        </video>

        {/* Lớp phủ tổng + nền riêng cho vùng chữ */}
        <div className="hero-overlay" />
        <div className="hero-content-bg" />

        <div className="container position-relative hero-content">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h1 className="hero-title">
                Khoa học Tâm Linh – Minh giải huyền học bằng dữ liệu &amp; AI
              </h1>
              <p className="hero-sub">
                Trải nghiệm Tarot &amp; Mệnh lý có kiểm chứng, học theo Ngũ
                Huyền Thuật. Không mê tín · 2FA an toàn.
              </p>
              <div className="d-flex gap-3 flex-wrap mt-4">
                <Link className="btn btn-gold" to="/dich-vu">
                  Trải nghiệm miễn phí
                </Link>
                <Link className="btn btn-outline-gold" to="/gioi-thieu">
                  Khám phá hệ sinh thái
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HỆ SINH THÁI */}
      <section className="section section-ecosys">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">Hệ sinh thái</h2>
            <p className="section-desc">
              Dịch vụ Tâm linh AI · Cửa hàng Năng lượng · Học viện Huyền học ·
              Tài khoản &amp; Ví Linh Tệ
            </p>
          </div>

          <div className="row g-4">
            <div className="col-12 col-md-6 col-xl-3">
              <div className="card-3d h-100">
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/images/banners/trang-chu-dich-vu.png"
                  }
                  alt="Dịch vụ Tâm linh AI"
                  className="card-img-top"
                  loading="lazy"
                />
                <div className="card-body">
                  <h3 className="card-title">Dịch vụ Tâm linh AI</h3>
                  <p className="card-text">
                    Tarot &amp; Bài Trà · Mệnh &amp; Lá số · Đặt lịch chuyên
                    gia.
                  </p>
                  <Link to="/dich-vu" className="btn btn-sm btn-gold">
                    Xem dịch vụ
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-xl-3">
              <div className="card-3d h-100">
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/images/banners/trang-chu-cua-hang.png"
                  }
                  alt="Cửa hàng Năng lượng"
                  className="card-img-top"
                  loading="lazy"
                />
                <div className="card-body">
                  <h3 className="card-title">Cửa hàng Năng lượng</h3>
                  <p className="card-text">
                    Tarot Deck · Phụ kiện · Hương–Trầm–Trà · Bộ sưu tập.
                  </p>
                  <Link to="/cua-hang" className="btn btn-sm btn-gold">
                    Vào cửa hàng
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-xl-3">
              <div className="card-3d h-100">
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/images/banners/trang-chu-hoc-vien-huyen-hoc.png"
                  }
                  alt="Học viện Huyền học"
                  className="card-img-top"
                  loading="lazy"
                />
                <div className="card-body">
                  <h3 className="card-title">Học viện Huyền học</h3>
                  <p className="card-text">
                    Ngũ Huyền Thuật: Mệnh – Tướng – Bốc – Trạch – Số.
                  </p>
                  <Link
                    to="/hoc-vien-huyen-hoc"
                    className="btn btn-sm btn-gold"
                  >
                    Đăng ký Học viện
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-xl-3">
              <div className="card-3d h-100">
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/images/banners/trang-chu-tai-khoan.png"
                  }
                  alt="Tài khoản &amp; Ví Linh Tệ"
                  className="card-img-top"
                  loading="lazy"
                />
                <div className="card-body">
                  <h3 className="card-title">Tài khoản &amp; Ví Linh Tệ</h3>
                  <p className="card-text">
                    Nhiệm vụ · Hộp thư · Giỏ hàng · 2FA bảo mật.
                  </p>
                  <Link to="/tai-khoan" className="btn btn-sm btn-gold">
                    Vào tài khoản
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DỊCH VỤ NỔI BẬT – BLOCK A */}
      <section className="section section-feature alt">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <img
                className="img-fluid rounded-4 shadow-soft"
                src={
                  process.env.PUBLIC_URL +
                  "/images/banners/trang-chu-tarot-va-bai-tra.png"
                }
                alt="Tarot &amp; Bài Trà"
                loading="lazy"
              />
            </div>
            <div className="col-lg-6">
              <h3 className="feature-title">Tarot &amp; Bài Trà</h3>
              <p className="feature-text">
                Đọc AI · Lý giải có căn cứ. Bốc 1 lá miễn phí và nhận insight
                trong 30 giây.
              </p>
              <div className="d-flex gap-3">
                <Link to="/dich-vu" className="btn btn-gold">
                  Bốc 1 lá miễn phí
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DỊCH VỤ NỔI BẬT – BLOCK B */}
      <section className="section section-feature">
        <div className="container">
          <div className="row align-items-center g-5 flex-lg-row-reverse">
            <div className="col-lg-6">
              <img
                className="img-fluid rounded-4 shadow-soft"
                src={
                  process.env.PUBLIC_URL +
                  "/images/banners/trang-chu-menh-va-la-so.png"
                }
                alt="Mệnh &amp; Lá số"
                loading="lazy"
              />
            </div>
            <div className="col-lg-6">
              <h3 className="feature-title">Mệnh &amp; Lá số</h3>
              <p className="feature-text">
                Lập bản đồ sao, Bát Tự, Tử Vi, Thần Số – hiển thị trực quan, dễ
                hiểu.
              </p>
              <div className="d-flex gap-3">
                <Link to="/dich-vu" className="btn btn-outline-gold">
                  Lập bản đồ sao
                </Link>
                <Link to="/hoc-vien-huyen-hoc" className="btn btn-gold">
                  Khám phá môn học
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DỊCH VỤ NỔI BẬT – BLOCK C */}
      <section className="section section-feature alt">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <img
                className="img-fluid rounded-4 shadow-soft"
                src={
                  process.env.PUBLIC_URL +
                  "/images/banners/trang-chu-dat-lich.png"
                }
                alt="Đặt lịch chuyên gia"
                loading="lazy"
              />
            </div>
            <div className="col-lg-6">
              <h3 className="feature-title">Đặt lịch chuyên gia</h3>
              <p className="feature-text">
                Chọn khung giờ phù hợp, nhận tư vấn chuyên sâu theo mục tiêu cá
                nhân.
              </p>
              <div className="d-flex gap-3">
                <Link to="/dich-vu" className="btn btn-gold">
                  Đặt lịch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SẢN PHẨM TIÊU BIỂU (SLIDER cuộn ngang) */}
      <section className="section section-products">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">Sản phẩm tiêu biểu</h2>
            <p className="section-desc">
              Tarot of the Soul · Vòng đá Mệnh Kim · Hộp trà thiền · Combo
              Hương–Trầm–Nến · Chế tác riêng
            </p>
          </div>

          <div className="slider-wrap">
            <div className="slider" role="list">
              {[1, 2, 3, 4, 5].map((i) => (
                <article className="slide card-3d" role="listitem" key={i}>
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      `/images/products/product-${i}.webp`
                    }
                    alt={`Sản phẩm ${i}`}
                    className="card-img-top"
                    loading="lazy"
                  />
                  <div className="card-body">
                    <h3 className="card-title">Sản phẩm {i}</h3>
                    <p className="card-text">
                      Mô tả ngắn gọn về sản phẩm {i}.{" "}
                      {i === 5 ? "Made for You ✴️" : ""}
                    </p>
                    <div className="d-flex gap-2">
                      <Link to="/cua-hang" className="btn btn-sm btn-gold">
                        Thêm vào giỏ
                      </Link>
                      <Link
                        to={`/cua-hang/san-pham-${i}`}
                        className="btn btn-sm btn-outline-gold"
                      >
                        Xem chi tiết
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HỌC VIỆN HUYỀN HỌC */}
      <section className="section section-academy">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">Học viện Huyền học</h2>
            <p className="section-desc">
              Lộ trình: Tân học → Thực hành → Hành giả → Hướng đạo → Bậc Thầy
            </p>
          </div>

          <div className="row g-4">
            {[
              { name: "BỐC", val: 80 },
              { name: "SỐ", val: 65 },
              { name: "MỆNH", val: 60 },
              { name: "TƯỚNG", val: 50 },
              { name: "TRẠCH", val: 40 },
            ].map((item) => (
              <div className="col-12 col-md-6 col-xl-4" key={item.name}>
                <div className="progress-card">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="progress-name">{item.name}</span>
                    <span className="progress-val">{item.val}%</span>
                  </div>
                  <div className="progress">
                    <div
                      className="progress-bar progress-bar-gold"
                      role="progressbar"
                      style={{ width: `${item.val}%` }}
                      aria-valuenow={item.val}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="d-flex gap-3 mt-4">
            <Link to="/hoc-vien-huyen-hoc" className="btn btn-gold">
              Đăng ký Học viện
            </Link>
            <Link to="/hoc-vien-huyen-hoc" className="btn btn-outline-gold">
              Xem chương trình học
            </Link>
          </div>
        </div>
      </section>

      {/* HỢP TÁC & ĐỒNG HÀNH */}
      <section className="section section-partner alt">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title">Hợp tác &amp; Đồng hành</h2>
          </div>

          <div className="row g-4">
            <div className="col-12 col-md-4">
              <div className="card-3d h-100">
                <div className="card-body">
                  <h3 className="card-title">Nhóm Đồng hành</h3>
                  <p className="card-text">CTV · Dev · Kiểm duyệt viên</p>
                  <Link to="/lien-he" className="btn btn-sm btn-gold">
                    Đăng ký
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="card-3d h-100">
                <div className="card-body">
                  <h3 className="card-title">Nhóm Đầu tư</h3>
                  <p className="card-text">Nhà đầu tư · Đối tác kinh doanh</p>
                  <Link to="/lien-he" className="btn btn-sm btn-gold">
                    Gửi quan tâm
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="card-3d h-100">
                <div className="card-body">
                  <h3 className="card-title">Nhóm Khách hàng</h3>
                  <p className="card-text">Hỗ trợ dịch vụ · Tài khoản · Ví</p>
                  <Link to="/lien-he" className="btn btn-sm btn-gold">
                    Liên hệ hỗ trợ
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIÊN HỆ & MAP */}
      <section className="section section-map">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-12 col-lg-5">
              <h3 className="mb-3">Liên hệ nhanh</h3>
              <ul className="list-unstyled m-0">
                <li>Địa chỉ: Zurich 1, Vinhomes Ocean Park, Gia Lâm, Hà Nội</li>
                <li>Hotline/Zalo: 0799 958 589</li>
                <li>Email: contact@dokhacgiakhoa.vn</li>
                <li>Facebook · YouTube · TikTok · Instagram · Zalo</li>
              </ul>
            </div>
            <div className="col-12 col-lg-7">
              <div className="map-embed rounded-4 overflow-hidden">
                <iframe
                  title="Google Map - Zurich 1"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.0!2d105.9!3d21.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0x0!2sZurich%201!5e0!3m2!1svi!2svi!4v1699999999999"
                  width="100%"
                  height="320"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
