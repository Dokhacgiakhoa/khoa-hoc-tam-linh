import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function CourseDetail() {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const fetchProgress = async () => {
      if (course && isLoggedIn) {
        try {
          const token = localStorage.getItem("auth_token");
          const res = await axios.get(
            `/api/academy/courses/${course.id}/progress`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setCompletedLessons(new Set(res.data));
        } catch (err) {
          console.error("Error fetching progress:", err);
        }
      }
    };
    fetchProgress();
  }, [course, isLoggedIn]);

  const handleToggleComplete = async (lesson) => {
    if (!isLoggedIn) return;
    const isComplete = completedLessons.has(lesson.id);
    try {
      const token = localStorage.getItem("auth_token");
      await axios.post(
        "/api/academy/lessons/complete",
        { lesson_id: lesson.id, completed: !isComplete },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const newCompleted = new Set(completedLessons);
      if (isComplete) newCompleted.delete(lesson.id);
      else newCompleted.add(lesson.id);
      setCompletedLessons(newCompleted);
    } catch (err) {
      console.error("Error updating progress:", err);
    }
  };

  // Fetch Tarot Data if needed
  const [tarotCards, setTarotCards] = useState(null);

  useEffect(() => {
    if (activeLesson && (activeLesson.content || "").includes("[TAROT_CARD:")) {
      if (!tarotCards) {
        axios.get("/api/tarot").then((res) => {
          setTarotCards(res.data);
        });
      }
    }
  }, [activeLesson, tarotCards]);

  useEffect(() => {
    setLoading(true);
    setActiveLesson(null);
    axios
      .get(`/api/academy/course/${slug}`)
      .then((res) => {
        setCourse(res.data);
        if (res.data.lessons && res.data.lessons.length > 0) {
          setActiveLesson(res.data.lessons[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  const handleLessonChange = (lesson) => {
    setActiveLesson(lesson);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading)
    return (
      <div className="p-5 text-center">
        <div className="spinner-border text-gold"></div>
      </div>
    );

  if (!course)
    return <div className="p-5 text-center">Không tìm thấy khóa học.</div>;

  const renderLessonContent = () => {
    if (!activeLesson) return null;

    if (!isLoggedIn) {
      return (
        <div className="card-glass p-5 text-center">
          <h3 className="text-gold mb-3">Nội dung dành cho học viên</h3>
          <p className="mb-4">
            Vui lòng đăng nhập để xem bài học và lưu tiến trình.
          </p>
          <Link to="/tai-khoan" className="btn btn-gold">
            Đăng nhập ngay
          </Link>
        </div>
      );
    }

    // Helper to invoke footer
    const renderFooter = () => {
      const isCompleted = completedLessons.has(activeLesson.id);
      return (
        <div className="d-flex justify-content-between align-items-center mt-5 pt-4 border-top border-secondary">
          <button
            className="btn btn-outline-secondary px-4"
            disabled={course.lessons.indexOf(activeLesson) === 0}
            onClick={() =>
              handleLessonChange(
                course.lessons[course.lessons.indexOf(activeLesson) - 1]
              )
            }
          >
            &larr; Bài trước
          </button>

          <button
            className={`btn ${
              isCompleted ? "btn-success" : "btn-outline-gold"
            }`}
            onClick={() => handleToggleComplete(activeLesson)}
          >
            {isCompleted ? "✅ Đã hoàn thành" : "Đánh dấu đã học"}
          </button>

          <button
            className="btn btn-gold px-4"
            disabled={
              course.lessons.indexOf(activeLesson) ===
                course.lessons.length - 1 || !isCompleted
            }
            title={!isCompleted ? "Hoàn thành bài học để tiếp tục" : ""}
            onClick={() =>
              handleLessonChange(
                course.lessons[course.lessons.indexOf(activeLesson) + 1]
              )
            }
          >
            Bài tiếp theo &rarr;
          </button>
        </div>
      );
    };

    // Ensure content is a string
    const content = activeLesson.content || "";

    const tarotMarker = content.match(/\[TAROT_CARD:(.*?)\]/);
    if (tarotMarker && tarotMarker[1]) {
      // Tarot Lesson View
      if (!tarotCards)
        return (
          <div className="text-center py-5">
            <div className="spinner-border text-gold"></div>
          </div>
        );

      const cardId = tarotMarker[1];
      const card = tarotCards.find((c) => c.card_id === cardId);
      const extraContent = activeLesson.content
        .replace(tarotMarker[0], "")
        .trim();

      if (!card) return <div className="text-warning">Card data not found</div>;

      // Safe JSON parse helper
      const safeParse = (data) => {
        if (!data) return null;
        if (typeof data === "object") return data;
        try {
          const parsed = JSON.parse(data);
          // Handle case where JSON.parse returns primitive string
          if (typeof parsed === "string") return { MoTa: parsed };
          return parsed;
        } catch (e) {
          // If parse fails, treat as plain text
          return { MoTa: data };
        }
      };

      const meaning = safeParse(card.meaning_general);
      const upright = safeParse(card.meaning_upright);
      const reversed = safeParse(card.meaning_reversed);

      // Helper to render text safe
      const renderText = (val) => {
        if (!val) return "";
        if (typeof val === "string") return val;
        return val.MoTa || "";
      };

      // Helper to resolve image path
      const resolveImage = (path) => {
        const base = process.env.PUBLIC_URL || "";
        if (!path) return "";
        return base + (path.startsWith("/") ? path : `/${path}`);
      };

      return (
        <div className="tarot-lesson animate-fade-in">
          <div className="row g-5 align-items-start">
            <div className="col-md-4 text-center">
              <div
                className="card-3d p-2 d-inline-block"
                style={{ borderRadius: "18px" }}
              >
                <img
                  src={resolveImage(card.image)}
                  alt={card.name}
                  className="img-fluid rounded-3"
                  style={{ boxShadow: "0 0 30px rgba(255, 215, 0, 0.15)" }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = resolveImage("/images/tarot-cards/back.png"); // Fallback to back card
                  }}
                />
              </div>
              <h3 className="text-gold mt-4 mb-2">{card.name}</h3>
              <p className="opacity-75 small">{card.group}</p>
            </div>
            <div className="col-md-8">
              <div className="prose text-white">
                <h4 className="text-gold-gradient border-bottom border-secondary pb-2 mb-3">
                  Tổng quan
                </h4>
                <p className="lead opacity-90 mb-4">{renderText(meaning)}</p>

                {/* Keywords */}
                <div className="d-flex flex-wrap gap-2 mb-4">
                  {(meaning?.TuKhoa || []).map((kw, i) => (
                    <span
                      key={i}
                      className="badge bg-gold text-dark rounded-pill px-3 py-2"
                    >
                      {kw}
                    </span>
                  ))}
                </div>

                <div className="row g-4 mb-4">
                  <div className="col-12">
                    <div className="p-3 rounded-3 bg-success bg-opacity-10 border border-success border-opacity-25">
                      <h5 className="text-success mb-2">⬆️ Nghĩa xuôi</h5>
                      <p className="small mb-0 opacity-90">
                        {renderText(upright)}
                      </p>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="p-3 rounded-3 bg-danger bg-opacity-10 border border-danger border-opacity-25">
                      <h5 className="text-danger mb-2">⬇️ Nghĩa ngược</h5>
                      <p className="small mb-0 opacity-90">
                        {renderText(reversed)}
                      </p>
                    </div>
                  </div>
                </div>

                {extraContent && (
                  <div className="mt-5 pt-4 border-top border-secondary opacity-75 small">
                    <h5 className="text-white mb-3">Ghi chú thêm</h5>
                    {extraContent}
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Footer for Tarot */}
          {renderFooter()}
        </div>
      );
    }

    // Standard Lesson View
    const isCompleted = completedLessons.has(activeLesson.id);

    return (
      <div className="animate-fade-in">
        <div className="card-glass p-4 mb-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="display-5 text-gold mb-0">{activeLesson.title}</h1>
          </div>

          {activeLesson.video_url && (
            <div className="ratio ratio-16x9 mb-4 rounded-4 overflow-hidden shadow-lg border border-secondary">
              <iframe
                src={activeLesson.video_url}
                title={activeLesson.title}
                allowFullScreen
                sandbox="allow-scripts allow-same-origin allow-presentation"
                style={{ border: 0 }}
              ></iframe>
            </div>
          )}
          <div
            className="lesson-content lead opacity-90"
            style={{ whiteSpace: "pre-line" }}
          >
            {activeLesson.content}
          </div>
        </div>

        {/* Footer for Standard */}
        {renderFooter()}
      </div>
    );
  };

  return (
    <main className="course-detail-page py-5">
      <div className="container">
        <Link
          to={`/hoc-vien/${course ? course.category.slug : ""}`}
          className="text-decoration-none text-secondary mb-4 d-inline-block hover-gold"
        >
          &larr; Quay lại học viện
        </Link>
        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-gold"></div>
          </div>
        ) : !course ? (
          <div className="text-center text-white">Không tìm thấy khóa học</div>
        ) : (
          <div className="row g-4">
            {/* Sidebar */}
            <div className="col-lg-4">
              <div
                className="card-glass p-3 sticky-top"
                style={{
                  top: "100px",
                  border: "1px solid rgba(255, 215, 0, 0.2)",
                }}
              >
                <h4 className="text-gold mb-4">{course.title}</h4>
                <div
                  className="list-group list-group-flush bg-transparent custom-scrollbar"
                  style={{ maxHeight: "70vh", overflowY: "auto" }}
                >
                  {course.lessons.map((lesson, idx) => {
                    const isLocked =
                      idx > 0 &&
                      !completedLessons.has(course.lessons[idx - 1].id);

                    return (
                      <button
                        key={lesson.id}
                        disabled={isLocked}
                        className={`list-group-item list-group-item-action bg-transparent border-secondary text-white small py-3 mb-2 rounded-3 ${
                          activeLesson?.id === lesson.id
                            ? "border border-warning text-warning fw-bold"
                            : isLocked
                            ? "opacity-50 cursor-not-allowed"
                            : "opacity-75"
                        }`}
                        style={
                          activeLesson?.id === lesson.id
                            ? {
                                backgroundColor: "rgba(255, 215, 0, 0.1)",
                                boxShadow: "0 0 10px rgba(255, 215, 0, 0.1)",
                              }
                            : {}
                        }
                        onClick={() => !isLocked && handleLessonChange(lesson)}
                      >
                        <div className="d-flex w-100 align-items-center justify-content-between">
                          <div className="d-flex align-items-center">
                            <span
                              className={`me-3 fw-bold ${
                                activeLesson?.id === lesson.id
                                  ? "text-warning"
                                  : "text-gold"
                              }`}
                              style={{ minWidth: "25px", fontSize: "1.1em" }}
                            >
                              {idx + 1}.
                            </span>
                            <span>{lesson.title}</span>
                          </div>
                          {completedLessons.has(lesson.id) ? (
                            <span className="text-success ms-2">✅</span>
                          ) : isLocked ? (
                            <span
                              className="text-secondary ms-2"
                              title="Hoàn thành bài trước để mở khóa"
                            >
                              🔒
                            </span>
                          ) : null}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Content */}
            {/* Content */}
            <div className="col-lg-8">
              {activeLesson ? (
                renderLessonContent()
              ) : (
                <div className="text-center py-5 opacity-50">
                  Khóa học này hiện chưa có nội dung bài học.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
