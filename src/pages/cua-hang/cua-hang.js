import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./cua-hang.css";

/**
 * File: src/pages/cua-hang/cua-hang.js
 * Ảnh mẫu (đặt trong public/):
 * - /media/shop/hero-shop.webp
 * - /media/shop/product-1.webp ... /media/shop/product-12.webp
 *
 * Danh mục chính thức (đã lưu cho dự án):
 * 1) Bài Tâm Linh
 * 2) Phụ Kiện Tâm Linh
 * 3) Hương – Trầm – Trà đạo
 * 4) Bộ Sưu Tập & Cao Cấp
 * 5) Set Quà Tặng
 * 6) Chế Tác Riêng  (Made for You ✴️)
 */

const CATEGORIES = [
  "bai-tam-linh",
  "phu-kien-tam-linh",
  "huong-tram-tra-dao",
  "bo-suu-tap-cao-cap",
  "set-qua-tang",
  "che-tac-rieng",
];

const CATEGORY_LABEL = {
  "bai-tam-linh": "Bài Tâm Linh",
  "phu-kien-tam-linh": "Phụ Kiện Tâm Linh",
  "huong-tram-tra-dao": "Hương – Trầm – Trà đạo",
  "bo-suu-tap-cao-cap": "Bộ Sưu Tập & Cao Cấp",
  "set-qua-tang": "Set Quà Tặng",
  "che-tac-rieng": "Chế Tác Riêng",
};

// Mock data tối giản để hiển thị lưới sản phẩm
const ALL_PRODUCTS = [
  {
    id: "p1",
    name: "Tarot of the Soul",
    price: 590000,
    cat: "bai-tam-linh",
    img: "/media/shop/product-1.webp",
  },
  {
    id: "p2",
    name: "Tarot Trà Đạo Kit",
    price: 420000,
    cat: "bai-tam-linh",
    img: "/media/shop/product-2.webp",
  },
  {
    id: "p3",
    name: "Vòng đá Mệnh Kim",
    price: 350000,
    cat: "phu-kien-tam-linh",
    img: "/media/shop/product-3.webp",
  },
  {
    id: "p4",
    name: "Dây chuyền Phù Ấn",
    price: 690000,
    cat: "phu-kien-tam-linh",
    img: "/media/shop/product-4.webp",
  },
  {
    id: "p5",
    name: "Combo Hương – Trầm – Nến",
    price: 299000,
    cat: "huong-tram-tra-dao",
    img: "/media/shop/product-5.webp",
  },
  {
    id: "p6",
    name: "Hộp trà thiền",
    price: 189000,
    cat: "huong-tram-tra-dao",
    img: "/media/shop/product-6.webp",
  },
  {
    id: "p7",
    name: "Limited Set – Linh vật",
    price: 1590000,
    cat: "bo-suu-tap-cao-cap",
    img: "/media/shop/product-7.webp",
  },
  {
    id: "p8",
    name: "Ấn phẩm nghệ thuật",
    price: 1190000,
    cat: "bo-suu-tap-cao-cap",
    img: "/media/shop/product-8.webp",
  },
  {
    id: "p9",
    name: "Set quà Thiền & Tịnh",
    price: 499000,
    cat: "set-qua-tang",
    img: "/media/shop/product-9.webp",
  },
  {
    id: "p10",
    name: "Set quà Sinh nhật",
    price: 449000,
    cat: "set-qua-tang",
    img: "/media/shop/product-10.webp",
  },
  {
    id: "p11",
    name: "Chế tác vòng cá nhân hóa",
    price: 0, // Hiển thị "Liên hệ"
    cat: "che-tac-rieng",
    img: "/media/shop/product-11.webp",
    madeForYou: true,
  },
  {
    id: "p12",
    name: "Bùa chú theo mệnh",
    price: 0,
    cat: "che-tac-rieng",
    img: "/media/shop/product-12.webp",
    madeForYou: true,
  },
];

function money(vnd) {
  if (!vnd || vnd <= 0) return "Liên hệ";
  return vnd.toLocaleString("vi-VN") + "đ";
}

