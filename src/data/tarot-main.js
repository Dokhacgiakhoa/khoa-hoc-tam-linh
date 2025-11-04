// src/data/tarot-main.js
import tarotMajor from "./tarot-major";
import tarotWands from "./tarot-wands";
import tarotSwords from "./tarot-swords";
import tarotCups from "./tarot-cups";
import tarotPentacles from "./tarot-pentacles";

/** ---------- Helpers: normalize & validate ---------- */
const toText = (v) => {
  if (v == null) return "";
  if (typeof v === "string") return v;
  if (Array.isArray(v)) return v.join(", ");
  if (typeof v === "object") {
    // bắt vài key thường gặp; nếu không có thì stringify ngắn gọn
    return v.MoTa ?? v.text ?? v.value ?? JSON.stringify(v);
  }
  return String(v);
};

const toKeywords = (v) => {
  if (Array.isArray(v)) return v.map(toText).filter(Boolean);
  if (typeof v === "string") {
    return v
      .split(/[,;|]/)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  if (typeof v === "object" && v) {
    return Object.values(v).map(toText).filter(Boolean);
  }
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

const fixImagePath = (p) => {
  if (!p) return "/images/tarot-cards/placeholder.webp";
  return p.startsWith("/") ? p : `/${p}`;
};

// Chuẩn hoá 1 lá để app dùng thống nhất
const normalizeCard = (c) => {
  const nghiaThuong = c?.NghiaXuoi ?? c?.Nghia ?? null; // nếu dataset dùng "Nghia"
  const nghiaNguoc = c?.NghiaNguoc ?? null;

  return {
    // ---- Metadata bắt buộc:
    Id: c?.Id ?? c?.id ?? undefined,
    Ten: c?.Ten ?? c?.name ?? "",
    Nhom: c?.Nhom ?? c?.group ?? "",
    Anh: fixImagePath(c?.Anh ?? c?.image),

    // ---- Nghĩa chuẩn hoá:
    YNghiaChung: toText(c?.YNghiaChung),
    NghiaXuoi: {
      MoTa: toText(nghiaThuong?.MoTa ?? nghiaThuong),
      TuKhoa: toKeywords(nghiaThuong?.TuKhoa),
      ChuDe: toTopics(nghiaThuong?.ChuDe),
    },
    NghiaNguoc: nghiaNguoc
      ? {
          MoTa: toText(nghiaNguoc?.MoTa ?? nghiaNguoc),
          TuKhoa: toKeywords(nghiaNguoc?.TuKhoa),
          ChuDe: toTopics(nghiaNguoc?.ChuDe),
        }
      : null,

    // ---- Fallback để tương thích code cũ:
    TuKhoaChung: toKeywords(c?.TuKhoaChung),
    ChuDe: toTopics(c?.ChuDe),
  };
};

// Validator nhẹ cho môi trường dev
const validate = (arr) => {
  if (process.env.NODE_ENV === "production") return;
  arr.forEach((card, i) => {
    const errs = [];
    if (!card.Ten) errs.push("Thiếu Ten");
    if (!card.Nhom) errs.push("Thiếu Nhom");
    if (!card.Anh) errs.push("Thiếu Anh");
    if (errs.length) {
      // eslint-disable-next-line no-console
      console.warn(
        `[TarotData] ${card.Ten || "(index " + i + ")"}: ${errs.join(", ")}`
      );
    }
  });
};

/** ---------- Gộp + normalize + validate ---------- */
const RAW = [
  ...tarotMajor,
  ...tarotWands,
  ...tarotSwords,
  ...tarotCups,
  ...tarotPentacles,
];

const TarotData = Object.freeze(RAW.map(normalizeCard));
validate(TarotData);

export default TarotData;

/**
 * JSDoc (tuỳ chọn) – dạng dữ liệu sau normalize:
 * @typedef {Object} TarotCard
 * @property {string|number} Id
 * @property {string} Ten
 * @property {string} Nhom
 * @property {string} Anh            // path bắt đầu bằng '/'
 * @property {string} YNghiaChung
 * @property {{MoTa:string, TuKhoa:string[], ChuDe:Object}} NghiaXuoi
 * @property {{MoTa:string, TuKhoa:string[], ChuDe:Object}|null} NghiaNguoc
 * @property {string[]} TuKhoaChung
 * @property {{TinhDuyen:string, CongViec:string, TaiChinh:string, SucKhoe:string}} ChuDe
 */
