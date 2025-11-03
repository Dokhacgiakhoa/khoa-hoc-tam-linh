import React from "react";
import { NavLink } from "react-router-dom";

export default function MenuDichVuMegaDropdown() {
  return (
    <>
      <a
        className="nav-link dropdown-toggle"
        href="#"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Dịch vụ
      </a>
      <div className="dropdown-menu mega-menu p-3">
        <div className="row gx-4 gy-2">
          <div className="col-12 col-md-6 col-lg-3">
            <NavLink className="dropdown-item mega-link" to="/dich-vu#tarot">
              🔮 Tarot & Bài Trà
            </NavLink>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <NavLink className="dropdown-item mega-link" to="/dich-vu#menh">
              🧭 Mệnh & Lá số
            </NavLink>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <NavLink
              className="dropdown-item mega-link"
              to="/dich-vu#chuyen-gia"
            >
              👤 Đặt lịch chuyên gia
            </NavLink>
          </div>
          <div className="col-12 col-md-6 col-lg-3">
            <NavLink
              className="dropdown-item mega-link"
              to="/dich-vu#goi-dich-vu"
            >
              📦 Gói dịch vụ
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
