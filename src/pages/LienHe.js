import React from "react";

const LienHe = () => {
  return (
    <div className="py-5 bg-body-tertiary">
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="fw-bold">Liên hệ</h1>
          <p className="text-muted mb-0">
            Thông tin liên hệ · Đăng ký đối tác · Chăm sóc khách hàng · Cộng
            đồng
          </p>
          <p className="text-muted">
            + Chính sách & bảo mật · Câu hỏi thường gặp (FAQ)
          </p>
        </div>

        <div className="row g-4 mb-4">
          {/* Info */}
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Thông tin</h5>
                <p className="mb-1">
                  Email:{" "}
                  <a href="mailto:contact@khoahoctamlinh.vn">
                    contact@khoahoctamlinh.vn
                  </a>
                </p>
                <p className="mb-1">Zalo: 0799 958 589</p>
                <p className="mb-1">Facebook: fanpage hệ thống</p>
                <p className="mb-0">Địa chỉ: Hà Nội, Việt Nam</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="col-md-8">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h5 className="card-title mb-3">Gửi yêu cầu</h5>
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
                    <label className="form-label">Email / SĐT</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="email hoặc số điện thoại"
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Chủ đề</label>
                    <select className="form-select">
                      <option>Hỏi về dịch vụ Tarot</option>
                      <option>Đăng ký đối tác</option>
                      <option>Hỗ trợ khách hàng</option>
                      <option>Cộng đồng / nhóm private</option>
                      <option>Khác...</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label">Nội dung</label>
                    <textarea className="form-control" rows="4" />
                  </div>
                  <div className="col-12">
                    <button className="btn btn-primary" type="submit">
                      Gửi
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Các box nhỏ */}
        <div className="row g-4">
          <div className="col-md-3">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <h6 className="fw-semibold">Đăng ký đối tác</h6>
                <p className="small text-muted">
                  Dành cho reader, huấn luyện viên, nhà cung cấp sản phẩm tâm
                  linh.
                </p>
                <button className="btn btn-outline-primary btn-sm">
                  Đăng ký
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <h6 className="fw-semibold">Chăm sóc khách hàng</h6>
                <p className="small text-muted">
                  Hỗ trợ đơn hàng, kích hoạt dịch vụ, nạp Linh Tệ.
                </p>
                <button className="btn btn-outline-primary btn-sm">
                  Gửi ticket
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <h6 className="fw-semibold">Cộng đồng</h6>
                <p className="small text-muted">
                  Tham gia group để xem lịch trải bài free & livestream.
                </p>
                <button className="btn btn-outline-primary btn-sm">
                  Tham gia
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <h6 className="fw-semibold">Chính sách & FAQ</h6>
                <p className="small text-muted">
                  Quy định bảo mật, điều khoản sử dụng, câu hỏi thường gặp.
                </p>
                <button className="btn btn-outline-primary btn-sm">
                  Xem chi tiết
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LienHe;
