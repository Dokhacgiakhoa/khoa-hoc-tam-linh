import React, { useState } from "react";
import TarotData from "../../data/tarot-main";
import "./tarot-free-1-card.css";

const CHANCE_REVERSED = 0.25;

export default function TarotFree1CardPage() {
  const [card, setCard] = useState(null);
  const [isReversed, setIsReversed] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  const handleStartShuffle = () => setIsShuffling(true);
  const handleStopShuffle = () => setIsShuffling(false);

  const handleDrawCard = () => {
    if (!TarotData || TarotData.length === 0) return;
    const index = Math.floor(Math.random() * TarotData.length);
    const picked = TarotData[index];
    const reversed = Math.random() < CHANCE_REVERSED;
    setCard(picked);
    setIsReversed(reversed);
  };

  const getMeaning = () => {
    if (!card) return null;
    if (isReversed && card.NghiaNguoc) return card.NghiaNguoc;
    if (card.NghiaXuong) return card.NghiaXuong;
    return {
      MoTa: card.YNghiaChung || "",
      TuKhoa: card.TuKhoaChung || [],
      ChuDe: card.ChuDe || {},
    };
  };

  const meaning = getMeaning();
  const baseUrl = process.env.PUBLIC_URL || ""; // ảnh đặt ở public/

  return (
    <main className="tarot-free-wrapper container">
      <header className="tarot-header">
        <h1 className="tarot-title">Trải bài Tarot 1 lá (miễn phí)</h1>
        <p className="tarot-subtitle">
          Giữ chuột vào bộ bài để xáo, thả ra rồi bấm “Rút bài”.
        </p>
      </header>

      {/* Bộ bài */}
      <div
        className={`tarot-deck ${isShuffling ? "tarot-deck--shuffling" : ""}`}
        onMouseDown={handleStartShuffle}
        onMouseUp={handleStopShuffle}
        onMouseLeave={handleStopShuffle}
        aria-label="Bộ bài tarot để xáo và rút"
      >
        <div className="tarot-deck-card deck-1" />
        <div className="tarot-deck-card deck-2" />
        <div className="tarot-deck-card deck-3" />
        <div className="tarot-deck-card deck-4" />
        <div className="tarot-deck-card deck-5" />
      </div>

      <button className="kh-cta tarot-btn" onClick={handleDrawCard}>
        Rút bài
      </button>

      {card && (
        <section className="tarot-result">
          <div className="tarot-result-card">
            <img
              src={`${baseUrl}${card.Anh}`}
              alt={card.Ten}
              className={`tarot-card-img ${isReversed ? "is-reversed" : ""}`}
              loading="lazy"
            />
          </div>

          <div className="tarot-result-content">
            <h2 className="tarot-card-name">{card.Ten}</h2>
            <p className="tarot-card-group">{card.Nhom}</p>

            {meaning?.MoTa && <p className="tarot-desc">{meaning.MoTa}</p>}

            {meaning?.TuKhoa?.length > 0 && (
              <ul className="tarot-keywords">
                {meaning.TuKhoa.map((kw) => (
                  <li key={kw}>{kw}</li>
                ))}
              </ul>
            )}

            {meaning?.ChuDe && (
              <div className="tarot-topics">
                <p>
                  <strong>Tình duyên:</strong> {meaning.ChuDe.TinhDuyen}
                </p>
                <p>
                  <strong>Công việc:</strong> {meaning.ChuDe.CongViec}
                </p>
                <p>
                  <strong>Tài chính:</strong> {meaning.ChuDe.TaiChinh}
                </p>
                <p>
                  <strong>Sức khỏe:</strong> {meaning.ChuDe.SucKhoe}
                </p>
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
