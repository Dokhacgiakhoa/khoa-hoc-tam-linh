import React from "react";
import { Link } from "react-router-dom";

export default function ComingSoon() {
  return (
    <div className="container py-5 text-center min-vh-100 d-flex flex-column align-items-center justify-content-center">
      <div className="card-3d p-5 glass-card" style={{ maxWidth: "600px" }}>
        <div className="display-1 mb-4">🚀</div>
        <h2 className="text-gold mb-3">Tính năng đang được khởi tạo</h2>
        <p className="lead opacity-75 mb-4">
          Chúng tôi đang tích hợp trí tuệ nhân tạo và tri thức cổ xưa để mang
          đến cho bạn trải nghiệm tuyệt vời nhất. Vui lòng quay lại sau!
        </p>
        <Link to="/dich-vu" className="btn btn-gold px-4">
          Khám phá các dịch vụ khác
        </Link>
      </div>
    </div>
  );
}
