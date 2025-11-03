import React from "react";
import { NavLink } from "react-router-dom";

export default function MenuHocVienHuyenHocMegaDropdown() {
  return (
    <>
      <a
        className="nav-link dropdown-toggle"
        href="#"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Học viện
      </a>
      <div className="dropdown-menu mega-menu p-3">
        <div className="row gx-4 gy-2">
          <div className="col-6 col-lg-4">
            <NavLink
              className="dropdown-item mega-link"
              to="/hoc-vien-huyen-hoc#menh"
            >
              🧬 Mệnh
            </NavLink>
          </div>
          <div className="col-6 col-lg-4">
            <NavLink
              className="dropdown-item mega-link"
              to="/hoc-vien-huyen-hoc#tuong"
            >
              👁️ Tướng
            </NavLink>
          </div>
          <div className="col-6 col-lg-4">
            <NavLink
              className="dropdown-item mega-link"
              to="/hoc-vien-huyen-hoc#boc"
            >
              🔮 Bốc
            </NavLink>
          </div>
          <div className="col-6 col-lg-4">
            <NavLink
              className="dropdown-item mega-link"
              to="/hoc-vien-huyen-hoc#trach"
            >
              🏠 Trạch
            </NavLink>
          </div>
          <div className="col-6 col-lg-4">
            <NavLink
              className="dropdown-item mega-link"
              to="/hoc-vien-huyen-hoc#so"
            >
              ♟️ Số
            </NavLink>
          </div>
          <div className="col-6 col-lg-4">
            <NavLink
              className="dropdown-item mega-link"
              to="/hoc-vien-huyen-hoc#thi-chung-chi"
            >
              🎓 Thi & Chứng chỉ
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
