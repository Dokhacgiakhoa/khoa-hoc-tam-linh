"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import api from "../services/api";
import SkeletonLoader from "../components/common/skeleton/SkeletonLoader";
import "../views/trang-chu/trang-chu.css";

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

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(2); // Mặc định card 3 ở giữa
  const [products, setProducts] = useState(FALLBACK_PRODUCTS);
  const [productsLoading, setProductsLoading] = useState(true);

  // Fetch featured products from API via centralized client
  useEffect(() => {
    api
      .get("/api/products?featured=true&limit=10")
      .then((res) => {
        const data = res.data?.data || res.data;
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
        console.warn("Using fallback products data:", err);
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
    return "card-hidden";
  };

  return (
    <main id="trang-chu" className="khctl-page">
      {/* HERO */}
      <section className="hero position-relative overflow-hidden" aria-label="Hero">
        <div
          className="hero-image-layer"
          style={{
            backgroundImage: `url('/images/hero_mystic_ai_v2.png')`,
            opacity: 0.35,
          }}
        />
        <div className="hero-overlay" />

        <div className="container position-relative hero-content py-5">
          <div className="row align-items-center min-vh-75">
            <div className="col-lg-10 col-xl-8">
              <h1 className="hero-title">
                Khai Phá
                <br />
                Sức Mạnh Tâm Linh
                <br />
                <span className="text-gold-gradient">BẰNG TRÍ TUỆ NHÂN TẠO</span>
              </h1>
              <p className="hero-sub">
                Kết hợp tinh hoa Huyền học nghìn năm với công nghệ Data Science
                hiện đại. Tarot, Mệnh lý và Phong thủy được minh giải khoa học,
                chính xác và bảo mật.
              </p>
              <div className="d-flex gap-4 flex-wrap hero-cta-wrapper">
                <Link className="btn btn-gold" href="/dich-vu">
                  Bắt đầu ngay &nbsp; &rarr;
                </Link>
                <Link className="btn btn-outline-gold" href="/hoc-vien">
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
                  src="/images/banners/trang-chu-dich-vu.png"
                  alt="Dịch vụ Tâm linh AI"
                  className="card-img-top"
                  loading="lazy"
                />
                <div className="card-body">
                  <h3 className="card-title">Dịch vụ Tâm linh AI</h3>
                  <p className="card-text">
                    Tarot &amp; Bài Trà · Mệnh &amp; Lá số · Đặt lịch chuyên gia.
                  </p>
                  <Link href="/dich-vu" className="btn btn-sm btn-gold">
                    Xem dịch vụ
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-xl-3">
              <div className="card-3d h-100">
                <img
                  src="/images/banners/trang-chu-cua-hang.png"
                  alt="Cửa hàng Năng lượng"
                  className="card-img-top"
                  loading="lazy"
                />
                <div className="card-body">
                  <h3 className="card-title">Cửa hàng Năng lượng</h3>
                  <p className="card-text">
                    Tarot Deck · Phụ kiện · Hương–Trầm–Trà · Bộ sưu tập.
                  </p>
                  <Link href="/cua-hang" className="btn btn-sm btn-gold">
                    Vào cửa hàng
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-xl-3">
              <div className="card-3d h-100">
                <img
                  src="/images/banners/trang-chu-hoc-vien-huyen-hoc.png"
                  alt="Học viện Huyền học"
                  className="card-img-top"
                  loading="lazy"
                />
                <div className="card-body">
                  <h3 className="card-title">Học viện Huyền học</h3>
                  <p className="card-text">
                    Ngũ Huyền Thuật: Mệnh – Tướng – Bốc – Trạch – Số.
                  </p>
                  <Link href="/hoc-vien" className="btn btn-sm btn-gold">
                    Đăng ký Học viện
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-xl-3">
              <div className="card-3d h-100">
                <img
                  src="/images/banners/trang-chu-tai-khoan.png"
                  alt="Tài khoản &amp; Ví Linh Tệ"
                  className="card-img-top"
                  loading="lazy"
                />
                <div className="card-body">
                  <h3 className="card-title">Tài khoản &amp; Ví Linh Tệ</h3>
                  <p className="card-text">
                    Nhiệm vụ · Hộp thư · Giỏ hàng · 2FA bảo mật.
                  </p>
                  <Link href="/tai-khoan" className="btn btn-sm btn-gold">
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
                src="/images/banners/trang-chu-tarot-va-bai-tra.png"
                alt="Tarot &amp; Bài Trà"
                loading="lazy"
              />
            </div>
            <div className="col-lg-6">
              <h3 className="feature-title">Tarot & Bài Trà AI - Giải Mã Vận Mệnh</h3>
              <p className="feature-text">
                Công nghệ AI kết hợp trí tuệ cổ xưa, mang đến lời giải đáp chính xác và sâu sắc. Bốc 1 lá Tarot miễn phí hoặc đọc vị cặn trà - nhận insight chi tiết trong 30 giây.
              </p>
              <div className="d-flex gap-3">
                <Link href="/dich-vu/tarot-mien-phi" className="btn btn-gold">
                  Bốc 1 lá miễn phí
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
              Tarot of the Soul · Vòng đá Mệnh Kim · Hộp trà thiền · Combo Hương–Trầm–Nến
            </p>
          </div>

          {productsLoading ? (
            <div className="py-4">
              <SkeletonLoader type="card" count={3} />
            </div>
          ) : (
            <div className="turntable-container position-relative">
              <button className="nav-btn prev" onClick={handlePrev} aria-label="Previous">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button className="nav-btn next" onClick={handleNext} aria-label="Next">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>

              <div className="turntable-slider">
                {products.map((item, idx) => {
                  const positionClass = getPositionClass(idx);
                  return (
                    <article className={`slide card-3d ${positionClass}`} key={item.id || idx}>
                      <div className="card-media position-relative">
                        <img
                          src={item.image && item.image.startsWith("/images/") ? item.image : `/images/products/product-${item.id}.png`}
                          alt={item.name || `Sản phẩm ${item.id}`}
                          className="card-img-top img-square"
                          loading="lazy"
                        />
                        <span className="view-badge">
                          <span className="view-num">{Math.floor(item.views || 0).toLocaleString("vi-VN")}</span>
                        </span>
                      </div>

                      <div className="card-body">
                        <h3 className="card-title">
                          <span className="marquee-text">{item.name || `Sản phẩm ${item.id}`}</span>
                        </h3>
                        <p className="card-text">{item.description || "Mô tả sản phẩm"}</p>
                        <div className="d-flex justify-content-center mt-auto">
                          <Link href={`/cua-hang/san-pham/${item.id}`} className="btn btn-sm btn-outline-gold px-4">
                            Xem chi tiết
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
