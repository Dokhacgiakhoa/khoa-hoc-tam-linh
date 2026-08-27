"use client";

import React, { useRef, useState } from "react";
import "./TuViChartBoard.css";

export default function TuViChartBoard({ chartData }) {
  const printRef = useRef(null);
  const [theme, setTheme] = useState("dark"); // 'dark' | 'light'

  if (!chartData || !chartData.diaBan || !chartData.thienBan) {
    return null;
  }

  const { thienBan, diaBan } = chartData;

  const handlePrint = () => {
    window.print();
  };

  // Hàm gán màu Ngũ Hành cho Chính Tinh
  const getStarColorClass = (starName) => {
    if (["LIÊM TRINH", "THÁI DƯƠNG"].includes(starName)) return "star-hoa";
    if (["TỬ VI", "THIÊN PHỦ", "CỰ MÔN"].includes(starName)) return "star-tho";
    if (["VŨ KHÚC", "THẤT SÁT", "THIÊN LƯƠNG"].includes(starName)) return "star-kim";
    if (["THIÊN ĐỒNG", "PHÁ QUÂN", "THÁI ÂM"].includes(starName)) return "star-thuy";
    if (["THAM LANG", "THIÊN CƠ"].includes(starName)) return "star-moc";
    return "star-tho";
  };

  return (
    <div className={`tuvi-board-wrapper theme-${theme} animate-fade-in my-4`}>
      {/* Header Công Cụ & Theme Switcher */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2 mb-3 px-2">
        <span className="fw-bold small text-gold">
          📜 LÁ SỐ TỬ VI ĐẨU SỐ — THIÊN ĐỊA BÀN KHOA HỌC TÂM LINH
        </span>
        <div className="d-flex gap-2 align-items-center">
          <button
            className="btn btn-sm btn-outline-warning py-1 px-3 shadow"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            title="Đổi tông màu nền sáng / tối"
          >
            {theme === "dark" ? "☀️ Tông Giấy Dó Cổ Điển" : "🌙 Tông Nền Đen Huyền Bí"}
          </button>
          <button className="btn btn-gold btn-sm py-1 px-3 shadow" onClick={handlePrint}>
            🖨️ In / Tải Lá Số
          </button>
        </div>
      </div>

      {/* Lưới 4x4 Bản Đồ Lá Số Vuông 1:1 Chuẩn Xác */}
      <div className="tuvi-grid-container" ref={printRef}>
        {/* Render 12 Cung Địa Bàn */}
        {Object.entries(diaBan).map(([key, cung]) => {
          const isMenh = cung.name.includes("MỆNH");
          const isThan = cung.isThan;

          return (
            <div
              key={key}
              className="tuvi-cell"
              style={{ gridArea: cung.gridArea }}
            >
              {/* Đỉnh Cung */}
              <div className="tuvi-cell-header">
                <span className="tuvi-cell-chi">{cung.chi}</span>
                <span
                  className={`tuvi-cell-name ${
                    isMenh ? "is-menh" : isThan ? "is-than" : ""
                  }`}
                >
                  {cung.name}
                </span>
                <span className="tuvi-cell-van">{cung.daiVan}</span>
              </div>

              {/* Chính Tinh (Giữa) */}
              <div className="tuvi-chinh-tinh-box">
                {cung.chinhTinh.map((star, i) => (
                  <span
                    key={i}
                    className={`tuvi-chinh-tinh-item ${getStarColorClass(star.name)}`}
                  >
                    {star.name}
                    <span className="dac-ham">({star.dacHam})</span>
                  </span>
                ))}
              </div>

              {/* 2 Cột Tinh Tú: Cát Tinh (trái) - Sát Tinh (phải) */}
              <div className="tuvi-stars-columns">
                <div className="tuvi-cat-tinh-col">
                  {cung.catTinh.map((star, i) => (
                    <div key={i} className="star-item">
                      {star}
                    </div>
                  ))}
                </div>
                <div className="tuvi-hung-tinh-col">
                  {cung.hungTinh.map((star, i) => (
                    <div key={i} className="star-item">
                      {star}
                    </div>
                  ))}
                </div>
              </div>

              {/* Chân Cung */}
              <div className="tuvi-cell-footer">
                <span>{cung.namHan}</span>
                <span className="tuvi-cell-trang-sinh">{cung.trangSinh}</span>
                <span>{cung.nguyetHan}</span>
              </div>
            </div>
          );
        })}

        {/* THIÊN BÀN TRUNG TÂM (Grid 2x2 ở giữa, hình vuông chuẩn) */}
        <div className="tuvi-thien-ban-center">
          <div>
            <div className="thien-ban-header-title">
              KHOA HỌC TÂM LINH
            </div>
            <div className="text-center text-gold-gradient fw-bold fs-5 mt-1">
              {thienBan.name}
            </div>
          </div>

          <div className="thien-ban-info-grid">
            <div>
              <span className="thien-ban-label">Năm sinh: </span>
              <span className="thien-ban-val">{thienBan.solarDate.year} ({thienBan.lunarDate.year})</span>
            </div>
            <div>
              <span className="thien-ban-label">Tháng: </span>
              <span className="thien-ban-val">{thienBan.solarDate.month} ({thienBan.lunarDate.month})</span>
            </div>
            <div>
              <span className="thien-ban-label">Ngày: </span>
              <span className="thien-ban-val">{thienBan.solarDate.day} ({thienBan.lunarDate.day})</span>
            </div>
            <div>
              <span className="thien-ban-label">Giờ: </span>
              <span className="thien-ban-val">{thienBan.solarDate.time} ({thienBan.lunarDate.hour})</span>
            </div>

            <div className="col-span-2 pt-2 border-top border-secondary border-opacity-30">
              <span className="thien-ban-label">Âm Dương: </span>
              <span className="thien-ban-val highlight">{thienBan.amDuong} ({thienBan.amDuongLy})</span>
            </div>
            <div className="col-span-2">
              <span className="thien-ban-label">Bản Mệnh: </span>
              <span className="thien-ban-val highlight">{thienBan.menh}</span>
            </div>
            <div>
              <span className="thien-ban-label">Cục: </span>
              <span className="thien-ban-val highlight">{thienBan.cuc}</span>
            </div>
            <div>
              <span className="thien-ban-label">Tương quan: </span>
              <span className="thien-ban-val">{thienBan.menhCuc}</span>
            </div>

            <div>
              <span className="thien-ban-label">Mệnh chủ: </span>
              <span className="thien-ban-val">{thienBan.menhChu}</span>
            </div>
            <div>
              <span className="thien-ban-label">Thân chủ: </span>
              <span className="thien-ban-val">{thienBan.thanChu}</span>
            </div>
            <div className="col-span-2">
              <span className="thien-ban-label">Thân cư: </span>
              <span className="thien-ban-val highlight">{thienBan.thanCu}</span>
            </div>
          </div>

          <div className="text-center pt-2 border-top border-secondary border-opacity-30 small opacity-75">
            Năm xem: <strong className="text-gold">{thienBan.namXem} ({thienBan.namXemCanChi})</strong> — <strong className="text-light">{thienBan.tuoiHan} tuổi</strong>
          </div>

          {/* Dấu Mộc Đỏ Ấn Triện */}
          <div className="thien-ban-stamp">
            KHOA HỌC TÂM LINH
          </div>
        </div>

        {/* Thanh Triệt & Tuần (Đánh dấu giữa các cung) */}
        <div className="tuvi-triet-tag" style={{ top: "24.5%", left: "48%", transform: "translate(-50%, -50%)" }}>
          Triệt
        </div>
        <div className="tuvi-tuan-tag" style={{ top: "24.5%", left: "86%", transform: "translate(-50%, -50%)" }}>
          Tuần
        </div>
      </div>
    </div>
  );
}
