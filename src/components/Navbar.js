import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        {/* LOGO */}
        <Link className="navbar-brand fw-bold" to="/">
          KhoaHocTamLinh
        </Link>

        {/* BUTTON MOBILE */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* NAV */}
        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">
            {/* Trang chủ */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Trang chủ
              </NavLink>
            </li>

            {/* MEGA MENU: Dịch vụ */}
            <li className="nav-item dropdown position-static d-none d-lg-block">
              <a
                className="nav-link dropdown-toggle"
                href="#/"
                id="megaDichVu"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dịch vụ
              </a>
              <div
                className="dropdown-menu w-100 mt-0 border-0 rounded-0 shadow-lg"
                aria-labelledby="megaDichVu"
              >
                <div className="container py-4">
                  <div className="row g-4">
                    {/* Cột 1 */}
                    <div className="col-lg-3 col-md-6">
                      <h6 className="text-uppercase text-muted mb-3">
                        Xem nhanh
                      </h6>
                      <Link className="dropdown-item py-1" to="/dich-vu#tarot">
                        🔮 Tarot / Oracle
                      </Link>
                      <Link
                        className="dropdown-item py-1"
                        to="/dich-vu#than-so-hoc"
                      >
                        🧮 Thần số học
                      </Link>
                      <Link
                        className="dropdown-item py-1"
                        to="/dich-vu#ban-do-sao"
                      >
                        🌌 Bản đồ sao
                      </Link>
                      <Link className="dropdown-item py-1" to="/dich-vu#tu-vi">
                        📜 Tử vi & Dịch lý
                      </Link>
                    </div>

                    {/* Cột 2 */}
                    <div className="col-lg-3 col-md-6">
                      <h6 className="text-uppercase text-muted mb-3">
                        Gói chuyên sâu
                      </h6>
                      <button className="dropdown-item py-1" type="button">
                        Gói 12 tháng
                      </button>
                      <button className="dropdown-item py-1" type="button">
                        Gói công việc
                      </button>
                      <button className="dropdown-item py-1" type="button">
                        Gói tình cảm
                      </button>
                      <Link
                        className="dropdown-item py-1"
                        to="/dich-vu#dat-lich"
                      >
                        Đặt lịch 1:1
                      </Link>
                    </div>

                    {/* Cột 3 */}
                    <div className="col-lg-3 col-md-6">
                      <h6 className="text-uppercase text-muted mb-3">
                        Tự động (AI)
                      </h6>
                      <button className="dropdown-item py-1" type="button">
                        Tarot AI
                      </button>
                      <button className="dropdown-item py-1" type="button">
                        Chiêm tinh AI
                      </button>
                      <button className="dropdown-item py-1" type="button">
                        Thần số học AI
                      </button>
                      <small className="text-muted d-block mt-2">
                        * Chỉ hiển thị nếu user đã đăng nhập.
                      </small>
                    </div>

                    {/* Cột 4 */}
                    <div className="col-lg-3 col-md-6">
                      <div className="p-3 bg-light rounded">
                        <h6 className="mb-2">Bạn không biết chọn gì?</h6>
                        <p className="small mb-3">
                          Trả lời vài câu hỏi, hệ thống gợi ý dịch vụ phù hợp.
                        </p>
                        <Link to="/LienHe" className="btn btn-primary btn-sm">
                          Hỏi chuyên gia
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            {/* Mobile version của Dịch vụ (dropdown thường) */}
            <li className="nav-item dropdown d-lg-none">
              <a
                className="nav-link dropdown-toggle"
                href="#/"
                id="dichVuMobile"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dịch vụ
              </a>
              <ul className="dropdown-menu" aria-labelledby="dichVuMobile">
                <li>
                  <Link className="dropdown-item" to="/dich-vu#tarot">
                    Tarot / Oracle
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/dich-vu#ban-do-sao">
                    Bản đồ sao
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/dich-vu#than-so-hoc">
                    Thần số học
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/dich-vu#dat-lich">
                    Đặt lịch 1:1
                  </Link>
                </li>
              </ul>
            </li>

            {/* Cửa hàng */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/cua-hang">
                Cửa hàng
              </NavLink>
            </li>

            {/* Kiến thức (có dropdown nhỏ) */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#/"
                id="kienThucDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Kiến thức
              </a>
              <ul className="dropdown-menu" aria-labelledby="kienThucDropdown">
                <li>
                  <Link className="dropdown-item" to="/kien-thuc">
                    Tất cả bài viết
                  </Link>
                </li>
                <li>
                  <button className="dropdown-item" type="button">
                    Tarot cơ bản
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" type="button">
                    Chiêm tinh
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" type="button">
                    Phong thủy & Trà đạo
                  </button>
                </li>
              </ul>
            </li>

            {/* Liên hệ */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/lien-he">
                Liên hệ
              </NavLink>
            </li>

            {/* Nút đăng nhập */}
            <li className="nav-item ms-lg-3">
              <button className="btn btn-outline-light btn-sm">
                Đăng nhập
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
