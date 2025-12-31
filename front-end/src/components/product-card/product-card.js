import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAlert } from "../../contexts/AlertContext";
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
  const { showSuccess, showError } = useAlert();
  const imgSrc = resolveSrc(product.img);
  // const navigate = useNavigate(); // Removed as per instruction to use custom modals

  // ✅ Kiểm tra overflow + thiết lập biến CSS cho marquee
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
    if (!localStorage.getItem("auth_token")) {
      showError("Vui lòng đăng nhập để mua hàng!");
      return;
    }

    try {
      const cartData = JSON.parse(localStorage.getItem("kh_cart") || "[]");
      const existing = cartData.find((item) => item.id === product.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        cartData.push({
          id: product.id,
          type: "product",
          name: product.name,
          price: product.price,
          img: product.image_url || product.img,
          quantity: 1,
        });
      }

      localStorage.setItem("kh_cart", JSON.stringify(cartData));

      // Thông báo cho các component khác (Navbar, Dashboard)
      window.dispatchEvent(new Event("cartChanged"));

      showSuccess(`Đã thêm ${product.name} vào giỏ hàng!`);
    } catch (e) {
      console.error("Lỗi thêm giỏ hàng:", e);
    }
  };

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
          <span className="badge-made">Chế tác riêng ✴️</span>
        )}
      </div>

      <div className="card-body d-flex flex-column">
        {/* Viewport + băng chữ bên trong */}
        <h3
          ref={nameRef}
          className={`product-name text-white ${canScroll ? "can-scroll" : ""}`}
          title={product.name}
        >
          <span className="product-name-inner">{product.name}</span>
        </h3>

        <p
          className="product-desc text-white small mb-2 line-clamp-2"
          style={{ minHeight: "40px", fontSize: "0.85rem", opacity: 0.75 }}
        >
          {product.short_description ||
            product.description ||
            "Mô tả đang cập nhật..."}
        </p>

        <div className="product-meta d-flex align-items-center justify-content-between mt-auto">
          <span className="product-cat text-white-50 small">
            {categoryLabel}
          </span>
          <span className="product-price text-gold fw-bold fs-5">
            {money(product.price)}
          </span>
        </div>

        <div className="card-actions d-flex gap-2 mt-3">
          <button
            className="btn btn-gold flex-grow-1"
            onClick={handleAddToCart}
            style={{ fontSize: "0.9rem", padding: "8px 4px" }}
          >
            Thêm giỏ
          </button>
          <Link
            to={`/cua-hang/san-pham/${product.product_id}`}
            className="btn btn-outline-gold flex-grow-1"
            style={{ fontSize: "0.9rem", padding: "8px 4px" }}
          >
            Chi tiết
          </Link>
        </div>
      </div>
    </article>
  );
}
