import React, { useMemo, useState } from "react";
import ProductCard from "../product-card/product-card";
import {
  CATALOG,
  CATEGORY_LABEL,
  COMMERCIAL_CATEGORIES,
  getAllProducts,
} from "../../data/san-pham/shop-catalog";
import "./danh-muc-san-pham.css";

const money = (v) => (v && v > 0 ? v.toLocaleString("vi-VN") + "đ" : "Liên hệ");

export default function DanhMucSanPham() {
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("featured"); // featured | price-asc | price-desc | name-asc

  // nguồn dữ liệu theo tab
  const source = useMemo(() => {
    if (cat === "all") return getAllProducts(); // chỉ 1 chỗ tính "Tất cả"
    const found = CATALOG.find((c) => c.cat === cat);
    return found ? found.items : [];
  }, [cat]);

  // filter + search + sort
  const filtered = useMemo(() => {
    let arr = [...source];

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
        break; // featured: giữ nguyên thứ tự trong data
    }
    return arr;
  }, [source, q, sort]);

  return (
    <section className="section danh-muc-san-pham">
      <div className="container">
        {/* TOOLBAR */}
        <div className="row g-3 align-items-center mb-3">
          <div className="col-12 col-xl-7">
            <div className="cat-pills d-flex flex-wrap gap-2">
              <button
                className={`pill ${cat === "all" ? "active" : ""}`}
                onClick={() => setCat("all")}
              >
                Tất cả
              </button>
              {COMMERCIAL_CATEGORIES.map((c) => (
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
            <input
              className="form-control form-control-sm khctl-input"
              placeholder="Tìm kiếm sản phẩm…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>

          <div className="col-12 col-md-7 col-xl-2">
            <select
              className="form-select form-select-sm khctl-input"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="featured">Nổi bật</option>
              <option value="price-asc">Giá ↑</option>
              <option value="price-desc">Giá ↓</option>
              <option value="name-asc">Tên A→Z</option>
            </select>
          </div>
        </div>

        {/* GRID */}
        {filtered.length === 0 ? (
          <p className="text-center opacity-75">
            Không tìm thấy sản phẩm phù hợp.
          </p>
        ) : (
          <div className="row g-4">
            {filtered.map((p) => (
              <div className="col-6 col-md-4 col-xl-3" key={p.id}>
                <ProductCard
                  product={p}
                  categoryLabel={CATEGORY_LABEL[p.cat] || ""}
                  money={money}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
