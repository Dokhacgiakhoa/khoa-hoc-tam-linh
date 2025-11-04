import React from "react";
import { Link } from "react-router-dom";
import "./product-card.css";

/**
 * Props:
 * - product: { id, name, price, cat, img, madeForYou }
 * - categoryLabel: string
 * - money: (number) => string
 */

// Ghép PUBLIC_URL + path an toàn
const resolveSrc = (path) => {
  const base = process.env.PUBLIC_URL || "";
  const rel = path?.startsWith("/") ? path : `/${path || ""}`;
  return `${base}${rel}`;
};

// Fallback khi ảnh 404 → placeholder vuông 1:1
const onImgError = (e) => {
  e.currentTarget.onerror = null;
  e.currentTarget.src = resolveSrc("/media/placeholder-square.png");
};

export default function ProductCard({ product, categoryLabel, money }) {
  const imgSrc = resolveSrc(product.img);

  return (
    <article
      className="card-3d product-card h-100 d-flex flex-column"
      aria-label={product.name}
    >
      {/* MEDIA */}
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
          <span className="badge-made" aria-label="Sản phẩm chế tác riêng">
            Made for You ✴️
          </span>
        )}
      </div>

      {/* BODY */}
      <div className="card-body d-flex flex-column">
        <h3 className="product-name" title={product.name}>
          {product.name}
        </h3>

        <div className="product-meta d-flex align-items-center justify-content-between">
          <span className="product-price">{money(product.price)}</span>
          <span className="product-cat">{categoryLabel}</span>
        </div>

        <div className="card-actions d-grid gap-2 mt-3">
          <Link
            to="/tai-khoan"
            className="btn btn-gold"
            aria-label={`Thêm ${product.name} vào giỏ`}
          >
            Thêm vào giỏ
          </Link>
          <Link
            to="/cua-hang"
            className="btn btn-outline-gold"
            aria-label={`Xem chi tiết ${product.name}`}
          >
            Xem chi tiết
          </Link>
        </div>
      </div>
    </article>
  );
}
