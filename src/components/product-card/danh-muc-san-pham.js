// src/components/danh-muc-san-pham/danh-muc-san-pham.js
import React, { useCallback, useMemo, useState, useDeferredValue } from "react";
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

  // 1) Chuẩn hoá "Tất cả" chỉ tính 1 lần theo CATALOG
  const allProducts = useMemo(() => getAllProducts(), [CATALOG]);

  // 2) Nguồn theo tab
  const source = useMemo(() => {
    if (cat === "all") return allProducts;
    const found = CATALOG.find((c) => c.cat === cat);
    return found ? found.items : [];
  }, [cat, allProducts]);

  // 3) Deferred search để gõ mượt
  const qDeferred = useDeferredValue(q);

  // 4) Filter + search + sort (memo hoá)
  const filtered = useMemo(() => {
    let arr = [...source];

    if (qDeferred.trim()) {
      const t = qDeferred.trim().toLowerCase();
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
        // featured: giữ nguyên thứ tự trong data
        break;
    }
    return arr;
  }, [source, qDeferred, sort]);

  // 5) Handlers ổn định (có lợi nếu tách Toolbar)
  const handleCat = useCallback((c) => setCat(c), []);
  const handleSort = useCallback((e) => setSort(e.target.value), []);
  const handleSearch = useCallback((e) => setQ(e.target.value), []);

  // 6) Label danh mục hiện tại
  const currentCatLabel =
    cat === "all" ? "Tất cả sản phẩm" : CATEGORY_LABEL[cat] || "Danh mục";

  return (
    <section className="section danh-muc-san-pham">
      <div className="container">
        {/* HEADER + COUNTER */}
        <div className="d-flex align-items-baseline justify-content-between mb-2">
          <h2 className="section-title m-0">{currentCatLabel}</h2>
          <div className="opacity-75 small">
            {filtered.length.toLocaleString("vi-VN")} kết quả
          </div>
        </div>

        {/* TOOLBAR */}
        <div className="row g-3 align-items-center mb-3">
          <div className="col-12 col-xl-7">
            <div
              className="cat-pills d-flex flex-wrap gap-2"
              role="tablist"
              aria-label="Danh mục sản phẩm"
            >
              <button
                type="button"
                role="tab"
                aria-selected={cat === "all"}
                className={`pill ${cat === "all" ? "active" : ""}`}
                onClick={() => handleCat("all")}
                onKeyDown={(e) =>
                  (e.key === "Enter" || e.key === " ") && handleCat("all")
                }
              >
                Tất cả
              </button>

              {COMMERCIAL_CATEGORIES.map((c) => (
                <button
                  type="button"
                  role="tab"
                  aria-selected={cat === c}
                  key={c}
                  className={`pill ${cat === c ? "active" : ""}`}
                  onClick={() => handleCat(c)}
                  onKeyDown={(e) =>
                    (e.key === "Enter" || e.key === " ") && handleCat(c)
                  }
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
              onChange={handleSearch}
              aria-label="Tìm kiếm sản phẩm"
            />
          </div>

          <div className="col-12 col-md-7 col-xl-2">
            <select
              className="form-select form-select-sm khctl-input"
              value={sort}
              onChange={handleSort}
              aria-label="Sắp xếp sản phẩm"
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
          <div className="empty-state text-center opacity-75 py-4">
            <p className="mb-2">Không tìm thấy sản phẩm phù hợp.</p>
            {(q || cat !== "all") && (
              <button
                className="btn btn-outline-gold"
                onClick={() => {
                  setQ("");
                  setCat("all");
                  setSort("featured");
                }}
              >
                Xoá lọc & trở về tất cả
              </button>
            )}
          </div>
        ) : (
          <div className="row g-4 align-items-start">
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
