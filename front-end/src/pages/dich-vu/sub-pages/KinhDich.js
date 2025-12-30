import React from "react";
import "./sub-pages.css";

export default function KinhDich() {
  return (
    <div className="sub-page iching-page">
      <section className="sub-hero">
        <div className="container">
          <h1 className="sub-title">Kinh Dịch thực hành</h1>
          <p className="sub-desc">
            Trí tuệ cổ xưa ứng dụng vào đời sống hiện đại. Gieo quẻ hỏi việc,
            thấu hiểu thời thế và tìm kiếm lời khuyên từ 64 quẻ dịch.
          </p>
        </div>
      </section>

      <section className="sub-content container">
        <div className="glass-card info-form-card text-center">
          <h2 className="card-title">Gieo quẻ dịch</h2>
          <p className="mb-4">
            Tĩnh tâm và tập trung vào câu hỏi bạn muốn xin lời khuyên.
          </p>
          <div className="iching-animation py-5">
            <div className="coin-placeholder mb-4">🪙 🪙 🪙</div>
            <button className="btn btn-gold px-5">Bắt đầu gieo quẻ</button>
          </div>
        </div>

        <div className="mt-5 text-center opacity-75">
          <p>Hệ thống giải quẻ AI đang được nâng cấp. Vui lòng quay lại sau!</p>
        </div>
      </section>
    </div>
  );
}
