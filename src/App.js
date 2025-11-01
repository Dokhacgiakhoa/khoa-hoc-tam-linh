import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import TrangChu from "./pages/TrangChu";
import DichVu from "./pages/DichVu";
import CuaHang from "./pages/CuaHang";
import KienThuc from "./pages/KienThuc";
import LienHe from "./pages/LienHe";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <main className="flex-shrink-0" style={{ minHeight: "80vh" }}>
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
