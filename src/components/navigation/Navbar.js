import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  // demo số lượng – sau này lấy từ context/store
  const inboxCount = 3;
  const cartCount = 2;
  const missionCount = 1;
  const totalBadge = inboxCount + cartCount + missionCount;

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const toggleMobile = () => setIsMobileOpen(!isMobileOpen);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark khtl-navbar fixed-top">
      <div className="container">
        {/* BRAND */}
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <span role="img" aria-label="crystal" className="brand-icon">
            🔮
          </span>
          <span className="fw-semibold">Khoa học Tâm linh</span>
        </Link>

        {/* MOBILE TOGGLER */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMobile}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* NAV LINKS */}
        <div
          className={`collapse navbar-collapse ${isMobileOpen ? "show" : ""}`}
        >
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            {/* 1. Trang chủ */}
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                🏠 Trang chủ
              </NavLink>
            </li>

            {/* 2. Giới thiệu (không dropdown) */}
            <li className="nav-item">
              <NavLink to="/gioi-thieu" className="nav-link">
                ℹ️ Giới thiệu
              </NavLink>
            </li>

            {/* 3. Dịch vụ – MEGA MENU */}
            <li className="nav-item dropdown khtl-mega">
              <span
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
              >
                🔮 Dịch vụ
              </span>
              <div className="dropdown-menu khtl-mega-menu">
                <div className="row g-3">
                  <div className="col-md-3">
                    <h6 className="khtl-mega-title">Tarot &amp; Bài Trà</h6>
                    <Link to="/dich-vu/tarot" className="dropdown-item">
                      Tarot miễn phí 1 lá
                    </Link>
                    <Link to="/dich-vu/tarot-tra-phi" className="dropdown-item">
                      Tarot trả phí (30–90 Linh Tệ)
                    </Link>
                    <Link to="/dich-vu/bai-tra" className="dropdown-item">
                      Bài trà 1 lá / 4 lá (10 LT)
                    </Link>
                    <Link to="/dich-vu/lich-su" className="dropdown-item">
                      Lịch sử xem
                    </Link>
                  </div>
                  <div className="col-md-3">
                    <h6 className="khtl-mega-title">Mệnh &amp; Lá số</h6>
                    <Link to="/dich-vu/ban-do-sao" className="dropdown-item">
                      Bản đồ sao (240 LT/năm)
                    </Link>
                    <Link to="/dich-vu/tu-vi" className="dropdown-item">
                      Tử vi (360 LT/năm)
                    </Link>
                    <Link to="/dich-vu/than-so-hoc" className="dropdown-item">
                      Thần số học (120 LT)
                    </Link>
                    <Link to="/dich-vu/kinh-dich" className="dropdown-item">
                      Quẻ Kinh Dịch (10 LT)
                    </Link>
                  </div>
                  <div className="col-md-3">
                    <h6 className="khtl-mega-title">Đặt lịch chuyên gia</h6>
                    <Link to="/dich-vu/dat-lich-online" className="dropdown-item">
                      Online 100 LT / 30’
                    </Link>
                    <Link to="/dich-vu/dat-lich-offline" className="dropdown-item">
                      Offline 500 LT (cọc 50%)
                    </Link>
                    <Link to="/dich-vu/huong-dan" className="dropdown-item">
                      Hướng dẫn đặt lịch
                    </Link>
                  </div>
                  <div className="col-md-3">
                    <h6 className="khtl-mega-title">Gói dịch vụ</h6>
                    <p className="khtl-mega-text">
                      Chia chủ đề: Tình cảm, Công việc, Gia đình, Học tập,
                      Mối quan hệ…
                    </p>
                    <Link to="/dich-vu" className="btn btn-sm khtl-btn-gold">
                      Xem tất cả dịch vụ
                    </Link>
                  </div>
                </div>
              </div>
            </li>

            {/* 4. Cửa hàng – MEGA MENU */}
            <li className="nav-item dropdown khtl-mega">
              <span
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
              >
                🛒 Cửa hàng
              </span>
              <div className="dropdown-menu khtl-mega-menu">
                <div className="row g-3">
                  <div className="col-md-3">
                    <h6 className="khtl-mega-title">Bài tâm linh</h6>
                    <Link to="/cua-hang/bai-tam-linh" className="dropdown-item">
                      Tarot / Oracle / Bài trà
                    </Link>
                    <Link to="/cua-hang/kinh-dich" className="dropdown-item">
                      Bộ Kinh Dịch
                    </Link>
                  </div>
                  <div className="col-md-3">
                    <h6 className="khtl-mega-title">Phụ kiện tâm linh</h6>
                    <Link to="/cua-hang/phu-kien-tam-linh" className="dropdown-item">
                      Đá năng lượng
                    </Link>
                    <Link to="/cua-hang/phu-kien-tam-linh" className="dropdown-item">
                      Khăn trải, nến, chuông
                    </Link>
                  </div>
                  <div className="col-md-3">
                    <h6 className="khtl-mega-title">Hương – Trầm – Trà đạo</h6>
                    <Link to="/cua-hang/huong-tram" className="dropdown-item">
                      Hương &amp; trầm
                    </Link>
                    <Link to="/cua-hang/tra-dao" className="dropdown-item">
                      Trà, bàn trà, dụng cụ
                    </Link>
                  </div>
                  <div className="col-md-3">
                    <h6 className="khtl-mega-title">Bộ sưu tập &amp; cao cấp</h6>
                    <Link
                      to="/cua-hang/bo-suu-tap-dac-biet"
                      className="dropdown-item"
                    >
                      Bộ sưu tập đặc biệt
                    </Link>
                    <Link to="/cua-hang/san-pham-cao-cap" className="dropdown-item">
                      Sản phẩm cao cấp
                    </Link>
                    <Link to="/cua-hang" className="btn btn-sm khtl-btn-gold mt-2">
                      Xem tất cả
                    </Link>
                  </div>
                </div>
              </div>
            </li>

            {/* 5. Học viện – MEGA MENU */}
            <li className="nav-item dropdown khtl-mega">
              <span
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
              >
                🎓 Học viện
              </span>
              <div className="dropdown-menu khtl-mega-menu khtl-mega-wide">
                <div className="row g-3">
                  <div className="col-md-2">
                    <h6 className="khtl-mega-title">MỆNH</h6>
                    <Link to="/hoc-vien/menh/tu-vi" className="dropdown-item">
                      Tử vi Đẩu số
                    </Link>
                    <Link to="/hoc-vien/menh/tu-tru" className="dropdown-item">
                      Bát tự / Tứ trụ
                    </Link>
                    <Link to="/hoc-vien/menh/than-so-hoc" className="dropdown-item">
                      Thần số học
                    </Link>
                  </div>
                  <div className="col-md-2">
                    <h6 className="khtl-mega-title">TƯỚNG</h6>
                    <Link to="/hoc-vien/tuong/nhan-tuong" className="dropdown-item">
                      Nhân tướng học
                    </Link>
                    <Link to="/hoc-vien/tuong/chi-tay" className="dropdown-item">
                      Chỉ tay
                    </Link>
                    <Link to="/hoc-vien/tuong/tuong-tam-ly" className="dropdown-item">
                      Tướng tâm lý
                    </Link>
                  </div>
                  <div className="col-md-2">
                    <h6 className="khtl-mega-title">BỐC</h6>
                    <Link to="/hoc-vien/boc/tarot" className="dropdown-item">
                      Tarot học
                    </Link>
                    <Link to="/hoc-vien/boc/kinh-dich" className="dropdown-item">
                      Kinh Dịch thực hành
                    </Link>
                    <Link to="/hoc-vien/boc/luc-hao" className="dropdown-item">
                      Lục Hào / Wen Wang Gua
                    </Link>
                  </div>
                  <div className="col-md-2">
                    <h6 className="khtl-mega-title">TRẠCH</h6>
                    <Link to="/hoc-vien/trach/phong-thuy" className="dropdown-item">
                      Phong thủy Bát Trạch
                    </Link>
                    <Link to="/hoc-vien/trach/huyen-khong" className="dropdown-item">
                      Huyền không Phi tinh
                    </Link>
                  </div>
                  <div className="col-md-2">
                    <h6 className="khtl-mega-title">SỐ</h6>
                    <Link to="/hoc-vien/so/kinh-dich" className="dropdown-item">
                      Kinh Dịch (64 quẻ)
                    </Link>
                    <Link to="/hoc-vien/so/ky-mon" className="dropdown-item">
                      Kỳ Môn Độn Giáp
                    </Link>
                    <Link to="/hoc-vien/so/bat-cuc-linh-so" className="dropdown-item">
                      Bát Cực Linh Số
                    </Link>
                  </div>
                  <div className="col-md-2">
                    <h6 className="khtl-mega-title">Thi &amp; Chứng chỉ</h6>
                    <Link to="/hoc-vien/chung-chi" className="dropdown-item">
                      Thi sơ cấp (miễn phí)
                    </Link>
                    <Link to="/hoc-vien/chung-chi" className="dropdown-item">
                      Thi trung cấp / cao cấp
                    </Link>
                    <Link to="/hoc-vien" className="btn btn-sm khtl-btn-gold mt-2">
                      Xem lộ trình
                    </Link>
                  </div>
                </div>
              </div>
            </li>

            {/* 6. Liên hệ (không dropdown) */}
            <li className="nav-item">
              <NavLink to="/lien-he" className="nav-link">
                ☎️ Liên hệ
              </NavLink>
            </li>

            {/* 7. Tài khoản – MEGA MENU USER */}
            <li className="nav-item dropdown khtl-mega khtl-account">
              <span
                className="nav-link dropdown-toggle position-relative"
                role="button"
                data-bs-toggle="dropdown"
              >
                👤 Tài khoản
                {totalBadge > 0 && (
                  <span className="khtl-badge-total">{totalBadge}</span>
                )}
              </span>
              <div className="dropdown-menu khtl-mega-menu khtl-account-menu">
                <div className="row g-3">
                  <div className="col-md-4">
                    <h6 className="khtl-mega-title">Hồ sơ &amp; cấp độ</h6>
                    <Link to="/tai-khoan" className="dropdown-item">
                      Hồ sơ cá nhân
                    </Link>
                    <Link to="/tai-khoan/nhiem-vu" className="dropdown-item">
                      Nhiệm vụ &amp; Cấp độ
                      {missionCount > 0 && (
                        <span className="khtl-badge-inline">{missionCount}</span>
                      )}
                    </Link>
                    <Link to="/tai-khoan/lich-su" className="dropdown-item">
                      Lịch sử hoạt động
                    </Link>
                  </div>
                  <div className="col-md-4">
                    <h6 className="khtl-mega-title">Tài chính</h6>
                    <Link to="/tai-khoan/vi-linh-te" className="dropdown-item">
                      Ví Linh Tệ
                    </Link>
                    <Link to="/tai-khoan/giao-dich" className="dropdown-item">
                      Lịch sử giao dịch
                    </Link>
                  </div>
                  <div className="col-md-4">
                    <h6 className="khtl-mega-title">Tương tác</h6>
                    <Link to="/tai-khoan/hop-thu" className="dropdown-item">
                      Hộp thư
                      {inboxCount > 0 && (
                        <span className="khtl-badge-inline">{inboxCount}</span>
                      )}
                    </Link>
                    <Link to="/tai-khoan/gio-hang" className="dropdown-item">
                      Giỏ hàng
                      {cartCount > 0 && (
                        <span className="khtl-badge-inline">{cartCount}</span>
                      )}
                    </Link>
                    <Link to="/tai-khoan/cai-dat" className="dropdown-item">
                      Cài đặt &amp; bảo mật
                    </Link>
                    <Link to="/tai-khoan/dang-xuat" className="dropdown-item">
                      Đăng xuất
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
