// src/App.js
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TrangChu from "./pages/TrangChu";
import DichVu from "./pages/DichVu";
import CuaHang from "./pages/CuaHang";
import KienThuc from "./pages/KienThuc";
import LienHe from "./pages/LienHe";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "80vh" }}>
        <Routes>
          <Route path="/" element={<TrangChu />} />
          <Route path="/dich-vu" element={<DichVu />} />
          <Route path="/cua-hang" element={<CuaHang />} />
          <Route path="/kien-thuc" element={<KienThuc />} />
          <Route path="/lien-he" element={<LienHe />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
