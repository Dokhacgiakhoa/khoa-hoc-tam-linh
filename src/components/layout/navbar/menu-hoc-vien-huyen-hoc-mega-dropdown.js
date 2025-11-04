import React from "react";
import { NavLink } from "react-router-dom";
import "./mega-dropdown.css";

export default function MenuHocVienMega({ show }) {
  const img = process.env.PUBLIC_URL + "/images/mega-preview.webp";
  return (
    <div
      className={show ? "kh-mega show" : "kh-mega"}
      role="region"
      aria-label="Mega menu Học viện Huyền Học"
    >
      <div className="kh-mega-inner">
        {/* Cột 1 */}
        <div className="kh-col">
          <NavLink to="/hoc-vien-huyen-hoc#menh" className="kh-mega-link">
            Mệnh
          </NavLink>
          <NavLink to="/hoc-vien-huyen-hoc#tuong" className="kh-mega-link">
            Tướng
          </NavLink>
          <NavLink to="/hoc-vien-huyen-hoc#boc" className="kh-mega-link">
            Bốc
          </NavLink>
        </div>

        {/* Cột 2 */}
        <div className="kh-col">
          <NavLink to="/hoc-vien-huyen-hoc#trach" className="kh-mega-link">
            Trạch
          </NavLink>
          <NavLink to="/hoc-vien-huyen-hoc#so" className="kh-mega-link">
            Số
          </NavLink>
          <NavLink
            to="/hoc-vien-huyen-hoc#thi-chung-chi"
            className="kh-mega-link"
          >
            Thi &amp; Chứng chỉ
          </NavLink>
        </div>

        {/* Cột 3 – Ảnh */}
        <div className="kh-col kh-col-image">
          <img src={img} alt="Học viện Huyền Học – xem trước" loading="lazy" />
        </div>
      </div>

      {/* Footer mô tả + CTA */}
      <div className="kh-mega-footer">
        <p className="kh-mega-note">
          Lộ trình Ngũ Huyền Thuật từ <strong>Tân học</strong> →{" "}
          <strong>Bậc Thầy</strong>, nội dung có AI hỗ trợ luyện tập và kiểm tra
          năng lực.
        </p>
        <NavLink to="/hoc-vien-huyen-hoc" className="kh-cta">
          Vào Học viện
        </NavLink>
      </div>
    </div>
  );
}
