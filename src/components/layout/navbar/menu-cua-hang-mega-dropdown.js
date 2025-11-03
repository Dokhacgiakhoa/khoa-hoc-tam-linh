import React from "react";
import { NavLink } from "react-router-dom";

export default function MenuCuaHangMegaDropdown() {
  return (
    <>
      <a
        className="nav-link dropdown-toggle"
        href="#"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Cửa hàng
      </a>
      <div className="dropdown-menu mega-menu p-3">
        <div className="row gx-4 gy-2">
          <div className="col-6 col-lg-4">
            <NavLink
              className="dropdown-item mega-link"
              to="/cua-hang#bai-tam-linh"
            >
              🃏 Bài Tâm linh
            </NavLink>
          </div>
          <div className="col-6 col-lg-4">
            <NavLink
              className="dropdown-item mega-link"
              to="/cua-hang#phu-kien"
            >
              ✨ Phụ kiện Tâm linh
            </NavLink>
          </div>
          <div className="col-6 col-lg-4">
            <NavLink
              className="dropdown-item mega-link"
              to="/cua-hang#huong-tram-tra"
            >
              🕯️ Hương–Trầm–Trà đạo
            </NavLink>
          </div>
          <div className="col-6 col-lg-4">
            <NavLink
              className="dropdown-item mega-link"
              to="/cua-hang#bo-suu-tap"
            >
              🏷️ Bộ sưu tập & Cao cấp
            </NavLink>
          </div>
          <div className="col-6 col-lg-4">
            <NavLink
              className="dropdown-item mega-link"
              to="/cua-hang#set-qua-tang"
            >
              🎁 Set Quà tặng
            </NavLink>
          </div>
          <div className="col-6 col-lg-4">
            <NavLink
              className="dropdown-item mega-link"
              to="/cua-hang#che-tac-rieng"
            >
              ✴️ Chế tác riêng
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
