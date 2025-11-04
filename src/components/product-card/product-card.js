import React from "react";
import { Link } from "react-router-dom";
import "./product-card.css";

/**
 * Props:
 * - product: { id, name, price, cat, img, madeForYou }
 * - categoryLabel: string (label tiếng Việt của cat)
 * - money: function (định dạng VND)
 */
export default function Card({ product, categoryLabel, money }) {
  return (
    <article className="card-3d product-card h-100 d-flex flex-column">
      <div className="product-media position-relative">
        <img
          src={process.env.PUBLIC_URL + product.img}
          alt={product.name}
          className="product-img img-square"
          loading="lazy"
        />
        {product.madeForYou && (
          <span className="badge-made">Made for You ✴️</span>
        )}
      </div>

      <div className="card-body d-flex flex-column">
        <h3 className="product-name">{product.name}</h3>

        <div className="d-flex align-items-center justify-content-between">
          <span className="product-price">{money(product.price)}</span>
          <span className="product-cat">{categoryLabel}</span>
        </div>

        <div className="card-actions d-grid gap-2 mt-3">
          <Link to="/tai-khoan" className="btn btn-sm btn-gold">
            Thêm vào giỏ
          </Link>
          <Link to="/cua-hang" className="btn btn-sm btn-outline-gold">
            Xem chi tiết
          </Link>
        </div>
      </div>
    </article>
  );
}
