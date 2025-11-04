import React from "react";
import { NavLink } from "react-router-dom";
import "./mega-dropdown.css";

export default function MenuTaiKhoanMega({ show, onNavigate }) {
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
              to="/bao-mat-2fa"
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
              <span className="kh-badge">3</span>
            </NavLink>

            {/* Giỏ hàng có badge */}
            <NavLink
              to="/tai-khoan/gio-hang"
              className="kh-mega-link kh-has-badge"
              onClick={onNavigate}
            >
              Giỏ hàng
              <span className="kh-badge">0</span>
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
      <div className="kh-mega-footer">
        <p className="kh-mega-note">
          Quản trị hồ sơ, ví <strong>Linh Tệ</strong>, hoạt động và{" "}
          <strong>2FA</strong> — tất cả trong một bảng điều khiển duy nhất.
        </p>
        <NavLink to="/tai-khoan" className="kh-cta" onClick={onNavigate}>
          Vào trang Tài khoản
        </NavLink>
      </div>
    </div>
  );
}
