import React from "react";
import { NavLink } from "react-router-dom";
import "./mega-dropdown.css";

export default function MenuDichVuMega({ show }) {
  const img = process.env.PUBLIC_URL + "/images/banners/banner-dich-vu.png";

  return (
    <div
      className={show ? "kh-mega show" : "kh-mega"}
      role="region"
      aria-label="Mega menu Dịch vụ"
    >
      <div className="kh-mega-inner">
        {/* Cột 1 – Mệnh & Lá số (chỉ là tiêu đề) + 3 mục con */}
        <div className="kh-col">
          <div className="kh-col-title">Mệnh &amp; Lá số</div>
          <nav className="kh-col-list">
            <NavLink to="/dich-vu/ban-do-sao" className="kh-mega-link">
              Bản đồ sao (Astro)
            </NavLink>
            <NavLink to="/dich-vu/than-so-hoc" className="kh-mega-link">
              Thần số học
            </NavLink>
            <NavLink to="/dich-vu/kinh-dich" className="kh-mega-link">
              Kinh Dịch thực hành
            </NavLink>
          </nav>
        </div>

        {/* Cột 2 – 4 mục còn lại */}
        <div className="kh-col">
          <div className="kh-col-title">Dịch vụ khác</div>
          <nav className="kh-col-list">
            <NavLink to="/dich-vu/tarot" className="kh-mega-link">
              Tarot &amp; Bài Trà
            </NavLink>
            <NavLink to="/dich-vu/dat-lich" className="kh-mega-link">
              Đặt lịch chuyên gia
            </NavLink>
            <NavLink to="/dich-vu/goi-dich-vu" className="kh-mega-link">
              Gói dịch vụ
            </NavLink>
            <NavLink to="/dich-vu/faq" className="kh-mega-link">
              FAQ dịch vụ
            </NavLink>
          </nav>
        </div>

        {/* Cột 3 – Ảnh xem trước */}
        <div className="kh-col kh-col-image">
          <img src={img} alt="Dịch vụ – xem trước" loading="lazy" />
        </div>
      </div>

      {/* Footer mô tả + CTA */}
      <div className="kh-mega-footer">
        <p className="kh-mega-note">
          Khám phá hệ dịch vụ tâm linh tích hợp AI – trải nghiệm chuẩn hoá, khoa
          học và dễ tiếp cận.
        </p>
        <NavLink to="/dich-vu" className="kh-cta">
          Trải nghiệm miễn phí
        </NavLink>
      </div>
    </div>
  );
}
