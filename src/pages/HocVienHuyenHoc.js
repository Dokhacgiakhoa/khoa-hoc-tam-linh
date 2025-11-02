import React from "react";
import "./HocVienHuyenHoc.css";

const HocVienHuyenHoc = () => {
  return (
    <div className="academy-page">
      {/* Hero / Banner */}
      <section className="academy-hero">
        <div className="academy-hero-overlay"></div>
        <div className="academy-hero-content container">
          <p className="breadcrumbs">Trang chủ / Học viện Huyền học</p>
          <h1>Học viện Huyền học ✴️</h1>
          <p className="subtitle">
            Hệ thống đào tạo theo <strong>Ngũ Huyền Thuật</strong> – Mệnh,
            Tướng, Bốc, Trạch, Số – từ nền tảng đến hành giả, có chứng chỉ nội
            bộ hệ thống
            <span className="brand"> Khoa học Tâm linh</span>.
          </p>
          <div className="hero-actions">
            <button className="btn-primary">Đăng ký học viện</button>
            <button className="btn-ghost">Xem cấu trúc chương trình</button>
          </div>
        </div>
      </section>

      {/* Layout main */}
      <div className="academy-layout container">
        {/* Left sticky nav */}
        <aside className="academy-sidebar">
          <div className="sidebar-card">
            <h3>Danh mục học thuật</h3>
            <ul>
              <li>
                <a href="#gioi-thieu">Giới thiệu học viện</a>
              </li>
              <li>
                <a href="#ngu-huyen-thuat">Sơ đồ Ngũ Huyền Thuật</a>
              </li>
              <li>
                <a href="#bo-mon-men h">MỆNH</a>
              </li>
              <li>
                <a href="#bo-mon-tuong">TƯỚNG</a>
              </li>
              <li>
                <a href="#bo-mon-boc">BỐC</a>
              </li>
              <li>
                <a href="#bo-mon-trach">TRẠCH</a>
              </li>
              <li>
                <a href="#bo-mon-so">SỐ</a>
              </li>
              <li>
                <a href="#cap-bac-hoc-vien">Cấp bậc học viên</a>
              </li>
              <li>
                <a href="#cta-dang-ky">Đăng ký tham gia</a>
              </li>
            </ul>
          </div>

          <div className="sidebar-card secondary">
            <h4>Thông tin nhanh</h4>
            <p>
              Lớp mới mở định kỳ: <strong>Thứ 3 – Thứ 7</strong>
            </p>
            <p>
              Hình thức: <strong>Online + Tài liệu PDF</strong>
            </p>
            <p>
              Liên hệ: <strong>0799 958 589</strong>
            </p>
          </div>
        </aside>

        {/* Content */}
        <main className="academy-content">
          {/* Giới thiệu */}
          <section id="gioi-thieu" className="academy-section">
            <h2>Giới thiệu Học viện</h2>
            <p>
              Học viện Huyền học thuộc hệ thống{" "}
              <strong>Khoa học Tâm linh</strong> được thiết kế để gom toàn bộ
              tri thức huyền học Đông – Tây vào một cấu trúc rõ ràng,{" "}
              <strong>học được – thực hành được – ứng dụng được</strong>.
            </p>
            <p>
              Toàn bộ chương trình xoay quanh 5 trụ chính của Ngũ Huyền Thuật:
              Mệnh – Tướng – Bốc – Trạch – Số. Mỗi trụ có các chuyên đề, lớp cơ
              bản – nâng cao, thực hành và hướng đạo để học viên đi xa hơn, đồng
              thời đồng bộ với hệ <strong>2FA + Ví Linh Tệ</strong> của tài
              khoản người dùng (phần này cậu đã cấu hình trong Trang Tài khoản).
            </p>
          </section>

          {/* Sơ đồ Ngũ Huyền Thuật */}
          <section id="ngu-huyen-thuat" className="academy-section">
            <div className="section-header-inline">
              <h2>Sơ đồ Ngũ Huyền Thuật</h2>
              <span className="section-pill">Core system</span>
            </div>
            <p>
              5 bộ môn chạy song song, học viên có thể bắt đầu từ Mệnh hoặc Bốc
              tuỳ mục đích (tư vấn – xem – khai mở – hành nghề).
            </p>

            <div className="five-pillars">
              <div className="pillar-card m">
                <h3>1. MỆNH</h3>
                <p>Tử Vi, Bát Tự – Tứ Trụ, Thần Số Học, Ngũ Hành – Can Chi.</p>
                <span className="status success">Hoàn thiện ~60%</span>
              </div>
              <div className="pillar-card t">
                <h3>2. TƯỚNG</h3>
                <p>Nhân tướng, Thủ tướng, Tướng tâm lý, Hình tướng.</p>
                <span className="status warning">Hoàn thiện ~50%</span>
              </div>
              <div className="pillar-card b">
                <h3>3. BỐC</h3>
                <p>Tarot, Bài Tây, Kinh Dịch thực hành, Lục Hào.</p>
                <span className="status success">Hoàn thiện ~80%</span>
              </div>
              <div className="pillar-card tr">
                <h3>4. TRẠCH</h3>
                <p>
                  Phong Thuỷ Bát Trạch, Huyền Không, Dương trạch – Âm trạch.
                </p>
                <span className="status danger">Hoàn thiện ~40%</span>
              </div>
              <div className="pillar-card s">
                <h3>5. SỐ</h3>
                <p>Kỳ Môn Độn Giáp, Bát Cực Linh Số, Thái Ất, 64 Quẻ.</p>
                <span className="status success">Hoàn thiện ~65%</span>
              </div>
            </div>
          </section>

          {/* MỆNH */}
          <section id="bo-mon-men h" className="academy-section">
            <div className="section-header-inline">
              <h2>📍 Bộ môn MỆNH</h2>
              <span className="section-pill violet">Nền tảng mệnh lý</span>
            </div>
            <p>
              Dạy cách đọc vận trình đời người, gốc mệnh, chu kỳ, ứng dụng chọn
              nghề, đối tác, thời điểm hành động.
            </p>
            <div className="topic-grid">
              <div className="topic-card">
                <h3>Tử Vi Đẩu Số</h3>
                <p>Lá số, cung mệnh, sao, đại hạn, tiểu hạn.</p>
              </div>
              <div className="topic-card">
                <h3>Bát Tự / Tứ Trụ</h3>
                <p>Giờ – ngày – tháng – năm sinh, đại vận, lưu niên.</p>
              </div>
              <div className="topic-card">
                <h3>Thần Số Học</h3>
                <p>Số chủ đạo, số linh hồn, sứ mệnh, biểu đồ ngày sinh.</p>
              </div>
              <div className="topic-card">
                <h3>Ngũ Hành – Can Chi</h3>
                <p>Hợp – khắc – dụng thần, nguyên lý ứng dụng.</p>
              </div>
            </div>
          </section>

          {/* TƯỚNG */}
          <section id="bo-mon-tuong" className="academy-section">
            <div className="section-header-inline">
              <h2>📍 Bộ môn TƯỚNG</h2>
              <span className="section-pill violet">Ứng dụng nhân tướng</span>
            </div>
            <p>
              Giải mã hình tướng, khí sắc, tướng vận để tư vấn nhân sự, đối tác,
              khách hàng. Có thể gắn với ảnh minh họa (cậu đã lưu là “đã có hình
              minh họa”).
            </p>
            <div className="topic-grid">
              <div className="topic-card">
                <h3>Nhân Tướng Học</h3>
                <p>Diện mạo, ngũ quan, hình – khí – thần.</p>
              </div>
              <div className="topic-card">
                <h3>Thủ Tướng / Chỉ Tay</h3>
                <p>Tay – chỉ – gò – đường tiền tài.</p>
              </div>
              <div className="topic-card">
                <h3>Tướng Tâm Lý</h3>
                <p>Kết nối hành vi – tính cách – tướng.</p>
              </div>
            </div>
          </section>

          {/* BỐC */}
          <section id="bo-mon-boc" className="academy-section">
            <div className="section-header-inline">
              <h2>📍 Bộ môn BỐC</h2>
              <span className="section-pill violet">Thực hành tiên tri</span>
            </div>
            <p>
              Đây là mảng đã hoàn thiện ~80% (Tarot đã xong, Kinh Dịch & Lục Hào
              đang lên AI). Phù hợp nhất để demo AI Tarot / AI dịch quẻ.
            </p>
            <div className="topic-grid">
              <div className="topic-card">
                <h3>Tarot Học</h3>
                <p>
                  78 lá chuẩn RWS, trải bài, đặt câu hỏi, phân tích năng lượng.
                </p>
              </div>
              <div className="topic-card">
                <h3>Kinh Dịch thực hành</h3>
                <p>64 quẻ, hào từ, quẻ biến, ứng dụng kinh doanh.</p>
              </div>
              <div className="topic-card">
                <h3>Lục Hào</h3>
                <p>Hệ Wen Wang Gua, bói sự việc, thời gian, kết quả.</p>
              </div>
              <div className="topic-card">
                <h3>Bói Quan Âm – Giải mộng</h3>
                <p>Bổ trợ trực giác và hành giả.</p>
              </div>
            </div>
          </section>

          {/* TRẠCH */}
          <section id="bo-mon-trach" className="academy-section">
            <div className="section-header-inline">
              <h2>📍 Bộ môn TRẠCH</h2>
              <span className="section-pill violet">Phong thuỷ không gian</span>
            </div>
            <p>
              Đang chờ AI Feng Shui Planner (cậu có lưu), nên phần này mình để
              dạng module – dễ gắn AI sau.
            </p>
            <div className="topic-grid">
              <div className="topic-card">
                <h3>Phong Thuỷ Bát Trạch</h3>
                <p>Hướng nhà, cung mệnh, bố trí theo mệnh.</p>
              </div>
              <div className="topic-card">
                <h3>Huyền Không Phi Tinh</h3>
                <p>Phi tinh vận 8 – vận 9, lập tinh bàn.</p>
              </div>
              <div className="topic-card">
                <h3>Âm Trạch / Dương Trạch</h3>
                <p>Ứng dụng gia đạo, kinh doanh.</p>
              </div>
            </div>
          </section>

          {/* SỐ */}
          <section id="bo-mon-so" className="academy-section">
            <div className="section-header-inline">
              <h2>📍 Bộ môn SỐ</h2>
              <span className="section-pill violet">Dự đoán cao cấp</span>
            </div>
            <p>
              Dùng tượng số, kỳ môn, thái ất… dành cho học viên đi sâu và dùng
              để tư vấn chuyên nghiệp.
            </p>
            <div className="topic-grid">
              <div className="topic-card">
                <h3>Kỳ Môn Độn Giáp</h3>
                <p>Lập cục, hỏi việc, chọn thời điểm.</p>
              </div>
              <div className="topic-card">
                <h3>Thái Ất Thần Số</h3>
                <p>Dự đoán thời vận dài hạn.</p>
              </div>
              <div className="topic-card">
                <h3>64 Quẻ</h3>
                <p>Chuẩn hoá phần Kinh Dịch với đồ hình.</p>
              </div>
            </div>
          </section>

          {/* Cấp bậc học viên */}
          <section id="cap-bac-hoc-vien" className="academy-section">
            <h2>Cấp bậc học viên</h2>
            <p>
              Lộ trình 5 cấp giống như cậu đã lưu:{" "}
              <strong>
                Tân học → Thực hành → Hành giả → Hướng đạo → Bậc Thầy Huyền
                Thuật
              </strong>
              .
            </p>
            <div className="level-timeline">
              <div className="level-item">
                <span className="level-badge">1</span>
                <h3>Tân học</h3>
                <p>Nhập môn, nắm từ vựng, quy ước, học công cụ.</p>
              </div>
              <div className="level-item">
                <span className="level-badge">2</span>
                <h3>Thực hành</h3>
                <p>Thực hành trải bài, lập lá số, xem tướng cơ bản.</p>
              </div>
              <div className="level-item">
                <span className="level-badge">3</span>
                <h3>Hành giả</h3>
                <p>Ứng dụng vào đời sống, nhận ca thực tế.</p>
              </div>
              <div className="level-item">
                <span className="level-badge">4</span>
                <h3>Hướng đạo</h3>
                <p>Dẫn dắt nhóm, mở lớp nhỏ, mentor.</p>
              </div>
              <div className="level-item">
                <span className="level-badge">5</span>
                <h3>Bậc Thầy Huyền Thuật</h3>
                <p>Được cấp chứng chỉ nội bộ hệ thống.</p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section id="cta-dang-ky" className="academy-section cta-section">
            <div className="cta-box">
              <h2>Tham gia Học viện Huyền học ngay hôm nay</h2>
              <p>
                Hệ thống sẽ kết nối với tài khoản của bạn trong mục{" "}
                <strong>Tài khoản → Học tập</strong> và kích hoạt khoá học tương
                ứng. Có thể thanh toán bằng <strong>Linh Tệ</strong>, COD hoặc
                Momo.
              </p>
              <div className="hero-actions">
                <button className="btn-primary">Đăng ký ngay</button>
                <button className="btn-ghost">Liên hệ hỗ trợ</button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default HocVienHuyenHoc;
