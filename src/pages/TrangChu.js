function TrangChu() {
  return (
    <>
      {/* HERO */}
      <section className="bg-dark text-light py-5">
        <div className="container py-4">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <p className="text-uppercase text-warning mb-2 fw-semibold">
                Nền tảng Khoa học Tâm linh
              </p>
              <h1 className="display-5 fw-bold mb-3">
                Hiểu bản thân, hoá giải vấn đề, kích hoạt năng lượng tốt.
              </h1>
              <p className="lead mb-4">
                Tarot AI, Bản đồ sao, Thần số học, Phong thuỷ — gom về một nơi.
                Phù hợp với flow hệ thống web của cậu.
              </p>
              <div className="d-flex gap-2 flex-wrap">
                <a href="/dich-vu" className="btn btn-warning btn-lg">
                  Bắt đầu xem ngay
                </a>
                <a href="/kien-thuc" className="btn btn-outline-light btn-lg">
                  Xem kiến thức miễn phí
                </a>
              </div>
            </div>
            <div className="col-lg-6 mt-4 mt-lg-0">
              <div className="card border-0 shadow-lg">
                <div className="card-body p-4">
                  <h5 className="card-title mb-3">Xem nhanh hôm nay</h5>
                  <p className="text-muted mb-2">
                    Chọn một công cụ để hệ thống gợi ý cho bạn.
                  </p>
                  <div className="d-grid gap-2">
                    <a
                      href="/dich-vu?tool=tarot"
                      className="btn btn-outline-primary"
                    >
                      🔮 Xem Tarot nhanh (3 lá)
                    </a>
                    <a
                      href="/dich-vu?tool=chom-sao"
                      className="btn btn-outline-success"
                    >
                      🌌 Bản đồ sao cá nhân
                    </a>
                    <a
                      href="/dich-vu?tool=thansohoc"
                      className="btn btn-outline-dark"
                    >
                      🧮 Thần số học theo ngày sinh
                    </a>
                  </div>
                  <p className="text-muted small mt-3 mb-0">
                    * Một số tính năng cần đăng nhập và có Linh Tệ.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK SERVICES */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="h3 text-center mb-4">Dịch vụ nổi bật</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Tarot / Oracle</h5>
                  <p className="card-text">
                    Giải đáp nhanh về tình cảm, công việc, tài chính, định
                    hướng.
                  </p>
                  <a href="/dich-vu#tarot" className="btn btn-sm btn-primary">
                    Xem chi tiết
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Chiêm tinh / Bản đồ sao</h5>
                  <p className="card-text">
                    Phân tích tính cách, vòng đời và các mốc quan trọng.
                  </p>
                  <a
                    href="/dich-vu#chiem-tinh"
                    className="btn btn-sm btn-primary"
                  >
                    Xem chi tiết
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Thần số học</h5>
                  <p className="card-text">
                    Đọc đường đời, sứ mệnh và năng lượng chủ đạo từ ngày sinh.
                  </p>
                  <a
                    href="/dich-vu#than-so-hoc"
                    className="btn btn-sm btn-primary"
                  >
                    Xem chi tiết
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO 2 CỘT */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center gy-4">
            <div className="col-lg-6">
              <h2 className="h3 mb-3">Tại sao làm thành hệ thống web?</h2>
              <p>
                Vì cậu đang build 1 hệ thống nhiều dịch vụ (Tarot, Bản đồ sao,
                Shop, Blog), nên cần 1 trang chủ đóng vai trò landing: dẫn user
                đi đúng nơi.
              </p>
              <ul className="list-unstyled">
                <li>✅ Điều hướng rõ: Dịch vụ / Kiến thức / Cửa hàng</li>
                <li>✅ Có chỗ upsell Linh Tệ sau này</li>
                <li>✅ Tách content và code được</li>
              </ul>
            </div>
            <div className="col-lg-6">
              <div className="ratio ratio-16x9 rounded overflow-hidden shadow-sm">
                <iframe
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Video giới thiệu"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-5 bg-primary text-light text-center">
        <div className="container">
          <h2 className="h3 mb-3">Muốn tích hợp AI Tarot / AI Horoscope?</h2>
          <p className="mb-4">
            Hệ thống đã chuẩn bị sẵn cấu trúc front-end. Chỉ cần nối API là
            chạy.
          </p>
          <a href="/lien-he" className="btn btn-light btn-lg">
            Liên hệ triển khai
          </a>
        </div>
      </section>
    </>
  );
}

export default TrangChu;
