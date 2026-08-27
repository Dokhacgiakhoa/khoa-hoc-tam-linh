import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./thi-chung-chi.css"; // Reuse existing styles or add new ones

export default function ExamTakingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { question_id: "A" }
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState(null); // { score, passed, ... }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        if (!token) {
          alert("Vui lòng đăng nhập để thi!");
          navigate("/tai-khoan");
          return;
        }

        const res = await axios.get(`/api/exams/${id}/take`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setExam(res.data.exam);
        setQuestions(res.data.questions);
        setTimeLeft(res.data.exam.duration * 60); // min -> sec
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(
          err.response?.data?.message ||
            "Không thể tải bài thi. Có thể bạn chưa đủ điều kiện."
        );
        setLoading(false);
      }
    };

    fetchExam();
  }, [id, navigate]);

  const handleSubmit = useCallback(async () => {
    if (isSubmitting || result) return;
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("auth_token");
      const res = await axios.post(
        `/api/exams/${id}/submit`,
        { answers },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResult(res.data);
    } catch (err) {
      alert("Lỗi nộp bài: " + (err.response?.data?.message || err.message));
      setIsSubmitting(false);
    }
  }, [answers, id, isSubmitting, result]);

  // Timer
  useEffect(() => {
    if (!loading && !result && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmit(); // Auto submit
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [loading, result, timeLeft, handleSubmit]);

  const handleOptionSelect = (qId, optionKey) => {
    setAnswers((prev) => ({ ...prev, [qId]: optionKey }));
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  if (loading)
    return (
      <div className="text-center py-5 text-white">Đang tải đề thi...</div>
    );
  if (error)
    return (
      <div className="container py-5 text-center text-white">
        <h2 className="text-danger mb-3">⚠️ Không thể truy cập</h2>
        <p>{error}</p>
        <button
          className="btn btn-gold mt-3"
          onClick={() => navigate("/hoc-vien/thi-chung-chi")}
        >
          Quay lại
        </button>
      </div>
    );

  if (result) {
    return (
      <div className="container py-5 text-center exam-result-page">
        <div
          className="card bg-dark text-white border-gold p-5 mx-auto"
          style={{ maxWidth: "600px" }}
        >
          <h1 className="mb-4">
            {result.passed ? "🎉 Chúc Mừng!" : "😢 Rất Tiếc"}
          </h1>
          <div className="display-1 fw-bold text-gold mb-3">
            {result.score}/100
          </div>
          <p className="lead mb-4">
            Bạn đã trả lời đúng{" "}
            <strong className="text-gold">{result.correct_count}</strong>/
            {result.total} câu hỏi.
          </p>

          {result.passed ? (
            <div className="alert alert-success bg-opacity-25 border-success text-white">
              Bạn đã vượt qua bài thi! Chứng chỉ đã được cấp vào hồ sơ.
            </div>
          ) : (
            <div className="alert alert-danger bg-opacity-25 border-danger text-white">
              Bạn chưa đạt điểm chuẩn ({exam.passingScore}%). Hãy ôn tập và thi
              lại nhé!
            </div>
          )}

          <div className="d-flex justify-content-center gap-3 mt-4">
            <button
              className="btn btn-outline-light"
              onClick={() => navigate("/hoc-vien/thi-chung-chi")}
            >
              Về danh sách thi
            </button>
            {!result.passed && (
              <button
                className="btn btn-gold"
                onClick={() => window.location.reload()}
              >
                Thi lại ngay
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestionIndex];

  return (
    <div className="exam-taking-page container py-4">
      <div className="row g-4">
        {/* Left: Question Area */}
        <div className="col-lg-8">
          <div className="card bg-dark text-white border-secondary h-100">
            <div className="card-header border-secondary d-flex justify-content-between align-items-center">
              <span className="badge bg-gold text-dark fs-6">
                Câu {currentQuestionIndex + 1}/{questions.length}
              </span>
              <span className="text-muted small">ID: {currentQ.id}</span>
            </div>
            <div className="card-body p-4">
              <h4 className="card-title mb-4 lh-base">{currentQ.content}</h4>

              <div className="d-flex flex-column gap-3">
                {Object.entries(currentQ.options).map(([key, text]) => (
                  <label
                    key={key}
                    className={`option-label p-3 rounded border d-flex align-items-center cursor-pointer ${
                      answers[currentQ.id] === key
                        ? "border-gold bg-gold bg-opacity-10"
                        : "border-secondary hover-bg-dark-light"
                    }`}
                    style={{ cursor: "pointer" }}
                  >
                    <input
                      type="radio"
                      name={`q-${currentQ.id}`}
                      className="d-none"
                      checked={answers[currentQ.id] === key}
                      onChange={() => handleOptionSelect(currentQ.id, key)}
                    />
                    <span
                      className={`badge me-3 ${
                        answers[currentQ.id] === key
                          ? "bg-gold text-dark"
                          : "bg-secondary"
                      }`}
                    >
                      {key}
                    </span>
                    <span className="fs-5">{text}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="card-footer border-secondary d-flex justify-content-between py-3">
              <button
                className="btn btn-outline-secondary"
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex((p) => p - 1)}
              >
                ⬅️ Câu trước
              </button>
              <button
                className="btn btn-gold"
                onClick={() => {
                  if (currentQuestionIndex < questions.length - 1) {
                    setCurrentQuestionIndex((p) => p + 1);
                  } else {
                    // Last question: maybe show "Finish" check?
                  }
                }}
                disabled={currentQuestionIndex === questions.length - 1}
              >
                Câu sau ➡️
              </button>
            </div>
          </div>
        </div>

        {/* Right: Sidebar Info */}
        <div className="col-lg-4">
          <div
            className="card bg-dark text-white border-secondary sticky-top"
            style={{ top: "80px", zIndex: 1 }}
          >
            <div className="card-body">
              <h5 className="text-gold mb-3 text-center">{exam.title}</h5>

              <div className="timer-box text-center p-3 rounded bg-black mb-4 border border-gold border-opacity-50">
                <div className="small text-muted mb-1">Thời gian còn lại</div>
                <div
                  className={`display-4 fw-bold ${
                    timeLeft < 300 ? "text-danger" : "text-white"
                  }`}
                >
                  {formatTime(timeLeft)}
                </div>
              </div>

              <div className="question-grid d-flex flex-wrap gap-2 justify-content-center mb-4">
                {questions.map((q, idx) => (
                  <button
                    key={q.id}
                    className={`btn btn-sm square-btn ${
                      idx === currentQuestionIndex
                        ? "btn-light border-gold"
                        : answers[q.id]
                        ? "btn-gold"
                        : "btn-outline-secondary"
                    }`}
                    style={{ width: "35px", height: "35px", padding: 0 }}
                    onClick={() => setCurrentQuestionIndex(idx)}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>

              <div className="d-grid">
                <button
                  className="btn btn-danger py-2 fw-bold"
                  onClick={() => {
                    if (window.confirm("Bạn có chắc chắn muốn nộp bài sớm?")) {
                      handleSubmit();
                    }
                  }}
                >
                  🚀 Nộp Bài Ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
