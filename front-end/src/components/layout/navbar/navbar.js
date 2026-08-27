import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import api from "../../../services/api";
import "./navbar.css";
import "./navbar-mobile.css";

import MenuDichVuMega from "./menu-dich-vu-mega-dropdown";
import MenuCuaHangMega from "./menu-cua-hang-mega-dropdown";
import MenuHocVienMega from "./menu-hoc-vien-huyen-hoc-mega-dropdown";
import MenuTaiKhoanMega from "./menu-tai-khoan-he-thong-mega-dropdown";

/** Icon tam giác: mặc định hướng xuống; khi mở quay -90deg -> hướng trái */
function Arrow({ open }) {
  return (
    <svg
      className={`arrow ${open ? "open" : ""}`}
      width="15"
      height="15"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M7 10l5 5 5-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Navbar() {
  const [openKey, setOpenKey] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Mobile menu state
  const [cartCount, setCartCount] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);
  const navRef = useRef(null);
  const wrapRef = useRef(null);
  const location = useLocation();

  const isOpen = (k) => openKey === k;
  const toggle = (k) => setOpenKey((p) => (p === k ? null : k));
  const closeAll = () => setOpenKey(null);
  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  // Check user login status
  useEffect(() => {
    const checkUser = () => {
      const token = localStorage.getItem("auth_token");
      if (token) {
        // Try to get user info from localStorage or make API call
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch (e) {
            setUser(null);
          }
        }
      } else {
        setUser(null);
      }
    };

    checkUser();

    const loadCart = () => {
      try {
        const cart = JSON.parse(localStorage.getItem("kh_cart") || "[]");
        const total = cart.reduce((acc, item) => acc + (item.quantity || 0), 0);
        setCartCount(total);
      } catch (e) {
        setCartCount(0);
      }
    };
    loadCart();

    // Notification Logic
    const fetchNotifications = () => {
      const token = localStorage.getItem("auth_token");
      if (token) {
        api
          .get("/api/notifications/unread-count")
          .then((res) => {
            const count = res.data?.unread_count ?? res.data?.data?.unread_count ?? 0;
            setNotificationCount(count);
          })
          .catch(() => {
            setNotificationCount(0);
          });
      }
    };
    fetchNotifications();

    // Listen for storage changes (login/logout from other tabs)
    window.addEventListener("storage", () => {
      checkUser();
      loadCart();
    });

    // Custom events for same-tab updates
    window.addEventListener("userChanged", checkUser);
    window.addEventListener("cartChanged", loadCart);
    window.addEventListener("unreadNotificationsChanged", (e) => {
      setNotificationCount(e.detail);
    });

    return () => {
      window.removeEventListener("storage", () => {
        checkUser();
        loadCart();
      });
      window.removeEventListener("userChanged", checkUser);
      window.removeEventListener("cartChanged", loadCart);
      window.removeEventListener("unreadNotificationsChanged", (e) => {
        setNotificationCount(e.detail);
      });
    };
  }, []);

  // 1) Click outside -> close
  useEffect(() => {
    const onOutside = (e) => {
      const nav = navRef.current;
      if (!nav) return;
      if (!nav.contains(e.target)) closeAll();
    };
    document.addEventListener("pointerdown", onOutside);
    return () => document.removeEventListener("pointerdown", onOutside);
  }, []);

  // 2) Press Esc -> close
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeAll();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // 3) Click vào link trong mega -> close (ủy quyền click ở <nav>)
  const onNavClick = (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;
    if (target.closest(".kh-mega-link")) closeAll();
  };

  // 4) Đóng mega khi đổi route
  useEffect(() => {
    closeAll();
  }, [location.pathname]);

  // 5) Ghim navbar + “đội” chiều cao để không đè nội dung
  const measureAndSetHeight = () => {
    const nav = navRef.current;
    const wrap = wrapRef.current;
    if (!nav || !wrap) return;
    const h = nav.offsetHeight;
    // đặt biến CSS và set min-height cho wrapper
    document.documentElement.style.setProperty("--kh-nav-h", `${h}px`);
    wrap.style.minHeight = `${h}px`;
  };

  useEffect(() => {
    measureAndSetHeight();
    const ro = new ResizeObserver(measureAndSetHeight);
    if (navRef.current) ro.observe(navRef.current);
    window.addEventListener("resize", measureAndSetHeight);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measureAndSetHeight);
    };
  }, []);

  // 6) Đổ bóng khi cuộn
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="kh-nav-wrap" ref={wrapRef}>
      <nav
        className={`kh-nav ${scrolled ? "is-scrolled" : ""}`}
        ref={navRef}
        onClick={onNavClick}
        role="navigation"
        aria-label="Khoa học Tâm linh"
      >
        {/* Hamburger Button - Mobile Only */}
        <button
          className="kh-hamburger"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Desktop Navigation - Hidden on Mobile */}
        <ul className="kh-nav-list" role="menubar">
          {/* 1. Trang chủ */}
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

          {/* 2. Giới thiệu */}
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

          {/* 3. Dịch vụ (mega) */}
          <li
            className={`kh-nav-item has-mega ${
              isOpen("dich-vu") ? "is-open" : ""
            }`}
          >
            <div
              className={`kh-block kh-block-button ${
                location.pathname.startsWith("/dich-vu") ? "active" : ""
              }`}
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

          {/* 4. Cửa hàng (mega) */}
          <li
            className={`kh-nav-item has-mega ${
              isOpen("cua-hang") ? "is-open" : ""
            }`}
          >
            <div
              className={`kh-block kh-block-button ${
                location.pathname.startsWith("/cua-hang") ? "active" : ""
              }`}
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

          {/* 5. Học viện (mega) */}
          <li
            className={`kh-nav-item has-mega ${
              isOpen("hoc-vien") ? "is-open" : ""
            }`}
          >
            <div
              className={`kh-block kh-block-button ${
                location.pathname.startsWith("/hoc-vien") ? "active" : ""
              }`}
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

          {/* 6. Liên hệ */}
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

          {/* 7. Tài khoản (Login vs Mega) */}
          {!user ? (
            <li className="kh-nav-item">
              <NavLink
                to="/tai-khoan"
                className="kh-block"
                role="menuitem"
                onClick={closeAll}
              >
                <span className="kh-label">Đăng nhập / Đăng ký</span>
              </NavLink>
            </li>
          ) : (
            <li
              className={`kh-nav-item has-mega ${
                isOpen("tai-khoan") ? "is-open" : ""
              }`}
            >
              <div
                className={`kh-block kh-block-button ${
                  location.pathname.startsWith("/tai-khoan") ? "active" : ""
                }`}
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
                <span className="kh-label">
                  <i className="bi bi-person-circle me-1"></i>
                  {user.username ||
                    user.name ||
                    user.full_name ||
                    user.email.split("@")[0]}
                </span>
                <Arrow open={isOpen("tai-khoan")} />
              </div>
              <MenuTaiKhoanMega
                show={isOpen("tai-khoan")}
                cartCount={cartCount}
                notificationCount={notificationCount}
                onNavigate={closeAll}
              />
            </li>
          )}

          {/* 8. Giỏ hàng Quick Access (Hide if not logged in) */}
          {user && (
            <li className="kh-nav-item">
              <NavLink
                to="/gio-hang"
                className="kh-block cart-icon-block"
                title="Giỏ hàng"
                onClick={closeAll}
              >
                <i className="bi bi-cart3" style={{ fontSize: "1.2rem" }}></i>
                {cartCount > 0 && (
                  <span className="cart-badge">{cartCount}</span>
                )}
              </NavLink>
            </li>
          )}
        </ul>

        {/* Mobile Menu Overlay */}
        <div className={`kh-mobile-menu ${mobileMenuOpen ? "is-open" : ""}`}>
          <div className="kh-mobile-menu-header">
            <h2>Menu</h2>
            <button
              className="kh-mobile-close"
              onClick={closeMobileMenu}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>
          <ul className="kh-mobile-menu-list">
            <li>
              <NavLink to="/" onClick={closeMobileMenu}>
                Trang chủ
              </NavLink>
            </li>
            <li>
              <NavLink to="/gioi-thieu" onClick={closeMobileMenu}>
                Giới thiệu
              </NavLink>
            </li>
            <li>
              <NavLink to="/dich-vu" onClick={closeMobileMenu}>
                Dịch vụ
              </NavLink>
            </li>
            <li>
              <NavLink to="/cua-hang" onClick={closeMobileMenu}>
                Cửa hàng
              </NavLink>
            </li>
            <li>
              <NavLink to="/hoc-vien-huyen-hoc" onClick={closeMobileMenu}>
                Học viện
              </NavLink>
            </li>
            <li>
              <NavLink to="/lien-he" onClick={closeMobileMenu}>
                Liên hệ
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink
                  to="/gio-hang"
                  onClick={closeMobileMenu}
                  className="kh-block cart-icon-block"
                  title="Giỏ hàng"
                >
                  <i className="bi bi-cart3 fs-4"></i>
                  {cartCount > 0 && (
                    <span className="cart-badge">{cartCount}</span>
                  )}
                </NavLink>
              </li>
            )}
            <li>
              <NavLink to="/tai-khoan" onClick={closeMobileMenu}>
                {user
                  ? `👤 ${user.username || user.email.split("@")[0]}`
                  : "Đăng nhập / Đăng ký"}
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Mobile Menu Backdrop */}
        {mobileMenuOpen && (
          <div
            className="kh-mobile-backdrop"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
        )}
      </nav>
    </div>
  );
}
