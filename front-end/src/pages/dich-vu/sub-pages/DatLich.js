import React from "react";
import "./sub-pages.css";

export default function DatLich() {
  return (
    <div className="sub-page booking-page">
      <section className="sub-hero">
        <div className="container">
          <h1 className="sub-title">Đặt lịch chuyên gia</h1>
          <p className="sub-desc">
            Kết nối trực tiếp 1-1 với những chuyên gia hàng đầu trong lĩnh vực
            Tarot, Chiêm tinh và phong thủy để nhận được lời khuyên cá nhân hóa.
          </p>
        </div>
      </section>

      <section className="sub-content container">
        <div className="glass-card info-form-card">
          <h2 className="card-title">Thông tin đặt lịch</h2>
          <form className="info-form">
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Loại dịch vụ</label>
                <select className="form-select">
                  <option>Xem Tarot chuyên sâu (60p)</option>
                  <option>Lập lá số & Luận giải (90p)</option>
                  <option>Tư vấn Phong thủy (120p)</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Chọn chuyên gia</label>
                <select className="form-select">
                  <option>Master Gia Khoa</option>
                  <option>Chuyên gia Sương Nguyễn</option>
                  <option>Cộng tác viên cao cấp</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Ngày mong muốn</label>
                <input type="date" className="form-control" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Hình thức</label>
                <div className="d-flex gap-3 mt-2">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="method"
                      id="online"
                      defaultChecked
                    />
                    <label className="form-check-label" htmlFor="online">
                      Online (Zoom/Meet)
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="method"
                      id="offline"
                    />
                    <label className="form-check-label" htmlFor="offline">
                      Offline (Hà Nội)
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-gold mt-4 w-100">
              Gửi yêu cầu đặt lịch
            </button>
          </form>
        </div>

        <div className="mt-5 text-center opacity-75">
          <p>
            Hệ thống đặt lịch đang hoạt động thử nghiệm. Chúng tôi sẽ phản hồi
            trong 24h!
          </p>
        </div>
      </section>
    </div>
  );
}
