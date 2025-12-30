import React from "react";
import { NavLink } from "react-router-dom";
import "./mega-dropdown.css";

export default function MenuHocVienMega({ show, onNavigate }) {
  const img =
    process.env.PUBLIC_URL + "/images/banners/banner-hoc-vien-huyen-hoc.png";

  return (
    <div
      className={show ? "kh-mega show" : "kh-mega"}
      role="region"
      aria-label="Mega menu Học viện Huyền Học"
    >
      <div className="kh-mega-inner">
        {/* Cột 1 – MỆNH / TƯỚNG / BỐC */}
        <div className="kh-col">
          <div className="kh-col-title">Ngũ Huyền Thuật (I)</div>
          <nav className="kh-col-list">
            <NavLink
              to="/hoc-vien/menh"
              className="kh-mega-link"
              onClick={onNavigate}
            >
              Mệnh
            </NavLink>
            <NavLink
              to="/hoc-vien/tuong"
              className="kh-mega-link"
              onClick={onNavigate}
            >
              Tướng
            </NavLink>
            <NavLink
              to="/hoc-vien/boc"
              className="kh-mega-link"
              onClick={onNavigate}
            >
              Bốc
            </NavLink>
          </nav>
        </div>

        {/* Cột 2 – TRẠCH / SỐ / THI & CHỨNG CHỈ */}
        <div className="kh-col">
          <div className="kh-col-title">Ngũ Huyền Thuật (II)</div>
          <nav className="kh-col-list">
            <NavLink
              to="/hoc-vien/trach"
              className="kh-mega-link"
              onClick={onNavigate}
            >
              Trạch
            </NavLink>
            <NavLink
              to="/hoc-vien/so"
              className="kh-mega-link"
              onClick={onNavigate}
            >
              Số
            </NavLink>
            <NavLink
              to="/hoc-vien/thi-chung-chi"
              className="kh-mega-link"
              onClick={onNavigate}
            >
              Thi &amp; Chứng chỉ
            </NavLink>
          </nav>
        </div>

        {/* Cột 3 – Ảnh xem trước */}
        <div className="kh-col kh-col-image">
          <img src={img} alt="Học viện Huyền Học – xem trước" loading="lazy" />
        </div>
      </div>

      {/* Footer mô tả + CTA */}
      <div className="kh-mega-footer">
        <p className="kh-mega-note">
          Lộ trình Ngũ Huyền Thuật từ <strong>Tân học</strong> →{" "}
          <strong>Bậc Thầy</strong>, có AI hỗ trợ luyện tập và kiểm tra năng
          lực.
        </p>
        <NavLink
          to="hoc-vien-huyen-hoc"
          className="kh-cta"
          onClick={onNavigate}
        >
          Vào Học viện
        </NavLink>
      </div>
    </div>
  );
}
