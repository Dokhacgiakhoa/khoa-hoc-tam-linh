"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useAlert } from "../../contexts/AlertContext";
import "./product-card.css";

// Ghép path an toàn
const resolveSrc = (path) => {
  if (!path) return "/images/products/product-1.png";
  if (path.startsWith("http")) return path;
  return path.startsWith("/") ? path : `/${path}`;
};

// Fallback khi ảnh lỗi
const onImgError = (e) => {
  e.currentTarget.onerror = null;
  e.currentTarget.src = "/images/products/product-1.png";
};

export default function ProductCard({ product, categoryLabel, money }) {
  const { showSuccess, showError } = useAlert();
  const imgSrc = resolveSrc(product.img || product.image || product.image_url);

  const nameRef = useRef(null);
  const [canScroll, setCanScroll] = useState(false);

  useEffect(() => {
    const el = nameRef.current;
    if (!el) return;

    const apply = () => {
      const overflow = el.scrollWidth - el.clientWidth;
      const can = overflow > 2;
      setCanScroll(can);

      const duration = Math.max(6, overflow / 60 + 2);
      el.style.setProperty("--marquee-distance", `${overflow}px`);
      el.style.setProperty("--marquee-duration", `${duration}s`);
    };

    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, [product?.name]);

  const handleAddToCart = () => {
    try {
      const cartData = JSON.parse(localStorage.getItem("kh_cart") || "[]");
      const existing = cartData.find((item) => item.id === product.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        cartData.push({
          id: product.id,
          name: product.name,
          price: product.price,
          img: imgSrc,
          quantity: 1,
        });
      }

      localStorage.setItem("kh_cart", JSON.stringify(cartData));
      window.dispatchEvent(new Event("cartChanged"));
      if (showSuccess) showSuccess(`Đã thêm "${product.name}" vào giỏ hàng!`);
      else alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
    } catch (e) {
      console.error("Lỗi khi thêm giỏ hàng:", e);
    }
  };

  const formattedPrice =
    typeof money === "function"
      ? money(product.price)
      : product.price
      ? product.price.toLocaleString("vi-VN") + " 🔮"
      : "Liên hệ";

  return (
    <div className="product-card card-3d h-100 d-flex flex-column">
      <Link href={`/cua-hang/san-pham/${product.id}`} className="product-card-media position-relative d-block overflow-hidden rounded-top">
        <img
          src={imgSrc}
          alt={product.name || "Sản phẩm"}
          className="product-card-img w-100"
          style={{ aspectRatio: "1/1", objectFit: "cover" }}
          onError={onImgError}
          loading="lazy"
        />
        {categoryLabel && (
          <span className="product-card-badge position-absolute top-0 start-0 m-2 badge bg-dark bg-opacity-75 text-gold border-gold">
            {categoryLabel}
          </span>
        )}
      </Link>

      <div className="product-card-body p-3 d-flex flex-column flex-grow-1">
        <Link href={`/cua-hang/san-pham/${product.id}`} className="text-decoration-none">
          <h4
            ref={nameRef}
            className={`product-card-name text-light fw-bold mb-1 fs-6 ${canScroll ? "marquee-text" : ""}`}
            title={product.name}
          >
            {product.name}
          </h4>
        </Link>

        {product.description && (
          <p className="product-card-desc text-white-50 small line-clamp-2 mb-3" style={{ fontSize: "0.85rem", height: "2.5rem", overflow: "hidden" }}>
            {product.description}
          </p>
        )}

        <div className="mt-auto d-flex align-items-center justify-content-between pt-2 border-top border-white border-opacity-10">
          <span className="product-card-price text-gold fw-bold fs-6">
            {formattedPrice}
          </span>
          <button
            type="button"
            className="btn btn-gold btn-sm px-3 shadow"
            onClick={handleAddToCart}
          >
            + Mua
          </button>
        </div>
      </div>
    </div>
  );
}
