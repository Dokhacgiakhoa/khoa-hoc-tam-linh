// src/pages/DichVu.js
import React from "react";
import { Link } from "react-router-dom";

function DichVu() {
  return (
    <div className="page page-dich-vu">
      <h1>Dịch vụ</h1>
      <ul>
        <li>
          <Link to="/dich-vu/tarot-free-1-card">
            Trải bài Tarot 1 lá (miễn phí)
          </Link>
        </li>
        <li>Trải bài 3 lá (đang phát triển)</li>
        <li>Chiêm tinh</li>
        <li>Thần số học</li>
      </ul>
    </div>
  );
}

export default DichVu;
