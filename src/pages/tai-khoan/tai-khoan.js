import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./tai-khoan.css";

/**
 * File: src/pages/tai-khoan/tai-khoan.js
 * Ghi chú:
 * - Đây là skeleton UI chạy ngay với React + Bootstrap, chưa nối API.
 * - Biến mock ở dưới có thể thay bằng Redux/Context sau.
 */

function TaiKhoan() {
  // ===== Mock state (sẽ thay bằng dữ liệu thật sau) =====
  const [user] = useState({
    name: "Đỗ Khắc Gia Khoa",
    email: "contact@dokhacgiakhoa.vn",
    level: "Tân học",
  });
  const [wallet, setWallet] = useState({
    tokens: 1200, // 1 token = 1.000 VND (quy đổi sau)
    vndPerToken: 1000,
    hold: 0,
  });
  const [badges, setBadges] = useState({
    inbox: 2,
    cart: 0,
    tasks: 3,
  });
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  const [activeTab, setActiveTab] = useState("profile"); // profile | finance | interactions | security

  const totalBadge = useMemo(
    () => (badges?.inbox || 0) + (badges?.cart || 0) + (badges?.tasks || 0),
    [badges]
  );

  const vndBalance = useMemo(
    () => wallet.tokens * wallet.vndPerToken,
    [wallet.tokens, wallet.vndPerToken]
  );

  // ===== Dummy handlers =====
  const handleTopUp = (amount) => {
    setWallet((w) => ({ ...w, tokens: w.tokens + amount }));
  };
  const handleUseToken = (amount) => {
    setWallet((w) => ({ ...w, tokens: Math.max(0, w.tokens - amount) }));
    setBadges((b) => ({ ...b, cart: Math.max(0, b.cart - 1) }));
  };

  return (
    <main id="tai-khoan" className="khctl-page">
      {/* BANNER 2FA */}
      {!is2FAEnabled && (
        <div className="banner-2fa">
          <div className="container d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
            <div className="d-flex align-items-center gap-3">
              <span className="banner-2fa-icon">🛡️</span>
              <div>
                <strong>Chưa bật xác thực hai lớp (2FA).</strong>
                <div className="small text-muted">
                  Bảo vệ tài khoản, ví Linh Tệ và lịch sử học tập của bạn.
                </div>
              </div>
            </div>
            <div className="d-flex gap-2">
              <Link to="/bao-mat-2fa" className="btn btn-sm btn-gold">
                Bật 2FA ngay
              </Link>
              <button
                className="btn btn-sm btn-outline-gold"
                onClick={() => setIs2FAEnabled(true)}
                title="Demo bật 2FA (mock)"
              >
                Giả lập đã bật
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <section className="account-hero">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-8">
              <h1 className="account-title">Tài khoản</h1>
              <p className="account-sub m-0">
                Xin chào, <strong>{user.name}</strong> — cấp độ hiện tại:
                <span className="ms-1 badge-level">{user.level}</span>
              </p>
              <p className="account-sub small mt-1">
                Badge tổng: <strong>{totalBadge}</strong> (Hộp thư:{" "}
                {badges.inbox} · Giỏ hàng: {badges.cart} · Nhiệm vụ:{" "}
                {badges.tasks})
              </p>
            </div>
            <div className="col-lg-4">
              <div className="account-summary card-3d">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <span className="summary-label">Ví Linh Tệ</span>
                    <span className="summary-value">{wallet.tokens} token</span>
                  </div>
                  <div className="d-flex justify-content-between mt-1">
                    <span className="summary-label">Quy đổi ước tính</span>
                    <span className="summary-value">
                      {vndBalance.toLocaleString("vi-VN")}đ
                    </span>
                  </div>
                  <div className="d-grid gap-2 mt-3">
                    <button
                      className="btn btn-sm btn-gold"
                      onClick={() => handleTopUp(100)}
                    >
                      Nạp nhanh +100
                    </button>
                    <button
                      className="btn btn-sm btn-outline-gold"
                      onClick={() => handleUseToken(50)}
                    >
                      Dùng 50 token (demo)
                    </button>
                  </div>
                  <div className="small text-muted mt-2">
                    * Quy đổi thực tế sẽ theo cổng thanh toán (MoMo/COD/Linh
                    Tệ).
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* NAV TABS */}
          <div className="account-tabs mt-4">
            <div className="tabs-wrap">
              <button
                className={`tab-pill ${
                  activeTab === "profile" ? "active" : ""
                }`}
                onClick={() => setActiveTab("profile")}
              >
                Hồ sơ & Cấp độ
              </button>
              <button
                className={`tab-pill ${
                  activeTab === "finance" ? "active" : ""
                }`}
                onClick={() => setActiveTab("finance")}
              >
                Tài chính
              </button>
              <button
                className={`tab-pill ${
                  activeTab === "interactions" ? "active" : ""
                }`}
                onClick={() => setActiveTab("interactions")}
              >
                Tương tác
                <span className="tab-badge">{totalBadge}</span>
              </button>
              <button
                className={`tab-pill ${
                  activeTab === "security" ? "active" : ""
                }`}
                onClick={() => setActiveTab("security")}
              >
                Bảo mật & Truy cập
                {!is2FAEnabled && <span className="tab-badge warn">!</span>}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="account-content">
        <div className="container">
          {activeTab === "profile" && (
            <div className="row g-4">
              {/* Hồ sơ */}
              <div className="col-12 col-xl-6">
                <div className="card-3d h-100">
                  <div className="card-body">
                    <h3 className="sec-title">Hồ sơ cá nhân</h3>
                    <div className="profile-grid">
                      <div className="label">Họ tên</div>
                      <div className="value">{user.name}</div>

                      <div className="label">Email</div>
                      <div className="value">{user.email}</div>

                      <div className="label">Ngôn ngữ</div>
                      <div className="value">Tiếng Việt</div>

                      <div className="label">Khu vực</div>
                      <div className="value">Hà Nội, Việt Nam</div>
                    </div>
                    <div className="d-flex gap-2 mt-3">
                      <button className="btn btn-gold btn-sm" disabled>
                        Cập nhật hồ sơ
                      </button>
                      <button className="btn btn-outline-gold btn-sm" disabled>
                        Kết nối mạng xã hội
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cấp độ học viên */}
              <div className="col-12 col-xl-6">
                <div className="card-3d h-100">
                  <div className="card-body">
                    <h3 className="sec-title">Cấp độ học viên</h3>
                    <p className="opacity-90">
                      Lộ trình: <strong>Tân học</strong> → Thực hành → Hành giả
                      → Hướng đạo → Bậc Thầy.
                    </p>

                    <div className="progress mb-2">
                      <div
                        className="progress-bar progress-bar-gold"
                        style={{ width: "15%" }}
                        role="progressbar"
                        aria-valuenow={15}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                    <div className="d-flex justify-content-between small">
                      <span>Tiến độ khóa hiện tại</span>
                      <span>15%</span>
                    </div>

                    <div className="d-grid gap-2 mt-3">
                      <Link
                        to="/hoc-vien-huyen-hoc"
                        className="btn btn-sm btn-gold"
                      >
                        Xem chương trình học
                      </Link>
                      <button className="btn btn-sm btn-outline-gold" disabled>
                        Nộp bài / Bài kiểm tra (sắp có)
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "finance" && (
            <div className="row g-4">
              {/* Ví Linh Tệ */}
              <div className="col-12 col-xl-7">
                <div className="card-3d h-100">
                  <div className="card-body">
                    <h3 className="sec-title">Ví Linh Tệ</h3>
                    <div className="wallet-stats">
                      <div className="wallet-stat">
                        <div className="stat-label">Số dư</div>
                        <div className="stat-value">{wallet.tokens} token</div>
                      </div>
                      <div className="wallet-stat">
                        <div className="stat-label">Ước tính (VND)</div>
                        <div className="stat-value">
                          {vndBalance.toLocaleString("vi-VN")}đ
                        </div>
                      </div>
                      <div className="wallet-stat">
                        <div className="stat-label">Tạm giữ</div>
                        <div className="stat-value">{wallet.hold} token</div>
                      </div>
                    </div>

                    <div className="row g-2 mt-2">
                      <div className="col-6 col-md-4">
                        <button
                          className="btn btn-gold w-100"
                          onClick={() => handleTopUp(100)}
                        >
                          Nạp +100
                        </button>
                      </div>
                      <div className="col-6 col-md-4">
                        <button
                          className="btn btn-outline-gold w-100"
                          onClick={() => handleTopUp(500)}
                        >
                          Nạp +500
                        </button>
                      </div>
                      <div className="col-12 col-md-4">
                        <button className="btn btn-outline-gold w-100" disabled>
                          Nạp qua MoMo (sắp có)
                        </button>
                      </div>
                    </div>

                    <p className="small text-muted mt-2">
                      * Tỷ lệ quy đổi và cổng thanh toán sẽ hiển thị tại bước
                      thanh toán.
                    </p>
                  </div>
                </div>
              </div>

              {/* Đơn hàng gần đây */}
              <div className="col-12 col-xl-5">
                <div className="card-3d h-100">
                  <div className="card-body">
                    <h3 className="sec-title">Đơn hàng gần đây</h3>
                    <ul className="order-list">
                      <li className="order-item">
                        <div>
                          <div className="order-name">Tarot of the Soul</div>
                          <div className="order-meta small">
                            #KH-2025-0001 · 02/11/2025
                          </div>
                        </div>
                        <div className="order-price">590.000đ</div>
                      </li>
                      <li className="order-item">
                        <div>
                          <div className="order-name">Hộp trà thiền</div>
                          <div className="order-meta small">
                            #KH-2025-0002 · 03/11/2025
                          </div>
                        </div>
                        <div className="order-price">189.000đ</div>
                      </li>
                    </ul>
                    <div className="d-flex gap-2">
                      <Link to="/cua-hang" className="btn btn-sm btn-gold">
                        Mua thêm
                      </Link>
                      <Link
                        to="/tai-khoan"
                        className="btn btn-sm btn-outline-gold"
                      >
                        Xem tất cả
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "interactions" && (
            <div className="row g-4">
              {/* Hộp thư */}
              <div className="col-12 col-xl-4">
                <div className="card-3d h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between">
                      <h3 className="sec-title">Hộp thư</h3>
                      <span className="badge-dot">{badges.inbox}</span>
                    </div>
                    <ul className="inbox-list">
                      <li className="inbox-item">
                        <div className="inbox-title">
                          Chào mừng đến Khoa học Tâm Linh
                        </div>
                        <div className="inbox-meta small">
                          02/11/2025 · Hệ thống
                        </div>
                      </li>
                      <li className="inbox-item">
                        <div className="inbox-title">
                          Nhắc bật 2FA để bảo vệ tài khoản
                        </div>
                        <div className="inbox-meta small">
                          03/11/2025 · Bảo mật
                        </div>
                      </li>
                    </ul>
                    <button className="btn btn-sm btn-outline-gold" disabled>
                      Xem tất cả (sắp có)
                    </button>
                  </div>
                </div>
              </div>

              {/* Giỏ hàng */}
              <div className="col-12 col-xl-4">
                <div className="card-3d h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between">
                      <h3 className="sec-title">Giỏ hàng</h3>
                      <span className="badge-dot">{badges.cart}</span>
                    </div>
                    {badges.cart === 0 ? (
                      <p className="opacity-75">Giỏ hàng trống.</p>
                    ) : (
                      <p>
                        Giỏ hiện có <strong>{badges.cart}</strong> món.
                      </p>
                    )}
                    <div className="d-flex gap-2">
                      <Link to="/cua-hang" className="btn btn-sm btn-gold">
                        Thêm sản phẩm
                      </Link>
                      <Link
                        to="/tai-khoan"
                        className="btn btn-sm btn-outline-gold"
                      >
                        Thanh toán
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nhiệm vụ */}
              <div className="col-12 col-xl-4">
                <div className="card-3d h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between">
                      <h3 className="sec-title">Nhiệm vụ</h3>
                      <span className="badge-dot">{badges.tasks}</span>
                    </div>
                    <ul className="task-list">
                      <li>Hoàn tất hồ sơ cá nhân</li>
                      <li>Bốc 1 lá Tarot miễn phí</li>
                      <li>Xem lộ trình Học viện</li>
                    </ul>
                    <button
                      className="btn btn-sm btn-gold"
                      onClick={() =>
                        setBadges((b) => ({
                          ...b,
                          tasks: Math.max(0, b.tasks - 1),
                        }))
                      }
                    >
                      Đánh dấu hoàn thành 1 nhiệm vụ (demo)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="row g-4">
              <div className="col-12 col-xl-7">
                <div className="card-3d h-100">
                  <div className="card-body">
                    <h3 className="sec-title">Bảo mật & Truy cập</h3>
                    <div className="security-grid">
                      <div className="label">2FA</div>
                      <div className="value">
                        {is2FAEnabled ? (
                          <span className="ok">Đã bật</span>
                        ) : (
                          <span className="warn">Chưa bật</span>
                        )}
                      </div>

                      <div className="label">Phương thức</div>
                      <div className="value">
                        Email OTP · App OTP (Google Auth/Authy)
                      </div>

                      <div className="label">Mã khôi phục</div>
                      <div className="value">
                        Hiển thị sau khi bật 2FA (sao lưu an toàn)
                      </div>
                    </div>

                    <div className="d-flex gap-2 mt-3">
                      <Link to="/bao-mat-2fa" className="btn btn-gold btn-sm">
                        Cấu hình 2FA
                      </Link>
                      <button
                        className="btn btn-outline-gold btn-sm"
                        onClick={() => setIs2FAEnabled((v) => !v)}
                        title="Demo bật/tắt 2FA"
                      >
                        {is2FAEnabled ? "Giả lập tắt 2FA" : "Giả lập bật 2FA"}
                      </button>
                    </div>

                    <p className="small text-muted mt-2">
                      * Nhấn “Cấu hình 2FA” để vào trang{" "}
                      <code>/bao-mat-2fa</code> theo flow: Chọn phương thức →
                      Quét QR/nhập mã → Xác thực 6 số → Nhận mã khôi phục.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-12 col-xl-5">
                <div className="card-3d h-100">
                  <div className="card-body">
                    <h3 className="sec-title">Phiên đăng nhập gần đây</h3>
                    <ul className="session-list">
                      <li>
                        <div>Windows · Chrome</div>
                        <div className="small text-muted">
                          Hà Nội · 04/11/2025 11:20
                        </div>
                      </li>
                      <li>
                        <div>Android · Chrome</div>
                        <div className="small text-muted">
                          Hà Nội · 03/11/2025 22:04
                        </div>
                      </li>
                    </ul>
                    <button className="btn btn-sm btn-outline-gold" disabled>
                      Đăng xuất tất cả thiết bị (sắp có)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default TaiKhoan;
