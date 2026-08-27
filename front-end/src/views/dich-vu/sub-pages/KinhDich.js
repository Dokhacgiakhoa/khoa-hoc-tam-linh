import React, { useState } from "react";
import api from "../../../services/api";
import "./sub-pages.css";

export default function KinhDich() {
  // States: 'intro', 'casting', 'result'
  const [phase, setPhase] = useState("intro");
  const [question, setQuestion] = useState("");
  const [lines, setLines] = useState([]); // Stores 6 values (6,7,8,9)
  const [isTossing, setIsTossing] = useState(false);
  const [currentCoins, setCurrentCoins] = useState([0, 0, 0]); // 3: Ngửa (Head), 2: Sấp (Tail)
  const [castingResult, setCastingResult] = useState(null);
  const [loadingResult, setLoadingResult] = useState(false);

  const castLine = () => {
    if (lines.length >= 6) return;

    setIsTossing(true);

    // Hiệu ứng xoay đồng xu 1 giây
    let interval = setInterval(() => {
      setCurrentCoins([
        Math.random() > 0.5 ? 3 : 2,
        Math.random() > 0.5 ? 3 : 2,
        Math.random() > 0.5 ? 3 : 2,
      ]);
    }, 100);

    setTimeout(async () => {
      clearInterval(interval);
      // Kết quả gieo lần này
      const coin1 = Math.random() > 0.5 ? 3 : 2;
      const coin2 = Math.random() > 0.5 ? 3 : 2;
      const coin3 = Math.random() > 0.5 ? 3 : 2;
      const sum = coin1 + coin2 + coin3;

      setCurrentCoins([coin1, coin2, coin3]);
      const newLines = [...lines, sum];
      setLines(newLines);
      setIsTossing(false);

      // Nếu đã đủ 6 hào -> Lập quẻ hoàn tất
      if (newLines.length === 6) {
        setLoadingResult(true);
        setTimeout(async () => {
          try {
            const res = await api.post("/api/iching/cast");
            if (res.data && res.data.data) {
              setCastingResult(res.data.data);
            }
          } catch (err) {
            console.warn("Backend cast API unavailable, using client interpretation fallback", err);
          } finally {
            setLoadingResult(false);
            setPhase("result");
          }
        }, 800);
      }
    }, 1000);
  };

  const reset = () => {
    setPhase("intro");
    setLines([]);
    setCurrentCoins([0, 0, 0]);
    setCastingResult(null);
    setQuestion("");
  };

  // Render Line Component
  const HexLine = ({ value, index }) => {
    // 6: Lão Âm (Động) --x--
    // 7: Thiếu Dương (Tĩnh) -----
    // 8: Thiếu Âm (Tĩnh) -- --
    // 9: Lão Dương (Động) --o--
    const isYang = value === 7 || value === 9;
    const isChanging = value === 6 || value === 9;

    return (
      <div
        className="hex-line d-flex justify-content-center align-items-center mb-2"
        style={{ height: "36px" }}
      >
        <div className="d-flex align-items-center justify-content-center w-100 gap-3">
          <div className="text-white-50 small font-monospace text-end" style={{ width: "60px" }}>
            Hào {index + 1}
          </div>

          <div className="position-relative d-flex align-items-center justify-content-center" style={{ width: "200px" }}>
            <div
              className={`line-body w-100 ${isYang ? "bg-gold" : "d-flex justify-content-between"}`}
              style={{
                height: "14px",
                borderRadius: "4px",
                boxShadow: isYang ? "0 0 10px rgba(255,215,0,0.5)" : "none",
              }}
            >
              {!isYang && (
                <>
                  <div
                    className="bg-gold opacity-90"
                    style={{ width: "46%", height: "100%", borderRadius: "4px 0 0 4px", boxShadow: "0 0 8px rgba(255,215,0,0.4)" }}
                  />
                  <div
                    className="bg-gold opacity-90"
                    style={{ width: "46%", height: "100%", borderRadius: "0 4px 4px 0", boxShadow: "0 0 8px rgba(255,215,0,0.4)" }}
                  />
                </>
              )}
            </div>
          </div>

          <div className="small text-start" style={{ width: "110px" }}>
            {isChanging && (
              <span className="badge bg-warning text-dark fw-bold px-2 py-1">
                {value === 6 ? "⚪ Âm Động" : "⚫ Dương Động"}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="sub-page iching-page">
      <section className="sub-hero pb-4">
        <div className="container">
          <h1 className="sub-title text-gradient">Kinh Dịch Gieo Quẻ AI</h1>
          <p className="sub-desc mx-auto" style={{ maxWidth: "700px" }}>
            "Vật cùng tắc biến, biến tắc thông". Gieo 3 đồng xu 6 lần từ Hào 1 đến Hào 6 để kiến lập Quẻ Chủ và Quẻ Biến, đón nhận lời minh giải từ trí tuệ cổ xưa.
          </p>
        </div>
      </section>

      <section className="sub-content container" style={{ minHeight: "600px" }}>
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <div className="glass-card p-4 p-md-5 text-center position-relative overflow-hidden">
              <div
                className="position-absolute top-50 start-50 translate-middle opacity-10"
                style={{ fontSize: "20rem", pointerEvents: "none", zIndex: 0 }}
              >
                ☯️
              </div>

              {phase === "intro" && (
                <div className="animate-fade-in position-relative z-1">
                  <div className="mb-4">
                    <div className="display-2 mb-3">🐢</div>
                    <h2 className="h3 text-gold mb-3">Tĩnh Tâm & Đặt Câu Hỏi</h2>
                    <p className="text-light opacity-75 mb-4 mx-auto" style={{ maxWidth: "550px" }}>
                      Tâm thành ắt quẻ linh. Hãy tập trung suy nghĩ về vấn đề bạn đang băn khoăn (Sự nghiệp, Tình cảm, Tài lộc hoặc Định hướng tương lai).
                    </p>
                    <div className="mb-4 mx-auto" style={{ maxWidth: "500px" }}>
                      <input
                        type="text"
                        className="form-control bg-dark border-gold text-white text-center py-2"
                        placeholder="Nhập việc bạn muốn chiêm bái (Ví dụ: Dự án mới có hanh thông không?)"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                      />
                    </div>
                  </div>
                  <button
                    className="btn btn-gold btn-lg px-5 shadow-lg fw-bold"
                    onClick={() => setPhase("casting")}
                  >
                    Bắt đầu Gieo Quẻ &nbsp; ➔
                  </button>
                </div>
              )}

              {phase === "casting" && (
                <div className="animate-fade-in position-relative z-1">
                  {question && (
                    <div className="badge bg-purple-900 border-gold text-gold mb-4 px-3 py-2">
                      Chiêm bái: {question}
                    </div>
                  )}

                  <div className="row align-items-center">
                    <div className="col-md-7 coin-area">
                      <h5 className="text-gold mb-4 text-uppercase letter-spacing-1 small">
                        Lần gieo thứ {lines.length + 1} / 6 {lines.length === 0 ? "(Hào Sơ)" : `(Hào ${lines.length + 1})`}
                      </h5>

                      <div className="d-flex justify-content-center gap-3 gap-md-4 mb-4" style={{ height: "90px" }}>
                        {currentCoins.map((val, idx) => (
                          <div
                            key={idx}
                            className={`iching-coin ${isTossing ? "animate-flip" : ""} position-relative`}
                            style={{
                              width: "80px",
                              height: "80px",
                              background: "radial-gradient(circle, #f0d49f 20%, #b8860b 90%)",
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              boxShadow: "inset 0 0 10px rgba(0,0,0,0.6), 0 6px 15px rgba(0,0,0,0.5)",
                              border: "4px solid #ffd700",
                            }}
                          >
                            <div
                              style={{
                                width: "24px",
                                height: "24px",
                                background: "#130826",
                                border: "2px solid #8b6914",
                                zIndex: 2,
                                boxShadow: "inset 0 0 5px #000",
                              }}
                            />
                            {val === 3 ? (
                              <div className="position-absolute text-dark fw-bold" style={{ fontSize: "0.75rem", fontFamily: "serif" }}>
                                治平
                              </div>
                            ) : (
                              <div className="position-absolute text-dark opacity-50" style={{ fontSize: "0.5rem" }}>
                                ● ●
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      <button
                        className="btn btn-gold px-5 py-2 fw-bold"
                        onClick={castLine}
                        disabled={isTossing || lines.length >= 6}
                      >
                        {isTossing ? "Đang gieo đồng xu..." : `Gieo Hào ${lines.length + 1}`}
                      </button>
                    </div>

                    <div className="col-md-5 hex-progress border-start border-secondary border-opacity-25 ps-md-4 mt-4 mt-md-0">
                      <h6 className="text-gold mb-3 text-uppercase small letter-spacing-1">Tiến Trình Quẻ</h6>
                      <div className="d-flex flex-column-reverse w-100" style={{ minHeight: "220px" }}>
                        {lines.map((val, idx) => (
                          <HexLine key={idx} value={val} index={idx} />
                        ))}
                        {[...Array(6 - lines.length)].map((_, idx) => (
                          <div
                            key={`empty-${idx}`}
                            className="mb-2 border border-secondary border-opacity-20 rounded"
                            style={{ height: "14px", width: "100%" }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {phase === "result" && (
                <div className="animate-fade-in position-relative z-1">
                  <h2 className="text-gold mb-2">Quẻ Đã Kiến Lập</h2>
                  {question && <p className="text-white-50 mb-4">Chiêm bái: <em>"{question}"</em></p>}

                  <div className="row g-4 justify-content-center text-start">
                    {/* Quẻ Chủ */}
                    <div className="col-md-6">
                      <div className="p-4 rounded-3 glass-card border-gold h-100">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h4 className="text-gold mb-0">
                            {castingResult?.primary_hexagram?.name_vi || "Quẻ Chủ (Gốc)"}
                          </h4>
                          <span className="badge bg-warning text-dark">Quẻ Chủ</span>
                        </div>

                        <div className="p-3 bg-dark bg-opacity-50 rounded mb-3">
                          <div className="d-flex flex-column-reverse gap-1">
                            {lines.map((val, idx) => (
                              <HexLine key={idx} value={val} index={idx} />
                            ))}
                          </div>
                        </div>

                        <p className="text-light mb-2">
                          <strong>Tổng quan:</strong> {castingResult?.primary_hexagram?.general_meaning || "Đang phân tích lời tượng..."}
                        </p>
                        {castingResult?.primary_hexagram?.judgment && (
                          <p className="text-white-50 small mb-0">
                            <strong>Lời Thoán:</strong> {castingResult.primary_hexagram.judgment}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Quẻ Biến nếu có hào động */}
                    {castingResult?.has_changed_hexagram && (
                      <div className="col-md-6">
                        <div className="p-4 rounded-3 glass-card border-info h-100">
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-info mb-0">
                              {castingResult?.changed_hexagram?.name_vi || "Quẻ Biến (Tương Lai)"}
                            </h4>
                            <span className="badge bg-info text-dark">Quẻ Biến</span>
                          </div>

                          <p className="text-light mb-2">
                            <strong>Xu hướng biến chuyển:</strong> {castingResult?.changed_hexagram?.general_meaning || "Chuyển dịch thời vận..."}
                          </p>
                          {castingResult?.changed_hexagram?.action_advice && (
                            <p className="text-gold small mb-0">
                              <strong>Lời khuyên:</strong> {castingResult.changed_hexagram.action_advice}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="d-flex gap-3 justify-content-center mt-5">
                    <button className="btn btn-gold px-4" onClick={reset}>
                      Gieo Quẻ Mới
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
