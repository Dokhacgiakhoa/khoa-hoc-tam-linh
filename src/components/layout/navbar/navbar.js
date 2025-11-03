import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-wrap fixed-top">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <span role="img" aria-label="crystal">
            🔮
          </span>
          <span className="brand-text">Khoa học Tâm linh</span>
        </Link>

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

        <div id="mainNav" className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
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
            <li className="nav-item">
              <NavLink className="nav-link" to="/dich-vu">
                Dịch vụ
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/cua-hang">
                Cửa hàng
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/hoc-vien-huyen-hoc">
                Học viện
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/lien-he">
                Liên hệ
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link nav-account" to="/tai-khoan">
                Tài khoản{" "}
                <span className="badge rounded-pill ms-1 notif-badge">99+</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
