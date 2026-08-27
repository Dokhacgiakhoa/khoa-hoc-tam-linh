"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import DanhMucSanPham from "../../components/product-card/danh-muc-san-pham";
import "./cua-hang.css";

export default function CuaHang() {
  const params = useParams();
  const category = params?.category;

  return (
    <main id="cua-hang" className="khctl-page">
      {/* HERO */}
      <section className="shop-hero">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-7">
              <h1 className="shop-title text-gold">Cửa hàng Năng lượng</h1>
              <p className="shop-sub text-light opacity-90">
                Bài Tâm linh · Phụ kiện · Hương & Trầm · Trà Đạo · Bộ sưu tập &
                Cao cấp · Set quà tặng
              </p>
              <div className="d-flex gap-3 flex-wrap mt-3">
                <a href="#catalog" className="btn btn-gold px-4 shadow">
                  Xem sản phẩm
                </a>
                <Link href="/gio-hang" className="btn btn-outline-gold px-4">
                  Xem giỏ hàng
                </Link>
              </div>
            </div>
            <div className="col-lg-5">
              <img
                src="/images/banners/banner-cua-hang.png"
                alt="Cửa hàng Năng lượng"
                className="img-fluid rounded-4 shadow-soft shop-hero-img border-gold"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <div id="catalog">
        <DanhMucSanPham initialCategory={category} />
        <div className="text-center pb-5">
          <Link href="/gio-hang" className="btn btn-gold btn-lg px-5 shadow">
            Đi tới giỏ hàng & Thanh toán
          </Link>
        </div>
      </div>
    </main>
  );
}
