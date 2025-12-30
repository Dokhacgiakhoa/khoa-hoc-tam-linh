import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../contexts/AlertContext";
import "./tai-khoan.css"; // Ensure we use the main css

// Component AUTH PAGE: Login / Register / QR
export default function AuthPage({ onLoginSuccess }) {
  const { showError, showInfo } = useAlert();
  const navigate = useNavigate();
  const [tab, setTab] = useState("login"); // login | register
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [validationStates, setValidationStates] = useState({
    username: null, // 'loading', 'valid', 'taken', 'invalid_format'
    email: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Handles
  const loginEmailRef = useRef(null);
  const registerUserRef = useRef(null);

  useEffect(() => {
    if (tab === "login") loginEmailRef.current?.focus();
    else if (tab === "register") registerUserRef.current?.focus();
  }, [tab]);

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleBlur = async (e) => {
    const { name, value } = e.target;
    if (name !== "username" && name !== "email") return;
    if (!value) {
      setValidationStates((prev) => ({ ...prev, [name]: null }));
      return;
    }

    // Client side regex checks first
    if (name === "username" && !/^[a-z0-9_]+$/.test(value)) {
      setValidationStates((prev) => ({ ...prev, [name]: "invalid_format" }));
      return;
    }
    if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      setValidationStates((prev) => ({ ...prev, [name]: "invalid_format" }));
      return;
    }

    setValidationStates((prev) => ({ ...prev, [name]: "loading" }));

    try {
      const resp = await fetch(
        "http://localhost:8000/api/auth/check-availability",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: name, value }),
        }
      );
      const data = await resp.json();
      setValidationStates((prev) => ({
        ...prev,
        [name]: data.available ? "valid" : "taken",
      }));
    } catch (err) {
      console.error(err);
      setValidationStates((prev) => ({ ...prev, [name]: null }));
    }
  };

  const renderValidationIcon = (field) => {
    const state = validationStates[field];
    if (state === "loading")
      return (
        <span className="spinner-border spinner-border-sm validation-icon text-secondary"></span>
      );
    if (state === "valid")
      return (
        <i className="bi bi-check-circle-fill validation-icon text-success animate-zoom-in"></i>
      );
    if (state === "taken" || state === "invalid_format")
      return (
        <i className="bi bi-x-circle-fill validation-icon text-danger animate-zoom-in"></i>
      );
    return null;
  };

  const renderValidationMessage = (field) => {
    const state = validationStates[field];
    if (state === "taken") {
      const label = field === "username" ? "Tên đăng nhập" : "Email";
      return (
        <div className="validation-message-text">{label} đã được sử dụng</div>
      );
    }
    if (state === "invalid_format") {
      const reason =
        field === "username"
          ? "Chỉ được chứa chữ cái, số và dấu gạch dưới"
          : "Định dạng email không hợp lệ";
      return <div className="validation-message-text">{reason}</div>;
    }
    return null;
  };

  const handleSocialLogin = (provider) => {
    alert(
      `Đang kết nối với ${provider}... Chức năng này sẽ được tích hợp với Firebase/Passport.`
    );
  };

  // LOGIN / REGISTER
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    // Client-side Validation
    if (tab === "register") {
      if (formData.password !== formData.confirmPassword) {
        setErrorMsg("Mật khẩu nhập lại không khớp!");
        setLoading(false);
        return;
      }
      if (formData.password.length < 6) {
        setErrorMsg("Mật khẩu phải có ít nhất 6 ký tự.");
        setLoading(false);
        return;
      }
    }

    const url = tab === "login" ? "/api/login" : "/api/register";
    const payload =
      tab === "login"
        ? { email: formData.email, password: formData.password }
        : {
            username: formData.username,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
          };

    try {
      const res = await axios.post(url, payload);
      onLoginSuccess(res.data);
    } catch (err) {
      console.error(err);
      const status = err.response?.status;
      const data = err.response?.data;
      const msg = data?.message || err.message || "Lỗi không xác định";
      setErrorMsg(`Lỗi (${status}): ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper d-flex justify-content-center align-items-center w-100">
      <div
        className="card-3d p-4 p-md-5 auth-card animate-fade-in"
        style={{ maxWidth: "450px", width: "100%" }}
      >
        {/* Header / Tabs */}
        <div className="text-center mb-4">
          <h2 className="sec-title mb-4">
            {tab === "login" && "Đăng Nhập"}
            {tab === "register" && "Đăng Ký"}
            {tab === "qr" && "Quét QR"}
          </h2>
          <div className="auth-tabs d-flex justify-content-center gap-2 p-1 bg-dark-glass rounded-pill">
            <button
              className={`tab-pill border-0 ${
                tab === "login" ? "active shadow-gold" : ""
              }`}
              onClick={() => setTab("login")}
            >
              Đăng nhập
            </button>
            <button
              className={`tab-pill border-0 ${
                tab === "register" ? "active shadow-gold" : ""
              }`}
              onClick={() => setTab("register")}
            >
              > Đăng ký
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="alert alert-danger d-flex align-items-center mb-4 animate-shake">
            <span className="me-2">⚠️</span> {errorMsg}
          </div>
        )}

        {/* LOGIN FORM */}
        {tab === "login" && (
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="mb-3">
              <label className="form-label small text-light text-uppercase fw-bold">
                Email hoặc Tên đăng nhập
              </label>
              <input
                name="email"
                ref={loginEmailRef}
                className="form-control auth-input"
                type="text"
                placeholder="Email hoặc Tên đăng nhập..."
                required
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="form-label small text-light text-uppercase fw-bold">
                Mật khẩu
              </label>
              <div className="position-relative">
                <input
                  name="password"
                  className="form-control auth-input pe-5"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="btn btn-link position-absolute end-0 top-50 translate-middle-y text-secondary text-decoration-none me-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`bi bi-eye${showPassword ? "-slash" : ""}`}></i>
                </button>
              </div>
            </div>

            <div className="mb-4 d-flex justify-content-between align-items-center">
              <div className="form-check custom-checkbox">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMe"
                  name="rememberMe"
                  onChange={handleChange}
                />
                <label
                  className="form-check-label small text-light cursor-pointer"
                  htmlFor="rememberMe"
                >
                  Duy trì đăng nhập
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-gold w-100 py-2 fs-6 text-uppercase ls-1"
              disabled={loading}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm" />
              ) : (
                "Đăng nhập"
              )}
            </button>
            <div className="mt-4 text-center">
              <a
                href="#"
                className="small text-gold text-decoration-none"
                onClick={(e) => {
                  e.preventDefault();
                  showInfo(
                    "Chức năng khôi phục mật khẩu đang được triển khai."
                  );
                }}
              >
                Quên mật khẩu?
              </a>
            </div>

            <div className="auth-divider my-4">
              <span>Hoặc tiếp tục với</span>
            </div>

            <div className="d-flex justify-content-center gap-3">
              <button
                type="button"
                className="btn social-btn google-btn"
                onClick={() => handleSocialLogin("Google")}
              >
                <i className="bi bi-google"></i>
              </button>
              <button
                type="button"
                className="btn social-btn facebook-btn"
                onClick={() => handleSocialLogin("Facebook")}
              >
                <i className="bi bi-facebook"></i>
              </button>
              <button
                type="button"
                className="btn social-btn apple-btn"
                onClick={() => handleSocialLogin("Apple")}
              >
                <i className="bi bi-apple"></i>
              </button>
            </div>
          </form>
        )}

        {/* REGISTER FORM */}
        {tab === "register" && (
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="mb-3">
              <label className="form-label small text-light text-uppercase fw-bold">
                Tên đăng nhập
              </label>
              <div className="position-relative">
                <input
                  name="username"
                  ref={registerUserRef}
                  className="form-control auth-input"
                  type="text"
                  placeholder="VD: giakhoa123 (Viết liền không dấu)"
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {renderValidationIcon("username")}
              </div>
              {renderValidationMessage("username")}
            </div>
            <div className="mb-3">
              <label className="form-label small text-light text-uppercase fw-bold">
                Email
              </label>
              <div className="position-relative">
                <input
                  name="email"
                  className="form-control auth-input"
                  type="email"
                  placeholder="name@example.com"
                  required
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {renderValidationIcon("email")}
              </div>
              {renderValidationMessage("email")}
            </div>
            <div className="mb-3">
              <label className="form-label small text-light text-uppercase fw-bold">
                Số điện thoại
              </label>
              <input
                name="phone"
                className="form-control auth-input"
                type="tel"
                placeholder="VD: 0912345678"
                onChange={handleChange}
              />
            </div>
            <div className="row">
              <div className="col-6 mb-3">
                <label className="form-label small text-light text-uppercase fw-bold">
                  Mật khẩu
                </label>
                <div className="position-relative">
                  <input
                    name="password"
                    className="form-control auth-input"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="btn btn-link position-absolute end-0 top-50 translate-middle-y text-secondary text-decoration-none p-0 me-2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i
                      className={`bi bi-eye${showPassword ? "-slash" : ""}`}
                    ></i>
                  </button>
                </div>
              </div>
              <div className="col-6 mb-3">
                <label className="form-label small text-light text-uppercase fw-bold">
                  Nhập lại
                </label>
                <div className="position-relative">
                  <input
                    name="confirmPassword"
                    className="form-control auth-input"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="btn btn-link position-absolute end-0 top-50 translate-middle-y text-secondary text-decoration-none p-0 me-2"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <i
                      className={`bi bi-eye${
                        showConfirmPassword ? "-slash" : ""
                      }`}
                    ></i>
                  </button>
                </div>
              </div>
            </div>

            <div className="mb-4 captcha-standard-box d-flex align-items-center gap-3 p-3 bg-white rounded border">
              <div className="form-check mb-0">
                <input
                  type="checkbox"
                  className="form-check-input"
                  required
                  id="captcha-v2"
                  style={{ width: "24px", height: "24px", cursor: "pointer" }}
                />
                <label
                  htmlFor="captcha-v2"
                  className="form-check-label ps-2 fw-bold text-dark cursor-pointer"
                  style={{ fontSize: "14px" }}
                >
                  Tôi không phải là người máy
                </label>
              </div>
              <div
                className="ms-auto pt-1 text-center"
                style={{ width: "60px" }}
              >
                <img
                  src="https://www.gstatic.com/recaptcha/api2/logo_48.png"
                  alt="reCAPTCHA"
                  width="28"
                  height="28"
                />
                <div style={{ fontSize: "8px", color: "#555" }}>reCAPTCHA</div>
                <div style={{ fontSize: "7px", color: "#555" }}>
                  Bảo mật - Điều khoản
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="form-check custom-checkbox">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="agreeTerms"
                  name="agreeTerms"
                  required
                  onChange={handleChange}
                />
                <label
                  className="form-check-label small text-light cursor-pointer"
                  htmlFor="agreeTerms"
                >
                  Tôi đồng ý với <span className="text-gold">Điều khoản</span>{" "}
                  và <span className="text-gold">Chính sách bảo mật</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-gold w-100 py-2 fs-6 text-uppercase ls-1"
              disabled={loading}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm" />
              ) : (
                "Đăng ký tài khoản"
              )}
            </button>
            <div className="mt-4 text-center">
              <a
                href="#"
                className="small text-gold text-decoration-none"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Chức năng khôi phục mật khẩu đang được triển khai.");
                }}
              >
                Quên mật khẩu?
              </a>
            </div>

            <div className="auth-divider my-4">
              <span>Hoặc tiếp tục với</span>
            </div>

            <div className="d-flex justify-content-center gap-3">
              <button
                type="button"
                className="btn social-btn google-btn"
                onClick={() => handleSocialLogin("Google")}
              >
                <i className="bi bi-google"></i>
              </button>
              <button
                type="button"
                className="btn social-btn facebook-btn"
                onClick={() => handleSocialLogin("Facebook")}
              >
                <i className="bi bi-facebook"></i>
              </button>
              <button
                type="button"
                className="btn social-btn apple-btn"
                onClick={() => handleSocialLogin("Apple")}
              >
                <i className="bi bi-apple"></i>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
