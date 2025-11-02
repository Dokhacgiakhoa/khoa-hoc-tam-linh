import React, { useState } from "react";
import "./CuaHang.css";

const PRODUCT_CATEGORIES = [
  { id: "all", label: "Tất cả" },
  { id: "bai-tam-linh", label: "Bài Tâm Linh" },
  { id: "phu-kien", label: "Phụ kiện Tâm linh" },
  { id: "huong-tram-tra", label: "Hương – Trầm – Trà đạo" },
  { id: "bo-suu-tap", label: "Bộ sưu tập & Cao cấp" },
  { id: "set-qua-tang", label: "Set quà tặng" },
  { id: "che-tac-rieng", label: "Chế tác riêng ✴️" },
];

const INITIAL_PRODUCTS = [
  // 1️⃣ Bài Tâm Linh
  {
    id: "P001",
    name: "Tarot of the Soul",
    price: "690.000",
    category: "bai-tam-linh",
    badge: "New",
    img: "https://placehold.co/480x300/0f0a1e/FFFFFF?text=Tarot+of+the+Soul",
    desc: "Bộ bài chuẩn Rider Waite, dành cho AI Tarot & bói trực giác.",
  },
  {
    id: "P002",
    name: "Oracle Ánh Sáng",
    price: "520.000",
    category: "bai-tam-linh",
    badge: "Hot",
    img: "https://placehold.co/480x300/17112b/FFFFFF?text=Oracle+Anh+Sang",
    desc: "Bài dẫn đường, phù hợp người mới, có booklet tiếng Việt.",
  },
  {
    id: "P003",
    name: "Bộ Trà Tiên Tri (Tea Leaf)",
    price: "450.000",
    category: "bai-tam-linh",
    badge: "Tea",
    img: "https://placehold.co/480x300/130a1f/FFFFFF?text=Tea+Leaf+Reading",
    desc: "Bộ công cụ bói trà, dành cho dịch vụ Bài Trà trong hệ thống.",
  },
  // 2️⃣ Phụ kiện Tâm linh
  {
    id: "P010",
    name: "Vòng tay Mệnh Kim – Thanh Tịnh",
    price: "380.000",
    category: "phu-kien",
    badge: "Mệnh",
    img: "https://placehold.co/480x300/1f123a/FFFFFF?text=Vong+Menh+Kim",
    desc: "Chọn theo mệnh, cân bằng năng lượng, dùng khi xem Tarot.",
  },
  {
    id: "P011",
    name: "Khăn Trải Bài Galaxy",
    price: "290.000",
    category: "phu-kien",
    badge: "Best",
    img: "https://placehold.co/480x300/261a45/FFFFFF?text=Khan+Trai+Bai",
    desc: "Chất dày, viền vàng, hợp màu đen tím hệ thống.",
  },
  {
    id: "P012",
    name: "Bùa chú Cá nhân hóa",
    price: "420.000",
    category: "phu-kien",
    badge: "Custom",
    img: "https://placehold.co/480x300/312356/FFFFFF?text=Bua+Chu",
    desc: "Khởi tạo theo mệnh & ý định, giao file PDF và bản in.",
  },
  // 3️⃣ Hương – Trầm – Trà đạo
  {
    id: "P020",
    name: "Combo Trầm Thanh Tẩy",
    price: "340.000",
    category: "huong-tram-tra",
    badge: "Ritual",
    img: "https://placehold.co/480x300/170f2e/FFFFFF?text=Combo+Tram",
    desc: "Gồm trầm, khay đốt, hướng dẫn thanh tẩy không gian.",
  },
  {
    id: "P021",
    name: "Trà Thiền Tâm Linh",
    price: "210.000",
    category: "huong-tram-tra",
    badge: "Tea",
    img: "https://placehold.co/480x300/22193c/FFFFFF?text=Tra+Thien",
    desc: "Trà thảo mộc, dùng trước khi khai quẻ hoặc thiền.",
  },
  // 4️⃣ Bộ sưu tập & Cao cấp
  {
    id: "P030",
    name: "Limited Tarot – Cosmic Edition",
    price: "1.250.000",
    category: "bo-suu-tap",
    badge: "Limited",
    img: "https://placehold.co/480x300/2f245b/FFFFFF?text=Cosmic+Edition",
    desc: "Bản giới hạn, in UV, đi kèm chứng nhận & hộp cứng.",
  },
  {
    id: "P031",
    name: "Linh vật Hồ ly thạch anh tím",
    price: "960.000",
    category: "bo-suu-tap",
    badge: "Premium",
    img: "https://placehold.co/480x300/34215b/FFFFFF?text=Ho+Ly+Thach+Anh",
    desc: "Tăng cường thu hút và trực giác, trưng bày bàn thờ.",
  },
  // 5️⃣ Set quà tặng
  {
    id: "P040",
    name: "Set Quà Thiền & Thanh Lọc",
    price: "720.000",
    category: "set-qua-tang",
    badge: "Gift",
    img: "https://placehold.co/480x300/1c1237/FFFFFF?text=Set+Qua+Thien",
    desc: "Trà, trầm, nến, thiệp chúc, đóng gói cao cấp.",
  },
  {
    id: "P041",
    name: "Set Quà Sinh Nhật Tâm Linh",
    price: "650.000",
    category: "set-qua-tang",
    badge: "Gift",
    img: "https://placehold.co/480x300/201541/FFFFFF?text=Set+Sinh+Nhat",
    desc: "Bộ quà cho người thích Tarot/Huyền học.",
  },
  // 6️⃣ Chế tác riêng (hiển thị đặc biệt bên dưới)
];

