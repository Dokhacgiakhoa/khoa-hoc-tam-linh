// src/router/app-router.js
import React from "react";
import { Routes, Route } from "react-router-dom";

// vì file này đang nằm trong /src/router/
// nên phải lùi ra ngoài 1 cấp rồi mới vào /pages
import TrangChu from "../pages/TrangChu";
import DichVu from "../pages/DichVu";
import CuaHang from "../pages/CuaHang";
import KienThuc from "../pages/KienThuc";
import LienHe from "../pages/LienHe";

// component Tarot nằm trong /src/components/tarot-free-1-card/
import TarotFree1Card from "../components/tarot-free-1-card/tarot-free-1-card";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<TrangChu />} />
      <Route path="/trang-chu" element={<TrangChu />} />
      <Route path="/dich-vu" element={<DichVu />} />
      <Route path="/cua-hang" element={<CuaHang />} />
      <Route path="/kien-thuc" element={<KienThuc />} />
      <Route path="/lien-he" element={<LienHe />} />
      <Route path="/tarot-free-1-card" element={<TarotFree1Card />} />
    </Routes>
  );
}

export default AppRouter;
