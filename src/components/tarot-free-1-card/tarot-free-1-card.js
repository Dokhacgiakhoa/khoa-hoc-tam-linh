import React, { useEffect, useRef, useState } from "react";
import Tarot_78 from "../../data/tarot-main"; // đã gộp 5 file: major, wands, swords, cups, pentacles

function TarotMienPhiMotLa() {
  // state chính
  const [dangXao, setDangXao] = useState(false);
  const [laDuocRut, setLaDuocRut] = useState(null);
  const [laNguoc, setLaNguoc] = useState(false);
  const [dangRut, setDangRut] = useState(false); // để animate lá bay + flip
  const timerRef = useRef(null);

  // tiện ích: random 1 lá
  const layNgauNhienLa = () => {
    const idx = Math.floor(Math.random() * Tarot_78.length);
    return Tarot_78[idx];
  };

  // tiện ích: 25% ngược
  const randomNguoc = () => {
    return Math.random() < 0.25; // 25% bị ngược
  };

  // tiện ích: chuyển đường dẫn ảnh tương đối sang đúng với GH Pages
  const getImageSrc = (card) => {
    if (!card || !card.Anh) return "";
    // card.Anh ví dụ: "./images/Tarot/Major/0-the-fool.png"
    return process.env.PUBLIC_URL + card.Anh.replace("./", "/");
  };

  // lấy nội dung hiển thị
  const layNoiDungYnghia = (card, isReversed) => {
    if (!card) return { tieuDe: "", noiDung: "", tuKhoa: [] };
    if (isReversed && card.NghiaNguoc) {
      return {
        tieuDe: "Nghĩa ngược",
        noiDung: card.NghiaNguoc.MoTa || "",
        tuKhoa: card.NghiaNguoc.TuKhoa || [],
      };
    }
    if (card.NghiaXuoi) {
      return {
        tieuDe: "Nghĩa xuôi",
        noiDung: card.NghiaXuoi.MoTa || "",
        tuKhoa: card.NghiaXuoi.TuKhoa || [],
      };
    }
    // fallback
    return {
      tieuDe: "Ý nghĩa chung",
      noiDung: card.YNghiaChung?.MoTa || "",
      tuKhoa: card.YNghiaChung?.TuKhoa || [],
    };
  };

  // bấm/giữ để xáo
  const batDauXao = () => {
    setDangXao(true);

    // nếu muốn hiệu ứng xáo liên tục đổi lá preview thì có thể setInterval
    timerRef.current = setInterval(() => {
      setLaDuocRut(layNgauNhienLa());
      setLaNguoc(false);
    }, 150);
  };

  // thả ra dừng xáo
  const dungXao = () => {
    setDangXao(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // rút bài
  const rutBai = () => {
    // dừng xáo nếu đang xáo
    dungXao();

    const card = layNgauNhienLa();
    const isRev = randomNguoc();

    // bật hiệu ứng
    setDangRut(true);
    setLaDuocRut(card);
    setLaNguoc(isRev);

    // tắt hiệu ứng sau 600ms (khớp CSS flip)
    setTimeout(() => {
      setDangRut(false);
    }, 600);
  };

  // dọn interval khi unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // nội dung nghĩa
  const nghia = layNoiDungYnghia(laDuocRut, laNguoc);

  return (
    <div className="tarot-wrapper container my-5" id="trai-bai-tarot-1-la">
      {/* tiêu đề */}
      <div className="mb-4 text-center">
        <h2 className="h4 mb-2">Trải bài Tarot miễn phí – 1 lá</h2>
        <p className="text-muted mb-0">
          Ấn giữ bộ bài để xáo. Bấm “Rút bài” để xem thông điệp hôm nay.
        </p>
      </div>

      <div className="row g-4 align-items-center">
        {/* CỘT BỘ BÀI + KẾT QUẢ HÌNH ẢNH */}
        <div className="col-lg-6 d-flex flex-column align-items-center gap-3">
          {/* bộ bài */}
          <div
            className={`tarot-deck ${dangXao ? "tarot-deck--shuffling" : ""}`}
            onMouseDown={batDauXao}
            onMouseUp={dungXao}
            onMouseLeave={dungXao}
            onTouchStart={batDauXao}
            onTouchEnd={dungXao}
          >
            {/* 5 lá chồng nhau – CSS sẽ xử lý nghiêng 3D */}
            <div className="tarot-deck__card tarot-deck__card--1"></div>
            <div className="tarot-deck__card tarot-deck__card--2"></div>
            <div className="tarot-deck__card tarot-deck__card--3"></div>
            <div className="tarot-deck__card tarot-deck__card--4"></div>
            <div className="tarot-deck__card tarot-deck__card--5"></div>
          </div>

          {/* lá kết quả */}
          <div
            className={`
              tarot-result-card
              ${dangRut ? "is-animating" : ""}
              ${laNguoc ? "is-reversed" : ""}
            `}
          >
            {laDuocRut ? (
              <img
                src={getImageSrc(laDuocRut)}
                alt={laDuocRut.Ten}
                className="tarot-card-img"
                loading="lazy"
              />
            ) : (
              <div className="tarot-card-placeholder">Chưa rút lá nào</div>
            )}
          </div>

          {/* nút rút */}
          <button
            type="button"
            className="btn btn-primary px-4"
            onClick={rutBai}
          >
            Rút bài
          </button>
        </div>

        {/* CỘT NỘI DUNG */}
        <div className="col-lg-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              {laDuocRut ? (
                <>
                  <p className="text-muted mb-1">
                    {laDuocRut.Nhom} • {laNguoc ? "Ngược" : "Xuôi"}
                  </p>
                  <h3 className="h5 mb-2">{laDuocRut.Ten}</h3>
                  <h4 className="small text-uppercase text-primary">
                    {nghia.tieuDe}
                  </h4>
                  <p>{nghia.noiDung}</p>

                  {/* từ khóa */}
                  {nghia.tuKhoa && nghia.tuKhoa.length > 0 && (
                    <p className="mb-3">
                      <strong>Từ khóa:</strong>{" "}
                      {nghia.tuKhoa.map((k, i) => (
                        <span key={i} className="badge bg-light text-dark me-1">
                          {k}
                        </span>
                      ))}
                    </p>
                  )}

                  {/* 4 chủ đề nếu có */}
                  {laDuocRut.ChuDe && (
                    <div className="row g-2">
                      <div className="col-sm-6">
                        <p className="mb-1 small text-muted">Tình duyên</p>
                        <p className="mb-2">
                          {laDuocRut.ChuDe.TinhDuyen || "—"}
                        </p>
                      </div>
                      <div className="col-sm-6">
                        <p className="mb-1 small text-muted">Công việc</p>
                        <p className="mb-2">
                          {laDuocRut.ChuDe.CongViec || "—"}
                        </p>
                      </div>
                      <div className="col-sm-6">
                        <p className="mb-1 small text-muted">Tài chính</p>
                        <p className="mb-2">
                          {laDuocRut.ChuDe.TaiChinh || "—"}
                        </p>
                      </div>
                      <div className="col-sm-6">
                        <p className="mb-1 small text-muted">Sức khỏe</p>
                        <p className="mb-0">{laDuocRut.ChuDe.SucKhoe || "—"}</p>
                      </div>
                    </div>
                  )}

                  {/* meta nếu có */}
                  {laDuocRut.Meta && (
                    <p className="mt-3 mb-0 small text-muted">
                      {typeof laDuocRut.Meta === "string" ? laDuocRut.Meta : ""}
                    </p>
                  )}
                </>
              ) : (
                <>
                  <h3 className="h5">Chưa có lá nào được rút</h3>
                  <p className="text-muted mb-0">
                    Giữ chuột trên bộ bài để xáo, sau đó bấm “Rút bài” để xem
                    thông điệp hôm nay.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TarotMienPhiMotLa;
