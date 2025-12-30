import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./thi-chung-chi.css";

const EXAMS = [
  {
    category: "Mệnh (Destiny)",
    icon: "🔮",
    color: "#FFD700",
    exams: [
      {
        id: "menh-basic",
        title: "Tử Vi Cơ Bản",
        level: "Cơ bản",
        questions: 30,
        duration: 45,
        passingScore: 70,
        cert: "Học đồ Tử Vi",
        prerequisiteSlug: "tu-vi-nhap-mon",
      },
      {
        id: "menh-inter",
        title: "Bát Tự Trung Cấp",
        level: "Trung cấp",
        questions: 40,
        duration: 60,
        passingScore: 75,
        cert: "Luận giả Bát Tự",
        prerequisiteSlug: "bat-tu-can-ban",
      },
      {
        id: "menh-adv",
        title: "Tổng hợp Mệnh Học",
        level: "Cao cấp",
        questions: 50,
        duration: 90,
        passingScore: 80,
        cert: "Đạo sư Mệnh Học",
        prerequisiteSlug: "menh-hoc-cao-cap", // Not seeded yet
      },
    ],
  },
  {
    category: "Tướng (Physiognomy)",
    icon: "👁️",
    color: "#87CEEB",
    exams: [
      {
        id: "tuong-basic",
        title: "Nhân Tướng Nhập Môn",
        level: "Cơ bản",
        questions: 25,
        duration: 40,
        passingScore: 70,
        cert: "Học đồ Nhân Tướng",
        prerequisiteSlug: "nhan-tuong-hien-dai",
      },
      {
        id: "tuong-inter",
        title: "Tam Đình Ngũ Nhạc",
        level: "Trung cấp",
        questions: 35,
        duration: 55,
        passingScore: 75,
        cert: "Luận giả Tướng Học",
        prerequisiteSlug: "nhan-tuong-trung-cap",
      },
      {
        id: "tuong-adv",
        title: "Khí Sắc & Thần Thái",
        level: "Cao cấp",
        questions: 45,
        duration: 80,
        passingScore: 80,
        cert: "Đạo sư Tướng Học",
        prerequisiteSlug: "nhan-tuong-cao-cap",
      },
    ],
  },
  {
    category: "Bốc (Divination)",
    icon: "🎴",
    color: "#DDA0DD",
    exams: [
      {
        id: "boc-basic",
        title: "Tarot 22 Lá Chính",
        level: "Cơ bản",
        questions: 30,
        duration: 45,
        passingScore: 70,
        cert: "Học đồ Tarot",
        prerequisiteSlug: "tarot-chuyen-sau",
      },
      {
        id: "boc-inter",
        title: "Kinh Dịch 64 Quẻ",
        level: "Trung cấp",
        questions: 40,
        duration: 65,
        passingScore: 75,
        cert: "Luận giả Kinh Dịch",
        prerequisiteSlug: "kinh-dich-du-doan",
      },
      {
        id: "boc-adv",
        title: "Tổng hợp Bốc Thuật",
        level: "Cao cấp",
        questions: 50,
        duration: 90,
        passingScore: 80,
        cert: "Đạo sư Bốc Thuật",
        prerequisiteSlug: "boc-thuat-cao-cap",
      },
    ],
  },
  {
    category: "Trạch (Feng Shui)",
    icon: "🏠",
    color: "#90EE90",
    exams: [
      {
        id: "trach-basic",
        title: "Phong Thủy Cơ Bản",
        level: "Cơ bản",
        questions: 28,
        duration: 40,
        passingScore: 70,
        cert: "Học đồ Phong Thủy",
        prerequisiteSlug: "phong-thuy-bat-trach",
      },
      {
        id: "trach-inter",
        title: "Bát Trạch Minh Kính",
        level: "Trung cấp",
        questions: 38,
        duration: 60,
        passingScore: 75,
        cert: "Luận giả Phong Thủy",
        prerequisiteSlug: "phong-thuy-trung-cap",
      },
      {
        id: "trach-adv",
        title: "Phi Tinh & La Bàn",
        level: "Cao cấp",
        questions: 48,
        duration: 85,
        passingScore: 80,
        cert: "Đạo sư Phong Thủy",
        prerequisiteSlug: "phong-thuy-cao-cap",
      },
    ],
  },
  {
    category: "Số (Numerology)",
    icon: "🔢",
    color: "#FFA07A",
    exams: [
      {
        id: "so-basic",
        title: "Thần Số Pytago",
        level: "Cơ bản",
        questions: 25,
        duration: 35,
        passingScore: 70,
        cert: "Học đồ Thần Số",
        prerequisiteSlug: "than-so-hoc-pytago",
      },
      {
        id: "so-inter",
        title: "Biểu Đồ Ngày Sinh",
        level: "Trung cấp",
        questions: 35,
        duration: 50,
        passingScore: 75,
        cert: "Luận giả Thần Số",
        prerequisiteSlug: "than-so-hoc-trung-cap",
      },
      {
        id: "so-adv",
        title: "Chu Kỳ Vận Mệnh",
        level: "Cao cấp",
        questions: 45,
        duration: 75,
        passingScore: 80,
        cert: "Đạo sư Thần Số",
        prerequisiteSlug: "than-so-hoc-cao-cap",
      },
    ],
  },
];

