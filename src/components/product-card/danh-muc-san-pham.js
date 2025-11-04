import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useDeferredValue,
} from "react";
import ProductCard from "../product-card/product-card";
import {
  CATALOG,
  CATEGORY_LABEL,
  COMMERCIAL_CATEGORIES,
  getAllProducts,
} from "../../data/san-pham/shop-catalog";
import "./danh-muc-san-pham.css";

const money = (v) => (v && v > 0 ? v.toLocaleString("vi-VN") + "đ" : "Liên hệ");

/** Tạo danh sách hiển thị số trang kiểu Google: 1 … p-1 p p+1 … last */
function buildPageList(current, total, delta = 1) {
  if (total <= 1) return [1];
  const pages = new Set([1, total]);

  // trang hiện tại và lân cận
  for (let i = current - delta; i <= current + delta; i++) {
    if (i >= 1 && i <= total) pages.add(i);
  }

  // chuyển sang mảng và sắp xếp
  const sorted = Array.from(pages).sort((a, b) => a - b);

  // chèn '…'
  const out = [];
  for (let i = 0; i < sorted.length; i++) {
    out.push(sorted[i]);
    if (i < sorted.length - 1) {
      const gap = sorted[i + 1] - sorted[i];
      if (gap === 2) out.push(sorted[i] + 1);
      else if (gap > 2) out.push("ellipsis");
    }
  }
  return out;
}

export default function DanhMucSanPham() {
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("featured"); // featured | price-asc | price-desc | name-asc
  const [page, setPage] = useState(1); // 1-based
  const PER_PAGE = 8;

  // 1) Tính "Tất cả" 1 lần theo CATALOG
  const allProducts = useMemo(() => getAllProducts(), [CATALOG]);

  // 2) Nguồn theo tab
  const source = useMemo(() => {
    if (cat === "all") return allProducts;
    const found = CATALOG.find((c) => c.cat === cat);
    return found ? found.items : [];
  }, [cat, allProducts]);

  // 3) Deferred search để gõ mượt
  const qDeferred = useDeferredValue(q);

  // 4) Filter + search + sort
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
        // featured: giữ nguyên thứ tự data
        break;
    }
    return arr;
  }, [source, qDeferred, sort]);

  // 5) Reset về trang 1 khi filter/search/sort thay đổi
  useEffect(() => {
    setPage(1);
  }, [cat, qDeferred, sort]);

  // 6) Phân trang
  const pageCount = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(page, pageCount);
  const offset = (currentPage - 1) * PER_PAGE;
  const currentData = filtered.slice(offset, offset + PER_PAGE);

  const pageList = useMemo(
    () => buildPageList(currentPage, pageCount, 1),
    [currentPage, pageCount]
  );

  // 7) Handlers
  const handleCat = useCallback((c) => setCat(c), []);
  const handleSort = useCallback((e) => setSort(e.target.value), []);
  const handleSearch = useCallback((e) => setQ(e.target.value), []);
  const gotoPage = useCallback((p) => setPage(p), []);

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
        {currentData.length === 0 ? (
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
          <>
            <div className="row g-4 align-items-start">
              {currentData.map((p) => (
                <div className="col-6 col-md-4 col-xl-3" key={p.id}>
                  <ProductCard
                    product={p}
                    categoryLabel={CATEGORY_LABEL[p.cat] || ""}
                    money={money}
                  />
                </div>
              ))}
            </div>

            {/* PAGINATION */}
            {pageCount > 1 && (
              <nav
                className="pagination-g mt-4"
                role="navigation"
                aria-label="Phân trang sản phẩm"
              >
                <button
                  className="page-btn prev"
                  onClick={() => gotoPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  aria-label="Trang trước"
                >
                  ‹
                </button>

                {pageList.map((item, idx) =>
                  item === "ellipsis" ? (
                    <span
                      className="page-ellipsis"
                      key={`e-${idx}`}
                      aria-hidden="true"
                    >
                      …
                    </span>
                  ) : (
                    <button
                      key={item}
                      className={`page-btn ${
                        item === currentPage ? "active" : ""
                      }`}
                      onClick={() => gotoPage(item)}
                      aria-current={item === currentPage ? "page" : undefined}
                      aria-label={`Trang ${item}`}
                    >
                      {item}
                    </button>
                  )
                )}

                <button
                  className="page-btn next"
                  onClick={() => gotoPage(Math.min(pageCount, currentPage + 1))}
                  disabled={currentPage === pageCount}
                  aria-label="Trang sau"
                >
                  ›
                </button>
              </nav>
            )}
          </>
        )}
      </div>
    </section>
  );
}
