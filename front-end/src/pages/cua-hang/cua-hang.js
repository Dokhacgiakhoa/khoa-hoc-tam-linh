import React from "react";
import { Link } from "react-router-dom";
import DanhMucSanPham from "../../components/product-card/danh-muc-san-pham";
import "./cua-hang.css";

export default function CuaHang() {
  return (
    <main id="cua-hang" className="khctl-page">
      {/* HERO */}
      <section className="shop-hero">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-7">
              <h1 className="shop-title">Cửa hàng Năng lượng</h1>
              <p className="shop-sub">
                Bài Tâm linh · Phụ kiện · Hương & Trầm · Trà Đạo · Bộ sưu tập &
                Cao cấp · Set quà tặng
              </p>
              <div className="d-flex gap-3 flex-wrap mt-2">
                <a href="#catalog" className="btn btn-gold">
                  Xem sản phẩm
                </a>
                <Link to="/tai-khoan" className="btn btn-outline-gold">
                  Xem giỏ hàng
                </Link>
              </div>
            </div>
            <div className="col-lg-5">
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/images/banners/tam-linh-hoi-quan.png"
                }
                alt="Cửa hàng Năng lượng"
                className="img-fluid rounded-4 shadow-soft shop-hero-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="section">
        <DanhMucSanPham />
        <div className="text-center mt-4">
          <Link to="/tai-khoan" className="btn btn-outline-gold">
            Đi tới giỏ hàng / Thanh toán
          </Link>
        </div>
      </section>
    </main>
  );
}
