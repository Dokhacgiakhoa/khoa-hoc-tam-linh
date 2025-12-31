import React, { Suspense, lazy, useEffect, useState, useRef } from "react";
import "./app.css";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { AlertProvider } from "./contexts/AlertContext";

import Navbar from "./components/layout/navbar/navbar";
import Footer from "./components/layout/footer/footer";
import ScrollToTop from "./components/scroll-to-top";

const TrangChu = lazy(() => import("./pages/trang-chu/trang-chu"));
const GioiThieu = lazy(() => import("./pages/gioi-thieu/gioi-thieu"));
const DichVu = lazy(() => import("./pages/dich-vu/dich-vu"));
const CuaHang = lazy(() => import("./pages/cua-hang/cua-hang"));
const CartPage = lazy(() => import("./pages/cua-hang/cart-page"));
const ProductDetail = lazy(() => import("./pages/cua-hang/product-detail"));
const HocVienHuyenHoc = lazy(() =>
  import("./pages/hoc-vien-huyen-hoc/hoc-vien-huyen-hoc")
);
const LienHe = lazy(() => import("./pages/lien-he/lien-he"));
const TaiKhoan = lazy(() => import("./pages/tai-khoan/tai-khoan"));
const TarotMienPhi = lazy(() =>
  import("./pages/dich-vu-mien-phi/tarot-mien-phi")
);
const BanDoSao = lazy(() => import("./pages/dich-vu/sub-pages/BanDoSao"));
const ThanSoHoc = lazy(() => import("./pages/dich-vu/sub-pages/ThanSoHoc"));
const KinhDich = lazy(() => import("./pages/dich-vu/sub-pages/KinhDich"));
const KhamPhaBanThan = lazy(() =>
  import("./pages/dich-vu/sub-pages/KhamPhaBanThan")
);
const DatLich = lazy(() => import("./pages/dich-vu/sub-pages/DatLich"));
const TuVi = lazy(() => import("./pages/dich-vu/sub-pages/TuVi"));
const FAQDichVu = lazy(() => import("./pages/dich-vu/sub-pages/FAQ"));
const GoiDichVu = lazy(() => import("./pages/dich-vu/dich-vu"));
const ServiceDynamicPage = lazy(() =>
  import("./pages/dich-vu/sub-pages/ServiceDynamicPage")
);
const AcademyCategory = lazy(() =>
  import("./pages/hoc-vien-huyen-hoc/sub-pages/CategoryCourses")
);
const AcademyCourse = lazy(() =>
  import("./pages/hoc-vien-huyen-hoc/sub-pages/CourseDetail")
);
const ThiChungChi = lazy(() =>
  import("./pages/hoc-vien-huyen-hoc/sub-pages/ThiChungChi")
);
const ExamTakingPage = lazy(() =>
  import("./pages/hoc-vien-huyen-hoc/sub-pages/ExamTakingPage")
);

// Admin Pages
const AdminLayout = lazy(() => import("./pages/admin/admin-layout"));
const DashboardHome = lazy(() => import("./pages/admin/dashboard-home"));
const UserManager = lazy(() => import("./pages/admin/user-manager"));
const OrderManager = lazy(() => import("./pages/admin/order-manager"));

export default function App() {
  const videoRef = useRef(null);
  const [apiMessage, setApiMessage] = useState("");

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  useEffect(() => {
    // Test API Connection
    axios.get("/api/test").then((response) => {
      console.log("API Connected:", response.data);
      setApiMessage(response.data.message);
    });
  }, []);

  const isAdminPage = window.location.pathname.startsWith("/admin");

  return (
    <AlertProvider>
      <div className="app-root d-flex flex-column min-vh-100">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="app-bg-video"
        >
          <source
            src={process.env.PUBLIC_URL + "/media/backgroud-video.mp4"}
            type="video/mp4"
          />
        </video>
        {!isAdminPage && <Navbar />}
        <main className="app-main flex-grow-1">
          <Suspense
            fallback={
              <div className="app-loading text-center py-5">Đang tải…</div>
            }
          >
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<TrangChu />} />
              <Route path="/gioi-thieu" element={<GioiThieu />} />
              <Route path="/dich-vu" element={<DichVu />} />
              <Route path="/cua-hang" element={<CuaHang />} />
              <Route path="/gio-hang" element={<CartPage />} />
              <Route path="/cua-hang/:category" element={<CuaHang />} />
              <Route
                path="/cua-hang/san-pham/:id"
                element={<ProductDetail />}
              />
              <Route path="/hoc-vien-huyen-hoc" element={<HocVienHuyenHoc />} />
              <Route path="/hoc-vien" element={<HocVienHuyenHoc />} />
              <Route path="/hoc-vien/:slug" element={<AcademyCategory />} />
              <Route
                path="/hoc-vien/khoa-hoc/:slug"
                element={<AcademyCourse />}
              />
              <Route path="/hoc-vien/thi-chung-chi" element={<ThiChungChi />} />
              <Route path="/hoc-vien/thi/:id" element={<ExamTakingPage />} />
              <Route path="/lien-he" element={<LienHe />} />
              <Route path="/tai-khoan" element={<TaiKhoan />} />
              <Route path="/tai-khoan/:activeTab" element={<TaiKhoan />} />
              <Route
                path="/dich-vu/tarot-mien-phi"
                element={<TarotMienPhi />}
              />
              <Route path="/dich-vu/tarot" element={<TarotMienPhi />} />
              <Route path="/dich-vu/ban-do-sao" element={<BanDoSao />} />
              <Route path="/dich-vu/kinh-dich" element={<KinhDich />} />
              <Route
                path="/dich-vu/kham-pha-ban-than"
                element={<KhamPhaBanThan />}
              />
              <Route path="/dich-vu/dat-lich" element={<DatLich />} />
              <Route path="/dich-vu/faq" element={<FAQDichVu />} />
              <Route path="/dich-vu/tu-vi" element={<TuVi />} />
              <Route path="/dich-vu/than-so-hoc" element={<ThanSoHoc />} />
              <Route path="/dich-vu/goi-dich-vu" element={<GoiDichVu />} />
              <Route path="/dich-vu/:slug" element={<ServiceDynamicPage />} />
              <Route
                path="/tai-khoan/ho-so-nguoi-than"
                element={<ServiceDynamicPage />}
              />

              <Route
                path="/admin/*"
                element={
                  <AdminLayout>
                    <Routes>
                      <Route path="/" element={<DashboardHome />} />
                      <Route path="/users" element={<UserManager />} />
                      <Route path="/orders" element={<OrderManager />} />
                    </Routes>
                  </AdminLayout>
                }
              />
            </Routes>
          </Suspense>
        </main>
        {!isAdminPage && <Footer />}
      </div>
    </AlertProvider>
  );
}
