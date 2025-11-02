// src/router/app-router.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// lưu ý: file này nằm trong /router nên phải ../pages/ chứ không phải ./pages/
import TrangChu from "../pages/TrangChu";
import GioiThieu from "../pages/GioiThieu";
import DichVu from "../pages/DichVu";
import CuaHang from "../pages/CuaHang";
import HocVienHuyenHoc from "../pages/HocVienHuyenHoc";
import LienHe from "../pages/LienHe";

// tạm thời trong /pages của cậu CHƯA có TaiKhoan.js nên tớ tạo 1 component tạm
const TaiKhoanPlaceholder = () => (
  <div style={{ padding: "80px 16px", minHeight: "50vh" }}>
    <h2>Tài khoản</h2>
    <p>
      Trang Tài khoản chưa được tạo. Tạo file:{" "}
      <code>src/pages/TaiKhoan.js</code>
    </p>
  </div>
);

function ScrollToTop({ children }) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return children;
}

function AppRouter() {
  return (
    <ScrollToTop>
      <Routes>
        <Route path="/" element={<TrangChu />} />
        <Route path="/gioi-thieu" element={<GioiThieu />} />
        <Route path="/dich-vu" element={<DichVu />} />
        <Route path="/cua-hang" element={<CuaHang />} />
        <Route path="/hoc-vien" element={<HocVienHuyenHoc />} />
      </Routes>
    </ScrollToTop>
  );
}

export default AppRouter;
