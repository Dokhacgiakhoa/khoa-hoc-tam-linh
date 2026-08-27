import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAlert } from "../../contexts/AlertContext";
import "./tai-khoan.css"; // Unified CSS

export default function Dashboard({ user, setUser, initialView, onLogout }) {
  const { showSuccess, showError, showWarning, showConfirm } = useAlert();
  const [activeView, setActiveView] = useState("menu"); // menu | profile | wallet | 2fa | inbox | orders | cart | tasks
  const [cart, setCart] = useState([]);
  const [currentUser, setCurrentUser] = useState(user);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Load cart from localStorage
  const loadCart = () => {
    const data = JSON.parse(localStorage.getItem("kh_cart") || "[]");
    setCart(data);
  };

  // Sync currentUser with localStorage
  useEffect(() => {
    const handleUserChanged = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user") || "{}");
      setCurrentUser(updatedUser);
    };

    window.addEventListener("userChanged", handleUserChanged);
    return () => window.removeEventListener("userChanged", handleUserChanged);
  }, []);

  useEffect(() => {
    loadCart();
    window.addEventListener("cartChanged", loadCart);
    return () => window.removeEventListener("cartChanged", loadCart);
  }, []);

  const fetchUnreadCount = () => {
    axios
      .get("/api/notifications/unread-count")
      .then((res) => {
        setUnreadCount(res.data.unread_count);
        // Sync with navbar
        window.dispatchEvent(
          new CustomEvent("unreadNotificationsChanged", {
            detail: res.data.unread_count,
          })
        );
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchUnreadCount();
    window.addEventListener("notificationsChanged", fetchUnreadCount);
    return () =>
      window.removeEventListener("notificationsChanged", fetchUnreadCount);
  }, []);

  // Map URL params to View IDs
  useEffect(() => {
    const map = {
      "ho-so-cap-do": "profile",
      "vi-linh-te": "wallet",
      "bao-mat-2fa": "2fa",
      "hop-thu": "inbox",
      "don-hang": "inbox", // Merged
      "nhiem-vu": "tasks",
    };

    if (initialView && map[initialView]) {
      setActiveView(map[initialView]);
    } else if (initialView === "gio-hang") {
      window.location.href = "/gio-hang";
    }
  }, [initialView]);

  // Badges
  const badges = { inbox: unreadCount, cart: cart.length, tasks: 5 };

  const menuItems = [
    {
      id: "profile",
      label: "Hồ sơ & Cấp độ",
      icon: "👤",
      desc: "Thông tin cá nhân",
    },
    { id: "wallet", label: "Ví Linh Tệ", icon: "🔮", desc: "Quản lý số dư" },
    { id: "2fa", label: "Bảo mật 2FA", icon: "🛡️", desc: "Bảo vệ tài khoản" },
    {
      id: "inbox",
      label: "Hộp thư",
      icon: "📬",
      desc: "Thông báo & Đơn hàng",
      badge: badges.inbox,
    },
    {
      id: "cart",
      label: "Giỏ hàng",
      icon: "🛒",
      desc: "Sản phẩm chờ thanh toán",
      badge: badges.cart,
      link: "/gio-hang", // Explicit link
    },
    {
      id: "tasks",
      label: "Nhiệm vụ",
      icon: "🎯",
      desc: "Huy hiệu & Thưởng",
      badge: badges.tasks,
    },
  ];

  const renderView = () => {
    if (activeView === "menu") return renderGrid();
    return (
      <div className="view-container animate-fade-in">
        <button
          className="btn btn-sm btn-link text-gold mb-3"
          onClick={() => setActiveView("menu")}
        >
          &larr; Quay lại Menu
        </button>
        {activeView === "profile" && <ProfileView />}
        {activeView === "orders" && <OrdersView />}
        {activeView === "wallet" && <WalletView />}
        {activeView === "2fa" && <TwoFactorView user={currentUser} />}
        {activeView === "inbox" && (
          <InboxView onUpdate={() => fetchUnreadCount()} />
        )}
        {activeView === "tasks" && (
          <TasksView onRewardClaimed={() => fetchUnreadCount()} />
        )}
        {["other-placeholders"].includes(activeView) && (
          <div className="text-center py-5 card-3d">
            <h3>{menuItems.find((i) => i.id === activeView)?.label}</h3>
            <p className="text-light" style={{ opacity: 0.75 }}>
              Tính năng đang phát triển...
            </p>
          </div>
        )}
      </div>
    );
  };

  const renderGrid = () => (
    <div className="dashboard-grid">
      {menuItems.map((item) => (
        <div
          key={item.id}
          className="grid-item card-3d"
          onClick={() =>
            item.link
              ? (window.location.href = item.link)
              : setActiveView(item.id)
          }
        >
          <div className="icon">{item.icon}</div>
          <div className="label">
            {item.label}
            {item.badge > 0 && <span className="badge-dot">{item.badge}</span>}
          </div>
          <div className="desc">{item.desc}</div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="dashboard-wrapper">
      <div className="account-hero mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h1 className="account-title">Xin chào, {user.name}</h1>
            <p className="account-sub opacity-75">{user.email}</p>
          </div>
          <button onClick={onLogout} className="btn btn-sm btn-outline-danger">
            Đăng xuất
          </button>
        </div>
      </div>
      {renderView()}
    </div>
  );
}

// --- SUB COMPONENTS (Will be moved to separate files usually, but kept here for speed) ---

function ProfileView() {
  // Load user from localStorage instead of using prop
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user") || "{}");
  });

  const [form, setForm] = useState({
    full_name: user.full_name || user.name || "",
    username: user.username || "",
    email: user.email || "",
    phone: user.phone || "",
    gender: user.gender || "",
    date_of_birth: user.date_of_birth || "",
    birth_time: user.birth_time || "",
    address: user.address || "",
    avatar: user.avatar || "",
  });
  const [avatarPreview, setAvatarPreview] = useState(user.avatar || "");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync with localStorage changes
  useEffect(() => {
    const handleUserChanged = () => {
      const updatedUser = JSON.parse(localStorage.getItem("user") || "{}");
      console.log(
        "☁️ Data sync triggered! Updated user from storage:",
        updatedUser
      );

      setUser(updatedUser);
      const newFormData = {
        full_name: updatedUser.full_name || updatedUser.name || "",
        username: updatedUser.username || "",
        email: updatedUser.email || "",
        phone: updatedUser.phone || "",
        gender: updatedUser.gender || "",
        date_of_birth: updatedUser.date_of_birth || "",
        birth_time: updatedUser.birth_time || "",
        address: updatedUser.address || "",
        avatar: updatedUser.avatar || "",
      };
      console.log("📝 Updating form state with:", newFormData);
      setForm(newFormData);
      setAvatarPreview(updatedUser.avatar || "");
    };

    window.addEventListener("userChanged", handleUserChanged);
    return () => window.removeEventListener("userChanged", handleUserChanged);
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("📸 Selected file:", file.name, file.size, "bytes");

      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setMsg("❌ Ảnh quá lớn! Vui lòng chọn ảnh nhỏ hơn 2MB");
        return;
      }

      // Preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        console.log("✅ Preview loaded");
      };
      reader.readAsDataURL(file);

      // Upload to server
      const formData = new FormData();
      formData.append("avatar", file);

      console.log("📤 Uploading to /api/user/avatar...");

      axios
        .post("/api/user/avatar", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log("✅ Upload response:", res.data);
          const avatarUrl = res.data.avatar_url;

          // Update both preview and form state
          setAvatarPreview(avatarUrl);
          setForm((prevForm) => ({ ...prevForm, avatar: avatarUrl }));

          setMsg("✅ Đã cập nhật ảnh đại diện!");

          // Also update localStorage immediately
          const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
          currentUser.avatar = avatarUrl;
          localStorage.setItem("user", JSON.stringify(currentUser));
          window.dispatchEvent(new Event("userChanged"));
        })
        .catch((err) => {
          console.error("❌ Upload error:", err);
          console.error("❌ Response:", err.response?.data);
          setMsg(
            "❌ Lỗi khi upload ảnh: " +
              (err.response?.data?.message || err.message)
          );
        });
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setMsg("");
    setSaveSuccess(false);

    // Check if user is authenticated
    const token = localStorage.getItem("auth_token");
    if (!token) {
      setMsg("❌ Bạn chưa đăng nhập. Vui lòng đăng nhập lại.");
      showError("Bạn chưa đăng nhập. Vui lòng đăng nhập lại.");
      setLoading(false);
      return;
    }

    console.log("🔧 Saving profile...");
    console.log("📤 Request data:", form);
    console.log("🔑 Token:", token ? "EXISTS" : "MISSING");

    try {
      const response = await axios.put("/api/user/profile", form);

      console.log("✅ Update Response:", response.data);

      setSaveSuccess(true);
      setMsg("✅ Đã lưu thay đổi!");

      // The backend returns { message, user: freshUser }
      const updatedUser = response.data.user;

      if (updatedUser) {
        console.log("🔄 Updating local storage and UI with:", updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        window.dispatchEvent(new Event("userChanged"));
      }

      // Exit edit mode after 1.5 seconds
      setTimeout(() => {
        setIsEditing(false);
        setSaveSuccess(false);
      }, 1500);
    } catch (e) {
      console.error("❌ Error:", e);
      console.error("❌ Response:", e.response?.data);
      console.error("❌ Status:", e.response?.status);
      console.error("❌ Headers:", e.response?.headers);

      let errorMsg = "❌ Lỗi khi lưu: ";
      if (e.response?.status === 401) {
        errorMsg += "Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.";
      } else if (e.response?.status === 422) {
        errorMsg +=
          "Dữ liệu không hợp lệ. " +
          JSON.stringify(e.response?.data?.errors || e.response?.data?.message);
      } else {
        errorMsg += e.response?.data?.message || e.message;
      }

      setMsg(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const genderMap = { male: "Nam", female: "Nữ", other: "Khác" };

  return (
    <div className="card-3d p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="sec-title mb-0">
          <i className="bi bi-person-circle me-2"></i>
          Hồ sơ cá nhân
        </h3>
        {!isEditing && (
          <button
            className="btn btn-outline-gold"
            onClick={() => setIsEditing(true)}
          >
            <i className="bi bi-pencil me-1"></i>
            Chỉnh sửa
          </button>
        )}
      </div>

      {/* Avatar */}
      <div className="mb-4 text-center">
        <img
          src={
            avatarPreview ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              user.name || user.email
            )}&size=120&background=FFD700&color=1b142f&bold=true`
          }
          alt="Avatar"
          className="rounded-circle mb-3"
          style={{
            width: "120px",
            height: "120px",
            objectFit: "cover",
            border: "3px solid var(--kh-gold)",
          }}
          onError={(e) => {
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
              user.name || user.email
            )}&size=120&background=FFD700&color=1b142f&bold=true`;
          }}
        />
        {isEditing && (
          <div>
            <label
              htmlFor="avatar-input"
              className="btn btn-sm btn-outline-gold"
            >
              <i className="bi bi-camera me-1"></i>
              Thay đổi ảnh
            </label>
            <input
              id="avatar-input"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              style={{ display: "none" }}
            />
          </div>
        )}
      </div>

      {!isEditing ? (
        /* VIEW MODE */
        <div className="row g-3">
          <div className="col-md-6">
            <div className="p-3 bg-dark bg-opacity-25 rounded">
              <small className="text-white-50 d-block mb-1">Họ và tên</small>
              <div className="text-light">
                {form.full_name || "Chưa cập nhật"}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="p-3 bg-dark bg-opacity-25 rounded">
              <small className="text-white-50 d-block mb-1">
                Tên đăng nhập
              </small>
              <div className="text-light">
                {form.username || "Chưa cập nhật"}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="p-3 bg-dark bg-opacity-25 rounded">
              <small className="text-white-50 d-block mb-1">Email</small>
              <div className="text-light">{form.email}</div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="p-3 bg-dark bg-opacity-25 rounded">
              <small className="text-white-50 d-block mb-1">
                Số điện thoại
              </small>
              <div className="text-light">{form.phone || "Chưa cập nhật"}</div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="p-3 bg-dark bg-opacity-25 rounded">
              <small className="text-white-50 d-block mb-1">Giới tính</small>
              <div className="text-light">
                {genderMap[form.gender] || "Chưa cập nhật"}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="p-3 bg-dark bg-opacity-25 rounded">
              <small className="text-white-50 d-block mb-1">Ngày sinh</small>
              <div className="text-light">
                {form.date_of_birth || "Chưa cập nhật"}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="p-3 bg-dark bg-opacity-25 rounded">
              <small className="text-white-50 d-block mb-1">Giờ sinh</small>
              <div className="text-light">
                {form.birth_time || "Chưa cập nhật"}
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="p-3 bg-dark bg-opacity-25 rounded">
              <small className="text-white-50 d-block mb-1">Địa chỉ</small>
              <div className="text-light">
                {form.address || "Chưa cập nhật"}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* EDIT MODE */
        <>
          {msg && (
            <div
              className={`alert ${
                msg.includes("✅") ? "alert-success" : "alert-danger"
              } mb-3`}
            >
              {msg}
            </div>
          )}

          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">
                Họ và tên <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                value={form.full_name}
                onChange={(e) =>
                  setForm({ ...form, full_name: e.target.value })
                }
                placeholder="Nguyễn Văn A"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">
                Tên đăng nhập <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                placeholder="username"
              />
              <small className="text-white-50">
                Dùng để đăng nhập và hiển thị
              </small>
            </div>

            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                className="form-control"
                value={form.email}
                readOnly
                disabled
              />
              <small className="text-white-50">Email không thể thay đổi</small>
            </div>

            <div className="col-md-6">
              <label className="form-label">
                Số điện thoại <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="0901234567"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">
                Giới tính <span className="text-danger">*</span>
              </label>
              <select
                className="form-select"
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
              >
                <option value="">-- Chọn giới tính --</option>
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
                <option value="other">Khác</option>
              </select>
              <small className="text-white-50">
                Quan trọng cho Tử Vi & Bát Tự
              </small>
            </div>

            <div className="col-md-6">
              <label className="form-label">
                Ngày sinh <span className="text-danger">*</span>
              </label>
              <input
                type="date"
                className="form-control"
                value={form.date_of_birth}
                onChange={(e) =>
                  setForm({ ...form, date_of_birth: e.target.value })
                }
              />
              <small className="text-white-50">
                Dùng cho Tử Vi, Bát Tự, Thần Số
              </small>
            </div>

            <div className="col-md-6">
              <label className="form-label">Giờ sinh (nếu biết)</label>
              <input
                type="time"
                className="form-control"
                value={form.birth_time}
                onChange={(e) =>
                  setForm({ ...form, birth_time: e.target.value })
                }
              />
              <small className="text-white-50">
                Tăng độ chính xác cho Tử Vi
              </small>
            </div>

            <div className="col-12">
              <label className="form-label">
                Địa chỉ <span className="text-danger">*</span>
              </label>
              <textarea
                className="form-control"
                rows="2"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
              />
              <small className="text-white-50">
                Dùng cho giao hàng và dịch vụ Phong Thủy
              </small>
            </div>
          </div>

          <div className="mt-4 d-flex gap-2">
            <button
              className={`btn ${
                saveSuccess ? "btn-success" : "btn-gold"
              } position-relative`}
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Đang lưu...
                </>
              ) : saveSuccess ? (
                <>
                  <i className="bi bi-check-circle-fill me-1"></i>
                  Đã lưu thành công!
                </>
              ) : (
                <>
                  <i className="bi bi-save me-1"></i>
                  Lưu thay đổi
                </>
              )}
            </button>
            <button
              className="btn btn-outline-secondary"
              onClick={() => {
                setIsEditing(false);
                setMsg("");
                setSaveSuccess(false);
                // Reset form to original values
                setForm({
                  full_name: user.full_name || user.name || "",
                  username: user.username || "",
                  email: user.email || "",
                  phone: user.phone || "",
                  gender: user.gender || "",
                  date_of_birth: user.date_of_birth || "",
                  birth_time: user.birth_time || "",
                  address: user.address || "",
                  avatar: user.avatar || "",
                });
              }}
              disabled={loading}
            >
              Hủy
            </button>
          </div>

          <div className="mt-4 p-3 bg-dark bg-opacity-25 rounded">
            <h6 className="text-gold mb-2">
              <i className="bi bi-info-circle me-1"></i>
              Lưu ý quan trọng
            </h6>
            <ul className="small mb-0 opacity-75">
              <li>
                Thông tin này sẽ được dùng cho các dịch vụ Tử Vi, Bát Tự, Tarot
              </li>
              <li>Điền đầy đủ để tránh nhập lại khi đặt lịch hoặc mua hàng</li>
              <li>
                Ngày sinh và giờ sinh rất quan trọng cho độ chính xác của lá số
              </li>
              <li>Địa chỉ dùng cho giao hàng và tư vấn Phong Thủy tại nhà</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

function WalletView() {
  const [wallet, setWallet] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAmount, setSelectedAmount] = useState(100);
  const [showMomo, setShowMomo] = useState(false);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
  });

  const fetchWallet = () => {
    axios
      .get("/api/wallet")
      .then((res) => {
        setWallet(res.data);
      })
      .catch((err) => console.error(err));
  };

  const fetchTransactions = (page = 1) => {
    setLoading(true);
    axios
      .get(`/api/wallet/transactions?page=${page}`)
      .then((res) => {
        setTransactions(res.data.data);
        setPagination({
          current_page: res.data.current_page,
          last_page: res.data.last_page,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchWallet();
    fetchTransactions();
  }, []);

  const handleDeposit = async () => {
    try {
      await axios.post("/api/wallet/deposit", {
        amount: selectedAmount * 1000, // Convert Linh Tệ to VNĐ
      });
      setShowMomo(false);
      fetchWallet();
      fetchTransactions();
      showSuccess("Nạp tiền thành công! Linh Tệ đã được cộng vào ví.");
    } catch (e) {
      alert(
        "Lỗi khi xử lý giao dịch: " + (e.response?.data?.message || e.message)
      );
    }
  };

  const depositAmounts = [10, 50, 100, 200, 500, 1000];

  if (loading && !wallet)
    return (
      <div className="p-5 text-center">
        <div className="spinner-border text-gold"></div>
      </div>
    );

  return (
    <div className="animate-fade-in">
      <div className="row g-4">
        <div className="col-lg-6">
          <div className="card-3d p-4 h-100">
            <h3 className="sec-title mb-3">Số dư Linh Tệ</h3>
            <div className="wallet-card bg-gold-gradient p-4 rounded-4 mb-4 text-dark shadow-lg">
              <div className="small fw-bold opacity-100">SỐ DƯ KHẢ DỤNG</div>
              <div className="display-3 fw-bold my-2">
                {Math.floor((wallet?.balance || 0) / 1000).toLocaleString(
                  "vi-VN",
                  {
                    maximumFractionDigits: 0,
                  }
                )}
              </div>
              <div className="fw-bold">🔮 LINH TỆ</div>
            </div>

            <div className="d-flex gap-2 mb-4">
              <button
                className="btn btn-gold w-100 py-3 fw-bold"
                onClick={() => setShowMomo(true)}
              >
                <i className="bi bi-plus-circle me-2"></i>NẠP LINH TỆ
              </button>
            </div>

            <div className="mt-4 p-3 bg-dark bg-opacity-25 rounded text-gold small">
              <i className="bi bi-info-circle me-2"></i>
              Tỷ giá quy đổi: 1.000 VNĐ = 1 🔮.
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card-3d p-4 h-100">
            <h3 className="sec-title mb-3">Lịch sử giao dịch</h3>
            <div
              className="transaction-list custom-scrollbar mb-3"
              style={{ maxHeight: "400px", overflowY: "auto" }}
            >
              {transactions.length > 0 ? (
                transactions.map((txn) => (
                  <div
                    key={txn.id}
                    className="transaction-item d-flex justify-content-between align-items-center p-3 mb-2 border-bottom border-secondary"
                  >
                    <div>
                      <div className="fw-bold small">{txn.description}</div>
                      <div className="small opacity-75">
                        {new Date(txn.created_at).toLocaleString()}
                      </div>
                    </div>
                    <div
                      className={`txn-amount fw-bold ${
                        Number(txn.amount) > 0 ? "text-success" : "text-danger"
                      }`}
                    >
                      {Number(txn.amount) > 0 ? "+" : ""}
                      {Math.floor(
                        Math.abs(Number(txn.amount)) / 1000
                      ).toLocaleString("vi-VN", {
                        maximumFractionDigits: 0,
                      })}{" "}
                      🔮
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center opacity-75 py-5">
                  Chưa có giao dịch nào.
                </p>
              )}
            </div>

            {pagination.last_page > 1 && (
              <div className="d-flex justify-content-center gap-2">
                <button
                  disabled={pagination.current_page === 1}
                  className="btn btn-sm btn-outline-gold"
                  onClick={() => fetchTransactions(pagination.current_page - 1)}
                >
                  Trước
                </button>
                <button
                  disabled={pagination.current_page === pagination.last_page}
                  className="btn btn-sm btn-outline-gold"
                  onClick={() => fetchTransactions(pagination.current_page + 1)}
                >
                  Sau
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Deposit Modal */}
      {showMomo && (
        <div className="momo-modal-overlay" onClick={() => setShowMomo(false)}>
          <div className="momo-modal" onClick={(e) => e.stopPropagation()}>
            <div className="momo-header">
              <h4 className="mb-0">Nạp Linh Tệ (1 Tệ = 1.000 VNĐ)</h4>
            </div>
            <div className="momo-content p-4">
              <div className="row g-4 align-items-center">
                {/* Left side: Amount selection */}
                <div className="col-md-7 text-start">
                  <div className="row g-2 mb-4">
                    {depositAmounts.map((amt) => (
                      <div className="col-4" key={amt}>
                        <div
                          className={`deposit-option p-2 border rounded cursor-pointer ${
                            selectedAmount === amt
                              ? "border-success bg-success bg-opacity-10"
                              : "border-secondary"
                          }`}
                          onClick={() => setSelectedAmount(amt)}
                          style={{ cursor: "pointer" }}
                        >
                          <div
                            className={`fw-bold ${
                              selectedAmount === amt ? "text-success" : ""
                            }`}
                          >
                            {Math.floor(amt).toLocaleString("vi-VN", {
                              maximumFractionDigits: 0,
                            })}
                          </div>
                          <div className="small text-muted">Linh Tệ</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mb-4">
                    <label className="form-label small text-dark text-uppercase fw-bold mb-2">
                      Hoặc nhập số Linh Tệ muốn nạp:
                    </label>
                    <div className="input-group mb-3">
                      <span className="input-group-text bg-secondary text-white border-secondary">
                        🔮
                      </span>
                      <input
                        type="number"
                        className="form-control bg-light text-dark border-secondary text-center fw-bold"
                        placeholder="Nhập số khác..."
                        min="1"
                        style={{ fontSize: "1.2rem", height: "50px" }}
                        value={selectedAmount}
                        onChange={(e) =>
                          setSelectedAmount(Number(e.target.value) || 0)
                        }
                      />
                      <span className="input-group-text bg-secondary text-white border-secondary">
                        Linh Tệ
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-light rounded-3 border">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="text-secondary small fw-bold">
                        TỔNG THANH TOÁN:
                      </span>
                      <span className="h4 mb-0 fw-bold text-success">
                        {Math.floor(selectedAmount * 1000).toLocaleString(
                          "vi-VN",
                          {
                            maximumFractionDigits: 0,
                          }
                        )}{" "}
                        VNĐ
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right side: QR Code */}
                <div className="col-md-5 text-center">
                  <div className="bg-white p-3 rounded-4 shadow-sm border mb-3 d-inline-block">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=QUET_MA_NAP_TIEN_${selectedAmount}`}
                      alt="Momo QR"
                      className="img-fluid"
                      style={{ width: 200, height: 200 }}
                    />
                  </div>
                  <div className="small text-muted fw-bold">
                    <i className="bi bi-qr-code-scan me-2"></i>
                    QUÉT MÃ ĐỂ THANH TOÁN
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-top">
                <button
                  className="btn btn-gold w-100 py-3 mb-2 fw-bold"
                  onClick={handleDeposit}
                >
                  TÔI ĐÃ CHUYỂN KHOẢN
                </button>
                <button
                  className="btn btn-link text-white-50 w-100"
                  onClick={() => setShowMomo(false)}
                >
                  Hủy bỏ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TwoFactorView({ user }) {
  const [qrData, setQrData] = useState(null);
  const [otp, setOtp] = useState("");

  // Check if user has 2FA enabled?
  // Need to pass this info from backend. For now, assume if 'two_factor_confirmed_at' is null based on user obj.
  // user object from context might verify this.
  // Simplification: Just show Setup flow always for demo.

  const startSetup = async () => {
    const res = await axios.post("/api/2fa/setup");
    setQrData(res.data);
  };

  const confirmSetup = async () => {
    try {
      await axios.post("/api/2fa/confirm", {
        code: otp,
        secret: qrData.secret,
      });
      showSuccess("Đã bật 2FA thành công!");
      setQrData(null);
      setOtp("");
    } catch (e) {
      showError("Mã sai!");
    }
  };

  return (
    <div className="card-3d p-4">
      <h3 className="sec-title mb-3">Bảo mật 2FA</h3>
      <p className="text-light" style={{ opacity: 0.9 }}>
        Sử dụng Google Authenticator để bảo vệ tài khoản.
      </p>

      {!qrData && (
        <button className="btn btn-gold" onClick={startSetup}>
          Thiết lập 2FA Mới
        </button>
      )}

      {qrData && (
        <div className="mt-3 text-center">
          {/* Render SVG from Backend */}
          <div
            className="bg-white p-2 rounded mb-2 d-inline-block"
            dangerouslySetInnerHTML={{ __html: qrData.qr_code_url }}
          />
          <p className="small">Quét mã này bằng ứng dụng Authenticator</p>
          <div className="d-flex justify-content-center gap-2 mb-3">
            <input
              className="form-control"
              style={{ width: "120px" }}
              placeholder="Nhập 6 số"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button className="btn btn-gold" onClick={confirmSetup}>
              Xác nhận
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function InboxView({ onUpdate }) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subTab, setSubTab] = useState("noti"); // noti | orders

  const fetchInbox = () => {
    setLoading(true);
    axios
      .get("/api/notifications")
      .then((res) => {
        setList(res.data.data || res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchInbox();
  }, []);

  const markAsRead = (id) => {
    axios
      .post(`/api/notifications/${id}/read`)
      .then(() => {
        fetchInbox();
        onUpdate();
      })
      .catch((err) => console.error(err));
  };

  const markAllRead = () => {
    axios
      .post("/api/notifications/read-all")
      .then(() => {
        fetchInbox();
        onUpdate();
      })
      .catch((err) => console.error(err));
  };

  const deleteItem = (id) => {
    showConfirm("Bạn muốn xóa thông báo này?", async () => {
      axios
        .delete(`/api/notifications/${id}`)
        .then(() => {
          fetchInbox();
          onUpdate();
        })
        .catch((err) => console.error(err));
    });
  };

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return "✅";
      case "warning":
        return "⚠️";
      case "danger":
        return "🔴";
      default:
        return "ℹ️";
    }
  };

  return (
    <div className="card-3d p-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <h3 className="sec-title mb-0">Hộp thư & Lịch sử</h3>
        <div className="dashboard-tabs d-inline-flex bg-dark-glass p-1 rounded-pill">
          <button
            className={`tab-pill border-0 ${subTab === "noti" ? "active" : ""}`}
            onClick={() => setSubTab("noti")}
          >
            Thông báo
          </button>
          <button
            className={`tab-pill border-0 ${
              subTab === "orders" ? "active" : ""
            }`}
            onClick={() => setSubTab("orders")}
          >
            Đơn hàng
          </button>
        </div>
      </div>

      {subTab === "noti" ? (
        <div className="inbox-list">
          {loading && list.length === 0 ? (
            <div className="text-center py-5">
              <div className="spinner-border text-gold"></div>
            </div>
          ) : list.length === 0 ? (
            <div className="text-center py-5 opacity-75">
              <div className="fs-1 mb-3">📭</div>
              <p>Hộp thư trống.</p>
            </div>
          ) : (
            <>
              {list.some((i) => !i.read_at) && (
                <div className="text-end mb-3">
                  <button
                    className="btn btn-sm btn-outline-gold"
                    onClick={markAllRead}
                  >
                    Đánh dấu tất cả là đã đọc
                  </button>
                </div>
              )}
              {list.map((item) => (
                <div
                  key={item.id}
                  className={`inbox-item d-flex gap-3 p-3 mb-2 rounded border-start border-4 ${
                    !item.read_at
                      ? "border-gold bg-white-5"
                      : "border-secondary"
                  }`}
                  style={{
                    transition: "all 0.2s",
                    background: !item.read_at
                      ? "rgba(255, 215, 0, 0.05)"
                      : "rgba(255, 255, 255, 0.02)",
                  }}
                  onClick={() => !item.read_at && markAsRead(item.id)}
                >
                  <div className="fs-3">{getIcon(item.type)}</div>
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between">
                      <h6
                        className={`mb-1 ${
                          !item.read_at ? "text-gold fw-bold" : "text-white"
                        }`}
                      >
                        {item.title}
                      </h6>
                      <button
                        className="btn btn-sm text-danger p-0 ms-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteItem(item.id);
                        }}
                        title="Xóa"
                      >
                        ✕
                      </button>
                    </div>
                    <p className="small mb-1 opacity-90">{item.message}</p>
                    <div className="small opacity-50">
                      {new Date(item.created_at).toLocaleString("vi-VN")}
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      ) : (
        <OrdersView />
      )}
    </div>
  );
}

function TasksView({ onRewardClaimed }) {
  const { showSuccess, showError } = useAlert();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [frequency, setFrequency] = useState("daily"); // daily, weekly, monthly

  const fetchTasks = () => {
    setLoading(true);
    axios
      .get("/api/tasks")
      .then((res) => {
        setTasks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const claimReward = (taskId) => {
    axios
      .post(`/api/tasks/${taskId}/claim`)
      .then((res) => {
        showSuccess(res.data.message);
        fetchTasks();
        onRewardClaimed();
        // Trigger balance update
        window.dispatchEvent(new Event("userChanged"));
      })
      .catch((err) => {
        showError(err.response?.data?.error || "Có lỗi xảy ra");
      });
  };

  const filteredTasks = tasks.filter((t) => t.frequency === frequency);

  return (
    <div className="card-3d p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="sec-title mb-0">Nhiệm vụ & Thưởng</h3>
      </div>

      <div className="tabs-wrap mb-4">
        <button
          className={`tab-pill ${frequency === "daily" ? "active" : ""}`}
          onClick={() => setFrequency("daily")}
        >
          Hàng ngày
        </button>
        <button
          className={`tab-pill ${frequency === "weekly" ? "active" : ""}`}
          onClick={() => setFrequency("weekly")}
        >
          Hàng tuần
        </button>
        <button
          className={`tab-pill ${frequency === "monthly" ? "active" : ""}`}
          onClick={() => setFrequency("monthly")}
        >
          Hàng tháng
        </button>
      </div>

      <div className="alert bg-dark bg-opacity-25 border-gold border-opacity-25 text-light mb-4 small animate-fade-in">
        <i className="bi bi-info-circle-fill text-gold me-2"></i>
        <strong>Hướng dẫn:</strong> Hoàn thành các yêu cầu trong mô tả, sau đó
        nhấn nút
        <span className="text-gold fw-bold mx-1">Nhận thưởng</span> để tích lũy
        Linh Tệ. Nhiệm vụ hàng ngày sẽ làm mới vào 00:00 mỗi ngày.
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-gold"></div>
        </div>
      ) : (
        <div className="task-list">
          {filteredTasks.length === 0 ? (
            <p className="text-center opacity-75 py-4">
              Không có nhiệm vụ nào trong mục này.
            </p>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`task-item d-flex justify-content-between align-items-center p-3 mb-2 rounded border ${
                  task.is_completed
                    ? "border-success bg-success bg-opacity-10"
                    : "border-secondary bg-dark bg-opacity-20"
                }`}
              >
                <div className="flex-grow-1 me-3">
                  <h6 className="mb-1 text-gold">{task.title}</h6>
                  <p className="small mb-1 opacity-75">{task.description}</p>

                  {/* Progress Bar for Progressive Tasks */}
                  {task.target > 1 && (
                    <div className="mt-2" style={{ maxWidth: "200px" }}>
                      <div className="d-flex justify-content-between small text-white-50 mb-1">
                        <span>Tiến độ</span>
                        <span>
                          {task.progress}/{task.target}
                        </span>
                      </div>
                      <div
                        className="progress"
                        style={{
                          height: "6px",
                          backgroundColor: "rgba(255,255,255,0.1)",
                        }}
                      >
                        <div
                          className="progress-bar bg-gold"
                          role="progressbar"
                          style={{
                            width: `${Math.min(
                              (task.progress / task.target) * 100,
                              100
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <div className="mt-2 text-white-50 small">
                    <span className="badge bg-dark-glass text-gold border border-gold border-opacity-25 py-1 px-2">
                      Thưởng:{" "}
                      {Math.floor(task.reward_amount).toLocaleString("vi-VN", {
                        maximumFractionDigits: 0,
                      })}{" "}
                      🔮
                    </span>

                    {/* Show Affiliate Link if available */}
                    {task.affiliate_code && (
                      <div className="mt-2 p-2 bg-black bg-opacity-25 rounded border border-secondary d-flex justify-content-between align-items-center">
                        <code className="text-gold opacity-75 small text-break me-2">
                          {window.location.origin}/api/ref/{task.affiliate_code}
                        </code>
                        <button
                          className="btn btn-xs btn-outline-secondary"
                          onClick={() => {
                            const link = `${window.location.origin}/api/ref/${task.affiliate_code}`;
                            navigator.clipboard.writeText(link);
                            showSuccess("Đã sao chép link liên kết!");
                          }}
                          title="Sao chép link"
                        >
                          <i className="bi bi-clipboard"></i>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ minWidth: "120px", textAlign: "right" }}>
                  {task.is_completed ? (
                    <span className="text-success fw-bold">
                      <i className="bi bi-check-circle-fill me-1"></i> Đã hoàn
                      thành
                    </span>
                  ) : (
                    <div className="d-flex flex-column gap-2 align-items-end">
                      {task.action_url && (
                        <a
                          href={task.action_url}
                          className="btn btn-xs btn-outline-info w-100"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Làm nhiệm vụ{" "}
                          <i className="bi bi-box-arrow-up-right ms-1"></i>
                        </a>
                      )}
                      <button
                        className={`btn btn-sm w-100 ${
                          task.progress < task.target
                            ? "btn-secondary opacity-50"
                            : "btn-gold shadow-sm"
                        }`}
                        onClick={() => claimReward(task.id)}
                        disabled={task.progress < task.target}
                      >
                        {task.progress < task.target ? (
                          <span>
                            <i className="bi bi-lock me-1"></i> {task.progress}/
                            {task.target}
                          </span>
                        ) : (
                          <span>
                            {task.title === "Điểm danh hàng ngày"
                              ? "Điểm danh ngay"
                              : "Nhận thưởng"}
                          </span>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

function OrdersView() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/orders")
      .then((res) => {
        // Handle both simple array and paginated object
        const data = res.data.data || res.data || [];
        setOrders(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="p-5 text-center">
        <div className="spinner-border text-gold"></div>
      </div>
    );

  return (
    <div className="orders-view">
      <h4 className="text-gold mb-3 d-none d-md-block">
        <i className="bi bi-cart-check me-2"></i> Đơn hàng của bạn
      </h4>
      {orders.length === 0 ? (
        <div className="text-center py-5 opacity-75">
          <p>Bạn chưa có đơn hàng nào.</p>
          <a href="/cua-hang" className="btn btn-outline-gold btn-sm">
            Đến Cửa hàng ngay
          </a>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-dark table-hover align-middle">
            <thead className="table-light text-dark">
              <tr>
                <th>Mã ĐH</th>
                <th>Sản phẩm</th>
                <th>Tổng cộng</th>
                <th>Trạng thái</th>
                <th>Ngày đặt</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                let items = [];
                try {
                  items =
                    typeof order.items === "string"
                      ? JSON.parse(order.items)
                      : order.items || [];
                } catch (e) {
                  items = [];
                }

                return (
                  <tr key={order.id}>
                    <td>
                      <span className="text-gold small fw-bold">
                        {order.order_id}
                      </span>
                    </td>
                    <td>
                      {Array.isArray(items) &&
                        items.map((item, idx) => (
                          <div key={idx} className="small">
                            {item.name} x {item.quantity}
                          </div>
                        ))}
                    </td>
                    <td className="fw-bold">
                      {Math.floor(order.total).toLocaleString("vi-VN", {
                        maximumFractionDigits: 0,
                      })}{" "}
                      🔮
                    </td>
                    <td>
                      <span
                        className={`badge rounded-pill ${
                          order.status === "paid" ? "bg-success" : "bg-warning"
                        }`}
                      >
                        {order.status === "paid"
                          ? "Đã thanh toán"
                          : order.status}
                      </span>
                    </td>
                    <td className="small opacity-90">
                      {new Date(order.created_at).toLocaleDateString("vi-VN")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
