import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAlert } from "../../../contexts/AlertContext";
import "./mega-dropdown.css";

export default function MenuTaiKhoanMega({
  show,
  onNavigate,
  cartCount = 0,
  notificationCount = 0,
}) {
  const { showConfirm } = useAlert();
  const navigate = useNavigate();

  const img = process.env.PUBLIC_URL + "/images/banners/banner-tai-khoan.png";

  return (
    <div
      className={show ? "kh-mega show" : "kh-mega"}
      role="region"
      aria-label="Mega menu Tài khoản"
    >
      <div className="kh-mega-inner">
        {/* Cột 1 – Hồ sơ & Ví */}
        <div className="kh-col">
          <div className="kh-col-title">Hồ sơ &amp; Ví</div>
          <nav className="kh-col-list">
            <NavLink
              to="/tai-khoan/ho-so-cap-do"
              className="kh-mega-link"
              onClick={onNavigate}
            >
              Hồ sơ &amp; Cấp độ
            </NavLink>

            <NavLink
              to="/tai-khoan/vi-linh-te"
              className="kh-mega-link"
              onClick={onNavigate}
            >
              Ví Linh Tệ
            </NavLink>

            <NavLink
              to="/tai-khoan/bao-mat-2fa"
              className="kh-mega-link"
              onClick={onNavigate}
            >
              Bảo mật 2FA
            </NavLink>
          </nav>
        </div>

        {/* Cột 2 – Hoạt động & Thông báo */}
        <div className="kh-col">
          <div className="kh-col-title">Hoạt động &amp; Thông báo</div>
          <nav className="kh-col-list">
            {/* Hộp thư có badge */}
            <NavLink
              to="/tai-khoan/hop-thu"
              className="kh-mega-link kh-has-badge"
              onClick={onNavigate}
            >
              Hộp thư
              {notificationCount > 0 && (
                <span className="kh-badge">{notificationCount}</span>
              )}
            </NavLink>

            {/* Giỏ hàng có badge */}
            <NavLink
              to="/gio-hang"
              className="kh-mega-link kh-has-badge"
              onClick={onNavigate}
            >
              Giỏ hàng
              <span className="kh-badge">{cartCount}</span>
            </NavLink>

            {/* Nhiệm vụ */}
            <NavLink
              to="/tai-khoan/nhiem-vu"
              className="kh-mega-link"
              onClick={onNavigate}
            >
              Nhiệm vụ &amp; Huy hiệu
            </NavLink>
          </nav>
        </div>

        {/* Cột 3 – Ảnh minh họa */}
        <div className="kh-col kh-col-image">
          <img src={img} alt="Tài khoản – xem trước" loading="lazy" />
        </div>
      </div>

      {/* Footer mô tả + CTA */}
      {/* Footer mô tả + CTA */}
      <div className="kh-mega-footer">
        <p className="kh-mega-note">
          Quản trị hồ sơ, ví <strong>Linh Tệ</strong>, hoạt động và{" "}
          <strong>2FA</strong> — tất cả trong một bảng điều khiển duy nhất.
        </p>
        <div className="d-flex align-items-center gap-3">
          <button
            className="btn btn-link text-decoration-none text-white-50 p-0"
            onClick={() =>
              showConfirm("Bạn có chắc muốn đăng xuất?", () => {
                localStorage.removeItem("auth_token");
                localStorage.removeItem("user");
                localStorage.removeItem("kh_cart");
                window.dispatchEvent(new Event("userChanged"));
                window.location.reload();
              })
            }
          >
            Đăng xuất
          </button>
          <NavLink to="/tai-khoan" className="kh-cta" onClick={onNavigate}>
            Vào trang Tài khoản
          </NavLink>
        </div>
      </div>
    </div>
  );
}
