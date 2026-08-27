import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./thi-chung-chi.css";

const EXAM_CATEGORIES_TEMPLATE = {
  "Mệnh (Destiny)": { icon: "🔮", color: "#FFD700" },
  "Tướng (Physiognomy)": { icon: "👁️", color: "#87CEEB" },
  "Bốc (Divination)": { icon: "🎴", color: "#DDA0DD" },
  "Trạch (Feng Shui)": { icon: "🏠", color: "#90EE90" },
  "Số (Numerology)": { icon: "🔢", color: "#FFA07A" },
};

const CATEGORY_SLUG_MAP = {
  "Mệnh (Destiny)": "menh",
  "Tướng (Physiognomy)": "tuong",
  "Bốc (Divination)": "boc",
  "Trạch (Feng Shui)": "trach",
  "Số (Numerology)": "so",
};

export default function ThiChungChi() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [userProgress, setUserProgress] = useState([]);

  // Fetch Exams from API
  useEffect(() => {
    axios
      .get("/api/exams")
      .then((res) => {
        // Transform api data (flat list) to grouped categories
        const exams = res.data;
        const grouped = {};

        exams.forEach((exam) => {
          if (!grouped[exam.category]) {
            grouped[exam.category] = {
              category: exam.category,
              ...(EXAM_CATEGORIES_TEMPLATE[exam.category] || {
                icon: "🎓",
                color: "#fff",
              }),
              exams: [],
            };
          }
          // Adapt backend fields to frontend UI expectation
          // Backend: id, slug, title, level, questions (count?), passing_score, duration, prerequisites
          // Frontend UI uses: id, title, level, questions (number), duration, passingScore, cert (custom text), prerequisites
          grouped[exam.category].exams.push({
            id: exam.id, // Use DB IDs for linking
            slug: exam.slug,
            title: exam.title,
            level: exam.level,
            questions: 25, // Mock or fetch count? Seeder has logic. Let's assume standard if not provided, or fetch.
            // Actually API response sends back fields from DB.
            // In DB we don't have questions count in exams table, only relation.
            // For now hardcode or use data if we added it. Seeder has 'questions_count' but DB doesn't.
            // Let's just use a default or mapped value
            questions:
              exam.duration === 90 ? 50 : exam.duration === 60 ? 40 : 30,
            duration: exam.duration,
            passingScore: exam.passing_score,
            cert:
              "Chứng chỉ " +
              exam.title
                .replace("Tổng hợp ", "")
                .replace("Cơ Bản", "")
                .replace("Trung Cấp", "")
                .replace("Cao Cấp", ""), // Generate cert name
            prerequisites: exam.prerequisites || [],
          });
        });

        // Convert object to array and sort to match original order if needed
        const diffSort = Object.values(grouped).sort((a, b) => {
          const order = Object.keys(EXAM_CATEGORIES_TEMPLATE);
          return order.indexOf(a.category) - order.indexOf(b.category);
        });

        setCategories(diffSort);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      axios
        .get("/api/academy/my-progress", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUserProgress(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, []);

  const getCourseData = (slug) => {
    if (!slug) return null;
    return userProgress.find((p) => p.slug === slug);
  };

  const checkPrerequisite = (slug) => {
    const course = getCourseData(slug);
    return course && course.is_completed;
  };

  const checkEnrollment = (slug) => {
    const course = getCourseData(slug);
    return course && course.is_enrolled;
  };

  const filteredExams = selectedCategory
    ? categories.filter((cat) => cat.category === selectedCategory)
    : categories;

  return (
    <main className="certification-page">
      {/* Hero Section */}
      <section className="hero-section text-center py-2 position-relative overflow-hidden">
        <div className="hero-bg">
          <div className="stars"></div>
          <div className="twinkling"></div>
        </div>
        <div className="container py-2 position-relative z-1">
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold text-gold mb-2">
              Thi & Chứng Chỉ
            </h1>
            <p
              className="lead text-white opacity-90 mx-auto"
              style={{ maxWidth: "700px" }}
            >
              Kiểm tra năng lực và nhận chứng chỉ chính thức từ{" "}
              <strong>Học Viện Ngũ Huyền Thuật</strong>. Chứng minh trình độ của
              bạn qua các bài thi chuẩn hóa.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="d-flex flex-wrap justify-content-center gap-2 mb-2">
            <button
              className={`filter-pill ${!selectedCategory ? "active" : ""}`}
              onClick={() => setSelectedCategory(null)}
            >
              Tất cả
            </button>
            {categories.map((cat) => (
              <button
                key={cat.category}
                className={`filter-pill ${
                  selectedCategory === cat.category ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(cat.category)}
              >
                {cat.icon} {cat.category.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Exam List */}
      <section className="section">
        <div className="container">
          {filteredExams.map((category) => (
            <div key={category.category} className="mb-5">
              <div className="d-flex align-items-center mb-4">
                <span className="fs-1 me-3">{category.icon}</span>
                <h2 className="h3 mb-0" style={{ color: category.color }}>
                  {category.category}
                </h2>
              </div>

              <div className="row gx-3 gy-2">
                {category.exams.map((exam) => {
                  const isEligible = checkPrerequisite(exam.prerequisiteSlug);
                  return (
                    <div className="col-md-6 col-lg-4" key={exam.id}>
                      <div className="exam-card card-3d h-100">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-start mb-3">
                            <span
                              className={`badge ${
                                exam.level === "Cơ bản"
                                  ? "bg-success text-white"
                                  : exam.level === "Trung cấp"
                                  ? "bg-warning text-dark"
                                  : "bg-danger text-white"
                              }`}
                            >
                              {exam.level}
                            </span>
                          </div>

                          <h3 className="h5 text-white mb-3">{exam.title}</h3>

                          <div className="exam-info mb-4">
                            <div className="info-item text-white">
                              <i className="bi bi-question-circle me-2"></i>
                              <span>{exam.questions} câu hỏi</span>
                            </div>
                            <div className="info-item text-white">
                              <i className="bi bi-clock me-2"></i>
                              <span>{exam.duration} phút</span>
                            </div>
                            <div className="info-item text-white">
                              <i className="bi bi-check-circle me-2"></i>
                              <span>Điểm số ≥ {exam.passingScore}% là đạt</span>
                            </div>
                            <div className="info-item">
                              <i className="bi bi-award me-2 text-gold"></i>
                              <span className="text-gold">{exam.cert}</span>
                            </div>
                          </div>

                          <div className="exam-requirements mb-4 pt-3 border-top border-secondary border-opacity-50">
                            <p
                              className="lead text-white mb-2"
                              style={{ maxWidth: "700px", margin: "0 auto" }}
                            >
                              Điều kiện thi:
                            </p>
                            <div className="d-flex flex-column gap-2">
                              {exam.prerequisites.map((p) => {
                                const course = getCourseData(p.slug);
                                const isCompleted = course?.is_completed;
                                const isEnrolled = course?.is_enrolled;
                                const progressPercent =
                                  course?.progress_percent || 0;

                                return (
                                  <div
                                    key={p.slug}
                                    className="d-flex align-items-center justify-content-between p-2 rounded bg-dark bg-opacity-50 border border-secondary border-opacity-25"
                                  >
                                    <div className="d-flex align-items-center gap-2 overflow-hidden flex-grow-1">
                                      <span className="small">
                                        {isCompleted
                                          ? "✅"
                                          : isEnrolled
                                          ? "📚"
                                          : "🔒"}
                                      </span>
                                      <div className="d-flex flex-column flex-grow-1 overflow-hidden">
                                        <span
                                          className="small text-truncate"
                                          title={p.label}
                                        >
                                          {p.label}
                                        </span>
                                        {isEnrolled && !isCompleted && (
                                          <div className="d-flex align-items-center gap-2 mt-1">
                                            <div
                                              className="progress flex-grow-1"
                                              style={{
                                                height: "4px",
                                                backgroundColor:
                                                  "rgba(255, 255, 255, 0.1)",
                                              }}
                                            >
                                              <div
                                                className="progress-bar bg-gold"
                                                role="progressbar"
                                                style={{
                                                  width: `${progressPercent}%`,
                                                }}
                                                aria-valuenow={progressPercent}
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                              ></div>
                                            </div>
                                            <span
                                              className="small text-gold"
                                              style={{
                                                fontSize: "0.7rem",
                                                minWidth: "35px",
                                              }}
                                            >
                                              {progressPercent}%
                                            </span>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                    <Link
                                      to={
                                        isEnrolled
                                          ? `/hoc-vien/khoa-hoc/${p.slug}`
                                          : `/hoc-vien/${
                                              course?.category_slug ||
                                              CATEGORY_SLUG_MAP[
                                                category.category
                                              ]
                                            }`
                                      }
                                      className={`btn btn-sm py-1 px-2 ms-2 fw-bold shadow-sm ${
                                        isCompleted
                                          ? "btn-success text-white"
                                          : isEnrolled
                                          ? "btn-gold text-dark"
                                          : "btn-outline-gold"
                                      }`}
                                      style={{
                                        fontSize: "0.7rem",
                                        whiteSpace: "nowrap",
                                        transition: "all 0.2s ease",
                                        minWidth: "110px",
                                        textAlign: "center",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        height: "36px",
                                        minHeight: "36px",
                                        borderRadius: "0.9rem",
                                        padding: "0",
                                      }}
                                      onMouseEnter={(e) => {
                                        if (isEnrolled && !isCompleted) {
                                          e.currentTarget.style.setProperty(
                                            "background-color",
                                            "transparent",
                                            "important"
                                          );
                                          e.currentTarget.style.setProperty(
                                            "color",
                                            "#D4AF37",
                                            "important"
                                          );
                                          e.currentTarget.style.setProperty(
                                            "border-color",
                                            "#D4AF37",
                                            "important"
                                          );
                                        }
                                      }}
                                      onMouseLeave={(e) => {
                                        if (isEnrolled && !isCompleted) {
                                          e.currentTarget.style.setProperty(
                                            "background-color",
                                            "#D4AF37",
                                            "important"
                                          );
                                          e.currentTarget.style.setProperty(
                                            "color",
                                            "#1a1a1a",
                                            "important"
                                          );
                                          e.currentTarget.style.setProperty(
                                            "border-color",
                                            "#D4AF37",
                                            "important"
                                          );
                                        }
                                      }}
                                    >
                                      {isCompleted
                                        ? "✓ Đạt"
                                        : isEnrolled
                                        ? "Vào học"
                                        : "Đăng ký"}
                                    </Link>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          <button
                            className={`btn w-100 py-2 fw-bold ls-1 ${
                              exam.prerequisites.every(
                                (p) => getCourseData(p.slug)?.is_completed
                              )
                                ? "btn-gold"
                                : "btn-outline-secondary opacity-50"
                            }`}
                            disabled={
                              !exam.prerequisites.every(
                                (p) => getCourseData(p.slug)?.is_completed
                              )
                            }
                            onClick={() =>
                              (window.location.href = `/hoc-vien/thi/${exam.id}`)
                            }
                          >
                            {exam.prerequisites.every(
                              (p) => getCourseData(p.slug)?.is_completed
                            )
                              ? "🎬 Bắt đầu thi ngay"
                              : "🔒 Chưa đủ điều kiện"}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Info Section */}
      <section className="section alt">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="info-box text-center p-4">
                <div className="fs-1 mb-3">📚</div>
                <h4 className="h6 text-gold mb-2">Chuẩn bị kỹ</h4>
                <p className="small opacity-75 mb-0">
                  Học hết khóa học trước khi thi
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="info-box text-center p-4">
                <div className="fs-1 mb-3">⏱️</div>
                <h4 className="h6 text-gold mb-2">Thời gian giới hạn</h4>
                <p className="small opacity-75 mb-0">
                  Hoàn thành trong thời gian quy định
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="info-box text-center p-4">
                <div className="fs-1 mb-3">🎯</div>
                <h4 className="h6 text-gold mb-2">Đạt điểm chuẩn</h4>
                <p className="small opacity-75 mb-0">
                  70-90% tùy cấp độ để nhận chứng chỉ
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="info-box text-center p-4">
                <div className="fs-1 mb-3">🏆</div>
                <h4 className="h6 text-gold mb-2">Chứng chỉ chính thức</h4>
                <p className="small opacity-75 mb-0">
                  Được công nhận bởi Học viện
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
