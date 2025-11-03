import React, { Suspense, lazy } from "react";
import "./app.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/navbar/navbar";
import Footer from "./components/layout/footer/footer";

const TrangChu = lazy(() => import("./pages/trang-chu/trang-chu"));
const GioiThieu = lazy(() => import("./pages/gioi-thieu/gioi-thieu"));
const DichVu = lazy(() => import("./pages/dich-vu/dich-vu"));
const CuaHang = lazy(() => import("./pages/cua-hang/cua-hang"));
const HocVienHuyenHoc = lazy(() =>
  import("./pages/hoc-vien-huyen-hoc/hoc-vien-huyen-hoc")
);
const LienHe = lazy(() => import("./pages/lien-he/lien-he"));
const TaiKhoan = lazy(() => import("./pages/tai-khoan/tai-khoan"));

export default function App() {
  return (
    <div className="app-root d-flex flex-column min-vh-100">
      <Navbar />
      <main className="app-main flex-grow-1">
        <Suspense
          fallback={
            <div className="app-loading text-center py-5">Đang tải…</div>
          }
        >
          <Routes>
            <Route path="/" element={<TrangChu />} />
            <Route path="/gioi-thieu" element={<GioiThieu />} />
            <Route path="/dich-vu" element={<DichVu />} />
            <Route path="/cua-hang" element={<CuaHang />} />
            <Route path="/hoc-vien-huyen-hoc" element={<HocVienHuyenHoc />} />
            <Route path="/lien-he" element={<LienHe />} />
            <Route path="/tai-khoan" element={<TaiKhoan />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
