import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/navigation/Navbar";
import Footer from "./components/footer/Footer";

// 🔸 tạm thời làm các trang đơn giản để tránh crash
function TrangChu() {
  return (
    <div
      style={{
        minHeight: "70vh",
        padding: "4rem 1.5rem",
        color: "#fff",
        background: "#0f0a1e",
      }}
    >
      <h1>Trang chủ – Khoa học Tâm linh</h1>
      <p>Landing chính của hệ thống.</p>
      <p>
        <Link to="/hoc-vien-huyen-hoc" style={{ color: "#ffd700" }}>
          Đi tới Học viện →
        </Link>
      </p>
    </div>
  );
}

function GioiThieu() {
  return (
    <div
      style={{
        minHeight: "70vh",
        padding: "4rem 1.5rem",
        color: "#fff",
        background: "#120d22",
      }}
    >
      <h1>Giới thiệu</h1>
      <p>Trang giới thiệu hệ sinh thái, 3 nhóm đối tượng.</p>
    </div>
  );
}

function DichVu() {
  return (
    <div
      style={{
        minHeight: "70vh",
        padding: "4rem 1.5rem",
        color: "#fff",
        background: "#140f28",
      }}
    >
      <h1>Dịch vụ</h1>
      <p>Tarot, Mệnh & Lá số, Đặt lịch chuyên gia…</p>
    </div>
  );
}

function CuaHang() {
  return (
    <div
      style={{
        minHeight: "70vh",
        padding: "4rem 1.5rem",
        color: "#fff",
        background: "#160f2c",
      }}
    >
      <h1>Cửa hàng</h1>
      <p>
        6 nhóm sản phẩm: Bài, Phụ kiện, Hương – Trầm – Trà, Bộ sưu tập & Cao
        cấp, Set quà tặng, Chế tác riêng.
      </p>
    </div>
  );
}

function HocVienHuyenHoc() {
  return (
    <div
      style={{
        minHeight: "70vh",
        padding: "4rem 1.5rem",
        color: "#fff",
        background: "#180f30",
      }}
    >
      <h1>Học viện Huyền học</h1>
      <p>Ngũ Huyền Thuật: Mệnh – Tướng – Bốc – Trạch – Số.</p>
    </div>
  );
}

function LienHe() {
  return (
    <div
      style={{
        minHeight: "70vh",
        padding: "4rem 1.5rem",
        color: "#fff",
        background: "#1a0f34",
      }}
    >
      <h1>Liên hệ</h1>
      <p>3 nhóm: Đồng hành – Đầu tư – Khách hàng.</p>
    </div>
  );
}

function NotFound() {
  return (
    <div
      style={{
        minHeight: "70vh",
        padding: "4rem 1.5rem",
        color: "#fff",
        background: "#000",
      }}
    >
      <h1>404</h1>
      <p>Không tìm thấy trang.</p>
      <Link to="/" style={{ color: "#ffd700" }}>
        ← Về trang chủ
      </Link>
    </div>
  );
}

function App() {
  return (
    <>
      {/* Navbar của bạn (đen tím, hover vàng) */}
      <Navbar />

      <Routes>
        {/* Local */}
        <Route path="/" element={<TrangChu />} />

        {/* Để deploy GitHub Pages repo /khoa-hoc-tam-linh */}
        <Route path="/khoa-hoc-tam-linh" element={<TrangChu />} />

        {/* Các trang còn lại */}
        <Route path="/gioi-thieu" element={<GioiThieu />} />
        <Route path="/dich-vu" element={<DichVu />} />
        <Route path="/cua-hang" element={<CuaHang />} />
        <Route path="/hoc-vien-huyen-hoc" element={<HocVienHuyenHoc />} />
        <Route path="/lien-he" element={<LienHe />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Footer chuẩn của dự án */}
      <Footer />
    </>
  );
}

export default App;
