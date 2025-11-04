import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

/* 4 component mega – mỗi cái tự render .kh-mega của chính nó (và import mega-dropdown.css bên trong) */
import MenuDichVuMega from "./menu-dich-vu-mega-dropdown";
import MenuCuaHangMega from "./menu-cua-hang-mega-dropdown";
import MenuHocVienMega from "./menu-hoc-vien-huyen-hoc-mega-dropdown";
import MenuTaiKhoanMega from "./menu-tai-khoan-he-thong-mega-dropdown";

/** Icon tam giác: mặc định hướng xuống; khi mở quay -90deg -> hướng trái */
function Arrow({ open }) {
  return (
    <svg
      className={`arrow ${open ? "open" : ""}`}
      width="10"
      height="10"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M7 10l5 5 5-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Navbar() {
  const [openKey, setOpenKey] = useState(null);
  const navRef = useRef(null);

  const isOpen = (k) => openKey === k;
  const toggle = (k) => setOpenKey((p) => (p === k ? null : k));
  const closeAll = () => setOpenKey(null);

  // Click outside -> close
  useEffect(() => {
    const onOutside = (e) => {
      const nav = navRef.current;
      if (!nav) return;
      // Nếu click không nằm trong navbar (bao gồm mega)
      if (!nav.contains(e.target)) {
        closeAll();
      }
    };
    document.addEventListener("pointerdown", onOutside);
    return () => document.removeEventListener("pointerdown", onOutside);
  }, []);

  // Press Esc -> close
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeAll();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Click vào link trong mega -> close (uỷ quyền click ở <nav>)
  const onNavClick = (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;
    if (target.closest(".kh-mega-link")) {
      closeAll();
    }
  };

  return (
    <div className="kh-nav-wrap">
      <nav className="kh-nav" ref={navRef} onClick={onNavClick}>
        <ul
          className="kh-nav-list"
          role="menubar"
          aria-label="Khoa học Tâm linh"
        >
          {/* 1. Trang chủ (link) */}
          <li className="kh-nav-item">
            <NavLink
              to="/"
              className="kh-block"
              role="menuitem"
              onClick={closeAll}
            >
              <span className="kh-label">Trang chủ</span>
            </NavLink>
          </li>

          {/* 2. Giới thiệu (link) */}
          <li className="kh-nav-item">
            <NavLink
              to="/gioi-thieu"
              className="kh-block"
              role="menuitem"
              onClick={closeAll}
            >
              <span className="kh-label">Giới thiệu</span>
            </NavLink>
          </li>

          {/* 3. Dịch vụ (click mở mega) */}
          <li
            className={`kh-nav-item has-mega ${
              isOpen("dich-vu") ? "is-open" : ""
            }`}
          >
            <div
              className="kh-block kh-block-button"
              role="button"
              tabIndex={0}
              aria-expanded={isOpen("dich-vu")}
              aria-haspopup="true"
              onClick={() => toggle("dich-vu")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggle("dich-vu");
                }
              }}
            >
              <span className="kh-label">Dịch vụ</span>
              <Arrow open={isOpen("dich-vu")} />
            </div>
            <MenuDichVuMega show={isOpen("dich-vu")} />
          </li>

          {/* 4. Cửa hàng (click mở mega) */}
          <li
            className={`kh-nav-item has-mega ${
              isOpen("cua-hang") ? "is-open" : ""
            }`}
          >
            <div
              className="kh-block kh-block-button"
              role="button"
              tabIndex={0}
              aria-expanded={isOpen("cua-hang")}
              aria-haspopup="true"
              onClick={() => toggle("cua-hang")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggle("cua-hang");
                }
              }}
            >
              <span className="kh-label">Cửa hàng</span>
              <Arrow open={isOpen("cua-hang")} />
            </div>
            <MenuCuaHangMega show={isOpen("cua-hang")} />
          </li>

          {/* 5. Học viện (click mở mega) */}
          <li
            className={`kh-nav-item has-mega ${
              isOpen("hoc-vien") ? "is-open" : ""
            }`}
          >
            <div
              className="kh-block kh-block-button"
              role="button"
              tabIndex={0}
              aria-expanded={isOpen("hoc-vien")}
              aria-haspopup="true"
              onClick={() => toggle("hoc-vien")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggle("hoc-vien");
                }
              }}
            >
              <span className="kh-label">Học viện</span>
              <Arrow open={isOpen("hoc-vien")} />
            </div>
            <MenuHocVienMega show={isOpen("hoc-vien")} />
          </li>

          {/* 6. Liên hệ (link) */}
          <li className="kh-nav-item">
            <NavLink
              to="/lien-he"
              className="kh-block"
              role="menuitem"
              onClick={closeAll}
            >
              <span className="kh-label">Liên hệ</span>
            </NavLink>
          </li>

          {/* 7. Tài khoản (click mở mega) */}
          <li
            className={`kh-nav-item has-mega ${
              isOpen("tai-khoan") ? "is-open" : ""
            }`}
          >
            <div
              className="kh-block kh-block-button"
              role="button"
              tabIndex={0}
              aria-expanded={isOpen("tai-khoan")}
              aria-haspopup="true"
              onClick={() => toggle("tai-khoan")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggle("tai-khoan");
                }
              }}
            >
              <span className="kh-label">Tài khoản</span>
              <Arrow open={isOpen("tai-khoan")} />
            </div>
            <MenuTaiKhoanMega show={isOpen("tai-khoan")} />
          </li>
        </ul>
      </nav>
    </div>
  );
}
