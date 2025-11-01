import TrangChu from "./pages/TrangChu";
import DichVu from "./pages/DichVu";
import CuaHang from "./pages/CuaHang";
import KienThuc from "./pages/KienThuc";
import LienHe from "./pages/LienHe";
import TarotMienPhiMotLa from "./components/TarotMienPhiMotLa";

<Routes>
  <Route path="/" element={<TrangChu />} />
  <Route path="/trang-chu" element={<TrangChu />} />
  <Route path="/dich-vu" element={<DichVu />} />
  <Route path="/cua-hang" element={<CuaHang />} />
  <Route path="/kien-thuc" element={<KienThuc />} />
  <Route path="/lien-he" element={<LienHe />} />
  <Route path="/tarot-mien-phi" element={<TarotMienPhiMotLa />} />
</Routes>;
