// src/components/layout/navbar/menu-cua-hang-mega-dropdown.js
import React from "react";
import { NavLink } from "react-router-dom";
import "./mega-dropdown.css";

export default function MenuCuaHangMega({ show, onNavigate }) {
  const img = "/images/banners/banner-cua-hang.png";

  return (
    <div
      className={show ? "kh-mega show" : "kh-mega"}
      role="region"
      aria-label="Mega menu Cửa hàng"
    >
      <div className="kh-mega-inner">
        {/* Cột 1 */}
        <div className="kh-col">
          <nav className="kh-col-list">
            <NavLink
              to="/cua-hang/bai-tam-linh"
              className="kh-mega-link"
              onClick={onNavigate}
            >
              🔮 Bài Tâm Linh
            </NavLink>
            <NavLink
              to="/cua-hang/phu-kien-tam-linh"
              className="kh-mega-link"
              onClick={onNavigate}
            >
              📿 Phụ Kiện Tâm Linh
            </NavLink>
            <NavLink
              to="/cua-hang/huong-tram"
              className="kh-mega-link"
              onClick={onNavigate}
            >
              🕯️ Hương – Trầm
            </NavLink>
            <NavLink
              to="/cua-hang/tra-dao"
              className="kh-mega-link"
              onClick={onNavigate}
            >
              🍵 Trà Đạo
            </NavLink>
          </nav>
        </div>

        {/* Cột 2 */}
        <div className="kh-col">
          <nav className="kh-col-list">
            <NavLink
              to="/cua-hang/do-tho-cung"
              className="kh-mega-link text-gold"
              onClick={onNavigate}
            >
              🪔 Đồ Thờ Cúng
            </NavLink>
            <NavLink
              to="/cua-hang/bo-suu-tap-cao-cap"
              className="kh-mega-link"
              onClick={onNavigate}
            >
              💎 Sản Phẩm Cao Cấp
            </NavLink>
            <NavLink
              to="/cua-hang/set-qua-tang"
              className="kh-mega-link"
              onClick={onNavigate}
            >
              🎁 Set Quà Tặng
            </NavLink>
          </nav>
        </div>

        {/* Cột 3 – Media */}
        <div className="kh-col kh-col-media">
          <div className="kh-media-card">
            <img src={img} alt="Cửa hàng Năng lượng" loading="lazy" />
          </div>
        </div>
      </div>

      <div className="kh-mega-footer">
        <p className="kh-mega-note">
          Vật phẩm phong thủy, trà thiền, đồ thờ cúng và ấn phẩm hộ mệnh chế tác độc bản.
        </p>
        <NavLink to="/cua-hang" className="kh-cta" onClick={onNavigate}>
          Tất cả sản phẩm
        </NavLink>
      </div>
    </div>
  );
}
