import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Các trang chính (đúng chuẩn cậu đã đặt)
import TrangChu from "./pages/TrangChu";
import GioiThieu from "./pages/GioiThieu";
import DichVu from "./pages/DichVu";
import CuaHang from "./pages/CuaHang";
import HocVienHuyenHoc from "./pages/HocVienHuyenHoc";
import LienHe from "./pages/LienHe";
import TaiKhoan from "./pages/TaiKhoan";

// Component cuộn lên đầu trang khi đổi route
function ScrollToTop({ children }) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  });
  return children;
}

function AppRouter() {
  return (
    <ScrollToTop>
      <Routes>
        {/* Trang chủ */}
        <Route path="/" element={<TrangChu />} />

        {/* Giới thiệu (landing) */}
        <Route path="/gioi-thieu" element={<GioiThieu />} />

        {/* Dịch vụ (mega menu -> page) */}
        <Route path="/dich-vu" element={<DichVu />} />

        {/* Cửa hàng */}
        <Route path="/cua-hang" element={<CuaHang />} />

        {/* Học viện Huyền học (đã đổi tên, không còn KienThuc) */}
        <Route path="/hoc-vien" element={<HocVienHuyenHoc />} />

        {/* Liên hệ (3 nhóm: đồng hành – đầu tư – khách hàng) */}
        <Route path="/lien-he" element={<LienHe />} />

        {/* Tài khoản (Dashboard: hồ sơ, ví Linh Tệ, 2FA, thông báo, giỏ hàng) */}
        <Route path="/tai-khoan" element={<TaiKhoan />} />

        {/* Nếu route không tồn tại → về trang chủ */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ScrollToTop>
  );
}

export default AppRouter;
