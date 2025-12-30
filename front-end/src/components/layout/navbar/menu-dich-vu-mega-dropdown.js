import React from "react";
import { NavLink } from "react-router-dom";
import "./mega-dropdown.css";

export default function MenuDichVuMega({ show, onNavigate }) {
  return (
    <div
      className={show ? "kh-mega show" : "kh-mega"}
      role="region"
      aria-label="Mega menu Dịch vụ"
      style={{ width: "min(1200px, calc(100vw - 40px))" }}
    >
      <div className="kh-mega-inner five-cols">
        {/* Nhóm 1: MỆNH */}
        <div className="kh-col">
          <div className="kh-col-title text-gold">MỆNH</div>
          <nav className="kh-col-list">
            <NavLink
              to="/dich-vu/tu-vi"
              className="kh-mega-link"
              onClick={onNavigate}
            >
              Tử Vi Đẩu Số
            </NavLink>
            <NavLink
              to="/dich-vu/bat-tu"
              className="kh-mega-link"
              onClick={onNavigate}
            >
              Bát Tự (Tứ Trụ)
            </NavLink>
            <NavLink
              to="/tai-khoan/ho-so-nguoi-than"
              className="kh-mega-link"
              onClick={onNavigate}
            >
              Quản lý hồ sơ
            </NavLink>
          </nav>
        </div>

        {/* Nhóm 2: TƯỚNG */}
        <div className="kh-col">
          <div className="kh-col-title text-gold">TƯỚNG</div>
          <nav className="kh-col-list">
            <NavLink
              to="/dich-vu/scan-face"
              className="kh-mega-link"
              onClick={onNavigate}
            >
              AI Face Scan
            </NavLink>
            <NavLink
              to="/dich-vu/scan-palm"
              className="kh-mega-link"
              onClick={onNavigate}
            >
              Scan Chỉ Tay
            </NavLink>
            <NavLink
              to="/dich-vu/xem-van-tay"
              className="kh-mega-link"
              onClick={onNavigate}
            >
              Xem Vân Tay
            </NavLink>
          </nav>
        </div>

        {/* Nhóm 3: BỐC */}
        <div className="kh-col">
          <div className="kh-col-title text-gold">BỐC</div>
          <nav className="kh-col-list">
            <NavLink
              to="/dich-vu/tarot"
              className="kh-mega-link"
              onClick={onNavigate}
            >
              Bói Bài Tarot
            </NavLink>
            <NavLink
              to="/dich-vu/kinh-dich"
              className="kh-mega-link"
              onClick={onNavigate}
            >
              Gieo Quẻ Dịch
            </NavLink>
            <NavLink
              to="/dich-vu/xin-xam"
              className="kh-mega-link"
              onClick={onNavigate}
            >
              Xin Xâm
            </NavLink>
          </nav>
        </div>

        {/* Nhóm 4: TRẠCH */}
        <div className="kh-col">
          <div className="kh-col-title text-gold">TRẠCH</div>
          <nav className="kh-col-list">
            <NavLink
              to="/dich-vu/la-ban"
              className="kh-mega-link"
              onClick={onNavigate}
            >
              La Bàn AR
            </NavLink>
            <NavLink
              to="/dich-vu/thuoc-lo-ban"
              className="kh-mega-link"
              onClick={onNavigate}
            >
              Thước Lỗ Ban
            </NavLink>
            <NavLink
              to="/dich-vu/bat-trach"
              className="kh-mega-link"
              onClick={onNavigate}
            >
              Tra cứu Bát Trạch
            </NavLink>
          </nav>
        </div>

        {/* Nhóm 5: SỐ */}
        <div className="kh-col">
          <div className="kh-col-title text-gold">SỐ</div>
          <nav className="kh-col-list">
            <NavLink
              to="/dich-vu/than-so-hoc"
              className="kh-mega-link"
              onClick={onNavigate}
            >
              Thần Số Học
            </NavLink>
            <NavLink
              to="/dich-vu/cham-diem-sim"
              className="kh-mega-link"
              onClick={onNavigate}
            >
              Chấm điểm SIM
            </NavLink>
            <NavLink
              to="/dich-vu/lich-van-nien"
              className="kh-mega-link"
              onClick={onNavigate}
            >
              Lịch Vạn Niên
            </NavLink>
          </nav>
        </div>
      </div>

      <div className="kh-mega-footer">
        <p className="kh-mega-note">
          Hệ thống công cụ chuẩn hóa <strong>Ngũ Huyền Thuật</strong> tích hợp
          công nghệ AI hiện đại.
        </p>
        <NavLink to="/dich-vu" className="kh-cta" onClick={onNavigate}>
          Tất cả dịch vụ
        </NavLink>
      </div>
    </div>
  );
}