export default function ThiChungChi() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [userProgress, setUserProgress] = useState([]);

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

  const checkPrerequisite = (slug) => {
    if (!slug) return true; // No prerequisite
    const course = userProgress.find((p) => p.slug === slug);
    return course && course.is_completed;
  };

  const filteredExams = selectedCategory
    ? EXAMS.filter((cat) => cat.category === selectedCategory)
    : EXAMS;

  return (
    <main id="thi-chung-chi" className="khctl-page">
      {/* Hero */}
      <section className="cert-hero">
        <div className="container">
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold text-gradient mb-3">
              Thi & Chứng Chỉ
            </h1>
            <p
              className="lead opacity-90 mx-auto"
              style={{ maxWidth: "700px" }}
            >
              Kiểm tra năng lực và nhận chứng chỉ chính thức từ{" "}
              <strong>Học Viện Ngũ Huyền Thuật</strong>. Chứng minh trình độ của
              bạn qua các bài thi chuẩn hóa.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="d-flex justify-content-center flex-wrap gap-2 mb-5">
            <button
              className={`filter-pill ${!selectedCategory ? "active" : ""}`}
              onClick={() => setSelectedCategory(null)}
            >
              Tất cả
            </button>
            {EXAMS.map((cat) => (
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

              <div className="row g-4">
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
                                  ? "bg-success"
                                  : exam.level === "Trung cấp"
                                  ? "bg-warning text-dark"
                                  : "bg-danger"
                              }`}
                            >
                              {exam.level}
                            </span>
                            <span className="badge bg-gold text-dark">
                              {exam.passingScore}% đạt
                            </span>
                          </div>

                          <h3 className="h5 text-white mb-3">{exam.title}</h3>

                          <div className="exam-info mb-4">
                            <div className="info-item">
                              <i className="bi bi-question-circle me-2"></i>
                              <span>{exam.questions} câu hỏi</span>
                            </div>
                            <div className="info-item">
                              <i className="bi bi-clock me-2"></i>
                              <span>{exam.duration} phút</span>
                            </div>
                            <div className="info-item">
                              <i className="bi bi-award me-2"></i>
                              <span className="text-gold">{exam.cert}</span>
                            </div>
                          </div>

                          {isEligible ? (
                            <Link
                              to={`/hoc-vien/thi/${exam.id}`}
                              className="btn btn-gold w-100"
                            >
                              Bắt đầu thi
                            </Link>
                          ) : (
                            <button
                              className="btn btn-outline-secondary w-100"
                              disabled
                            >
                              🔒 Hoàn thành bài học trước
                            </button>
                          )}
                          {!isEligible && exam.prerequisiteSlug && (
                            <Link
                              to={`/hoc-vien/khoa-hoc/${exam.prerequisiteSlug}`}
                              className="btn btn-outline-gold w-100 mt-2"
                            >
                              🎓 Đi tới khóa học
                            </Link>
                          )}
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
                  70-80% tùy cấp độ để nhận chứng chỉ
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
