import React from "react";
import "./sub-pages.css";

export default function KhamPhaBanThan() {
  return (
    <div className="sub-page discovery-page">
      <section className="sub-hero">
        <div className="container">
          <h1 className="sub-title">Khám phá bản thân</h1>
          <p className="sub-desc">
            Hành trình thấu hiểu nội tâm thông qua các bài trắc nghiệm và phân
            tích tâm lý, kết hợp giữa khoa học hành vi và tri thức huyền học.
          </p>
        </div>
      </section>

      <section className="sub-content container">
        <div className="glass-card info-form-card">
          <h2 className="card-title">Chọn chủ đề khám phá</h2>
          <div className="row g-4 mt-2">
            {[
              "Linh hồn & Tiền kiếp",
              "Tiềm năng nghề nghiệp",
              "Ngôn ngữ tình yêu",
              "Năng lượng 7 luân xa",
            ].map((topic, i) => (
              <div className="col-md-6" key={i}>
                <div className="topic-card p-4 border rounded-3 bg-white bg-opacity-10">
                  <h4>{topic}</h4>
                  <p className="small opacity-75">
                    Bài trắc nghiệm dài 15-20 phút giúp bạn có cái nhìn sâu sắc.
                  </p>
                  <button className="btn btn-sm btn-outline-gold mt-2">
                    Bắt đầu
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 text-center opacity-75">
          <p>
            Các bài trắc nghiệm mới đang được soạn thảo. Vui lòng quay lại sau!
          </p>
        </div>
      </section>
    </div>
  );
}
