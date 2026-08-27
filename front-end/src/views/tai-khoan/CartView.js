import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAlert } from "../../contexts/AlertContext";
import AuthModal from "../../components/common/AuthModal";

export default function CartView({ user: initialUser }) {
  const { showSuccess, showError, showWarning, showConfirm, showInfo } =
    useAlert();
  // Manage user state locally to allow updates/refreshes
  const [user, setUser] = useState(initialUser);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Sync prop changes to local state
  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [showSavedCoupons, setShowSavedCoupons] = useState(false);

  // Mock list of saved coupons
  const savedCoupons = [
    { code: "NEWYEAR2026", desc: "Giảm 20% chào năm mới" },
    { code: "VIPMEMBER", desc: "Giảm 50 Linh Tệ cho thành viên VIP" },
    { code: "FREESHIP", desc: "Miễn phí vận chuyển" },
  ];

  useEffect(() => {
    loadCart();
    // Listen for cart changes from other components
    window.addEventListener("cartChanged", loadCart);

    // Fetch fresh user data to ensure balance is correct
    if (localStorage.getItem("auth_token")) {
      axios
        .get("/api/user")
        .then((res) => {
          setUser(res.data);
          localStorage.setItem("user", JSON.stringify(res.data)); // Update cache
        })
        .catch((err) => console.error("Failed to refresh user data", err));
    }

    return () => window.removeEventListener("cartChanged", loadCart);
  }, []);

  const couponRef = useRef(null);

  // Click outside to close coupon popup
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (couponRef.current && !couponRef.current.contains(event.target)) {
        setShowSavedCoupons(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const loadCart = () => {
    try {
      const stored = localStorage.getItem("kh_cart");
      if (stored) {
        const parsed = JSON.parse(stored);
        setCart(parsed);
        calculateTotal(parsed);
      }
    } catch (e) {
      console.error("Lỗi đọc giỏ hàng", e);
    }
  };

  const calculateTotal = (items) => {
    const t = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(t);
  };

  const updateQuantity = (id, change) => {
    const newCart = cart.map((item) => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQty };
      }
      return item;
    });
    setCart(newCart);
    calculateTotal(newCart);
    localStorage.setItem("kh_cart", JSON.stringify(newCart));
    window.dispatchEvent(new Event("cartChanged"));
  };

  const removeItem = (id) => {
    showConfirm("Bạn muốn xóa sản phẩm này khỏi giỏ?", () => {
      const updated = cart.filter((item) => item.id !== id);
      setCart(updated);
      localStorage.setItem("kh_cart", JSON.stringify(updated));
      calculateTotal(updated);
      window.dispatchEvent(new Event("cartChanged"));
    });
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
    if (!token && !user) {
      setShowAuthModal(true);
      return;
    }

    showConfirm(`Xác nhận thanh toán ${money(total - discount)}?`, async () => {
      setLoading(true);
      try {
        await axios.post("/api/checkout", {
          items: cart.map((item) => ({
            id: item.id,
            quantity: item.quantity,
            type: item.type, // Send type (course/product) to backend
          })),
          coupon: coupon,
        });

        showSuccess("Thanh toán thành công! Cảm ơn bạn đã ủng hộ.");
        localStorage.removeItem("kh_cart");
        setCart([]);
        setTotal(0);
        setDiscount(0);
        setCoupon("");
        window.dispatchEvent(new Event("cartChanged"));
        window.dispatchEvent(new Event("userChanged"));
      } catch (err) {
        console.error("Checkout Error:", err);
        const serverMsg = err.response?.data?.message;
        const serverError = err.response?.data?.error; // Sometimes Laravel returns 'error' key
        showError(
          serverMsg ||
            serverError ||
            "Thanh toán thất bại. Lỗi kết nối hoặc hệ thống."
        );
      } finally {
        setLoading(false);
      }
    });
  };

  const handleApplyCoupon = () => {
    if (coupon.trim().toLowerCase() === "newyear2026") {
      const discountValue = total * 0.2;
      setDiscount(discountValue);
      showSuccess("Áp dụng mã giảm giá thành công! Bạn được giảm 20%.");
    } else if (coupon.trim().toUpperCase() === "VIPMEMBER") {
      setDiscount(50000);
      showSuccess("Áp dụng mã VIP thành công! Giảm 50 Linh Tệ.");
    } else {
      setDiscount(0);
      showWarning("Mã giảm giá không hợp lệ.");
    }
  };

  const handleSelectCoupon = (code) => {
    setCoupon(code);
    setShowSavedCoupons(false);
  };

  const money = (v) =>
    v
      ? Math.floor(v / 1000).toLocaleString("vi-VN", {
          maximumFractionDigits: 0,
        }) + " Linh Tệ 🔮"
      : "0 🔮";

  // Ghép PUBLIC_URL + path an toàn
  const resolveSrc = (path) => {
    const base = process.env.PUBLIC_URL || "";
    const rel = path?.startsWith("/") ? path : `/${path || ""}`;
    return `${base}${rel}`;
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-5 animate-fade-in">
        <div
          className="mb-4 text-light"
          style={{ fontSize: "4rem", opacity: 0.5 }}
        >
          🛒
        </div>
        <h3>Giỏ hàng trống</h3>
        <p className="text-light" style={{ opacity: 0.75 }}>
          Hãy thêm vật phẩm vào giỏ nhé.
        </p>
        <Link to="/cua-hang" className="btn btn-outline-gold mt-3">
          Đến Cửa Hàng
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-view animate-fade-in">
      <h3 className="dashboard-title mb-4">Giỏ hàng của bạn</h3>

      <div className="table-responsive mb-4">
        <table
          className="table table-dark table-hover align-middle"
          style={{ backgroundColor: "transparent" }}
        >
          <thead>
            <tr className="text-primary text-uppercase small">
              <th style={{ width: "40%" }}>Sản phẩm</th>
              <th className="text-center">Đơn giá</th>
              <th className="text-center">Số lượng</th>
              <th className="text-end">Thành tiền</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="d-flex align-items-center gap-3">
                    <div
                      className="rounded overflow-hidden"
                      style={{ width: 60, height: 60 }}
                    >
                      <img
                        src={resolveSrc(item.image_url || item.img)}
                        alt={item.name}
                        className="w-100 h-100 object-fit-cover"
                      />
                    </div>
                    <div>
                      <h6 className="mb-0 text-white">{item.name}</h6>
                    </div>
                  </div>
                </td>
                <td className="text-center text-gold">
                  {Math.floor(item.price / 1000).toLocaleString("vi-VN", {
                    maximumFractionDigits: 0,
                  })}{" "}
                  🔮
                </td>
                <td className="text-center">
                  <div className="d-inline-flex bg-dark-glass rounded-pill border border-secondary p-1">
                    <button
                      className="btn btn-sm text-secondary p-0 px-2"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      -
                    </button>
                    <span className="px-2 text-white">{item.quantity}</span>
                    <button
                      className="btn btn-sm text-secondary p-0 px-2"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="text-end fw-bold text-gold">
                  {Math.floor(
                    (item.price * item.quantity) / 1000
                  ).toLocaleString("vi-VN", { maximumFractionDigits: 0 })}{" "}
                  🔮
                </td>
                <td className="text-end">
                  <button
                    className="btn btn-link text-danger p-0"
                    onClick={() => removeItem(item.id)}
                  >
                    <i className="bi bi-trash"></i> ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex align-items-center justify-content-end gap-2 mb-3 position-relative">
        <span className="text-light fw-bold">Mã giảm giá:</span>
        <div style={{ position: "relative" }} ref={couponRef}>
          <input
            type="text"
            className="form-control w-auto bg-dark text-white border-secondary"
            style={{ backgroundColor: "#222" }}
            placeholder="Mã giảm giá"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            onFocus={() => setShowSavedCoupons(true)}
          />
          {showSavedCoupons && (
            <div
              className="position-absolute bg-dark border border-secondary rounded p-2 shadow-lg"
              style={{
                bottom: "100%",
                left: 0,
                width: "300px",
                zIndex: 10,
                marginBottom: "5px",
              }}
            >
              <div className="d-flex justify-content-between align-items-center mb-2">
                <small className="text-secondary fw-bold">MÃ CỦA BẠN</small>
                <button
                  className="btn btn-sm btn-link text-secondary p-0 text-decoration-none"
                  onClick={() => setShowSavedCoupons(false)}
                >
                  ✕
                </button>
              </div>
              {savedCoupons.map((c) => (
                <div
                  key={c.code}
                  className="p-2 mb-1 rounded cursor-pointer hover-bg-light-10"
                  style={{
                    cursor: "pointer",
                    background: "rgba(255,255,255,0.05)",
                  }}
                  onClick={() => handleSelectCoupon(c.code)}
                >
                  <div className="d-flex justify-content-between">
                    <span className="text-gold fw-bold">{c.code}</span>
                    <button
                      className="btn btn-sm btn-outline-warning py-0 px-2"
                      style={{ fontSize: "0.7rem" }}
                    >
                      Dùng
                    </button>
                  </div>
                  <small className="text-light opacity-75">{c.desc}</small>
                </div>
              ))}
            </div>
          )}
        </div>
        <button className="btn btn-outline-gold" onClick={handleApplyCoupon}>
          Áp dụng
        </button>
      </div>

      <div
        className="card p-3 border-gold dash-card"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      >
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="text-light">Tạm tính:</span>
          <span className="text-white">{money(total)}</span>
        </div>
        {discount > 0 && (
          <div className="d-flex justify-content-between align-items-center mb-2 text-success">
            <span>Giảm giá:</span>
            <span>- {money(discount)}</span>
          </div>
        )}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="text-light">Tổng cộng:</span>
          <span className="h4 text-gold mb-0 fw-bold">
            {money(total - discount)}
          </span>
        </div>

        {user && (
          <div className="border-top border-secondary pt-3 mb-3">
            <div className="d-flex justify-content-between align-items-center mb-2 small text-light">
              <span>Số dư hiện tại:</span>
              <span className="text-white fw-bold">{money(user.balance)}</span>
            </div>
            <div className="d-flex justify-content-between align-items-center small text-light">
              <span>Sau thanh toán:</span>
              <span
                className={`fw-bold ${
                  user.balance >= total - discount
                    ? "text-success"
                    : "text-danger"
                }`}
              >
                {money(user.balance - (total - discount))}
              </span>
            </div>
          </div>
        )}

        <div className="text-end">
          <button
            className="btn btn-gold px-5 py-3 text-uppercase fw-bold ls-1 shadow"
            onClick={handleCheckout}
            disabled={loading}
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm me-2" />
            ) : null}
            {user || (typeof window !== "undefined" && localStorage.getItem("auth_token"))
              ? "✨ TIẾN HÀNH THANH TOÁN"
              : "🔑 ĐĂNG NHẬP & THANH TOÁN"}
          </button>
        </div>
      </div>

      <AuthModal
        show={showAuthModal}
        title="Đăng Nhập Để Tiến Hành Thanh Toán"
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {
          const storedUser = localStorage.getItem("user");
          if (storedUser) setUser(JSON.parse(storedUser));
          handleCheckout();
        }}
      />
    </div>
  );
}
