import React, { useCallback, useMemo, useState, useEffect } from "react";
import api from "../../services/api";
import TarotData from "../../data/tarot-main";
import "./tarot-free-1-card.css";

const CHANCE_REVERSED = 0.25;

// Ghép PUBLIC_URL + path an toàn
const resolveSrc = (path) => {
  const base = process.env.PUBLIC_URL || "";
  if (!path) return base + "/images/tarot-cards/placeholder.webp";
  return base + (path.startsWith("/") ? path : `/${path}`);
};

/** Chuẩn hóa dữ liệu từ DB sang format Frontend */
const normalizeFromDB = (c) => ({
  Ten: c.name || c.Ten,
  Anh: c.image || c.Anh,
  Nhom: c.group || c.Nhom,
  YNghiaChung: c.meaning_general || c.YNghiaChung,
  NghiaXuoi: c.meaning_upright || c.NghiaXuoi,
  NghiaNguoc: c.meaning_reversed || c.NghiaNguoc,
  ChuDe: c.topics || c.ChuDe,
});

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

export default function TarotFreeOneOfThree() {
  // Khởi tạo mặc định với bộ bài có sẵn (78 lá) để không bao giờ bị rỗng
  const [tarotData, setTarotData] = useState(TarotData && TarotData.length > 0 ? TarotData : []);
  const [loading, setLoading] = useState(false);
  const [dealt, setDealt] = useState([]);
  const [pickedIndex, setPickedIndex] = useState(null);

  useEffect(() => {
    api
      .get("/api/tarot")
      .then((res) => {
        const data = res.data?.data || res.data;
        if (Array.isArray(data) && data.length > 0) {
          const normalized = data.map(normalizeFromDB);
          setTarotData(normalized);
        }
      })
      .catch((err) => {
        console.warn("API Tarot không phản hồi, sử dụng bộ bài offline fallback:", err);
      });
  }, []);

  const hasDealt = dealt.length === 3;
  const hasPicked = pickedIndex !== null;

  // Tráo & phát 3 lá ngẫu nhiên (không trùng)
  const shuffleAndDeal = useCallback(() => {
    const dataSource = tarotData && tarotData.length >= 3 ? tarotData : TarotData;
    if (!dataSource || dataSource.length < 3) return;

    const chosenIdx = new Set();
    while (chosenIdx.size < 3) {
      chosenIdx.add(Math.floor(Math.random() * dataSource.length));
    }
    const cards = [...chosenIdx].map((idx) => ({
      card: dataSource[idx],
      reversed: Math.random() < CHANCE_REVERSED,
    }));

    setDealt(cards);
    setPickedIndex(null);
  }, [tarotData]);

  // Tự động chia 3 lá bài khi vào trang nếu chưa chia
  useEffect(() => {
    if (dealt.length === 0) {
      shuffleAndDeal();
    }
  }, [shuffleAndDeal, dealt.length]);

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
        : card.NghiaXuoi || {
            MoTa: card.YNghiaChung,
            TuKhoa: card.TuKhoaChung,
            ChuDe: card.ChuDe,
          };

    return {
      card,
      reversed,
      MoTa: toText(raw?.MoTa) || toText(card.YNghiaChung),
      TuKhoa: toKeywords(raw?.TuKhoa) || toKeywords(card.TuKhoaChung),
      ChuDe: toTopics(raw?.ChuDe || card.ChuDe),
    };
  }, [dealt, pickedIndex, hasPicked]);

  // Ảnh mặt lưng từ public/
  const backUrl =
    (process.env.PUBLIC_URL || "") + "/images/tarot-cards/back.png";

  return (
    <main className="tarot-one-of-three container">
      <header className="tarot-header mb-4">
        <h2 className="tarot-title text-gold mb-2">Tráo và rút bài (chọn 1 trong 3 lá)</h2>
        <p className="tarot-subtitle text-light opacity-80 mb-3">
          Tập trung vào câu hỏi của bạn, bấm nút để xáo bài, sau đó nhấp vào 1 trong 3 lá úp để lật mở thông điệp.
        </p>

        <button
          type="button"
          className="btn btn-gold btn-lg px-4 shadow fw-bold tarot-action"
          onClick={shuffleAndDeal}
          disabled={loading}
        >
          {loading ? "Đang tải dữ liệu..." : "🔀 Tráo và rút lại bài"}
        </button>
      </header>

      {/* Vùng 3 lá */}
      {hasDealt && (
        <section className="tarot-board my-4" aria-label="Ba lá bài">
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
                    : "Bấm để lật mở lá bài này"
                }
              >
                <div className={`card-inner ${isPicked ? "is-flipped" : ""}`}>
                  {/* Mặt lưng */}
                  <div
                    className="card-face card-back"
                    style={{
                      backgroundImage: `url("${backUrl}")`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  {/* Mặt trước */}
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
        <section className="tarot-meaning glass-card p-4 p-md-5 mt-4 text-start animate-fade-in border-gold">
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
            <h3 className="tarot-card-name text-gold mb-0">
              {meaning.card.Ten} {meaning.reversed ? <span className="badge bg-danger ms-2">Chiều Ngược (Reversed)</span> : <span className="badge bg-success ms-2">Chiều Xuôi (Upright)</span>}
            </h3>
            {meaning.card.Nhom && (
              <span className="badge bg-purple-900 border-gold text-gold">
                Nhóm: {meaning.card.Nhom}
              </span>
            )}
          </div>

          {meaning.MoTa && (
            <div className="p-3 bg-dark bg-opacity-50 rounded mb-3">
              <p className="tarot-desc text-light mb-0">{meaning.MoTa}</p>
            </div>
          )}

          {!!meaning.TuKhoa?.length && (
            <div className="mb-3">
              <div className="small text-white-50 mb-1">Từ khóa chính:</div>
              <ul className="tarot-keywords">
                {meaning.TuKhoa.map((kw, idx) => (
                  <li key={idx} className="badge bg-gold bg-opacity-10 text-gold border-gold border-opacity-30 me-2 mb-2 p-2">
                    ✨ {kw}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {(meaning.ChuDe.TinhDuyen ||
            meaning.ChuDe.CongViec ||
            meaning.ChuDe.TaiChinh ||
            meaning.ChuDe.SucKhoe) && (
            <div className="tarot-topics row g-3 mt-2">
              {meaning.ChuDe.TinhDuyen && (
                <div className="col-md-6">
                  <div className="p-3 rounded glass-card h-100">
                    <h5 className="text-danger small mb-1">❤️ Tình Duyên</h5>
                    <p className="text-light small mb-0">{meaning.ChuDe.TinhDuyen}</p>
                  </div>
                </div>
              )}
              {meaning.ChuDe.CongViec && (
                <div className="col-md-6">
                  <div className="p-3 rounded glass-card h-100">
                    <h5 className="text-primary small mb-1">💼 Công Việc & Sự Nghiệp</h5>
                    <p className="text-light small mb-0">{meaning.ChuDe.CongViec}</p>
                  </div>
                </div>
              )}
              {meaning.ChuDe.TaiChinh && (
                <div className="col-md-6">
                  <div className="p-3 rounded glass-card h-100">
                    <h5 className="text-warning small mb-1">💰 Tài Chính & Tiền Bạc</h5>
                    <p className="text-light small mb-0">{meaning.ChuDe.TaiChinh}</p>
                  </div>
                </div>
              )}
              {meaning.ChuDe.SucKhoe && (
                <div className="col-md-6">
                  <div className="p-3 rounded glass-card h-100">
                    <h5 className="text-success small mb-1">🌿 Sức Khỏe & Tinh Thần</h5>
                    <p className="text-light small mb-0">{meaning.ChuDe.SucKhoe}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      )}
    </main>
  );
}
