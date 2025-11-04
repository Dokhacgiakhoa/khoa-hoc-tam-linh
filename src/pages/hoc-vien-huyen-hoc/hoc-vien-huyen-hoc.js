import React from "react";
import { Link } from "react-router-dom";
import "./hoc-vien-huyen-hoc.css";

/**
 * File: src/pages/hoc-vien-huyen-hoc/hoc-vien-huyen-hoc.js
 * Asset gợi ý (đặt trong public/):
 * - /media/academy/hero-academy.webp
 * - /media/academy/menh.webp
 * - /media/academy/tuong.webp
 * - /media/academy/boc.webp
 * - /media/academy/trach.webp
 * - /media/academy/so.webp
 */

const TRACKS = [
  {
    key: "boc",
    name: "BỐC",
    desc: "Hệ thống bói toán & trực giác: Tarot, Bài Tây, Kinh Dịch thực hành, Lục Hào, Bói Quan Âm – Giải mộng.",
    progress: 80,
    img: "/images/banners/boc-huyen-thuat.png",
    topics: [
      "Tarot học",
      "Bói bài Tây",
      "Kinh Dịch thực hành",
      "Lục Hào",
      "Giải mộng",
    ],
  },
  {
    key: "so",
    name: "SỐ",
    desc: "Tượng số học & dự đoán thời vận: 64 Quẻ Kinh Dịch, Kỳ Môn Độn Giáp, Bát Cực Linh Số, Thái Ất, Đại Lục Nhâm.",
    progress: 65,
    img: "/images/banners/so-huyen-thuat.png",
    topics: ["64 Quẻ", "Kỳ Môn", "Bát Cực", "Thái Ất", "Đại Lục Nhâm"],
  },
  {
    key: "menh",
    name: "MỆNH",
    desc: "Mệnh lý & chu kỳ đời người: Tử Vi, Bát Tự/Tứ Trụ, Thần Số Học, Ngũ Hành – Can Chi – Cung Mệnh.",
    progress: 60,
    img: "/images/banners/menh-huyen-thuat.png",
    topics: ["Tử Vi", "Bát Tự", "Thần Số", "Ngũ Hành – Can Chi"],
  },
  {
    key: "tuong",
    name: "TƯỚNG",
    desc: "Giải mã hình tướng & khí sắc: Nhân tướng, Thủ tướng/Chỉ tay, Hình tướng – Thần thái, Tướng tâm lý.",
    progress: 50,
    img: "/images/banners/tuong-huyen-thuat.png",
    topics: ["Nhân tướng", "Chỉ tay", "Thần thái", "Tướng tâm lý"],
  },
  {
    key: "trach",
    name: "TRẠCH",
    desc: "Phong thủy – không gian & năng lượng: Bát trạch, Huyền không phi tinh, Bagua, Âm trạch/Dương trạch.",
    progress: 40,
    img: "/images/banners/trach-huyen-thuat.png",
    topics: ["Bát Trạch", "Huyền Không", "Bagua", "Âm/Dương trạch"],
  },
];

/** ✅ LỘ TRÌNH MỚI */
const LEVELS = [
  {
    code: "nhap-mon-hoc-do",
    name: "Nhập Môn Học Đồ",
    desc: "Làm quen nền tảng – thuật ngữ – khái niệm cốt lõi Ngũ Huyền Thuật.",
  },
  {
    code: "so-cap-hoc-gia",
    name: "Sơ Cấp Học Giả",
    desc: "Thực hành cơ bản – bài mẫu – case thực tế – luận ngắn có hướng dẫn.",
  },
  {
    code: "trung-cap-luan-gia",
    name: "Trung Cấp Luận Giả",
    desc: "Dự án nhỏ – nhật ký nghiên cứu – phản biện & ứng dụng thực tế.",
  },
  {
    code: "cao-cap-dao-su",
    name: "Cao Cấp Đạo Sư",
    desc: "Mentor – huấn luyện nhóm – hướng dẫn đề tài & lớp học.",
  },
  {
    code: "giao-su-huyen-hoc",
    name: "Giáo Sư Huyền Học",
    desc: "Luận án – công bố tri thức – đào tạo & giám định chứng chỉ.",
  },
];

