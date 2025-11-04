// src/components/layout/navbar/menu-cua-hang-mega-dropdown.js
import React from "react";
import { NavLink } from "react-router-dom";
import "./mega-dropdown.css";

export default function MenuCuaHangMega({ show, onNavigate }) {
  const img = process.env.PUBLIC_URL + "/images/banners/banner-cua-hang.png";

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
              Bài Tâm Linh
            </NavLink>
            <NavLink
              to="/cua-hang/phu-kien-tam-linh"
              className="kh-mega-link"
              onClick={onNavigate}
            >
              Phụ Kiện Tâm Linh
            </NavLink>
            {/* ĐÃ TÁCH: Hương – Trầm (riêng) */}
            <NavLink
              to="/cua-hang/huong-tram"
              className="kh-mega-link"
              onClick={onNavigate}
            >
              Hương – Trầm
            </NavLink>
            {/* ĐÃ TÁCH: Trà Đạo (riêng) */}
            <NavLink
              to="/cua-hang/tra-dao"
              className="kh-mega-link"
              onClick={onNavigate}
            >
              Trà Đạo
            </NavLink>
          </nav>
        </div>

        {/* Cột 2 */}
        <div className="kh-col">
          <nav className="kh-col-list">
            <NavLink
              to="/cua-hang/bo-suu-tap-cao-cap"
              className="kh-mega-link"
              onClick={onNavigate}
            >
              Bộ Sưu Tập &amp; Cao Cấp
            </NavLink>
            <NavLink
              to="/cua-hang/set-qua-tang"
              className="kh-mega-link"
              onClick={onNavigate}
            >
              Set Quà Tặng
            </NavLink>
            <NavLink
              to="/cua-hang/che-tac-rieng"
              className="kh-mega-link"
              onClick={onNavigate}
            >
              Chế Tác Riêng
            </NavLink>
          </nav>
        </div>

        {/* Cột 3 – Ảnh */}
        <div className="kh-col kh-col-image">
          <img src={img} alt="Cửa hàng – xem trước" loading="lazy" />
        </div>
      </div>

      {/* Footer mô tả + CTA */}
      <div className="kh-mega-footer">
        <p className="kh-mega-note">
          Sản phẩm chọn lọc theo năng lượng &amp; bản mệnh. Hỗ trợ cá nhân hoá
          <em> “Made for You ✴️”</em> và thanh toán linh hoạt.
        </p>
        <NavLink to="/cua-hang" className="kh-cta" onClick={onNavigate}>
          Xem sản phẩm nổi bật
        </NavLink>
      </div>
    </div>
  );
}
