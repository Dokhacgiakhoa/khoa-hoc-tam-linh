import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./product-card.css";

// Ghép PUBLIC_URL + path an toàn
const resolveSrc = (path) => {
  const base = process.env.PUBLIC_URL || "";
  const rel = path?.startsWith("/") ? path : `/${path || ""}`;
  return `${base}${rel}`;
};

// Fallback khi ảnh lỗi
const onImgError = (e) => {
  e.currentTarget.onerror = null;
  e.currentTarget.src = resolveSrc("/media/placeholder-square.png");
};

export default function ProductCard({ product, categoryLabel, money }) {
  const imgSrc = resolveSrc(product.img);

  // ✅ Kiểm tra overflow + thiết lập biến CSS cho marquee
  const nameRef = useRef(null);
  const [canScroll, setCanScroll] = useState(false);

  useEffect(() => {
    const el = nameRef.current;
    if (!el) return;

    const apply = () => {
      // khoảng tràn = phần nội dung vượt quá khung
      const overflow = el.scrollWidth - el.clientWidth;
      const can = overflow > 2; // threshold nhỏ chống nhiễu
      setCanScroll(can);

      // Tính thời gian dựa theo tốc độ ~ 60px/s + buffer
      const duration = Math.max(6, overflow / 60 + 2); // giây
      el.style.setProperty("--marquee-distance", `${overflow}px`);
      el.style.setProperty("--marquee-duration", `${duration}s`);
    };

    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, [product?.name]);

  return (
    <article
      className="card-3d product-card h-100 d-flex flex-column"
      aria-label={product.name}
    >
      <div className="product-media position-relative">
        <img
          src={imgSrc}
          alt={product.name}
          className="product-img img-square"
          loading="lazy"
          decoding="async"
          onError={onImgError}
        />
        {product.madeForYou && (
          <span className="badge-made">Made for You ✴️</span>
        )}
      </div>

      <div className="card-body d-flex flex-column">
        {/* Viewport + băng chữ bên trong */}
        <h3
          ref={nameRef}
          className={`product-name ${canScroll ? "can-scroll" : ""}`}
          title={product.name}
        >
          <span className="product-name-inner">{product.name}</span>
        </h3>

        <div className="product-meta d-flex align-items-center justify-content-between">
          <span className="product-price">{money(product.price)}</span>
          <span className="product-cat">{categoryLabel}</span>
        </div>

        <div className="card-actions d-grid gap-2 mt-3">
          <Link to="/tai-khoan" className="btn btn-gold">
            Thêm vào giỏ
          </Link>
          <Link to="/cua-hang" className="btn btn-outline-gold">
            Xem chi tiết
          </Link>
        </div>
      </div>
    </article>
  );
}
