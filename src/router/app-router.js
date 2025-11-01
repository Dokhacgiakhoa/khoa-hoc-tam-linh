// src/router/app-router.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import TrangChu from "../pages/TrangChu";
import DichVu from "../pages/DichVu";
import CuaHang from "../pages/CuaHang";
import KienThuc from "../pages/KienThuc";
import LienHe from "../pages/LienHe";
import TarotFree1Card from "../components/tarot-free-1-card/tarot-free-1-card";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<TrangChu />} />
      <Route path="/dich-vu" element={<DichVu />} />
      <Route path="/cua-hang" element={<CuaHang />} />
      <Route path="/kien-thuc" element={<KienThuc />} />
      <Route path="/lien-he" element={<LienHe />} />

      {/* Trải bài Tarot 1 lá (miễn phí) */}
      <Route path="/dich-vu/tarot-free-1-card" element={<TarotFree1Card />} />
    </Routes>
  );
}

export default AppRouter;
