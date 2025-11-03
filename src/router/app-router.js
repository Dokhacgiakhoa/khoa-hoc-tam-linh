import React from "react";
import { Routes, Route } from "react-router-dom";
import TrangChu from "../pages/TrangChu";
import GioiThieu from "../pages/GioiThieu";
import DichVu from "../pages/DichVu";
import CuaHang from "../pages/CuaHang";
import HocVienHuyenHoc from "../pages/HocVienHuyenHoc";
import LienHe from "../pages/LienHe";
import Navbar from "../components/navigation/Navbar";
import Footer from "../components/footer/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<TrangChu />} />
        <Route path="/gioi-thieu" element={<GioiThieu />} />
        <Route path="/dich-vu" element={<DichVu />} />
        <Route path="/cua-hang" element={<CuaHang />} />
        <Route path="/hoc-vien-huyen-hoc" element={<HocVienHuyenHoc />} />
        <Route path="/lien-he" element={<LienHe />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
