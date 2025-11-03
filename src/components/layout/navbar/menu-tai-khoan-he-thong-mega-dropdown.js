import React from "react";
import { NavLink } from "react-router-dom";

export default function MenuTaiKhoanHeThongMegaDropdown() {
  return (
    <>
      <a
        className="nav-link dropdown-toggle"
        href="#"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Tài khoản
        <span className="badge rounded-pill notif-badge ms-1">0</span>
      </a>
      <div className="dropdown-menu mega-menu p-3">
        <div className="row gx-4 gy-2">
          <div className="col-12 col-lg-4">
            <NavLink className="dropdown-item mega-link" to="/tai-khoan#ho-so">
              🪪 Hồ sơ & Cấp độ
            </NavLink>
          </div>
          <div className="col-12 col-lg-4">
            <NavLink
              className="dropdown-item mega-link"
              to="/tai-khoan#tai-chinh"
            >
              💳 Tài chính
            </NavLink>
          </div>
          <div className="col-12 col-lg-4">
            <div className="d-flex flex-column gap-1">
              <NavLink
                className="dropdown-item mega-link d-flex align-items-center justify-content-between"
                to="/tai-khoan#hop-thu"
              >
                ✉️ Hộp thư{" "}
                <span className="badge rounded-pill sub-badge">0</span>
              </NavLink>
              <NavLink
                className="dropdown-item mega-link d-flex align-items-center justify-content-between"
                to="/cua-hang#gio-hang"
              >
                🛒 Giỏ hàng{" "}
                <span className="badge rounded-pill sub-badge">0</span>
              </NavLink>
              <NavLink
                className="dropdown-item mega-link d-flex align-items-center justify-content-between"
                to="/tai-khoan#nhiem-vu"
              >
                🎯 Nhiệm vụ{" "}
                <span className="badge rounded-pill sub-badge">0</span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
