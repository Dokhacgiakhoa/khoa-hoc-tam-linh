// src/components/navigation/Navbar.js
import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css"; // nếu bạn có, còn không thì bỏ dòng này

function Navbar() {
  return (
    <header className="site-navbar">
      <div className="nav-brand">
        <NavLink to="/">Khoa học Tâm linh</NavLink>
      </div>
      <nav className="nav-links">
        <NavLink to="/">Trang chủ</NavLink>
        <NavLink to="/dich-vu">Dịch vụ</NavLink>
        <NavLink to="/dich-vu/tarot-free-1-card">Tarot 1 lá</NavLink>
        <NavLink to="/cua-hang">Cửa hàng</NavLink>
        <NavLink to="/kien-thuc">Kiến thức</NavLink>
        <NavLink to="/lien-he">Liên hệ</NavLink>
      </nav>
    </header>
  );
}

export default Navbar;
