"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useDeferredValue,
} from "react";
import api from "../../services/api";
import ProductCard from "../product-card/product-card";
import { SHOP_PRODUCTS, CATEGORY_LABEL, COMMERCIAL_CATEGORIES } from "../../data/shopData";
import "./danh-muc-san-pham.css";

const money = (v) =>
  v && v > 0
    ? Math.floor(v / 1000).toLocaleString("vi-VN", {
        maximumFractionDigits: 0,
      }) + " 🔮"
    : "Liên hệ";

/** Tạo danh sách hiển thị số trang kiểu Google: 1 … p-1 p p+1 … last */
function buildPageList(current, total, delta = 1) {
  if (total <= 1) return [1];
  const pages = new Set([1, total]);

  for (let i = current - delta; i <= current + delta; i++) {
    if (i >= 1 && i <= total) pages.add(i);
  }

  const sorted = Array.from(pages).sort((a, b) => a - b);
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

export default function DanhMucSanPham({ initialCategory }) {
  // Khởi tạo mặc định bằng 24 sản phẩm cao cấp có sẵn
  const [allProducts, setAllProducts] = useState(SHOP_PRODUCTS);
  const [loading, setLoading] = useState(false);
  const [cat, setCat] = useState(initialCategory || "all");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("featured"); // featured | price-asc | price-desc | name-asc
  const [page, setPage] = useState(1); // 1-based
  const PER_PAGE = 8;

  useEffect(() => {
    api
      .get("/api/products")
      .then((res) => {
        const data = res.data?.data || res.data;
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((p) => ({
            id: p.id || p.db_id,
            name: p.name,
            price: p.price,
            category: p.category?.slug || p.category || "bai-tam-linh",
            img: p.image || p.image_url || "/images/products/product-1.png",
            description: p.description,
            rating: p.rating || 5,
            views: p.views || 100,
          }));
          setAllProducts(mapped);
        }
      })
      .catch((err) => {
        console.warn("Using offline shop data fallback:", err);
      });
  }, []);

  useEffect(() => {
    if (initialCategory) {
      setCat(initialCategory);
      setPage(1);
    } else {
      setCat("all");
    }
  }, [initialCategory]);

  // 2) Nguồn theo tab
  const source = useMemo(() => {
    if (cat === "all") return allProducts;
    return allProducts.filter((p) => {
      const pSlug = p.category?.slug || p.category || "";
      return pSlug === cat;
    });
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
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
  const currentPage = Math.min(page, totalPages);

  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * PER_PAGE;
    return filtered.slice(start, start + PER_PAGE);
  }, [filtered, currentPage, PER_PAGE]);

  const pageList = useMemo(
    () => buildPageList(currentPage, totalPages, 1),
    [currentPage, totalPages]
  );

  const goToPage = useCallback(
    (p) => {
      if (p < 1 || p > totalPages || p === currentPage) return;
      setPage(p);
    },
    [totalPages, currentPage]
  );

  return (
    <section className="section shop-catalog container py-4" id="catalog-section">
      <div className="section-head mb-4 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
        <div>
          <h2 className="section-title text-gold mb-1">
            {cat === "all" ? "Tất cả sản phẩm" : CATEGORY_LABEL[cat] || "Danh mục sản phẩm"}
          </h2>
          <span className="badge bg-purple-900 text-gold border-gold">
            {total} sản phẩm sẵn có
          </span>
        </div>

        {/* Controls: Search + Sort */}
        <div className="d-flex gap-2 flex-wrap align-items-center">
          <input
            type="search"
            className="form-control bg-dark text-light border-gold border-opacity-40"
            style={{ width: "240px" }}
            placeholder="Tìm kiếm sản phẩm..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <select
            className="form-select bg-dark text-light border-gold border-opacity-40"
            style={{ width: "160px" }}
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="featured">✨ Nổi bật</option>
            <option value="price-asc">💵 Giá tăng dần</option>
            <option value="price-desc">💎 Giá giảm dần</option>
            <option value="name-asc">🔤 Tên A-Z</option>
          </select>
        </div>
      </div>

      {/* Tabs Danh Mục */}
      <div className="d-flex gap-2 flex-wrap mb-4">
        <button
          className={`btn ${cat === "all" ? "btn-gold" : "btn-outline-gold"} btn-sm rounded-pill px-3`}
          onClick={() => setCat("all")}
        >
          Tất cả
        </button>
        {COMMERCIAL_CATEGORIES.map((cKey) => (
          <button
            key={cKey}
            className={`btn ${cat === cKey ? "btn-gold" : "btn-outline-gold"} btn-sm rounded-pill px-3`}
            onClick={() => setCat(cKey)}
          >
            {CATEGORY_LABEL[cKey] || cKey}
          </button>
        ))}
      </div>

      {/* Grid Sản Phẩm */}
      {pageItems.length > 0 ? (
        <div className="row g-4">
          {pageItems.map((prod) => (
            <div key={prod.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <ProductCard
                product={prod}
                categoryLabel={CATEGORY_LABEL[prod.category] || "Phụ kiện"}
                money={money}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5 glass-card rounded-4">
          <p className="text-white-50 fs-5 mb-0">Không tìm thấy sản phẩm phù hợp.</p>
        </div>
      )}

      {/* Phân Trang */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center align-items-center gap-2 mt-5">
          <button
            className="btn btn-outline-gold btn-sm px-3"
            disabled={currentPage <= 1}
            onClick={() => goToPage(currentPage - 1)}
          >
            &larr; Trước
          </button>
          {pageList.map((p, idx) =>
            p === "ellipsis" ? (
              <span key={`el-${idx}`} className="text-white-50 px-2">
                ...
              </span>
            ) : (
              <button
                key={p}
                className={`btn btn-sm ${p === currentPage ? "btn-gold" : "btn-outline-gold"}`}
                onClick={() => goToPage(p)}
              >
                {p}
              </button>
            )
          )}
          <button
            className="btn btn-outline-gold btn-sm px-3"
            disabled={currentPage >= totalPages}
            onClick={() => goToPage(currentPage + 1)}
          >
            Sau &rarr;
          </button>
        </div>
      )}
    </section>
  );
}
