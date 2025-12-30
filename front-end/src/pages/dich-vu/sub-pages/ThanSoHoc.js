import React, { useState } from "react";
import { useAlert } from "../../../contexts/AlertContext";
import axios from "axios";
import ServiceGuard from "../../../components/common/ServiceGuard";
import "./sub-pages.css";

export default function ThanSoHoc() {
  const { showError } = useAlert();
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date) return;
    setLoading(true);
    try {
      const res = await axios.post("/api/numerology/calculate", { date });
      setResult(res.data);
    } catch (error) {
      console.error("Lỗi tính toán Thần số học:", error);
      showError("Hệ thống đang bận!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ServiceGuard serviceId="sv-thansohoc">
      <div className="sub-page numerology-page">
        <section className="sub-hero">
          <div className="container">
            <h1 className="sub-title text-gradient">THẦN SỐ HỌC (TÍNH PHÍ)</h1>
            <p className="sub-desc">
              Thấu hiểu bản thân thông qua ngôn ngữ của những con số. (Phí:
              299.000 LT)
            </p>
          </div>
        </section>

        <section className="sub-content container">
          <div className="row g-4">
            <div className="col-lg-5">
              <div className="glass-card info-form-card h-100">
                <h2 className="card-title h4 mb-4">Tính toán chỉ số</h2>
                <form className="info-form" onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="form-label">Ngày sinh (Dương lịch)</label>
                    <input
                      type="date"
                      className="form-control"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-gold w-100 py-3 fw-bold"
                    disabled={loading}
                  >
                    {loading
                      ? "Đang chiêm nghiệm..."
                      : "KHÁM PHÁ CON SỐ ĐỊNH MỆNH"}
                  </button>
                </form>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="glass-card result-card h-100 d-flex flex-column align-items-center justify-content-center text-center p-5">
                {loading ? (
                  <div className="spinner-border text-gold"></div>
                ) : result ? (
                  <div className="animate__animated animate__fadeIn">
                    <div className="life-path-circle mb-4">
                      <span className="display-1 fw-bold text-gold">
                        {result.life_path_number}
                      </span>
                    </div>
                    <h3 className="text-gold mb-3">{result.title}</h3>
                    <p className="interpretation-text lead opacity-90">
                      {result.interpretation}
                    </p>
                    {result.metadata && (
                      <div className="mt-4 d-flex justify-content-center gap-3">
                        <span className="badge border border-gold text-gold p-2 px-3">
                          Thế mạnh: {result.metadata.strengths?.join(", ")}
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="placeholder-text opacity-50">
                    <div className="fs-1 mb-3">🔢</div>
                    <p>
                      Con số chủ đạo và bản luận giải của bạn sẽ xuất hiện tại
                      đây.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </ServiceGuard>
  );
}
