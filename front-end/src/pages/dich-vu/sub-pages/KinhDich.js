import React, { useState, useEffect } from "react";
import "./sub-pages.css";

export default function KinhDich() {
  // States: 'intro', 'casting', 'result'
  const [phase, setPhase] = useState("intro");
  const [lines, setLines] = useState([]); // Stores 6 values (6,7,8,9)
  const [isTossing, setIsTossing] = useState(false);
  const [currentCoins, setCurrentCoins] = useState([0, 0, 0]); // 0: tail (2), 1: head (3)

  const HEXAGRAM_NAMES = {
    111111: "Thuần Càn (The Creative)",
    "000000": "Thuần Khôn (The Receptive)",
    // Add more simplified logic or generic names for now
  };

  const castLine = () => {
    if (lines.length >= 6) return;

    setIsTossing(true);

    // Animate for 1 second
    let interval = setInterval(() => {
      setCurrentCoins([
        Math.random() > 0.5 ? 3 : 2,
        Math.random() > 0.5 ? 3 : 2,
        Math.random() > 0.5 ? 3 : 2,
      ]);
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      // Final throw
      const coin1 = Math.random() > 0.5 ? 3 : 2; // 3=Head, 2=Tail
      const coin2 = Math.random() > 0.5 ? 3 : 2;
      const coin3 = Math.random() > 0.5 ? 3 : 2;
      const sum = coin1 + coin2 + coin3;

      setCurrentCoins([coin1, coin2, coin3]);
      setLines((prev) => [...prev, sum]);
      setIsTossing(false);

      if (lines.length + 1 === 6) {
        setTimeout(() => setPhase("result"), 1000);
      }
    }, 1000);
  };

  const reset = () => {
    setPhase("intro");
    setLines([]);
    setCurrentCoins([0, 0, 0]);
  };

  // Render Line Component
  const HexLine = ({ value, index }) => {
    // 6: Old Yin (Changing) --x--
    // 7: Young Yang (Solid) -----
    // 8: Young Yin (Broken) -- --
    // 9: Old Yang (Changing) --o--

    const isYang = value === 7 || value === 9;
    const isChanging = value === 6 || value === 9;

    return (
      <div
        className={`hex-line d-flex justify-content-center align-items-center mb-2 animate-slide-up`}
        style={{ height: "40px", animationDelay: `${index * 0.1}s` }}
      >
        <div className="d-flex align-items-center justify-content-center w-100 gap-3">
          {/* Line Number */}
          <div
            className="text-white-50 small font-monospace text-end"
            style={{ width: "60px" }}
          >
            Hào {index + 1}
          </div>

          {/* Main Line Body */}
          <div
            className="position-relative d-flex align-items-center justify-content-center"
            style={{ width: "200px" }}
          >
            <div
              className={`line-body w-100 ${
                isYang ? "bg-gold" : "d-flex justify-content-between"
              }`}
              style={{ height: "15px", borderRadius: "4px" }}
            >
              {!isYang && (
                <>
                  <div
                    className="bg-gold opacity-75"
                    style={{
                      width: "45%",
                      height: "100%",
                      borderRadius: "4px 0 0 4px",
                    }}
                  ></div>
                  <div
                    className="bg-gold opacity-75"
                    style={{
                      width: "45%",
                      height: "100%",
                      borderRadius: "0 4px 4px 0",
                    }}
                  ></div>
                </>
              )}
            </div>
          </div>

          {/* Changing Marker */}
          <div
            className="text-gold small text-start"
            style={{ width: "100px" }}
          >
            {isChanging && <span>{value === 6 ? "⚪ Động" : "⚫ Động"}</span>}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="sub-page iching-page">
      <section className="sub-hero pb-4">
        <div className="container">
          <h1 className="sub-title text-gradient">Kinh Dịch Gieo Quẻ</h1>
          <p className="sub-desc mx-auto" style={{ maxWidth: "700px" }}>
            "Vật cùng tắc biến, biến tắc thông". Gieo 3 đồng xu 6 lần để lập
            quẻ, tìm kiếm lời khuyên từ trí tuệ ngàn năm.
          </p>
        </div>
      </section>

      <section className="sub-content container" style={{ minHeight: "600px" }}>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="glass-card p-5 text-center position-relative overflow-hidden">
              {/* Background Bagua Decoration */}
              <div
                className="position-absolute top-50 start-50 translate-middle opacity-10"
                style={{ fontSize: "20rem", pointerEvents: "none", zIndex: 0 }}
              >
                ☯️
              </div>

              {phase === "intro" && (
                <div className="animate-fade-in position-relative z-1">
                  <div className="mb-5">
                    <div className="display-1 mb-4">🐢</div>
                    <h2 className="h3 text-gold mb-3">
                      Tĩnh tâm & Đặt câu hỏi
                    </h2>
                    <p className="text-light opacity-75 mb-4">
                      Hãy tập trung suy nghĩ về vấn đề bạn đang gặp phải. Khi
                      tâm trí đã định, nhấn nút bên dưới để bắt đầu kiến tạo
                      quẻ.
                    </p>
                  </div>
                  <button
                    className="btn btn-gold btn-lg px-5 shadow-lg fw-bold"
                    onClick={() => setPhase("casting")}
                  >
                    Bắt đầu Gieo Quẻ
                  </button>
                </div>
              )}

              {phase === "casting" && (
                <div className="animate-fade-in position-relative z-1">
                  <div className="d-flex justify-content-between align-items-start mb-5">
                    {/* Left: Coins */}
                    <div className="coin-area flex-grow-1">
                      <h4 className="text-white-50 mb-4 text-uppercase ls-2 small">
                        Lần gieo thứ {lines.length + 1} / 6
                      </h4>

                      <div
                        className="d-flex justify-content-center gap-4 mb-5"
                        style={{ height: "100px" }}
                      >
                        {currentCoins.map((val, idx) => (
                          <div
                            key={idx}
                            className={`iching-coin ${
                              isTossing ? "animate-flip" : ""
                            } position-relative`}
                            style={{
                              width: "90px",
                              height: "90px",
                              background:
                                "radial-gradient(circle, #e6c288 30%, #b8860b 90%)",
                              borderRadius: "50%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              boxShadow:
                                "inset 0 0 10px rgba(0,0,0,0.5), 0 5px 15px rgba(0,0,0,0.4)",
                              border: "6px solid #d4af37",
                            }}
                          >
                            {/* Inner Square Hole */}
                            <div
                              style={{
                                width: "28px",
                                height: "28px",
                                background: "rgba(20,20,30,0.9)",
                                border: "2px solid #8b6914",
                                zIndex: 2,
                                boxShadow: "inset 0 0 5px #000",
                              }}
                            ></div>

                            {/* Coin Face Details */}
                            {val === 3 ? ( // Ngửa (Head) - Yang - With Characters (Trị Bình Thông Bảo)
                              <>
                                {/* Hanzi Characters - Engraved Look */}
                                <div
                                  className="position-absolute top-0 mt-1 text-dark fw-bold"
                                  style={{
                                    fontSize: "0.9rem",
                                    fontFamily: "serif",
                                    marginTop: "4px",
                                    textShadow:
                                      "1px 1px 0px rgba(255,255,255,0.3), -1px -1px 0px rgba(0,0,0,0.5)",
                                  }}
                                >
                                  治
                                </div>
                                <div
                                  className="position-absolute bottom-0 mb-1 text-dark fw-bold"
                                  style={{
                                    fontSize: "0.9rem",
                                    fontFamily: "serif",
                                    marginBottom: "4px",
                                    textShadow:
                                      "1px 1px 0px rgba(255,255,255,0.3), -1px -1px 0px rgba(0,0,0,0.5)",
                                  }}
                                >
                                  平
                                </div>
                                <div
                                  className="position-absolute end-0 me-1 text-dark fw-bold"
                                  style={{
                                    fontSize: "0.9rem",
                                    fontFamily: "serif",
                                    marginRight: "4px",
                                    textShadow:
                                      "1px 1px 0px rgba(255,255,255,0.3), -1px -1px 0px rgba(0,0,0,0.5)",
                                  }}
                                >
                                  寶
                                </div>
                                <div
                                  className="position-absolute start-0 ms-1 text-dark fw-bold"
                                  style={{
                                    fontSize: "0.9rem",
                                    fontFamily: "serif",
                                    marginLeft: "4px",
                                    textShadow:
                                      "1px 1px 0px rgba(255,255,255,0.3), -1px -1px 0px rgba(0,0,0,0.5)",
                                  }}
                                >
                                  通
                                </div>

                                {/* Inner Ring */}
                                <div
                                  className="position-absolute w-100 h-100 rounded-circle border border-dark opacity-25"
                                  style={{
                                    transform: "scale(0.85)",
                                    borderWidth: "1px",
                                  }}
                                ></div>
                              </>
                            ) : (
                              // Sấp (Tail) - Yin - No Characters / Flower Pattern
                              <>
                                {/* Simple decorative dots */}
                                <div
                                  className="position-absolute top-0 mt-2 text-dark opacity-50"
                                  style={{ fontSize: "0.5rem" }}
                                >
                                  ●
                                </div>
                                <div
                                  className="position-absolute bottom-0 mb-2 text-dark opacity-50"
                                  style={{ fontSize: "0.5rem" }}
                                >
                                  ●
                                </div>
                                <div
                                  className="position-absolute start-0 ms-2 text-dark opacity-50"
                                  style={{ fontSize: "0.5rem" }}
                                >
                                  ●
                                </div>
                                <div
                                  className="position-absolute end-0 me-2 text-dark opacity-50"
                                  style={{ fontSize: "0.5rem" }}
                                >
                                  ●
                                </div>

                                {/* Texture pattern */}
                                <div
                                  className="position-absolute w-100 h-100 rounded-circle border border-dark opacity-10"
                                  style={{
                                    transform: "scale(0.8)",
                                    backgroundImage:
                                      "radial-gradient(circle, transparent 20%, rgba(0,0,0,0.1) 21%, transparent 22%)",
                                    backgroundSize: "10px 10px",
                                  }}
                                ></div>
                              </>
                            )}
                          </div>
                        ))}
                      </div>

                      <button
                        className="btn btn-outline-gold px-5 py-2"
                        onClick={castLine}
                        disabled={isTossing || lines.length >= 6}
                      >
                        {isTossing ? "Đang gieo..." : "Gieo đồng xu"}
                      </button>
                    </div>

                    {/* Right: Hexagram Progress */}
                    <div className="hex-progress ms-md-4 border-start border-secondary border-opacity-25 ps-md-4 d-none d-md-block flex-grow-1">
                      <h6 className="text-gold mb-3 text-uppercase small">
                        Tiến trình quẻ
                      </h6>
                      <div
                        className="d-flex flex-column-reverse w-100"
                        style={{
                          minHeight: "240px",
                          justifyContent: "flex-start",
                        }}
                      >
                        {lines.map((val, idx) => (
                          <HexLine key={idx} value={val} index={idx} />
                        ))}
                        {/* Empty Slots */}
                        {[...Array(6 - lines.length)].map((_, idx) => (
                          <div
                            key={`empty-${idx}`}
                            className="mb-2 border border-secondary border-opacity-10 rounded"
                            style={{ height: "15px", width: "100%" }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {phase === "result" && (
                <div className="animate-fade-in position-relative z-1">
                  <h2 className="text-gold mb-4">Quẻ Của Bạn Đã Thành</h2>

                  <div
                    className="hexagram-display p-4 rounded-3 mb-4 d-inline-block"
                    style={{
                      background: "rgba(0,0,0,0.3)",
                      border: "1px solid rgba(255,215,0,0.2)",
                    }}
                  >
                    <div
                      className="d-flex flex-column-reverse gap-2"
                      style={{ width: "300px" }}
                    >
                      {lines.map((val, idx) => (
                        <HexLine key={idx} value={val} index={idx} />
                      ))}
                    </div>
                  </div>

                  <p className="lead mb-4">
                    Hệ thống đang phân tích các hào động và quẻ biến...
                  </p>

                  <div className="alert alert-warning border-gold bg-transparent text-white-50">
                    ⚠️ Tính năng luận giải chi tiết AI đang được cập nhật. Kết
                    quả gieo quẻ trên là chính xác theo phương pháp Cổ Dịch. Bạn
                    có thể lưu lại hình ảnh quẻ để tra cứu.
                  </div>

                  <button
                    className="btn btn-outline-light mt-3"
                    onClick={reset}
                  >
                    Gieo quẻ mới
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
