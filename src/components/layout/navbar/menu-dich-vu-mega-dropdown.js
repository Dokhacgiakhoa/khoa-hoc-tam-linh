import React from "react";
import { NavLink } from "react-router-dom";
import "./mega-dropdown.css";

export default function MenuDichVuMega({ show }) {
  const img = process.env.PUBLIC_URL + "/images/mega-preview.webp";
  return (
    <div
      className={show ? "kh-mega show" : "kh-mega"}
      role="region"
      aria-label="Mega menu Dịch vụ"
    >
      <div className="kh-mega-inner">
        {/* Cột 1 */}
        <div className="kh-col">
          <NavLink to="/dich-vu#tarot" className="kh-mega-link">
            Tarot &amp; Bài Trà
          </NavLink>
          <NavLink to="/dich-vu#menh" className="kh-mega-link">
            Mệnh &amp; Lá số
          </NavLink>
          <NavLink to="/dich-vu#chuyen-gia" className="kh-mega-link">
            Đặt lịch chuyên gia
          </NavLink>
          <NavLink to="/dich-vu#goi" className="kh-mega-link">
            Gói dịch vụ
          </NavLink>
        </div>

        {/* Cột 2 */}
        <div className="kh-col">
          <NavLink to="/dich-vu#ban-do-sao" className="kh-mega-link">
            Bản đồ sao (Astro)
          </NavLink>
          <NavLink to="/dich-vu#than-so" className="kh-mega-link">
            Thần số học
          </NavLink>
          <NavLink to="/dich-vu#kinh-dich" className="kh-mega-link">
            Kinh Dịch thực hành
          </NavLink>
          <NavLink to="/dich-vu#faq" className="kh-mega-link">
            FAQ dịch vụ
          </NavLink>
        </div>

        {/* Cột 3 – Ảnh */}
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
