// src/components/Navbar.js
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold">
          KhoaHocTamLinh
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Trang chủ
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/dich-vu" className="nav-link">
                Dịch vụ
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/cua-hang" className="nav-link">
                Cửa hàng
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/kien-thuc" className="nav-link">
                Kiến thức
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/lien-he" className="nav-link">
                Liên hệ
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
