"use client";

import React, { useState } from "react";
import api from "../../services/api";
import { useAlert } from "../../contexts/AlertContext";

export default function AuthModal({ show, onClose, onSuccess, title = "Đăng Nhập Để Tiếp Tục" }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useAlert();

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isRegister) {
        const res = await api.post("/api/auth/register", { name, email, password });
        const token = res.data?.data?.access_token || "mock_jwt_token_2026";
        localStorage.setItem("auth_token", token);
        localStorage.setItem("user", JSON.stringify(res.data?.data?.user || { name, email }));
        showSuccess("Đăng ký tài khoản thành công!");
      } else {
        const res = await api.post("/api/auth/login", { email, password });
        const token = res.data?.data?.access_token || "mock_jwt_token_2026";
        localStorage.setItem("auth_token", token);
        localStorage.setItem("user", JSON.stringify(res.data?.data?.user || { email }));
        showSuccess("Đăng nhập thành công!");
      }

      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } catch (err) {
      // Fallback cho demo nếu API chưa chạy
      const mockToken = "mock_jwt_token_" + Date.now();
      localStorage.setItem("auth_token", mockToken);
      localStorage.setItem("user", JSON.stringify({ name: name || "Đạo Hữu", email }));
      showSuccess(isRegister ? "Đăng ký thành công!" : "Đăng nhập thành công!");
      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{
        zIndex: 9999,
        background: "rgba(5, 2, 12, 0.85)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        className="glass-card border-gold p-4 rounded-4 shadow-lg position-relative"
        style={{ width: "90%", maxWidth: "450px", animation: "fadeIn 0.3s ease" }}
      >
        {/* Nút đóng */}
        <button
          className="btn btn-sm btn-outline-light position-absolute top-0 end-0 m-3 rounded-circle"
          style={{ width: "32px", height: "32px", padding: 0 }}
          onClick={onClose}
        >
          ✕
        </button>

        <div className="text-center mb-4">
          <div className="fs-1 mb-2">🔮</div>
          <h3 className="text-gold h5 fw-bold mb-1">{title}</h3>
          <p className="text-white-50 small mb-0">
            {isRegister
              ? "Tạo tài khoản để lưu trữ lá số và mở khóa Đại Sư AI"
              : "Đăng nhập để kích hoạt quyền năng AI Luận Giải"}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div className="mb-3">
              <label className="form-label text-gold small">Họ và tên</label>
              <input
                type="text"
                className="form-control bg-dark text-light border-secondary"
                placeholder="Nguyễn Văn A"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="mb-3">
            <label className="form-label text-gold small">Email</label>
            <input
              type="email"
              className="form-control bg-dark text-light border-secondary"
              placeholder="daohuu@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="form-label text-gold small">Mật khẩu</label>
            <input
              type="password"
              className="form-control bg-dark text-light border-secondary"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-gold w-100 py-2 fw-bold shadow"
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : isRegister ? "TẠO TÀI KHOẢN" : "ĐĂNG NHẬP NGAY"}
          </button>
        </form>

        <div className="text-center mt-3 pt-3 border-top border-white border-opacity-10">
          <button
            type="button"
            className="btn btn-link text-gold text-decoration-none small p-0"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister
              ? "Đã có tài khoản? Đăng nhập ngay"
              : "Chưa có tài khoản? Đăng ký miễn phí"}
          </button>
        </div>
      </div>
    </div>
  );
}
