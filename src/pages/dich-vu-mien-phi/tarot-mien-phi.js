import React from "react";
import { Link } from "react-router-dom";
import TarotFree1Card from "../../components/tarot-free-1-card/tarot-free-1-card";
import "./tarot-mien-phi.css";

/**
 * Trang: Tarot Miễn Phí (Trải 1 lá)
 * Quy ước ảnh: đặt tại public/images/tarot/...
 *  - /images/tarot/hero.webp (tuỳ chọn)
 */

export default function TarotMienPhi() {
  return (
    <main id="tarot-mien-phi" className="khctl-page">
      {/* HERO */}
      <section className="tarot-hero">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-7">
              <h1 className="page-title">Tarot miễn phí – Trải 1 lá</h1>
              <p className="page-sub">
                Trải nhanh một lá bài để nhận thông điệp trong ngày. Không mê
                tín – giải nghĩa bằng dữ liệu & tư duy kiểm chứng.
              </p>
              <div className="d-flex gap-2 flex-wrap mt-2">
                <a href="#trai-bai" className="btn btn-gold">
                  Bắt đầu trải
                </a>
                <Link to="/hoc-vien-huyen-hoc" className="btn btn-outline-gold">
                  Học Tarot bài bản
                </Link>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="hero-media">
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/images/banners/tarot-mien-phi.png"
                  }
                  alt="Tarot miễn phí"
                  className="img-fluid hero-img"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HƯỚNG DẪN NGẮN */}
      <section className="section tarot-howto">
        <div className="container">
          <div className="row g-3">
            {[
              "Tĩnh tâm 5–10 giây, tập trung vào câu hỏi.",
              "Nhấn “Trải bài” để rút ngẫu nhiên 1 lá.",
              "Đọc thông điệp gợi ý; ghi chú cảm nhận của bạn.",
            ].map((t, i) => (
              <div className="col-12 col-md-4" key={i}>
                <div className="howto-item card-3d">
                  <div className="howto-index">{i + 1}</div>
                  <p className="howto-text">{t}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRẢI 1 LÁ */}
      <section id="trai-bai" className="section tarot-free-one">
        <div className="container">
          <div className="section-head text-center">
            <h2 className="section-title">Trải 1 lá</h2>
            <p className="section-desc">
              Nhấp để rút bài. Bạn có thể rút lại nếu muốn đổi câu hỏi.
            </p>
          </div>

          <div className="row justify-content-center">
            <div className="col-12 col-lg-8">
              <article className="card-3d tarot-card-wrap">
                {/* 👉 Component đã có sẵn trong src/components/tarot-free-1-card */}
                <TarotFree1Card />
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* CTA LIÊN QUAN */}
      <section className="section tarot-cta alt">
        <div className="container text-center">
          <h3 className="section-title">Nâng cấp trải nghiệm</h3>
          <p className="section-desc">
            Muốn giải nghĩa sâu hơn? Đặt lịch chuyên gia hoặc học Tarot chuẩn hệ
            thống.
          </p>
          <div className="d-flex gap-2 justify-content-center">
            <Link to="/dich-vu" className="btn btn-gold">
              Đặt lịch chuyên gia
            </Link>
            <Link to="/hoc-vien-huyen-hoc" className="btn btn-outline-gold">
              Vào Học viện
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
