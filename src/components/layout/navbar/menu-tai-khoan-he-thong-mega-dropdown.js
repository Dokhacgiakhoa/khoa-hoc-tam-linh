import React from "react";
import { NavLink } from "react-router-dom";
import "./mega-dropdown.css";

export default function MenuTaiKhoanMega({ show }) {
  const img = process.env.PUBLIC_URL + "/images/mega-preview.webp";
  return (
    <div
      className={show ? "kh-mega show" : "kh-mega"}
      role="region"
      aria-label="Mega menu Tài khoản"
    >
      <div className="kh-mega-inner">
        {/* Cột 1 */}
        <div className="kh-col">
          <NavLink to="/tai-khoan#ho-so" className="kh-mega-link">
            Hồ sơ &amp; Cấp độ
          </NavLink>
          <NavLink to="/tai-khoan#vi-linh-te" className="kh-mega-link">
            Ví Linh Tệ
          </NavLink>
          <NavLink to="/bao-mat-2fa" className="kh-mega-link">
            Bảo mật 2FA
          </NavLink>
        </div>

        {/* Cột 2 */}
        <div className="kh-col">
          <NavLink to="/tai-khoan#hop-thu" className="kh-mega-link">
            Hộp thư
          </NavLink>
          <NavLink to="/tai-khoan#gio-hang" className="kh-mega-link">
            Giỏ hàng (0)
          </NavLink>
          <NavLink to="/tai-khoan#nhiem-vu" className="kh-mega-link">
            Nhiệm vụ &amp; Huy hiệu
          </NavLink>
        </div>

        {/* Cột 3 – Ảnh */}
        <div className="kh-col kh-col-image">
          <img src={img} alt="Tài khoản – xem trước" loading="lazy" />
        </div>
      </div>

      {/* Footer mô tả + CTA */}
      <div className="kh-mega-footer">
        <p className="kh-mega-note">
          Quản trị hồ sơ, ví <strong>Linh Tệ</strong>, thông báo và{" "}
          <strong>2FA</strong> — tập trung trong một bảng điều khiển.
        </p>
        <NavLink to="/tai-khoan" className="kh-cta">
          Vào trang Tài khoản
        </NavLink>
      </div>
    </div>
  );
}
