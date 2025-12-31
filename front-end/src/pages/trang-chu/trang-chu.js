import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./trang-chu.css";

/**
 * File: src/pages/trang-chu/trang-chu.js
 */

// Fallback data in case API fails
const FALLBACK_PRODUCTS = [
  {
    id: 1,
    views: 1280,
    description: "Mô tả ngắn gọn về sản phẩm 1.",
    name: "Sản phẩm 1",
  },
  {
    id: 2,
    views: 945,
    description: "Mô tả ngắn gọn về sản phẩm 2.",
    name: "Sản phẩm 2",
  },
  {
    id: 3,
    views: 1532,
    description: "Mô tả ngắn gọn về sản phẩm 3.",
    name: "Sản phẩm 3",
  },
  {
    id: 4,
    views: 802,
    description: "Mô tả ngắn gọn về sản phẩm 4.",
    name: "Sản phẩm 4",
  },
  {
    id: 5,
    views: 2176,
    description: "Mô tả ngắn gọn về sản phẩm 5. Chế tác riêng ✴️",
    name: "Sản phẩm 5",
  },
];

function Home() {
  const [activeIndex, setActiveIndex] = useState(2); // Mặc định card 3 ở giữa
  const [products, setProducts] = useState(FALLBACK_PRODUCTS);
  const [productsLoading, setProductsLoading] = useState(true);

  // Fetch featured products from API
  useEffect(() => {
    fetch("http://localhost:8000/api/products?featured=true&limit=10")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          const mappedProducts = data.map((p) => ({
            id: p.id || p.db_id,
            name: p.name,
            description: p.description || `Sản phẩm chất lượng cao - ${p.name}`,
            views: p.views || 0,
            image: p.image || p.image_url,
            price: p.price,
          }));
          setProducts(mappedProducts);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
      })
      .finally(() => setProductsLoading(false));
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % products.length);
  };

  // Helper function to calculate position class for each card
  const getPositionClass = (cardIndex) => {
    const diff = cardIndex - activeIndex;
    const total = products.length;
    // Normalize difference to handle circular wrapping
    const normalizedDiff = ((diff % total) + total) % total;
    const adjustedDiff =
      normalizedDiff > total / 2 ? normalizedDiff - total : normalizedDiff;

    if (adjustedDiff === 0) return "card-active";
    if (adjustedDiff === -1) return "card-prev";
    if (adjustedDiff === 1) return "card-next";
    if (adjustedDiff === -2) return "card-prev2";
    if (adjustedDiff === 2) return "card-next2";
    if (adjustedDiff === -3) return "card-prev3";
    if (adjustedDiff === 3) return "card-next3";
    return "card-hidden"; // Cards beyond ±3 positions
  };

  return (
    <main id="trang-chu" className="khctl-page">
      {/* ... Hero, Ecosystem, Feature blocks keep existing code ... */}
      {/* Note: I'm skipping unchanged blocks in this replacement for brevity but ensuring context matches */}
      {/* HERO */}
      <section
        className="hero position-relative overflow-hidden"
        aria-label="Hero"
      >
        <div
          className="hero-image-layer"
          style={{
            backgroundImage: `url(${
              (process.env.PUBLIC_URL || "") + "/images/hero_mystic_ai_v2.png"
            })`,
            opacity: 0.35,
          }}
        />
        {/* Ẩn video local để hiện video nền toàn trang */}
        {/* <video
          className="hero-video"
          ...
        </video> */}

        {/* Background Visuals handled via CSS background-image */}
        <div className="hero-overlay" />

        <div className="container position-relative hero-content py-5">
          <div className="row align-items-center min-vh-75">
            <div className="col-lg-10 col-xl-8">
              <h1 className="hero-title">
                Khai Phá
                <br />
                Sức Mạnh Tâm Linh
                <br />
                <span className="text-gold-gradient">
                  BẰNG TRÍ TUỆ NHÂN TẠO
                </span>
              </h1>
              <p className="hero-sub">
                Kết hợp tinh hoa Huyền học nghìn năm với công nghệ Data Science
                hiện đại. Tarot, Mệnh lý và Phong thủy được minh giải khoa học,
                chính xác và bảo mật.
              </p>
              <div className="d-flex gap-4 flex-wrap hero-cta-wrapper">
                <Link className="btn btn-gold" to="/dich-vu">
                  Bắt đầu ngay &nbsp; &rarr;
                </Link>
                <Link className="btn btn-outline-gold" to="/hoc-vien">
                  Học viện Huyền học
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
              <h3 className="feature-title">
                Tarot & Bài Trà AI - Giải Mã Vận Mệnh
              </h3>
              <p className="feature-text">
                Công nghệ AI kết hợp trí tuệ cổ xưa, mang đến lời giải đáp chính
                xác và sâu sắc. Bốc 1 lá Tarot miễn phí hoặc đọc vị cặn trà -
                nhận insight chi tiết trong 30 giây. Hệ thống phân tích 78 lá
                bài Major & Minor Arcana, giải nghĩa theo ngữ cảnh riêng của
                bạn.
              </p>
              <ul className="feature-list mb-3">
                <li>✨ Miễn phí bốc 1 lá Tarot hàng ngày</li>
                <li>🔮 AI phân tích dựa trên 10,000+ mẫu giải nghĩa</li>
                <li>🍵 Bói bài trà - nghệ thuật đọc vị cặn trà truyền thống</li>
                <li>📊 Lưu lịch sử và theo dõi xu hướng vận mệnh</li>
              </ul>
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
              <h3 className="feature-title">
                Mệnh & Lá Số - Bản Đồ Vận Mệnh Cá Nhân
              </h3>
              <p className="feature-text">
                Khám phá bản thân qua lăng kính khoa học huyền bí. Lập bản đồ
                sao chi tiết, phân tích Bát Tự, Tử Vi, Thần Số học - tất cả được
                trực quan hóa dễ hiểu, kèm lời giải thích chuyên sâu từ các
                chuyên gia hàng đầu.
              </p>
              <ul className="feature-list mb-3">
                <li>⭐ Bản đồ sao cá nhân - vị trí hành tinh lúc sinh</li>
                <li>🔢 Thần số học - giải mã con số vận mệnh</li>
                <li>📅 Bát Tự & Tử Vi - lá số tứ trụ chi tiết</li>
                <li>📈 Dự báo chu kỳ vận hạn theo năm, tháng, ngày</li>
              </ul>
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
              <h3 className="feature-title">
                Đặt Lịch Chuyên Gia - Tư Vấn 1-1 Chuyên Sâu
              </h3>
              <p className="feature-text">
                Kết nối trực tiếp với các chuyên gia huyền học giàu kinh nghiệm.
                Chọn khung giờ linh hoạt, nhận tư vấn cá nhân hóa theo mục tiêu
                cụ thể - sự nghiệp, tình yêu, tài chính, sức khỏe, hoặc phát
                triển tâm linh.
              </p>
              <ul className="feature-list mb-3">
                <li>👤 Chuyên gia được xác minh, đánh giá cao</li>
                <li>📞 Tư vấn qua video call, voice call hoặc chat</li>
                <li>⏰ Đặt lịch linh hoạt 24/7, hủy miễn phí trước 2h</li>
                <li>🔮 Gói tư vấn từ 30 phút đến 2 giờ</li>
              </ul>
              <div className="d-flex gap-3">
                <Link to="/dich-vu" className="btn btn-gold">
                  Đặt lịch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SẢN PHẨM TIÊU BIỂU (Turntable Carousel) */}
      <section className="section section-products">
        <div className="container">
          <div className="section-head text-center">
            <h2 className="section-title">Sản phẩm tiêu biểu</h2>
            <p className="section-desc">
              Tarot of the Soul · Vòng đá Mệnh Kim · Hộp trà thiền · Combo
              Hương–Trầm–Nến · Chế tác riêng
            </p>
          </div>

          <div className="turntable-container position-relative">
            {/* Nút điều hướng */}
            <button
              className="nav-btn prev"
              onClick={handlePrev}
              aria-label="Previous"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              className="nav-btn next"
              onClick={handleNext}
              aria-label="Next"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>

            <div className="turntable-slider">
              {products.map((item, idx) => {
                const positionClass = getPositionClass(idx);
                return (
                  <article
                    className={`slide card-3d ${positionClass}`}
                    key={item.id || idx}
                  >
                    <div className="card-media position-relative">
                      <img
                        src={
                          item.image && item.image.startsWith("/images/")
                            ? process.env.PUBLIC_URL + item.image
                            : item.image ||
                              process.env.PUBLIC_URL +
                                `/images/products/product-${item.id}.png`
                        }
                        alt={item.name || `Sản phẩm ${item.id}`}
                        className="card-img-top img-square"
                        loading="lazy"
                      />
                      <span className="view-badge">
                        <svg
                          className="view-icon"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M12 5C7 5 2.73 8.11 1 12c1.73 3.89 6 7 11 7s9.27-3.11 11-7c-1.73-3.89-6-7-11-7Zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10Z"
                            fill="currentColor"
                          />
                          <circle cx="12" cy="12" r="2.5" fill="currentColor" />
                        </svg>
                        <span className="view-num">
                          {Math.floor(item.views || 0).toLocaleString("vi-VN", {
                            maximumFractionDigits: 0,
                          })}
                        </span>
                      </span>
                    </div>

                    <div className="card-body">
                      <h3 className="card-title">
                        <div className="marquee-container">
                          <span className="marquee-text">
                            {item.name || `Sản phẩm ${item.id}`}
                          </span>
                        </div>
                      </h3>
                      <p className="card-text">
                        {item.description || item.desc || "Mô tả sản phẩm"}
                      </p>
                      <div className="d-flex justify-content-center mt-auto">
                        <Link
                          to={`/cua-hang/san-pham/${
                            item.product_id || item.id
                          }`}
                          className="btn btn-sm btn-outline-gold px-4"
                        >
                          Xem chi tiết
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
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
              Khám phá các khóa học từ cơ bản đến nâng cao · Học theo lộ trình
              cá nhân hoá
            </p>
          </div>

          <div className="row g-4">
            {[
              {
                name: "Tarot Cơ Bản",
                icon: "🃏",
                desc: "78 lá bài · Giải nghĩa · Spread patterns",
                students: "2,450 học viên",
              },
              {
                name: "Thần Số Học",
                icon: "🔢",
                desc: "Con số vận mệnh · Biểu đồ ngày sinh · Chu kỳ",
                students: "1,890 học viên",
              },
              {
                name: "Chiêm Tinh",
                icon: "⭐",
                desc: "Bản đồ sao · Cung hoàng đạo · Hành tinh",
                students: "1,560 học viên",
              },
              {
                name: "Xem Tướng",
                icon: "🤲",
                desc: "Chỉ tay · Đường vân · Tướng mạo",
                students: "980 học viên",
              },
              {
                name: "Phong Thuỷ",
                icon: "🏠",
                desc: "Bát trạch · Hướng nhà · Năng lượng không gian",
                students: "1,230 học viên",
              },
              {
                name: "Bói Bài Trà",
                icon: "🍵",
                desc: "Đọc vị cặn trà · Hình dạng · Biểu tượng",
                students: "720 học viên",
              },
            ].map((course) => (
              <div className="col-12 col-md-6 col-xl-4" key={course.name}>
                <div className="card-3d h-100">
                  <div className="card-body">
                    <div
                      className="course-icon mb-3"
                      style={{ fontSize: "2.5rem" }}
                    >
                      {course.icon}
                    </div>
                    <h3 className="card-title">{course.name}</h3>
                    <p className="card-text mb-2">{course.desc}</p>
                    <p className="text-white-50 small mb-0">
                      <i className="bi bi-people-fill me-1"></i>
                      {course.students}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="d-flex gap-3 mt-4 justify-content-center">
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
                <li>
                  Địa chỉ: FPT Academy International, 13 Trịnh Văn Bô, Nam Từ
                  Liêm, Hà Nội
                </li>
                <li>Hotline/Zalo: 0799 958 589</li>
                <li>Email: contact@dokhacgiakhoa.vn</li>
                <li>Facebook · YouTube · TikTok · Instagram · Zalo</li>
              </ul>
            </div>
            <div className="col-12 col-lg-7">
              <div className="map-embed rounded-4 overflow-hidden">
                <iframe
                  title="Google Map - FPT Academy International"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8638558832!2d105.744598415332!3d21.038132792613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454b991d80fd5%3A0x530c45fa987abb80!2zRlBUIFBvbHl0ZWNobmljIEjDoCBO4buZaQ!5e0!3m2!1svi!2s!4v1699999999999"
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
