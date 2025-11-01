import React from "react";
import { Link } from "react-router-dom";

const KienThuc = () => {
  return (
    <div className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="fw-bold">Kiến thức tâm linh</h1>
          <p className="text-muted">
            Tarot · Bản đồ sao · Tử vi · Thần số học · Phong thủy · Trà đạo
          </p>
        </div>

        <div className="row g-4">
          {/* Tarot */}
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h4 className="card-title">Tarot cơ bản</h4>
                <p className="card-text flex-grow-1">
                  Cách chọn bộ bài, cách thanh tẩy, cách trải bài 1 lá & 3 lá.
                </p>
                <Link to="/kien-thuc/tarot" className="btn btn-outline-primary">
                  Xem bài Tarot
                </Link>
              </div>
            </div>
          </div>

          {/* Bản đồ sao */}
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h4 className="card-title">Chiêm tinh / Bản đồ sao</h4>
                <p className="card-text flex-grow-1">
                  Các nhà, các hành tinh và ý nghĩa – nền tảng để tự đọc chart.
                </p>
                <Link
                  to="/kien-thuc/ban-do-sao"
                  className="btn btn-outline-primary"
                >
                  Xem hướng dẫn
                </Link>
              </div>
            </div>
          </div>

          {/* Thần số học */}
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h4 className="card-title">Thần số học</h4>
                <p className="card-text flex-grow-1">
                  Công thức tính số chủ đạo, linh hồn, nhân cách – bản đơn giản.
                </p>
                <Link
                  to="/kien-thuc/than-so-hoc"
                  className="btn btn-outline-primary"
                >
                  Xem công thức
                </Link>
              </div>
            </div>
          </div>

          {/* Phong thủy */}
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h4 className="card-title">Phong thủy – vật phẩm</h4>
                <p className="card-text flex-grow-1">
                  Cách chọn đá, gỗ, màu sắc theo mệnh – liên kết với cửa hàng.
                </p>
                <Link
                  to="/kien-thuc/phong-thuy"
                  className="btn btn-outline-primary"
                >
                  Xem bài
                </Link>
              </div>
            </div>
          </div>

          {/* Nhân tướng học */}
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h4 className="card-title">Nhân tướng – tâm linh</h4>
                <p className="card-text flex-grow-1">
                  Các dấu hiệu trên khuôn mặt, bàn tay, dáng đi.
                </p>
                <Link
                  to="/kien-thuc/nhan-tuong"
                  className="btn btn-outline-primary"
                >
                  Xem hướng dẫn
                </Link>
              </div>
            </div>
          </div>

          {/* Trà đạo */}
          <div className="col-md-6 col-lg-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h4 className="card-title">Trà đạo & không gian thiền</h4>
                <p className="card-text flex-grow-1">
                  Phần kiến thức này free để bán kèm sản phẩm trà / bàn trà.
                </p>
                <Link
                  to="/kien-thuc/tra-dao"
                  className="btn btn-outline-primary"
                >
                  Xem nội dung
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 alert alert-info">
          Nếu cậu muốn chia kiến thức thành 2 phần <strong>miễn phí</strong> và{" "}
          <strong>trả bằng Linh Tệ</strong> thì tớ sẽ tách thêm 1 component
          `KienThucPremium` rồi check trạng thái đăng nhập sau.
        </div>
      </div>
    </div>
  );
};

export default KienThuc;
