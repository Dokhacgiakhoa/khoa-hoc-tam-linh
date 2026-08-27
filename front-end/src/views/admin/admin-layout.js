import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./admin.css";

export default function AdminLayout({ children }) {
  const location = useLocation();

  const menuItems = [
    { path: "/admin", icon: "bi-speedometer2", label: "Tổng quan" },
    { path: "/admin/users", icon: "bi-people", label: "Người dùng" },
    { path: "/admin/orders", icon: "bi-cart-check", label: "Đơn hàng" },
    { path: "/admin/bookings", icon: "bi-calendar-event", label: "Đặt lịch" },
    { path: "/admin/transactions", icon: "bi-cash-stack", label: "Ví Linh Tệ" },
    { path: "/admin/settings", icon: "bi-gear", label: "Cài đặt" },
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <Link to="/" className="sidebar-brand">
            <i className="bi bi-stars"></i>
            <span>KH Tâm Linh</span>
          </Link>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item-admin ${
                location.pathname === item.path ? "active" : ""
              }`}
            >
              <i className={`bi ${item.icon}`}></i>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <Link to="/" className="nav-item-admin">
            <i className="bi bi-box-arrow-left"></i>
            <span>Về trang chủ</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-content">
        <header className="admin-header">
          <h2 className="fw-bold m-0">
            {menuItems.find((item) => item.path === location.pathname)?.label ||
              "Quản trị"}
          </h2>
          <div className="admin-profile d-flex align-items-center gap-3">
            <span className="small opacity-75">Chào, Admin</span>
            <div
              className="rounded-circle bg-gold"
              style={{ width: 32, height: 32 }}
            ></div>
          </div>
        </header>

        <div className="admin-body-content">{children}</div>
      </main>
    </div>
  );
}
