import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./hoc-vien-huyen-hoc.css";

const LEVELS = [
  {
    code: "nhap-mon",
    name: "Nhập Môn Học Đồ",
    desc: "Làm quen nền tảng - thuật ngữ Ngũ Huyền Thuật.",
  },
  {
    code: "so-cap",
    name: "Sơ Cấp Học Giả",
    desc: "Thực hành cơ bản - bài mẫu - case thực tế.",
  },
  {
    code: "trung-cap",
    name: "Trung Cấp Luận Giả",
    desc: "Dự án nhỏ - nhật ký nghiên cứu - ứng dụng.",
  },
  {
    code: "cao-cap",
    name: "Cao Cấp Đạo Sư",
    desc: "Mentor - huấn luyện nhóm - hướng dẫn đề tài.",
  },
  {
    code: "giao-su",
    name: "Giáo Sư Huyền Học",
    desc: "Luận án - đào tạo & cấp chứng chỉ.",
  },
];

function HocVienHuyenHoc() {
  const { topic } = useParams();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/academy/categories")
      .then((res) => {
        setCategories(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi tải danh mục học viện:", err);
        setLoading(false);
      });
  }, []);

  const getCategoryImage = (cat) => {
    if (cat.image) {
      return (process.env.PUBLIC_URL || "") + cat.image;
    }
    // Fallback if no image in DB (though seeder ensures it)
    const images = {
      menh: "/images/banners/menh-huyen-thuat.png",
      tuong: "/images/banners/tuong-huyen-thuat.png",
      boc: "/images/banners/boc-huyen-thuat.png",
      trach: "/images/banners/trach-huyen-thuat.png",
      so: "/images/banners/so-huyen-thuat.png",
    };
    return (
      (process.env.PUBLIC_URL || "") +
      (images[cat.slug] || "/images/banners/hoc-vien-huyen-hoc-banner.png")
    );
  };

  return (
    <main id="hoc-vien-huyen-hoc" className="khctl-page">
      <section className="academy-hero">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-7">
              <h1 className="academy-title text-gradient">
                Học Viện Ngũ Huyền Thuật
              </h1>
              <p className="academy-sub">
                Hệ thống đào tạo theo 5 nhóm:{" "}
                <strong>Mệnh – Tướng – Bốc – Trạch – Số</strong>. Lộ trình rõ
                ràng từ Học đồ đến Giáo sư, thấu hiểu quy luật vũ trụ qua tri
                thức kiểm chứng.
              </p>
              <div className="d-flex gap-3 mt-4">
                <a href="#ngu-huyen-thuat" className="btn btn-gold px-4">
                  Bắt Đầu Học
                </a>
                <a href="#lo-trinh" className="btn btn-outline-gold px-4">
                  Xem Lộ Trình
                </a>
              </div>
            </div>
            <div className="col-lg-5 text-center">
              <img
                src={
                  (process.env.PUBLIC_URL || "") +
                  "/images/banners/hoc-vien-huyen-hoc-banner.png"
                }
                alt="Academy"
                className="img-fluid rounded-circle shadow-gold animate-float"
                style={{ maxWidth: "80%" }}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="ngu-huyen-thuat" className="section academy-tracks">
        <div className="container">
          <div className="section-head text-center mb-5">
            <h2 className="section-title">Các Chuyên Khoa Đào Tạo</h2>
            <p className="section-desc">
              Chọn con đường tu tập và nghiên cứu phù hợp với bạn.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-gold"></div>
            </div>
          ) : (
            <div className="row g-4">
              {categories.map((cat) => (
                <div className="col-12 col-md-6 col-lg-4" key={cat.id}>
                  <article className="card-3d h-100 track-card overflow-hidden">
                    <div className="track-media position-relative">
                      <img
                        src={getCategoryImage(cat)}
                        alt={cat.name}
                        className="track-img"
                      />
                    </div>
                    <div className="card-body">
                      <h3 className="h4 text-gold mb-2">{cat.name}</h3>
                      <p className="small opacity-75 mb-4">{cat.description}</p>
                      <div className="d-flex justify-content-between align-items-center border-top border-secondary pt-3">
                        <span className="small">
                          {cat.courses_count} Khóa học
                        </span>
                        <Link
                          to={`/hoc-vien/${cat.slug}`}
                          className="btn btn-sm btn-gold"
                        >
                          Khám phá &rarr;
                        </Link>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="lo-trinh" className="section academy-levels alt">
        <div className="container">
          <div className="section-head text-center mb-5">
            <h2 className="section-title">Bậc Thang Tri Thức</h2>
            <p className="section-desc">
              Hệ thống cấp bậc phản ánh chiều sâu tu tập và khả năng ứng dụng
              thực tế.
            </p>
          </div>
          <div className="levels-wrap">
            {LEVELS.map((lv, idx) => (
              <div className="level-step mb-4" key={lv.code}>
                <div className="level-index shadow-gold">{idx + 1}</div>
                <div className="level-body glass-card p-3">
                  <h4 className="text-gold mb-1">{lv.name}</h4>
                  <p className="small mb-0 opacity-75">{lv.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KHÓA HỌC NỔI BẬT */}
      <section className="section academy-featured">
        <div className="container text-center">
          <h2 className="section-title text-gold mb-5">Khóa Học Tâm Điểm</h2>
          <div className="row g-4 text-start">
            <FeaturedCourse
              title="Tử Vi Nhập Môn"
              desc="Học cách an sao và hiểu về bản mệnh 12 cung."
              slug="tu-vi-nhap-mon"
              level="Cơ bản"
              image="/images/courses/tu-vi.png"
            />
            <FeaturedCourse
              title="Tarot Chuyên Sâu"
              desc="Làm chủ 78 lá bài và phương pháp kết nối trực giác."
              slug="tarot-chuyen-sau"
              level="Trung cấp"
              image="/images/courses/tarot.png"
            />
            <FeaturedCourse
              title="Thần Số Học Pytago"
              desc="Giải mã các con số ngày sinh và tên gọi."
              slug="than-so-hoc-pytago"
              level="Cơ bản"
              image="/images/courses/than-so-hoc.png"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function FeaturedCourse({ title, desc, slug, level, image }) {
  return (
    <div className="col-lg-4">
      <div className="card-3d h-100 overflow-hidden d-flex flex-column">
        {image && (
          <div
            className="featured-media"
            style={{ height: "160px", overflow: "hidden" }}
          >
            <img
              src={(process.env.PUBLIC_URL || "") + image}
              alt={title}
              className="w-100 h-100 object-fit-cover transition-all hover-scale"
            />
          </div>
        )}
        <div className="p-4 d-flex flex-column flex-grow-1">
          <span className="badge bg-gold text-dark mb-3 w-fit">{level}</span>
          <h4 className="text-white mb-2">{title}</h4>
          <p className="small opacity-75 mb-4 flex-grow-1">{desc}</p>
          <Link
            to={`/hoc-vien/khoa-hoc/${slug}`}
            className="btn btn-sm btn-outline-gold"
          >
            Học ngay &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HocVienHuyenHoc;
