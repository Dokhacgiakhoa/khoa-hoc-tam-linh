import React from "react";
import { NavLink } from "react-router-dom";
import "./mega-dropdown.css";

export default function MenuCuaHangMega({ show }) {
  const img = process.env.PUBLIC_URL + "/images/mega-preview.webp";
  return (
    <div
      className={show ? "kh-mega show" : "kh-mega"}
      role="region"
      aria-label="Mega menu Cửa hàng"
    >
      <div className="kh-mega-inner">
        {/* Cột 1 */}
        <div className="kh-col">
          <NavLink to="/cua-hang#bai-tam-linh" className="kh-mega-link">
            Bài Tâm Linh
          </NavLink>
          <NavLink to="/cua-hang#phu-kien" className="kh-mega-link">
            Phụ Kiện Tâm Linh
          </NavLink>
          <NavLink to="/cua-hang#huong-tram-tra" className="kh-mega-link">
            Hương – Trầm – Trà Đạo
          </NavLink>
        </div>

        {/* Cột 2 */}
        <div className="kh-col">
          <NavLink to="/cua-hang#cao-cap" className="kh-mega-link">
            Bộ Sưu Tập &amp; Cao Cấp
          </NavLink>
          <NavLink to="/cua-hang#set-qua" className="kh-mega-link">
            Set Quà Tặng
          </NavLink>
          <NavLink to="/cua-hang#che-tac-rieng" className="kh-mega-link">
            Chế Tác Riêng
          </NavLink>
        </div>

        {/* Cột 3 – Ảnh */}
        <div className="kh-col kh-col-image">
          <img src={img} alt="Cửa hàng – xem trước" loading="lazy" />
        </div>
      </div>

      {/* Footer mô tả + CTA */}
      <div className="kh-mega-footer">
        <p className="kh-mega-note">
          Sản phẩm chọn lọc theo năng lượng &amp; bản mệnh. Hỗ trợ cá nhân hoá{" "}
          <em>“Made for You ✴️”</em> và thanh toán linh hoạt.
        </p>
        <NavLink to="/cua-hang" className="kh-cta">
          Xem sản phẩm nổi bật
        </NavLink>
      </div>
    </div>
  );
}
