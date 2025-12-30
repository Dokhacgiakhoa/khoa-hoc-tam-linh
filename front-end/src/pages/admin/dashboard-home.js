import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DashboardHome() {
  const [stats, setStats] = useState([
    {
      title: "Tổng doanh thu",
      value: "0",
      icon: "bi-currency-dollar",
      color: "text-success",
    },
    {
      title: "Người dùng mới",
      value: "0",
      icon: "bi-people",
      color: "text-primary",
    },
    {
      title: "Đơn hàng mới",
      value: "0",
      icon: "bi-cart",
      color: "text-warning",
    },
    {
      title: "Tỷ lệ tăng trưởng", // Changed from "Tỷ lệ linh hoạt"
      value: "85%",
      icon: "bi-graph-up-arrow",
      color: "text-info",
    },
  ]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [dashboardRes, ordersRes] = await Promise.all([
          axios.get("/api/admin/dashboard"),
          axios.get("/api/orders"),
        ]);

        const dData = dashboardRes.data;
        const orders = ordersRes.data;

        setStats([
          {
            title: "Tổng số người dùng",
            value: Math.floor(dData.total_users).toLocaleString("vi-VN", {
              maximumFractionDigits: 0,
            }),
            icon: "bi-people",
            color: "text-primary",
          },
          {
            title: "Tổng số đơn hàng",
            value: Math.floor(dData.total_orders).toLocaleString("vi-VN", {
              maximumFractionDigits: 0,
            }),
            icon: "bi-cart",
            color: "text-warning",
          },
          {
            title: "Tổng số dư ví (Hệ thống)",
            value:
              Math.floor(dData.total_balance / 1000).toLocaleString("vi-VN", {
                maximumFractionDigits: 0,
              }) + " 🔮",
            icon: "bi-wallet2",
            color: "text-info",
          },
          {
            title: "Doanh thu hôm nay",
            value:
              Math.floor(dData.today_revenue / 1000).toLocaleString("vi-VN", {
                maximumFractionDigits: 0,
              }) + " 🔮",
            icon: "bi-graph-up-arrow",
            color: "text-success",
          },
        ]);
        setRecentOrders(orders.slice(0, 5));
        setLoading(false);
      } catch (err) {
        console.error("Lỗi khi lấy thống kê:", err);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "300px" }}
      >
        <div className="spinner-border text-gold" role="status"></div>
      </div>
    );
  }

  return (
    <div className="dashboard-home">
      {/* Thống kê nhanh */}
      <div className="row g-4 mb-5">
        {stats.map((s, idx) => (
          <div className="col-12 col-md-6 col-xl-3" key={idx}>
            <div className="stat-card">
              <div className={`stat-icon ${s.color}`}>
                <i className={`bi ${s.icon}`}></i>
              </div>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.title}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4">
        {/* Đơn hàng gần đây */}
        <div className="col-lg-8">
          <div className="admin-table-container p-4">
            <h5 className="mb-4 fw-bold">Đơn hàng vừa thực hiện</h5>
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Khách hàng</th>
                    <th>Số tiền</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((o) => (
                    <tr key={o.id}>
                      <td>{o.order_id}</td>
                      <td>{o.customer_name}</td>
                      <td>
                        {Math.floor(o.total || 0).toLocaleString("vi-VN", {
                          maximumFractionDigits: 0,
                        })}
                        đ
                      </td>
                      <td>
                        <span
                          className={`status-badge ${
                            o.status === "Đã thanh toán"
                              ? "status-paid"
                              : "status-pending"
                          }`}
                        >
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Thông báo hệ thống */}
        <div className="col-lg-4">
          <div className="admin-table-container p-4 h-100">
            <h5 className="mb-4 fw-bold">Thông báo</h5>
            <div className="d-flex flex-column gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-3 rounded-3 bg-white-5">
                  <div className="d-flex justify-content-between mb-1">
                    <span className="small fw-bold text-gold">Hệ thống</span>
                    <span className="small opacity-50">Hôm nay</span>
                  </div>
                  <div className="small opacity-90">
                    Bản sao lưu cơ sở dữ liệu hàng ngày đã được tạo thành công.
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