function CuaHang() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = INITIAL_PRODUCTS.filter((product) => {
    const matchCategory =
      activeCategory === "all" ? true : product.category === activeCategory;
    const matchSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="cua-hang-page">
      {/* HERO */}
      <section className="shop-hero">
        <div className="shop-hero-content">
          <p className="eyebrow">🛒 Cửa Hàng • Khoa học Tâm linh</p>
          <h1>Không gian vật phẩm năng lượng & huyền học</h1>
          <p className="sub">
            Bộ bài – phụ kiện – hương trầm – quà tặng – chế tác theo mệnh. Tất
            cả được đồng bộ với hệ thống dịch vụ & Học viện Huyền học.
          </p>
          <div className="shop-hero-actions">
            <button
              type="button"
              className="primary-btn"
              onClick={() => setActiveCategory("bai-tam-linh")}
            >
              Xem bộ bài tâm linh
            </button>
            <button
              type="button"
              className="ghost-btn"
              onClick={() => {
                const el = document.getElementById("che-tac-rieng-block");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Đặt chế tác riêng ✴️
            </button>
          </div>
          <p className="note">
            Thanh toán: COD • Ví Linh Tệ • Momo – Hỗ trợ xuất hóa đơn.
          </p>
        </div>
        <div className="shop-hero-media">
          <div className="shop-hero-card">
            <p className="label">Sản phẩm nổi bật</p>
            <h3>Tarot of the Soul</h3>
            <p>690.000đ • bản chuẩn</p>
            <span className="badge-gold">Best Seller</span>
          </div>
          <div className="shop-hero-card second">
            <p className="label">Đặc biệt</p>
            <h3>Chế tác theo mệnh</h3>
            <p>Made for You ✴️</p>
          </div>
        </div>
      </section>

      {/* FILTER BAR */}
      <section className="shop-filters">
        <div className="filter-left">
          {PRODUCT_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`filter-pill ${
                activeCategory === cat.id ? "active" : ""
              }`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
        <div className="filter-right">
          <input
            type="text"
            placeholder="Tìm theo tên sản phẩm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="shop-grid">
        {filteredProducts.length === 0 ? (
          <p className="empty-state">
            Không tìm thấy sản phẩm phù hợp. Thử từ khóa khác hoặc chọn “Tất
            cả”.
          </p>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <article key={product.id} className="product-card">
                <div className="product-thumb">
                  <img src={product.img} alt={product.name} />
                  {product.badge && (
                    <span className="product-badge">{product.badge}</span>
                  )}
                </div>
                <div className="product-body">
                  <h3>{product.name}</h3>
                  <p className="desc">{product.desc}</p>
                  <p className="price">{product.price}đ</p>
                </div>
                <div className="product-footer">
                  <button className="outline-btn">Xem chi tiết</button>
                  <button className="gold-btn">Thêm giỏ hàng (0)</button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* SET QUÀ TẶNG */}
      <section className="gift-section">
        <div className="gift-content">
          <h2>🎁 Set Quà Tặng Tâm Linh</h2>
          <p>
            Phù hợp tặng khách VIP, học viên Học viện Huyền học, đối tác & nhà
            đầu tư. Có thể in logo riêng, thiệp chúc và tùy biến tông màu.
          </p>
          <ul className="gift-list">
            <li>Set thiền & thanh lọc – 720.000đ</li>
            <li>Set sinh nhật Tâm linh – 650.000đ</li>
            <li>Set doanh nghiệp – liên hệ</li>
          </ul>
          <div className="gift-actions">
            <button className="primary-btn">Xem toàn bộ set quà</button>
            <button className="ghost-btn">Liên hệ đặt số lượng</button>
          </div>
        </div>
        <div className="gift-media">
          <div className="gift-card">
            <p className="label">Set Thiền & Thanh Lọc</p>
            <p className="price">720.000đ</p>
            <p className="small">Trà, trầm, nến, note hướng dẫn</p>
          </div>
          <div className="gift-card second">
            <p className="label">Set Sinh Nhật</p>
            <p className="price">650.000đ</p>
            <p className="small">Tùy biến theo mệnh</p>
          </div>
        </div>
      </section>

      {/* CHẾ TÁC RIÊNG */}
      <section className="custom-section" id="che-tac-rieng-block">
        <div className="custom-left">
          <p className="eyebrow">Made for You ✴️</p>
          <h2>Chế tác riêng theo mệnh & năng lượng</h2>
          <p>
            Dành cho khách đặc biệt muốn sản phẩm mang dấu ấn cá nhân: vòng tay,
            bùa chú, linh vật, set thờ, quà tặng gắn brand. Điền form, bên mình
            sẽ gọi lại xác nhận trong giờ hành chính.
          </p>
          <ul className="custom-list">
            <li>Chọn cung mệnh, năm sinh</li>
            <li>Chọn vật liệu chính (đá, gỗ, kim loại)</li>
            <li>Chọn biểu tượng hoặc câu khắc</li>
            <li>Chọn hình thức giao (COD / Linh Tệ / Momo)</li>
          </ul>
        </div>
        <div className="custom-form">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Đã gửi yêu cầu chế tác. Bên mình sẽ liên hệ lại sớm nhé!");
            }}
          >
            <label>
              Họ và tên *
              <input type="text" required placeholder="Nhập họ tên của bạn" />
            </label>
            <label>
              SĐT / Zalo *
              <input type="tel" required placeholder="0799 958 589" />
            </label>
            <label>
              Năm sinh / Mệnh
              <input type="text" placeholder="1995 – Sơn Đầu Hỏa" />
            </label>
            <label>
              Sản phẩm muốn chế tác *
              <select required>
                <option value="">-- Chọn --</option>
                <option value="vong-tay">Vòng tay theo mệnh</option>
                <option value="linh-vat">Linh vật trấn trạch</option>
                <option value="bua-chu">Bùa chú cá nhân hóa</option>
                <option value="combo">Combo quà tặng riêng</option>
              </select>
            </label>
            <label>
              Ghi chú thêm
              <textarea
                rows="3"
                placeholder="VD: khắc biểu tượng hồ ly, tông tím, giao tại Hà Nội..."
              ></textarea>
            </label>
            <button type="submit" className="primary-btn w-full">
              Gửi yêu cầu chế tác
            </button>
          </form>
        </div>
      </section>

      {/* INFO / FAQ NGẮN */}
      <section className="shop-info">
        <div className="info-card">
          <h3>Thanh toán</h3>
          <p>
            COD toàn quốc • Ví Linh Tệ (1.000đ = 1 LT) • Momo • Chuyển khoản.
          </p>
        </div>
        <div className="info-card">
          <h3>Vận chuyển</h3>
          <p>Hà Nội giao nhanh trong ngày. Tỉnh khác từ 2 – 4 ngày làm việc.</p>
        </div>
        <div className="info-card">
          <h3>Chính sách</h3>
          <p>Kiểm hàng trước khi nhận • Hỗ trợ quay video unbox.</p>
        </div>
      </section>
    </div>
  );
}

export default CuaHang;
