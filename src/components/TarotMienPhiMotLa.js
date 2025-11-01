import React, { useState, useRef } from "react";
import Tarot_78 from "../data/tarot78";
import "./TarotMienPhiMotLa.css";

const TarotMienPhiMotLa = () => {
  const [laBai, setLaBai] = useState(null);
  const [dangXao, setDangXao] = useState(false);
  const [dangLat, setDangLat] = useState(false);
  const [dangBay, setDangBay] = useState(false);

  // biến động cho lá bay
  const [flyVars, setFlyVars] = useState({
    tx: 0,
    ty: 0,
    scale: 1,
    startTop: 0,
    startLeft: 0,
  });

  const deckRef = useRef(null);
  const resultRef = useRef(null);
  const latTimeoutRef = useRef(null);
  const bayTimeoutRef = useRef(null);

  const batDauXao = () => setDangXao(true);
  const dungXao = () => setDangXao(false);

  const layNoiDungYnghia = (la, isReversed) => {
    if (!la) return "";
    return isReversed
      ? la.NghiaNguoc || la.YNghiaChung
      : la.NghiaXuoi || la.YNghiaChung;
  };

  const rutBai = () => {
    if (!Tarot_78?.length) return;

    const randomIndex = Math.floor(Math.random() * Tarot_78.length);
    const laMoi = Tarot_78[randomIndex];
    const isReversed = Math.random() < 0.25;
    const laDaXuLy = {
      ...laMoi,
      isReversed,
      Anh: laMoi.Anh || `/images/Tarot/${laMoi.ID}.png`,
    };

    const deckEl = deckRef.current;
    const resultEl = resultRef.current;

    // 🟣 lấy offset cuộn hiện tại để cộng vào
    const scrollX = window.scrollX || window.pageXOffset || 0;
    const scrollY = window.scrollY || window.pageYOffset || 0;

    if (deckEl && resultEl) {
      const deckBox = deckEl.getBoundingClientRect();
      const resultBox = resultEl.getBoundingClientRect();

      // ⭐ điểm xuất phát: TÂM bộ bài (đã cộng scroll)
      const deckCenterX = deckBox.left + deckBox.width / 2 + scrollX;
      const deckCenterY = deckBox.top + deckBox.height / 2 + scrollY;

      // ⭐ điểm đến: TÂM lá kết quả (đã cộng scroll)
      const resultCenterX = resultBox.left + resultBox.width / 2 + scrollX;
      const resultCenterY = resultBox.top + resultBox.height / 2 + scrollY;

      // vector bay
      const dx = resultCenterX - deckCenterX;
      const dy = resultCenterY - deckCenterY;

      // tỷ lệ phóng to
      const scale = resultBox.width / deckBox.width;

      setFlyVars({
        tx: dx,
        ty: dy,
        scale: scale,
        startTop: deckCenterY,
        startLeft: deckCenterX,
      });
    } else {
      // fallback nếu ref chưa sẵn sàng
      setFlyVars({
        tx: 330,
        ty: -4,
        scale: 2.33,
        startTop: 110 + scrollY,
        startLeft: 40 + scrollX,
      });
    }

    // bật lá bay
    setDangBay(true);

    // sau khi bay xong -> cập nhật lá + lật
    if (bayTimeoutRef.current) clearTimeout(bayTimeoutRef.current);
    bayTimeoutRef.current = setTimeout(() => {
      setDangBay(false);
      setLaBai(laDaXuLy);

      setDangLat(true);
      if (latTimeoutRef.current) clearTimeout(latTimeoutRef.current);
      latTimeoutRef.current = setTimeout(() => setDangLat(false), 600);
    }, 600);
  };

  return (
    <div className="tarot-wrapper">
      <div className="tarot-header">
        <h2>Trải bài Tarot 1 lá (miễn phí)</h2>
        <p className="tarot-subtitle">
          Nhấn vào bộ bài để xáo, sau đó bấm Rút bài để xem thông điệp hôm nay.
        </p>
      </div>

      <div className="tarot-body">
        {/* CỘT 1: Bộ bài */}
        <div className="tarot-col tarot-deck-col">
          <div
            ref={deckRef}
            className={`tarot-deck ${dangXao ? "is-shuffling" : ""}`}
            onMouseDown={batDauXao}
            onMouseUp={dungXao}
            onMouseLeave={dungXao}
            onTouchStart={batDauXao}
            onTouchEnd={dungXao}
          >
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className={`tarot-card tarot-card--${i}`}>
                <img src="/images/Tarot/back.png" alt={`Lá ${i}`} />
              </div>
            ))}
          </div>

          <button className="tarot-btn" onClick={rutBai}>
            Rút bài
          </button>
        </div>

        {/* CỘT 2: Lá kết quả */}
        <div className="tarot-col tarot-card-col">
          <div
            ref={resultRef}
            className={`tarot-card-flip ${dangLat ? "is-flipping" : ""}`}
          >
            <div className="tarot-card-face tarot-card-front">
              {laBai ? (
                <img
                  src={laBai.Anh}
                  alt={laBai.Ten}
                  className={`tarot-card-img ${
                    laBai.isReversed ? "rotate-180" : ""
                  }`}
                />
              ) : (
                <img
                  src="/images/Tarot/back.png"
                  alt="Mặt sau bộ bài"
                  className="tarot-card-img"
                />
              )}
            </div>
            <div className="tarot-card-face tarot-card-back">
              <img
                src="/images/Tarot/back.png"
                alt="Mặt sau bộ bài"
                className="tarot-card-img"
              />
            </div>
          </div>
        </div>

        {/* CỘT 3: Nội dung */}
        <div className="tarot-col tarot-content-col">
          <h3 className="tarot-card-title">
            {laBai ? laBai.Ten : "Chưa rút bài"}
          </h3>
          <p className="tarot-card-meaning">
            {laBai
              ? layNoiDungYnghia(laBai, laBai.isReversed)
              : "Hãy nhấn vào bộ bài để xáo rồi bấm Rút bài nhé."}
          </p>
        </div>
      </div>

      {/* LÁ BAY */}
      {dangBay && (
        <div
          className="tarot-fly-card"
          style={{
            top: `${flyVars.startTop}px`,
            left: `${flyVars.startLeft}px`,
            "--tx": `${flyVars.tx}px`,
            "--ty": `${flyVars.ty}px`,
            "--scale": flyVars.scale,
          }}
        >
          <img src="/images/Tarot/back.png" alt="Lá đang bay" />
        </div>
      )}
    </div>
  );
};

export default TarotMienPhiMotLa;
