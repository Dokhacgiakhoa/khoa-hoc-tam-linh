import React from "react";
import { Link } from "react-router-dom";

const DichVu = () => {
  return (
    <div className="py-5">
      <div className="container">
        <div className="mb-5 text-center">
          <h1 className="fw-bold">Dịch vụ tâm linh</h1>
          <p className="text-muted">
            Tarot · Bản đồ sao · Tử vi · Thần số học (AI) · Đặt lịch
          </p>
        </div>

        {/* Tarot */}
        <div id="tarot" className="mb-5">
          <h3 className="fw-semibold mb-3">1. Tarot</h3>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">Tarot miễn phí 1 lá</h5>
                  <p className="card-text flex-grow-1">
                    Dùng dữ liệu 78 lá có xuôi/ngược, phù hợp cho khách mới.
                  </p>
                  <Link
                    to="/tarot-mien-phi"
                    className="btn btn-outline-primary"
                  >
                    Trải ngay
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">Tarot theo chủ đề</h5>
                  <p className="card-text flex-grow-1">
                    Tình duyên, công việc, tài chính, sức khỏe, phát triển bản
                    thân…
                  </p>
                  <button className="btn btn-outline-primary" type="button">
                    Đang phát triển
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">Tarot chuyên sâu</h5>
                  <p className="card-text flex-grow-1">
                    Trải nhiều lá, có phân tích, gợi ý hành động.
                  </p>
                  <button className="btn btn-outline-secondary" type="button">
                    Yêu cầu reader
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bản đồ sao - Chiêm tinh */}
        <div id="ban-do-sao" className="mb-5">
          <h3 className="fw-semibold mb-3">2. Bản đồ sao (Chiêm tinh)</h3>
          <p className="text-muted">
            Nhập ngày – giờ – nơi sinh để tạo biểu đồ. Có thể dùng API để đọc tự
            động.
          </p>
          <div className="alert alert-info">
            Tính năng này có thể kết nối AI để giải thích từng nhà, từng hành
            tinh – sau này cậu chỉ cần thêm form nhập dữ liệu thôi.
          </div>
        </div>

        {/* Tử vi - Thần số học */}
        <div id="than-so-hoc" className="mb-5">
          <h3 className="fw-semibold mb-3">3. Thần số học (AI)</h3>
          <p className="text-muted">
            Dùng ngày sinh để tính số chủ đạo, đường đời, linh hồn, nhân cách.
          </p>
          <div className="card border-0 shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row align-items-md-center justify-content-between">
              <div>
                <h5 className="mb-2">Tự động diễn giải</h5>
                <p className="mb-0">
                  Có thể sinh nội dung động cho từng số → đưa sang chatbot.
                </p>
              </div>
              <button className="btn btn-primary mt-3 mt-md-0" type="button">
                Tạo báo cáo
              </button>
            </div>
          </div>
        </div>

        {/* Đặt lịch */}
        <div id="dat-lich" className="mb-5">
          <h3 className="fw-semibold mb-3">4. Đặt lịch xem</h3>
          <p className="text-muted">
            Khách chọn khung giờ → gửi form → admin xác nhận. Có thể tích hợp
            Google Calendar như cậu hỏi ở đoạn chat trước.
          </p>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Họ tên</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nguyễn Văn A"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Số điện thoại / Zalo</label>
              <input
                type="text"
                className="form-control"
                placeholder="0123 456 789"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Chọn dịch vụ</label>
              <select className="form-select">
                <option>Tarot tình cảm</option>
                <option>Tarot công việc</option>
                <option>Thần số học</option>
                <option>Bản đồ sao</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Khung giờ mong muốn</label>
              <input type="datetime-local" className="form-control" />
            </div>
            <div className="col-12">
              <label className="form-label">Ghi chú</label>
              <textarea className="form-control" rows="3" />
            </div>
            <div className="col-12">
              <button className="btn btn-primary">Gửi yêu cầu</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DichVu;
