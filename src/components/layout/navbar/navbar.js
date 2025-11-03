import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./navbar.css";

import MenuDichVuMegaDropdown from "./menu-dich-vu-mega-dropdown";
import MenuCuaHangMegaDropdown from "./menu-cua-hang-mega-dropdown";
import MenuHocVienHuyenHocMegaDropdown from "./menu-hoc-vien-huyen-hoc-mega-dropdown";
import MenuTaiKhoanHeThongMegaDropdown from "./menu-tai-khoan-he-thong-mega-dropdown";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-wrap fixed-top">
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <span role="img" aria-label="crystal">
            🔮
          </span>
          <span className="brand-text">Khoa học Tâm linh</span>
        </Link>

        {/* Right utilities (notification bell on mobile hidden later if cần) */}
        <div className="d-lg-none d-flex align-items-center gap-3">
          <button
            className="btn btn-noti position-relative"
            aria-label="Thông báo"
          >
            <span className="bell" role="img" aria-label="bell">
              🔔
            </span>
            <span className="badge rounded-pill notif-badge position-absolute top-0 start-100 translate-middle">
              0
            </span>
          </button>
        </div>

        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav links */}
        <div id="mainNav" className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
            <li className="nav-item">
              <NavLink end className="nav-link" to="/">
                Trang chủ
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/gioi-thieu">
                Giới thiệu
              </NavLink>
            </li>

            {/* Mega Menu: Dịch vụ */}
            <li className="nav-item dropdown dropdown-hover">
              <MenuDichVuMegaDropdown />
            </li>

            {/* Mega Menu: Cửa hàng */}
            <li className="nav-item dropdown dropdown-hover">
              <MenuCuaHangMegaDropdown />
            </li>

            {/* Mega Menu: Học viện */}
            <li className="nav-item dropdown dropdown-hover">
              <MenuHocVienHuyenHocMegaDropdown />
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/lien-he">
                Liên hệ
              </NavLink>
            </li>

            {/* Mega Menu: Tài khoản */}
            <li className="nav-item dropdown dropdown-hover">
              <MenuTaiKhoanHeThongMegaDropdown />
            </li>

            {/* Cart quick link */}
            <li className="nav-item">
              <NavLink
                className="nav-link nav-cart d-flex align-items-center"
                to="/cua-hang#gio-hang"
              >
                🛒{" "}
                <span className="badge rounded-pill notif-badge ms-1">0</span>
              </NavLink>
            </li>

            {/* Notification bell (desktop) */}
            <li className="nav-item d-none d-lg-flex">
              <button
                className="btn btn-noti position-relative"
                aria-label="Thông báo"
              >
                <span className="bell" role="img" aria-label="bell">
                  🔔
                </span>
                <span className="badge rounded-pill notif-badge position-absolute top-0 start-100 translate-middle">
                  0
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
