import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAlert } from "../../contexts/AlertContext";
import PurchaseModal from "../../components/common/PurchaseModal";
import "./cua-hang.css";

// Ghép PUBLIC_URL + path an toàn
const resolveSrc = (path) => {
  const base = process.env.PUBLIC_URL || "";
  const rel = path?.startsWith("/") ? path : `/${path || ""}`;
  return `${base}${rel}`;
};

// Fallback khi ảnh lỗi
const onImgError = (e) => {
  e.currentTarget.onerror = null;
  e.currentTarget.src = resolveSrc("/images/placeholder-square.png");
};

export default function ProductDetail() {
  const { showSuccess, showError } = useAlert();
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPurchase, setShowPurchase] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    // Fetch main product
    axios
      .get(`/api/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });

    // Fetch related (random 4 products)
    axios
      .get("/api/products")
      .then((res) => {
        const filtered = res.data
          .filter((p) => p.product_id !== id)
          .slice(0, 4);
        setRelatedProducts(filtered);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleAddToCart = () => {
    if (!localStorage.getItem("auth_token")) {
      showError("Vui lòng đăng nhập để thực hiện chức năng này!");
      navigate("/tai-khoan");
      return;
    }

    try {
      const cartData = JSON.parse(localStorage.getItem("kh_cart") || "[]");
      const existing = cartData.find((item) => item.id === product.id);

      if (existing) {
        existing.quantity += quantity;
      } else {
        cartData.push({
          id: product.id,
          type: "product", // Verify type for polymorphic order
          name: product.name,
          price: product.price,
          image_url: product.image_url || product.img,
          quantity: quantity,
        });
      }

      localStorage.setItem("kh_cart", JSON.stringify(cartData));
      window.dispatchEvent(new Event("cartChanged"));
      showSuccess(`Đã thêm ${quantity} ${product.name} vào giỏ hàng!`);
    } catch (e) {
      console.error("Lỗi thêm giỏ hàng:", e);
    }
  };

  if (loading)
    return (
      <div className="container py-5 text-center min-vh-100">
        <div className="spinner-border text-gold my-5"></div>
      </div>
    );

  if (!product)
    return (
      <div className="container py-5 text-center min-vh-100">
        <h3 className="text-gold">Sản phẩm không tồn tại</h3>
        <button
          onClick={() => navigate("/cua-hang")}
          className="btn btn-gold mt-3"
        >
          Quay lại Cửa hàng
        </button>
      </div>
    );

  const discountedPrice = product.price * (1 - (product.discount || 0) / 100);

  return (
    <div className="container pt-3 pb-5 animate-fade-in">
      <div className="row g-5">
        {/* Product Image */}
        <div className="col-lg-6">
          <div className="product-detail-image-wrapper p-2 bg-dark rounded-4 shadow-lg">
            <img
              src={resolveSrc(product.image_url || product.img)}
              alt={product.name}
              className="img-fluid rounded-4"
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
              onError={onImgError}
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="col-lg-6">
          <div className="product-info-card">
            <div className="badge bg-gold text-dark mb-2">
              {product.category_name || "Năng lượng"}
            </div>
            <h1 className="display-5 fw-bold text-gold mb-3">{product.name}</h1>

            <div className="price-tag mb-4">
              <span className="fs-2 fw-bold text-gold">
                {Math.floor(discountedPrice / 1000).toLocaleString("vi-VN", {
                  maximumFractionDigits: 0,
                })}{" "}
                🔮
              </span>
              {product.discount > 0 && (
                <span className="ms-3 text-white-50 text-decoration-line-through">
                  {Math.floor(product.price / 1000).toLocaleString("vi-VN", {
                    maximumFractionDigits: 0,
                  })}{" "}
                  🔮
                </span>
              )}
            </div>

            <p
              className="text-light mb-5 fs-5 lead"
              style={{ whiteSpace: "pre-line", opacity: 0.85 }}
            >
              {product.description || "Tải thông tin sản phẩm..."}
            </p>

            {product.detailed_description && (
              <div className="mb-4 p-4 bg-dark bg-opacity-50 rounded-3 border border-secondary">
                <h5 className="text-gold mb-3">📋 Mô tả chi tiết</h5>
                <div
                  className="text-light"
                  style={{
                    whiteSpace: "pre-line",
                    opacity: 0.9,
                    lineHeight: 1.8,
                  }}
                >
                  {product.detailed_description}
                </div>
              </div>
            )}

            <div className="purchase-controls border-top border-secondary pt-4">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="input-group" style={{ width: "140px" }}>
                  <button
                    className="btn btn-outline-gold"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    className="form-control bg-dark border-gold text-white text-center"
                    value={quantity}
                    readOnly
                  />
                  <button
                    className="btn btn-outline-gold"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <div className="d-flex align-items-center gap-3 flex-wrap">
                  <div className="stock-info small text-light">
                    📦 Còn{" "}
                    <span className="text-gold fw-bold">
                      {product.stock || 999}
                    </span>{" "}
                    sản phẩm trong kho
                  </div>
                  {product.sold > 0 && (
                    <div className="sold-info small text-light">
                      🔥 Đã bán{" "}
                      <span className="text-gold fw-bold">{product.sold}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="d-grid gap-3 d-sm-flex">
                <button
                  className="btn btn-outline-gold btn-lg flex-grow-1 py-3 fw-bold"
                  onClick={handleAddToCart}
                >
                  THÊM VÀO GIỎ HÀNG
                </button>
                <button
                  className="btn btn-gold btn-lg flex-grow-1 py-3 fw-bold"
                  onClick={() => {
                    if (!localStorage.getItem("auth_token")) {
                      showError("Vui lòng đăng nhập để mua hàng!");
                      navigate("/tai-khoan");
                      return;
                    }
                    setShowPurchase(true);
                  }}
                >
                  MUA NGAY
                </button>
              </div>
            </div>

            <div className="mt-5 p-4 bg-dark bg-opacity-25 rounded-4 border border-secondary">
              <h5 className="text-gold mb-3">Chính sách đặc biệt</h5>
              <div className="row g-3">
                <div className="col-12 d-flex align-items-center gap-2">
                  <i className="bi bi-shield-check text-gold"></i>
                  <span>Bảo mật tâm linh trọn đời</span>
                </div>
                <div className="col-12 d-flex align-items-center gap-2">
                  <i className="bi bi-lightning-charge text-gold"></i>
                  <span>Kích hoạt năng lượng ngay sau khi nhận</span>
                </div>
                <div className="col-12 d-flex align-items-center gap-2">
                  <i className="bi bi-chat-heart text-gold"></i>
                  <span>Tư vấn 1:1 bởi chuyên gia Tarot & Tử Vi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="related-section mt-5 pt-5">
        <h2 className="text-center text-gold mb-5 fw-bold fs-1">
          Sản phẩm liên quan
        </h2>
        <div className="row g-4">
          {relatedProducts.map((p) => (
            <div key={p.id} className="col-6 col-md-3">
              <div
                className="related-item card-3d p-2 text-center cursor-pointer"
                onClick={() => navigate(`/cua-hang/san-pham/${p.product_id}`)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={resolveSrc(p.image_url || p.img)}
                  alt={p.name}
                  className="img-fluid rounded-3 mb-2"
                  onError={onImgError}
                />
                <div className="small fw-bold text-truncate">{p.name}</div>
                <div className="small text-gold">
                  {Math.floor(p.price / 1000).toLocaleString("vi-VN", {
                    maximumFractionDigits: 0,
                  })}{" "}
                  🔮
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showPurchase && (
        <PurchaseModal
          product={product}
          quantity={quantity}
          onClose={() => setShowPurchase(false)}
          onSuccess={() => {
            setShowPurchase(false);
            // Optionally refresh stock or redirect
          }}
        />
      )}
    </div>
  );
}
