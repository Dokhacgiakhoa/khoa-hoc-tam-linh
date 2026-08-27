import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAlert } from "../../contexts/AlertContext";

export default function UserManager() {
  const { showSuccess, showError, showConfirm } = useAlert();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/admin/users")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy người dùng:", err);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    showConfirm("Bạn có chắc chắn muốn xóa người dùng này?", async () => {
      try {
        await axios.delete(`/api/admin/users/${id}`);
        setUsers(users.filter((u) => u.id !== id));
        showSuccess("Đã xóa thành công!");
      } catch (err) {
        showError("Lỗi khi xóa: " + (err.response?.data?.error || err.message));
      }
    });
  };

  return (
    <div className="user-manager">
      <div className="admin-table-container p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-bold m-0">Danh sách thành viên</h5>
          <button className="btn btn-gold btn-sm">
            <i className="bi bi-person-plus me-2"></i>Thêm mới
          </button>
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
                  <th>ID</th>
                  <th>Họ tên</th>
                  <th>Email</th>
                  <th>Vai trò</th>
                  <th>Linh Tệ</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>#{u.id}</td>
                    <td>
                      <div className="fw-bold">{u.name}</div>
                    </td>
                    <td>{u.email}</td>
                    <td>
                      <span
                        className={`badge rounded-pill ${
                          u.role === "admin" ? "bg-danger" : "bg-primary"
                        }`}
                      >
                        {u.role === "admin" ? "Quản trị viên" : "Thành viên"}
                      </span>
                    </td>
                    <td>
                      {Math.floor(u.balance || 0).toLocaleString("vi-VN", {
                        maximumFractionDigits: 0,
                      })}
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-sm btn-outline-light"
                          title="Chỉnh sửa"
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          title="Xóa"
                          onClick={() => handleDelete(u.id)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
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