function CuaHang() {
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("featured"); // featured | price-asc | price-desc | name-asc

  const filtered = useMemo(() => {
    let arr = [...ALL_PRODUCTS];

    if (cat !== "all") arr = arr.filter((p) => p.cat === cat);

    if (q.trim()) {
      const t = q.trim().toLowerCase();
      arr = arr.filter((p) => p.name.toLowerCase().includes(t));
    }

    switch (sort) {
      case "price-asc":
        arr.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "price-desc":
        arr.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "name-asc":
        arr.sort((a, b) => a.name.localeCompare(b.name, "vi"));
        break;
      default:
        // featured: ưu tiên Chế tác riêng & Bộ sưu tập, sau đó giữ nguyên
        arr.sort((a, b) => {
          const rank = (p) =>
            p.cat === "che-tac-rieng"
              ? 0
              : p.cat === "bo-suu-tap-cao-cap"
              ? 1
              : 2;
          return rank(a) - rank(b);
        });
    }

    return arr;
  }, [cat, q, sort]);

  return (
    <main id="cua-hang" className="khctl-page">
      {/* HERO */}
      <section className="shop-hero">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-7">
              <h1 className="shop-title">Cửa hàng Năng lượng</h1>
              <p className="shop-sub">
                Bài Tâm linh · Phụ kiện · Hương – Trầm – Trà đạo · Bộ sưu tập &
                Cao cấp · Set quà tặng · Chế tác riêng.
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
                src={process.env.PUBLIC_URL + "/media/shop/hero-shop.webp"}
                alt="Cửa hàng Năng lượng"
                className="img-fluid rounded-4 shadow-soft shop-hero-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* TOOLBAR */}
      <section id="catalog" className="section shop-toolbar">
        <div className="container">
          <div className="row g-3 align-items-center">
            <div className="col-12 col-xl-7">
              <div className="cat-pills d-flex flex-wrap gap-2">
                <button
                  className={`pill ${cat === "all" ? "active" : ""}`}
                  onClick={() => setCat("all")}
                >
                  Tất cả
                </button>
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    className={`pill ${cat === c ? "active" : ""}`}
                    onClick={() => setCat(c)}
                  >
                    {CATEGORY_LABEL[c]}
                  </button>
                ))}
              </div>
            </div>

            <div className="col-12 col-md-5 col-xl-3">
              <div className="input-wrap">
                <input
                  className="form-control form-control-sm khctl-input"
                  placeholder="Tìm kiếm sản phẩm…"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                />
              </div>
            </div>

            <div className="col-12 col-md-7 col-xl-2">
              <select
                className="form-select form-select-sm khctl-input"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                aria-label="Sắp xếp"
              >
                <option value="featured">Nổi bật</option>
                <option value="price-asc">Giá ↑</option>
                <option value="price-desc">Giá ↓</option>
                <option value="name-asc">Tên A→Z</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* GRID SẢN PHẨM */}
      <section className="section shop-grid">
        <div className="container">
          {filtered.length === 0 ? (
            <p className="text-center opacity-75">
              Không tìm thấy sản phẩm phù hợp.
            </p>
          ) : (
            <div className="row g-4">
              {filtered.map((p) => (
                <div className="col-6 col-md-4 col-xl-3" key={p.id}>
                  <article className="card-3d product-card h-100">
                    <div className="product-media">
                      <img
                        src={process.env.PUBLIC_URL + p.img}
                        alt={p.name}
                        className="product-img"
                        loading="lazy"
                      />
                      {p.madeForYou && (
                        <span className="badge-made">Made for You ✴️</span>
                      )}
                    </div>
                    <div className="card-body">
                      <h3 className="product-name">{p.name}</h3>
                      <div className="d-flex align-items-center justify-content-between">
                        <span className="product-price">{money(p.price)}</span>
                        <span className="product-cat">
                          {CATEGORY_LABEL[p.cat]}
                        </span>
                      </div>

                      <div className="d-grid gap-2 mt-3">
                        <Link to="/tai-khoan" className="btn btn-sm btn-gold">
                          Thêm vào giỏ
                        </Link>
                        <Link
                          to="/cua-hang"
                          className="btn btn-sm btn-outline-gold"
                        >
                          Xem chi tiết
                        </Link>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-4">
            <Link to="/tai-khoan" className="btn btn-outline-gold">
              Đi tới giỏ hàng / Thanh toán
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default CuaHang;
