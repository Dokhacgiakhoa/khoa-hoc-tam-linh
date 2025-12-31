import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../contexts/AlertContext";

export default function ServiceGuard({ serviceId, config, children }) {
  const [loading, setLoading] = useState(true);
  const [isOwned, setIsOwned] = useState(false);
  const [productInfo, setProductInfo] = useState(null);
  const { showError, showWarning, showSuccess, showInfo } = useAlert();
  const navigate = useNavigate();

  // Danh sách các service miễn phí (hardcode để tối ưu)
  const FREE_SERVICES = [
    "sv-vantay",
    "sv-tarot",
    "sv-thuocloban",
    "sv-xin-xam",
    "sv-lichvannien",
  ];

  useEffect(() => {
    if (FREE_SERVICES.includes(serviceId)) {
      setIsOwned(true);
      setLoading(false);
      return;
    }

    const checkOwnership = async () => {
      const token = localStorage.getItem("auth_token");

      // If not logged in, treat as not owned but allow viewing info
      if (!token) {
        setIsOwned(false);
        try {
          const prodRes = await axios.get(`/api/products/${serviceId}`);
          setProductInfo(prodRes.data);
        } catch (e) {
          console.error("Failed to fetch product info", e);
        }
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          `/api/products/${serviceId}/check-ownership`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setIsOwned(res.data.owned);

        // Fetch product info for display if needed
        if (!res.data.owned) {
          try {
            const prodRes = await axios.get(`/api/products/${serviceId}`);
            setProductInfo(prodRes.data);
          } catch (e) {
            console.error("Failed to fetch product info", e);
          }
        }
      } catch (err) {
        console.error("Error checking ownership:", err);
      } finally {
        setLoading(false);
      }
    };
    checkOwnership();
  }, [serviceId]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-gold" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Not owned UI (Sales Page)
  if (!isOwned) {
    const displayTitle =
      config?.title || productInfo?.name || "Dịch vụ cao cấp";
    const displayDesc =
      config?.desc ||
      "Mở khóa ngay để khám phá những bí mật về bản thân và vận mệnh của bạn. Luận giải chi tiết, chính xác và mang tính cá nhân hóa cao.";
    const displayIcon = config?.icon || "💎";

    return (
      <div
        className="container py-5 animate-fade-in"
        style={{ marginTop: "80px", maxWidth: "1000px" }}
      >
        <div className="glass-card border-gold overflow-hidden position-relative">
          {/* Background decoration */}
          <div
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{
              background:
                "radial-gradient(circle at 30% 50%, rgba(255, 215, 0, 0.08), transparent 60%)",
              zIndex: 0,
            }}
          ></div>

          <div className="row align-items-center g-0 position-relative z-1">
            {/* Left Column: Visual & Price */}
            {/* Left Column: Visual & Price */}
            <div
              className="col-md-5 p-0 position-relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(20,20,40,0.6) 0%, rgba(50,40,20,0.4) 100%)",
                minHeight: "400px",
              }}
            >
              {/* Decorative Circle Background */}
              <div
                className="position-absolute top-50 start-50 translate-middle"
                style={{
                  width: "300px",
                  height: "300px",
                  background:
                    "radial-gradient(circle, rgba(255,215,0,0.15) 0%, transparent 70%)",
                  borderRadius: "50%",
                  zIndex: 0,
                }}
              ></div>

              <div className="d-flex flex-column h-100 justify-content-center align-items-center position-relative z-1 p-5">
                <div
                  className="display-1 mb-4 animate-float d-inline-block p-4 rounded-circle border border-gold border-opacity-25"
                  style={{
                    background: "rgba(255,215,0,0.05)",
                    boxShadow: "0 0 30px rgba(255,215,0,0.1)",
                    backdropFilter: "blur(5px)",
                  }}
                >
                  {displayIcon}
                </div>

                <div className="price-section text-center">
                  <div className="mb-3">
                    <span className="badge bg-gold text-dark px-3 py-2 rounded-pill fw-bold ls-1 shadow-sm">
                      PREMIUM ACCESS
                    </span>
                  </div>

                  <div className="d-flex align-items-center justify-content-center mb-2">
                    <h2 className="display-4 fw-bold text-white mb-0 text-shadow">
                      {productInfo
                        ? (productInfo.price / 1000).toLocaleString()
                        : "..."}
                    </h2>
                    <span className="fs-2 text-gold ms-2">🔮</span>
                  </div>

                  <p
                    className="text-white-50 fst-italic mb-0"
                    style={{ fontSize: "0.9rem" }}
                  >
                    Trọn gói • Vĩnh viễn • Bảo mật
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Key Selling Points */}
            <div className="col-md-7 p-5">
              <h2 className="display-6 text-gold fw-bold mb-3">
                {displayTitle}
              </h2>
              <p
                className="lead text-light opacity-90 mb-4"
                style={{ fontSize: "1.1rem" }}
              >
                {displayDesc}
              </p>

              <div className="benefits-list mb-5">
                <h5 className="text-white mb-3 border-bottom border-secondary border-opacity-50 pb-2 d-inline-block">
                  Quyền lợi của bạn:
                </h5>
                <ul className="list-unstyled">
                  <li className="d-flex align-items-start mb-3">
                    <i className="bi bi-check-circle-fill text-gold me-3 mt-1 fs-5"></i>
                    <span>
                      <strong>Luận giải chuyên sâu:</strong> Phân tích chi tiết
                      dựa trên dữ liệu cá nhân của bạn.
                    </span>
                  </li>
                  <li className="d-flex align-items-start mb-3">
                    <i className="bi bi-file-earmark-text-fill text-gold me-3 mt-1 fs-5"></i>
                    <span>
                      <strong>Lưu trữ vĩnh viễn:</strong> Xem lại kết quả bất cứ
                      lúc nào trong hồ sơ.
                    </span>
                  </li>
                  <li className="d-flex align-items-start mb-3">
                    <i className="bi bi-shield-check text-gold me-3 mt-1 fs-5"></i>
                    <span>
                      <strong>Bảo mật tuyệt đối:</strong> Thông tin cá nhân được
                      mã hóa và bảo vệ.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="d-grid gap-3 d-sm-flex">
                <button
                  className="btn btn-gold btn-lg px-4 flex-grow-1 shadow fw-bold"
                  style={{ minHeight: "50px" }}
                  onClick={() => {
                    if (!localStorage.getItem("auth_token")) {
                      showInfo("Vui lòng đăng nhập để mua dịch vụ này!");
                      navigate("/tai-khoan");
                      return;
                    }

                    if (!productInfo) return;
                    // Add to cart logic
                    const cart = JSON.parse(
                      localStorage.getItem("kh_cart") || "[]"
                    );
                    const existingItem = cart.find(
                      (item) =>
                        item.id === (productInfo.product_id || productInfo.id)
                    );

                    if (existingItem) {
                      showInfo(
                        "Dịch vụ đã có trong giỏ hàng. Đang chuyển đến trang thanh toán..."
                      );
                    } else {
                      cart.push({
                        id: productInfo.product_id || productInfo.id,
                        name: productInfo.name,
                        price: productInfo.price,
                        image_url: productInfo.image_url || productInfo.img,
                        quantity: 1,
                        type: "service",
                      });
                      localStorage.setItem("kh_cart", JSON.stringify(cart));
                      window.dispatchEvent(new Event("cartChanged"));
                      showSuccess("Đã thêm vào giỏ hàng!");
                    }
                    navigate("/tai-khoan/gio-hang");
                  }}
                >
                  {localStorage.getItem("auth_token")
                    ? "🔓 Mở Khóa Ngay"
                    : "🔑 Đăng Nhập Để Sử Dụng"}
                </button>

                <button
                  className="btn btn-outline-light btn-lg px-4"
                  onClick={() => navigate("/dich-vu")}
                >
                  Xem dịch vụ khác
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
