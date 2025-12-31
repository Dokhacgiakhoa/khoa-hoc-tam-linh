import React, { useState } from "react";
import axios from "axios";

export default function PurchaseModal({
  product,
  onClose,
  onSuccess,
  disableQuantity = false,
}) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePurchase = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        `/api/products/${product.id}/purchase`,
        {
          quantity: quantity,
        }
      );
      onSuccess(response.data);
      onClose();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Lỗi khi mua hàng. Vui lòng thử lại."
      );
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = product.price * quantity;

  return (
    <div className="momo-modal-overlay" style={{ zIndex: 2000 }}>
      <div
        className="momo-modal"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "450px" }}
      >
        <div className="momo-header">
          <h4 className="mb-0">Xác nhận mua hàng</h4>
        </div>
        <div className="momo-content p-4">
          <div className="d-flex gap-3 mb-4">
            <img
              src={product.image_url || product.img}
              alt={product.name}
              className="rounded"
              style={{ width: "80px", height: "80px", objectFit: "cover" }}
            />
            <div>
              <h5 className="text-gold mb-1">{product.name}</h5>
              <div className="text-white-50 small">
                Đơn giá:{" "}
                {Math.floor(product.price / 1000).toLocaleString("vi-VN", {
                  maximumFractionDigits: 0,
                })}{" "}
                🔮
              </div>
            </div>
          </div>

          {!disableQuantity && (
            <div className="mb-4">
              <label className="form-label text-gold">Số lượng</label>
              <div className="input-group">
                <button
                  className="btn btn-outline-gold"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  className="form-control bg-dark text-white text-center border-gold"
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
            </div>
          )}

          <div className="p-3 bg-dark bg-opacity-50 rounded mb-4">
            <div className="d-flex justify-content-between mb-2">
              <span>Tổng cộng:</span>
              <span className="fw-bold text-gold">
                {Math.floor(totalPrice / 1000).toLocaleString("vi-VN", {
                  maximumFractionDigits: 0,
                })}{" "}
                🔮
              </span>
            </div>
            <div className="small text-white-50 text-end">1 🔮 = 1.000 VNĐ</div>
          </div>

          {error && (
            <div className="alert alert-danger py-2 small mb-4">{error}</div>
          )}

          <button
            className="btn btn-gold w-100 py-2 fw-bold mb-2"
            onClick={handlePurchase}
            disabled={loading}
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm me-2"></span>
            ) : (
              "THANH TOÁN NGAY"
            )}
          </button>
          <button
            className="btn btn-link text-white-50 w-100"
            onClick={onClose}
            disabled={loading}
          >
            Hủy bỏ
          </button>
        </div>
      </div>
    </div>
  );
}
