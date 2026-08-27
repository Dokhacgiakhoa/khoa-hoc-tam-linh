import React, { useState } from "react";
import { useAlert } from "../../../contexts/AlertContext";
import api from "../../../services/api";
import ServiceGuard from "../../../components/common/ServiceGuard";
import "./sub-pages.css";

export default function ThanSoHoc() {
  const { showError } = useAlert();
  const [date, setDate] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date) return;
    setLoading(true);
    try {
      const res = await api.post("/api/numerology/calculate", {
        date,
        name: fullName,
      });
      if (res.data && res.data.data) {
        setResult(res.data.data);
      } else {
        setResult(res.data);
      }
    } catch (error) {
      console.error("Lỗi tính toán Thần số học:", error);
      showError("Hệ thống tính toán đang bận, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ServiceGuard
      serviceId="sv-thansohoc"
      config={{
        title: "Thần Số Học Pythagoras Toàn Thư",
        desc: "Khám phá bản đồ cuộc đời qua Tên và Ngày sinh.",
        icon: "🔢",
      }}
    >
      <div className="sub-page numerology-page">
        <section className="sub-hero pb-4">
          <div className="container">
            <h1 className="sub-title text-gradient">Thần Số Học Pythagoras</h1>
            <p className="sub-desc mx-auto" style={{ maxWidth: "700px" }}>
              Giải mã sứ mệnh linh hồn, con số chủ đạo, ma trận biểu đồ ngày sinh và 4 đỉnh cao cuộc đời qua hệ thống số học Pythagoras chuẩn xác.
            </p>
          </div>
        </section>

        <section className="sub-content container">
          <div className="row g-4">
            <div className="col-lg-4">
              <div className="glass-card p-4 h-100">
                <h2 className="card-title h5 text-gold mb-3">Thông Tin Bản Mệnh</h2>
                <form className="info-form" onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label text-light small">Họ và tên</label>
                    <input
                      type="text"
                      className="form-control bg-dark border-gold text-white"
                      placeholder="Nguyễn Văn A"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label text-light small">Ngày sinh (Dương lịch)</label>
                    <input
                      type="date"
                      className="form-control bg-dark border-gold text-white"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-gold w-100 py-3 fw-bold shadow"
                    disabled={loading}
                  >
                    {loading ? "Đang chiêm nghiệm..." : "KHÁM PHÁ BẢN ĐỒ ĐỊNH MỆNH"}
                  </button>
                </form>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="glass-card p-4 p-md-5 h-100 text-center">
                {loading ? (
                  <div className="d-flex flex-column align-items-center justify-content-center py-5">
                    <div className="mystic-spinner mb-3" />
                    <span className="text-gold">Đang tính toán năng lượng các con số…</span>
                  </div>
                ) : result ? (
                  <div className="animate-fade-in text-start">
                    {/* Header Số Chủ Đạo */}
                    <div className="d-flex flex-column flex-md-row align-items-center gap-4 mb-4 pb-4 border-bottom border-secondary border-opacity-25 text-center text-md-start">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center border border-gold"
                        style={{
                          width: "100px",
                          height: "100px",
                          minWidth: "100px",
                          background: "radial-gradient(circle, rgba(255,215,0,0.2) 0%, rgba(20,5,40,0.8) 100%)",
                          boxShadow: "0 0 20px rgba(255,215,0,0.4)",
                        }}
                      >
                        <span className="display-4 fw-bold text-gold">{result.life_path_number}</span>
                      </div>
                      <div>
                        <div className="text-gold text-uppercase letter-spacing-1 small mb-1">Con Số Chủ Đạo</div>
                        <h3 className="text-white mb-2">{result.life_path_info?.title || `Số Chủ Đạo ${result.life_path_number}`}</h3>
                        <p className="text-light opacity-80 mb-0 small">{result.life_path_info?.desc}</p>
                      </div>
                    </div>

                    {/* Biểu Đồ Ma Trận 3x3 */}
                    {result.birth_chart && (
                      <div className="mb-4">
                        <h5 className="text-gold h6 mb-3 text-uppercase letter-spacing-1">Biểu Đồ Ngày Sinh (Ma Trận 3x3)</h5>
                        <div className="d-inline-grid text-center" style={{ gridTemplateColumns: "repeat(3, 70px)", gap: "8px" }}>
                          {[3, 6, 9, 2, 5, 8, 1, 4, 7].map((num) => {
                            const count = result.birth_chart[num] || 0;
                            return (
                              <div
                                key={num}
                                className={`p-2 rounded border ${count > 0 ? "border-gold bg-warning bg-opacity-10 text-gold fw-bold" : "border-secondary border-opacity-20 text-white-50"}`}
                                style={{ height: "60px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
                              >
                                <span className="small">{num}</span>
                                {count > 0 && <span className="badge bg-gold text-dark" style={{ fontSize: "0.65rem" }}>x{count}</span>}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Kim Tự Tháp 4 Đỉnh Cao */}
                    {result.pinnacles && (
                      <div className="mt-4">
                        <h5 className="text-gold h6 mb-3 text-uppercase letter-spacing-1">4 Đỉnh Cao Cuộc Đời (Kim Tự Tháp)</h5>
                        <div className="row g-2">
                          {result.pinnacles.map((p) => (
                            <div className="col-6 col-md-3" key={p.peak}>
                              <div className="p-3 rounded glass-card text-center border-gold border-opacity-30">
                                <div className="text-white-50 small mb-1">Đỉnh {p.peak}</div>
                                <div className="fs-3 fw-bold text-gold mb-1">Số {p.number}</div>
                                <div className="text-light opacity-75" style={{ fontSize: "0.75rem" }}>{p.age_milestone}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="opacity-60 py-5">
                    <div className="display-3 mb-3">🔢</div>
                    <h4 className="text-gold">Sẵn Sàng Khám Phá</h4>
                    <p className="text-light">Nhập ngày sinh của bạn để hệ thống kiến tạo toàn bộ biểu đồ năng lượng cuộc đời.</p>
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
