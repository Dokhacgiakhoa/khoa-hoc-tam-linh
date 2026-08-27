import React, { useEffect, useState } from "react";
import axios from "axios";

export default function OrderManager() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/orders")
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy đơn hàng:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="order-manager">
      <div className="admin-table-container p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-bold m-0">Quản lý Đơn hàng & Đặt lịch</h5>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-light btn-sm">Xuất Excel</button>
            <button className="btn btn-gold btn-sm">Lọc dữ liệu</button>
          </div>
        </div>

        <div className="table-responsive">
          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-gold" role="status"></div>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Mã đơn</th>
                  <th>Khách hàng</th>
                  <th>Vật phẩm/Dịch vụ</th>
                  <th>Tổng tiền</th>
                  <th>Thanh toán</th>
                  <th>Trạng thái</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id}>
                    <td>
                      <span className="fw-bold text-gold">{o.order_id}</span>
                    </td>
                    <td>{o.customer_name}</td>
                    <td>{o.items}</td>
                    <td>
                      {Math.floor(o.total || 0).toLocaleString("vi-VN", {
                        maximumFractionDigits: 0,
                      })}
                    </td>
                    <td>{o.method}</td>
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
                    <td>
                      <button className="btn btn-sm btn-outline-light">
                        Xem chi tiết
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
