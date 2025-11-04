import React, { useCallback, useMemo, useState } from "react";
import TarotData from "../../data/tarot-main";
import "./tarot-free-1-card.css";

const CHANCE_REVERSED = 0.25;

// Ghép PUBLIC_URL + path an toàn
const resolveSrc = (path) => {
  const base = process.env.PUBLIC_URL || "";
  if (!path) return base + "/images/tarot-cards/placeholder.webp";
  return base + (path.startsWith("/") ? path : `/${path}`);
};

/* ---------- Chuẩn hoá dữ liệu nghĩa lá ---------- */
const toText = (v) => {
  if (v == null) return "";
  if (typeof v === "string") return v;
  if (Array.isArray(v)) return v.join(", ");
  if (typeof v === "object") return v.MoTa ?? v.text ?? v.value ?? "";
  return String(v);
};
const toKeywords = (v) => {
  if (Array.isArray(v)) return v.map(toText).filter(Boolean);
  if (typeof v === "string")
    return v
      .split(/[,;|]/)
      .map((s) => s.trim())
      .filter(Boolean);
  if (typeof v === "object" && v)
    return Object.values(v).map(toText).filter(Boolean);
  return [];
};
const toTopics = (v) => {
  const o = v && typeof v === "object" ? v : {};
  return {
    TinhDuyen: toText(o.TinhDuyen),
    CongViec: toText(o.CongViec),
    TaiChinh: toText(o.TaiChinh),
    SucKhoe: toText(o.SucKhoe),
  };
};

/* ---------- Component chính ---------- */
export default function TarotFreeOneOfThree() {
  // Mỗi phần tử: { card, reversed }
  const [dealt, setDealt] = useState([]);
  const [pickedIndex, setPickedIndex] = useState(null);

  const hasDealt = dealt.length === 3;
  const hasPicked = pickedIndex !== null;

  // Tráo & phát 3 lá ngẫu nhiên (không trùng)
  const shuffleAndDeal = useCallback(() => {
    if (!Array.isArray(TarotData) || TarotData.length < 3) return;

    const chosenIdx = new Set();
    while (chosenIdx.size < 3) {
      chosenIdx.add(Math.floor(Math.random() * TarotData.length));
    }
    const cards = [...chosenIdx].map((idx) => ({
      card: TarotData[idx],
      reversed: Math.random() < CHANCE_REVERSED,
    }));

    setDealt(cards);
    setPickedIndex(null);
  }, []);

  // Lật 1 trong 3 lá – chỉ khi chưa chọn
  const handlePick = useCallback(
    (i) => {
      if (!hasDealt || hasPicked) return;
      setPickedIndex(i);
    },
    [hasDealt, hasPicked]
  );

  // Nghĩa lá đã chọn (chuẩn hoá)
  const meaning = useMemo(() => {
    if (!hasPicked) return null;
    const { card, reversed } = dealt[pickedIndex] ?? {};
    if (!card) return null;

    const raw =
      reversed && card.NghiaNguoc
        ? card.NghiaNguoc
        : card.NghiaXuong || {
            MoTa: card.YNghiaChung,
            TuKhoa: card.TuKhoaChung,
            ChuDe: card.ChuDe,
          };

    return {
      card,
      reversed,
      MoTa: toText(raw?.MoTa),
      TuKhoa: toKeywords(raw?.TuKhoa),
      ChuDe: toTopics(raw?.ChuDe),
    };
  }, [dealt, pickedIndex, hasPicked]);

  // Ảnh mặt lưng từ public/
  const backUrl =
    (process.env.PUBLIC_URL || "") + "/images/tarot-cards/back.png";

  return (
    <main className="tarot-one-of-three container">
      <header className="tarot-header">
        <h1 className="tarot-title">Tráo và rút bài (chọn 1 trong 3 lá)</h1>
        <p className="tarot-subtitle">
          Bấm nút để phát 3 lá úp. Chọn 1 lá để lật.
        </p>

        <button
          type="button"
          className="kh-cta tarot-action"
          onClick={shuffleAndDeal}
        >
          Tráo và rút bài
        </button>
      </header>

      {/* Vùng 3 lá */}
      {hasDealt && (
        <section className="tarot-board" aria-label="Ba lá bài">
          {dealt.map(({ card, reversed }, i) => {
            const isPicked = pickedIndex === i;
            const isLocked = hasPicked && !isPicked;

            return (
              <div
                key={i}
                className={`flip-container ${isPicked ? "is-picked" : ""} ${
                  isLocked ? "is-locked" : ""
                }`}
                onClick={() => handlePick(i)}
                role="button"
                tabIndex={0}
                aria-disabled={isLocked}
                title={
                  isLocked
                    ? "Đã khoá – bấm Tráo và rút bài để rút lại"
                    : "Bấm để lật lá này"
                }
              >
                <div className={`card-inner ${isPicked ? "is-flipped" : ""}`}>
                  {/* mặt lưng – set inline từ public/ */}
                  <div
                    className="card-face card-back"
                    style={{
                      backgroundImage: `url("${backUrl}")`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  {/* mặt trước */}
                  <div className="card-face card-front">
                    <img
                      src={resolveSrc(card?.Anh)}
                      alt={`${card?.Ten || "Tarot Card"}${
                        reversed ? " (ngược)" : ""
                      }`}
                      className={`tarot-card-img ${
                        reversed ? "is-reversed" : ""
                      }`}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      )}

      {/* Kết quả & diễn giải */}
      {meaning && (
        <section className="tarot-meaning">
          <h2 className="tarot-card-name">
            {meaning.card.Ten} {meaning.reversed ? <em>(ngược)</em> : null}
          </h2>
          {meaning.card.Nhom && (
            <p className="tarot-card-group">{meaning.card.Nhom}</p>
          )}

          {meaning.MoTa && <p className="tarot-desc">{meaning.MoTa}</p>}

          {!!meaning.TuKhoa?.length && (
            <ul className="tarot-keywords">
              {meaning.TuKhoa.map((kw, idx) => (
                <li key={idx}>{kw}</li>
              ))}
            </ul>
          )}

          {(meaning.ChuDe.TinhDuyen ||
            meaning.ChuDe.CongViec ||
            meaning.ChuDe.TaiChinh ||
            meaning.ChuDe.SucKhoe) && (
            <div className="tarot-topics">
              {meaning.ChuDe.TinhDuyen && (
                <p>
                  <strong>Tình duyên:</strong> {meaning.ChuDe.TinhDuyen}
                </p>
              )}
              {meaning.ChuDe.CongViec && (
                <p>
                  <strong>Công việc:</strong> {meaning.ChuDe.CongViec}
                </p>
              )}
              {meaning.ChuDe.TaiChinh && (
                <p>
                  <strong>Tài chính:</strong> {meaning.ChuDe.TaiChinh}
                </p>
              )}
              {meaning.ChuDe.SucKhoe && (
                <p>
                  <strong>Sức khỏe:</strong> {meaning.ChuDe.SucKhoe}
                </p>
              )}
            </div>
          )}
        </section>
      )}
    </main>
  );
}
