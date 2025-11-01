import React from "react";
import { Link } from "react-router-dom";

const TrangChu = () => {
  return (
    <div className="homepage">
      {/* HERO */}
      <section className="py-5 bg-dark text-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <p className="text-warning fw-semibold mb-2">
                Hệ thống Khoa học Tâm linh
              </p>
              <h1 className="display-5 fw-bold mb-3">
                Trải bài Tarot miễn phí 1 lá
              </h1>
              <p className="lead mb-4">
                Bộ 78 lá đầy đủ, có xuôi/ngược, ý nghĩa theo Raider Waite – đã
                tối ưu để AI dùng lại. Rất hợp để demo đồ án React của cậu.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Link to="/tarot-mien-phi" className="btn btn-warning btn-lg">
                  Rút bài ngay
                </Link>
                <Link to="/dich-vu" className="btn btn-outline-light btn-lg">
                  Xem dịch vụ
                </Link>
              </div>
              <p className="mt-3 mb-0 text-muted small">
                *Miễn phí 1 lần/ngày · Không cần đăng nhập
              </p>
            </div>
            <div className="col-lg-6 text-center">
              <div className="bg-light rounded-4 p-4 shadow-sm text-dark">
                <h5 className="fw-semibold mb-3">Hôm nay bạn muốn hỏi gì?</h5>
                <ul className="list-unstyled mb-4">
                  <li className="mb-2">✅ Tình cảm: người ấy nghĩ gì?</li>
                  <li className="mb-2">✅ Công việc: có nên chuyển việc?</li>
                  <li className="mb-2">✅ Tài chính: có nên đầu tư / mua?</li>
                </ul>
                <Link to="/tarot-mien-phi" className="btn btn-dark w-100">
                  Bắt đầu bói Tarot
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DỊCH VỤ NỔI BẬT */}
      <section className="py-5 bg-body-tertiary">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Dịch vụ tâm linh</h2>
            <p className="text-muted">
              Tarot · Bản đồ sao · Tử vi · Thần số học (AI) · Đặt lịch xem
            </p>
          </div>
          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">Tarot miễn phí</h5>
                  <p className="card-text flex-grow-1">
                    Trải bài 1 lá – phù hợp cho khách lần đầu.
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
            <div className="col-md-6 col-lg-3">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">Tarot chuyên sâu</h5>
                  <p className="card-text flex-grow-1">
                    Nhiều lá / nhiều chủ đề: tình duyên, công việc, tài chính.
                  </p>
                  <Link to="/dich-vu#tarot" className="btn btn-outline-primary">
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">Thần số học</h5>
                  <p className="card-text flex-grow-1">
                    Nhập ngày sinh → AI gợi ý diễn giải.
                  </p>
                  <Link
                    to="/dich-vu#than-so-hoc"
                    className="btn btn-outline-primary"
                  >
                    Khám phá
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">Đặt lịch xem</h5>
                  <p className="card-text flex-grow-1">
                    Xem trực tiếp / online – có xác nhận.
                  </p>
                  <Link
                    to="/dich-vu#dat-lich"
                    className="btn btn-outline-primary"
                  >
                    Đặt lịch
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KIẾN THỨC */}
      <section className="py-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="fw-bold mb-1">Kiến thức mới</h2>
              <p className="text-muted mb-0">
                Học Tarot, chiêm tinh, phong thủy để tự đọc bài.
              </p>
            </div>
            <Link to="/kien-thuc" className="btn btn-outline-secondary">
              Xem tất cả
            </Link>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <img
                  src={`${process.env.PUBLIC_URL}/images/banner/tarot-basic.jpg`}
                  className="card-img-top"
                  alt="Tarot cơ bản"
                />
                <div className="card-body">
                  <h5 className="card-title">Cách đặt câu hỏi Tarot</h5>
                  <p className="card-text">
                    Quy tắc giúp bài lên đúng vấn đề bạn hỏi.
                  </p>
                  <Link to="/kien-thuc/dat-cau-hoi" className="stretched-link">
                    Đọc bài
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <img
                  src={`${process.env.PUBLIC_URL}/images/banner/numerology.jpg`}
                  className="card-img-top"
                  alt="Thần số học"
                />
                <div className="card-body">
                  <h5 className="card-title">Ý nghĩa số chủ đạo</h5>
                  <p className="card-text">Tự tính – tự hiểu – tự áp dụng.</p>
                  <Link to="/kien-thuc/so-chu-dao" className="stretched-link">
                    Đọc bài
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <img
                  src={`${process.env.PUBLIC_URL}/images/banner/fengshui.jpg`}
                  className="card-img-top"
                  alt="Phong thủy"
                />
                <div className="card-body">
                  <h5 className="card-title">Vật phẩm tâm linh</h5>
                  <p className="card-text">
                    Chọn đá, thác khói trầm, khăn trải hợp mệnh.
                  </p>
                  <Link to="/kien-thuc/vat-pham" className="stretched-link">
                    Đọc bài
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-5 bg-primary text-light">
        <div className="container text-center">
          <h2 className="fw-bold mb-3">
            Muốn tích hợp trải bài Tarot vào web React?
          </h2>
          <p className="mb-4">
            Dùng sẵn component <code>TarotMienPhiMotLa</code> trong dự án và
            dataset 78 lá.
          </p>
          <Link to="/lien-he" className="btn btn-light btn-lg">
            Liên hệ
          </Link>
        </div>
      </section>
    </div>
  );
};

export default TrangChu;