function HocVienHuyenHoc() {
  return (
    <main id="hoc-vien-huyen-hoc" className="khctl-page">
      {/* HERO */}
      <section className="academy-hero">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-7">
              <h1 className="academy-title">Học viện Huyền học</h1>
              <p className="academy-sub">
                Hệ thống đào tạo theo <strong>Ngũ Huyền Thuật</strong>:
                <span className="d-inline-block ms-1">
                  Mệnh – Tướng – Bốc – Trạch – Số
                </span>
                . Lộ trình rõ ràng, minh bạch, dựa trên dữ liệu & tư duy kiểm
                chứng.
              </p>
              <div className="d-flex gap-3 flex-wrap mt-3">
                <a href="#lo-trinh" className="btn btn-gold">
                  Xem lộ trình
                </a>
                <Link to="/tai-khoan" className="btn btn-outline-gold">
                  Đăng ký / Đăng nhập
                </Link>
              </div>
              <p className="small text-muted mt-2">
                * Khuyến nghị bật 2FA trong Tài khoản để bảo vệ dữ liệu học tập.
              </p>
            </div>
            <div className="col-lg-5">
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/images/banners/hoc-vien-huyen-hoc-banner.png"
                }
                alt="Học viện Huyền học"
                className="img-fluid rounded-4 shadow-soft academy-hero-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* NGŨ HUYỀN THUẬT */}
      <section id="ngu-huyen-thuat" className="section academy-tracks">
        <div className="container">
          <div className="section-head text-center">
            <h2 className="section-title">Ngũ Huyền Thuật</h2>
            <p className="section-desc">
              Chọn một bộ môn để bắt đầu. Mỗi bộ môn có tài liệu, bài tập và dự
              án nhỏ tương ứng.
            </p>
          </div>

          <div className="row g-4">
            {TRACKS.map((t) => (
              <div className="col-12 col-md-6 col-xl-4" key={t.key}>
                <article className="card-3d h-100 track-card">
                  <div className="track-media">
                    <img
                      src={process.env.PUBLIC_URL + t.img}
                      alt={t.name}
                      className="track-img"
                      loading="lazy"
                    />
                    <span className="track-badge">{t.name}</span>
                  </div>

                  <div className="card-body">
                    <p className="track-desc">{t.desc}</p>

                    <ul className="track-list">
                      {t.topics.map((tp) => (
                        <li key={tp}>{tp}</li>
                      ))}
                    </ul>

                    <div className="progress mb-2">
                      <div
                        className="progress-bar progress-bar-gold"
                        role="progressbar"
                        style={{ width: `${t.progress}%` }}
                        aria-valuenow={t.progress}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      />
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="progress-label">
                        {t.progress}% hoàn thiện
                      </span>
                      <Link to="/tai-khoan" className="btn btn-sm btn-gold">
                        Bắt đầu học
                      </Link>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LỘ TRÌNH CẤP BẬC */}
      <section id="lo-trinh" className="section academy-levels alt">
        <div className="container">
          <div className="section-head text-center">
            <h2 className="section-title">Lộ trình cấp bậc</h2>
            <p className="section-desc">
              Tiến trình từ <strong>Nhập Môn Học Đồ</strong> đến{" "}
              <strong>Giáo Sư Huyền Học</strong> – tăng dần chiều sâu kiến thức
              & mức độ thực hành.
            </p>
          </div>

          <div className="levels-wrap">
            {LEVELS.map((lv, idx) => (
              <div className="level-step" key={lv.code}>
                <div className="level-index">{idx + 1}</div>
                <div className="level-body">
                  <h3 className="level-name">{lv.name}</h3>
                  <p className="level-desc">{lv.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-3">
            <Link to="/tai-khoan" className="btn btn-gold">
              Đăng ký Học viện
            </Link>
            <Link to="/tai-khoan" className="btn btn-outline-gold ms-2">
              Xem chương trình học
            </Link>
          </div>
        </div>
      </section>

      {/* KHÓA HỌC GỢI Ý (mock) */}
      <section id="goi-y" className="section academy-courses">
        <div className="container">
          <div className="section-head text-center">
            <h2 className="section-title">Khóa học gợi ý</h2>
            <p className="section-desc">
              Một vài khóa nhập môn để bạn khởi động nhanh (mock data).
            </p>
          </div>

          <div className="row g-4">
            {[
              {
                id: "c1",
                name: "Tarot căn bản 7 ngày",
                tag: "BỐC",
                img: "/images/banners/boc-huyen-thuat.png",
              },
              {
                id: "c2",
                name: "Ngũ Hành – Can Chi nền tảng",
                tag: "MỆNH",
                img: "/images/banners/menh-huyen-thuat.png",
              },
              {
                id: "c3",
                name: "Phong thủy Bát Trạch 101",
                tag: "TRẠCH",
                img: "/images/banners/trach-huyen-thuat.png",
              },
            ].map((c) => (
              <div className="col-12 col-md-6 col-xl-4" key={c.id}>
                <article className="card-3d h-100 course-card">
                  <div className="course-media">
                    <img
                      src={process.env.PUBLIC_URL + c.img}
                      alt={c.name}
                      className="course-img"
                      loading="lazy"
                    />
                    <span className="course-tag">{c.tag}</span>
                  </div>
                  <div className="card-body">
                    <h3 className="course-name">{c.name}</h3>
                    <p className="course-desc">
                      Lộ trình ngắn – tập trung thực hành – kiểm tra nhanh cuối
                      khóa.
                    </p>
                    <div className="d-flex gap-2">
                      <Link to="/tai-khoan" className="btn btn-sm btn-gold">
                        Đăng ký
                      </Link>
                      <Link
                        to="/tai-khoan"
                        className="btn btn-sm btn-outline-gold"
                      >
                        Xem chi tiết
                      </Link>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>

          <p className="text-center small text-muted mt-3">
            * Nội dung chi tiết và bài kiểm tra sẽ đồng bộ dần theo tiến độ phát
            triển từng bộ môn.
          </p>
        </div>
      </section>

      {/* FAQ NGẮN */}
      <section id="faq" className="section academy-faq alt">
        <div className="container">
          <div className="section-head text-center">
            <h2 className="section-title">Câu hỏi thường gặp</h2>
          </div>

          <div className="row g-4">
            <div className="col-12 col-md-6">
              <div className="faq-item">
                <h4>Học viện có cấp chứng chỉ không?</h4>
                <p>
                  Hệ thống có lộ trình thi & chứng chỉ cho từng bộ môn. Thông
                  tin sẽ công bố theo đợt.
                </p>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="faq-item">
                <h4>Tôi có thể học nhiều bộ môn song song?</h4>
                <p>
                  Được. Tuy nhiên khuyến nghị tập trung 1–2 bộ môn theo lộ trình
                  để đạt hiệu quả cao hơn.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-2">
            <Link to="/lien-he" className="btn btn-outline-gold">
              Liên hệ tư vấn
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HocVienHuyenHoc;
