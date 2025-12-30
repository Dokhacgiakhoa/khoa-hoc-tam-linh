import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../contexts/AlertContext";

export default function ServiceGuard({ serviceId, children }) {
  const [loading, setLoading] = useState(true);
  const [isOwned, setIsOwned] = useState(false);
  const [productInfo, setProductInfo] = useState(null);
  const { showError, showWarning, showSuccess, showInfo } = useAlert();
  const navigate = useNavigate();

  // Danh sách các service miễn phí (hardcode để tối ưu)
  const FREE_SERVICES = ["sv-vantay", "sv-tarot", "sv-thuocloban"];

  useEffect(() => {
    if (FREE_SERVICES.includes(serviceId)) {
      setIsOwned(true);
      setLoading(false);
      return;
    }

    const checkOwnership = async () => {
      // Check login first
      const token = localStorage.getItem("auth_token");
      if (!token) {
        setLoading(false);
        setIsOwned(false);
        return;
      }

      try {
        const res = await axios.get(
          `/api/products/${serviceId}/check-ownership`
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
      <div className="text-center py-5 text-gold">
        🔮 Đang kiểm tra quyền truy cập...
      </div>
    );
  }

  // Not logged in UI
  if (!localStorage.getItem("auth_token")) {
    return (
      <div className="text-center py-5 animate-fade-in">
        <h3 className="text-gold mb-3">Yêu cầu đăng nhập</h3>
        <p className="mb-4 text-white-50">
          Vui lòng đăng nhập để sử dụng dịch vụ này.
        </p>
        <a href="/tai-khoan" className="btn btn-gold px-4">
          Đăng nhập ngay
        </a>
      </div>
    );
  }

  // Not owned UI
  if (!isOwned) {
    return (
      <div
        className="text-center py-5 animate-fade-in container"
        style={{ maxWidth: "600px" }}
      >
        <div className="glass-card p-5">
          <div className="mb-4" style={{ fontSize: "3rem" }}>
            🔒
          </div>
          <h3 className="text-gold mb-3">Dịch vụ trả phí</h3>
          <p className="mb-4 text-white-50">
            Bạn cần mở khóa dịch vụ{" "}
            <strong>{productInfo?.name || "này"}</strong> để tiếp tục sử dụng.
          </p>

          <div className="price-tag mb-4">
            <span className="fs-2 fw-bold text-gold">
              {productInfo
                ? (productInfo.price / 1000).toLocaleString()
                : "..."}
            </span>{" "}
            <span className="text-muted">Linh Tệ</span>
          </div>

          <button
            className="btn btn-gold btn-lg px-5 w-100 mb-3"
            onClick={() => {
              // Add to cart logic
              const cart = JSON.parse(localStorage.getItem("kh_cart") || "[]");
              const existingItem = cart.find(
                (item) => item.id === (productInfo.product_id || productInfo.id)
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
            Mở Khóa Ngay
          </button>

          <button
            className="btn btn-outline-light w-100"
            onClick={() => window.history.back()}
          >
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  return children;
}
