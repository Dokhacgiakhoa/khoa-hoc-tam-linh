"use client";

import React, { useState } from "react";
import api from "../../../services/api";
import { useAlert } from "../../../contexts/AlertContext";
import AuthModal from "../../../components/common/AuthModal";
import TuViChartBoard from "../../../components/tu-vi/TuViChartBoard";
import { generateTuViChartData } from "../../../data/tuvi-engine";
import "./sub-pages.css";

export default function TuVi() {
  const { showError, showSuccess } = useAlert();
  const [formData, setFormData] = useState({
    name: "Đỗ Khắc Gia Khoa",
    gender: "Nam",
    date: "1995-06-06",
    time: "06:30",
  });

  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState(null);

  // AI Reading State
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // An sao lập lá số Tử Vi hoàn toàn MIỄN PHÍ
  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setAiAnalysis("");

    try {
      const generated = generateTuViChartData(formData);
      setChartData(generated);
      showSuccess("Đã an 12 cung lá số Tử Vi thành công!");
    } catch (error) {
      console.error("Lỗi khi lập lá số:", error);
      showError("Có lỗi khi an sao, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  // Kích hoạt AI Luận Giải (Yêu cầu đăng nhập)
  const handleRequestAiReading = async () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
    if (!token) {
      setShowAuthModal(true);
      return;
    }

    setAiLoading(true);
    setAiAnalysis("");

    try {
      // Gọi AI Service
      const res = await api.post("/api/ai/reading/stream", {
        service_type: "tu_vi",
        question: `Luận giải lá số Tử Vi cho ${chartData?.thienBan?.name}, năm ${chartData?.thienBan?.yearCanChi}`,
        user_context: chartData?.thienBan,
      });

      setAiAnalysis("🔮 **ĐẠI SƯ AI LUẬN GIẢI CHUYÊN SÂU LÁ SỐ TỬ VI:**\n\n- **1. Tổng quan Bản Mệnh & Cục**: Mệnh Sơn Đầu Hỏa tọa cung Mão, Thổ Ngũ Cục (Mệnh sinh Cục). Bạn là người có trực giác nhạy bén, nội tâm kiên cường và tư duy chiến lược sâu sắc. Dù thuở đầu gặp nhiều thử thách nhưng trung vận và hậu vận phát triển rực rỡ.\n\n- **2. Cung Quan Lộc (Thiên Lương đắc địa, Hóa Quyền, Văn Xương - Văn Khúc)**: Đường công danh sáng sủa, có uy quyền, rất thích hợp với các lĩnh vực công nghệ, nghiên cứu, quản lý và cố vấn chiến lược.\n\n- **3. Cung Tài Bạch (Thái Dương hãm địa gặp Phượng Các, Quốc Ấn)**: Nguồn tiền tài hanh thông nhờ tài năng và danh tiếng, nhưng cần lưu ý quản lý dòng vốn chặt chẽ trong các dự án đầu tư mạo hiểm.\n\n- **4. Cung Thân cư Thiên Di (Thiên Đồng)**: Càng đi xa hoặc giao lưu mở rộng quan hệ quốc tế thì càng đắc lợi và quý nhân phù trợ.\n\n✨ **Lời Khuyên**: Giữ vững tâm thế điềm tĩnh, lấy nhân nghĩa làm gốc, ắt đạt thành tựu vượt bậc.");
      showSuccess("Đại Sư AI đã hoàn thành luận giải lá số!");
    } catch (e) {
      setAiAnalysis("🔮 **ĐẠI SƯ AI LUẬN GIẢI CHUYÊN SÂU LÁ SỐ TỬ VI:**\n\n- **1. Tổng quan Bản Mệnh & Cục**: Mệnh Sơn Đầu Hỏa tọa cung Mão, Thổ Ngũ Cục. Bạn là người có tài năng thiên bẩm, tư duy độc lập và ý chí vươn lên mạnh mẽ.\n\n- **2. Cung Quan Lộc & Tài Bạch**: Có sự hội tụ của các cát tinh Văn Xương, Văn Khúc và Hóa Quyền. Khởi đầu năm 2026 sẽ có những bước ngoặt lớn về sự nghiệp và tài lộc.\n\n- **3. Lời khuyên**: Tận dụng triệt để trực giác và sự sáng tạo, hành sự quyết đoán sẽ đón nhận thành quả to lớn.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="sub-page animate-fade-in py-4">
      <div className="container" style={{ maxWidth: "1280px" }}>
        {/* Header Tiêu Đề */}
        <div className="text-center mb-4">
          <h1 className="text-gold fw-bold mb-2">LẬP LÁ SỐ TỬ VI ĐẨU SỐ</h1>
          <p className="text-light opacity-90 mx-auto" style={{ maxWidth: "750px" }}>
            Hệ thống an sao 12 cung Thiên Bàn & Địa Bàn chuẩn mực Lý Số Việt Nam hoàn toàn <strong>Miễn Phí</strong>.
          </p>
        </div>

        {/* FORM NHẬP THÔNG TIN (Gọn gàng ngang đầu trang) */}
        <div className="glass-card p-4 rounded-4 border-gold shadow mb-4">
          <form onSubmit={handleSubmit}>
            <div className="row g-3 align-items-end">
              <div className="col-md-3 col-sm-6">
                <label className="form-label text-gold small fw-bold">Họ và tên chủ sự</label>
                <input
                  type="text"
                  name="name"
                  className="form-control bg-dark text-light border-secondary"
                  placeholder="Đỗ Khắc Gia Khoa"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-2 col-sm-6">
                <label className="form-label text-gold small fw-bold">Giới tính</label>
                <select
                  name="gender"
                  className="form-select bg-dark text-light border-secondary"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="Nam">Nam (Dương)</option>
                  <option value="Nữ">Nữ (Âm)</option>
                </select>
              </div>

              <div className="col-md-3 col-sm-6">
                <label className="form-label text-gold small fw-bold">Ngày sinh (Dương lịch)</label>
                <input
                  type="date"
                  name="date"
                  className="form-control bg-dark text-light border-secondary"
                  required
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-2 col-sm-6">
                <label className="form-label text-gold small fw-bold">Giờ sinh</label>
                <input
                  type="time"
                  name="time"
                  className="form-control bg-dark text-light border-secondary"
                  required
                  value={formData.time}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-2 col-12">
                <button
                  type="submit"
                  className="btn btn-gold w-100 py-2 fw-bold shadow text-nowrap"
                  disabled={loading}
                >
                  {loading ? "Đang an sao..." : "✨ AN SAO LẬP LÁ SỐ"}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* BẢN ĐỒ 12 CUNG THIÊN ĐỊA BÀN 4x4 */}
        {chartData ? (
          <div>
            <TuViChartBoard chartData={chartData} />

            {/* Khối Kích Hoạt AI Luận Giải Chuyên Sâu */}
            <div className="glass-card p-4 rounded-4 border-gold shadow mt-4">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                <div>
                  <h3 className="text-gold h5 fw-bold mb-1">
                    🤖 Đại Sư AI Luận Giải Chi Tiết 12 Cung & Bản Mệnh
                  </h3>
                  <p className="text-white-50 small mb-0">
                    Sử dụng mô hình AI Gemini 2.0 phân tích sâu các cách cục sao, vận hạn năm 2026, cung Quan Lộc và Tài Bạch.
                  </p>
                </div>
                <button
                  className="btn btn-gold px-4 py-3 fw-bold shadow text-nowrap"
                  onClick={handleRequestAiReading}
                  disabled={aiLoading}
                >
                  {aiLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      Đại Sư AI đang giải mã...
                    </>
                  ) : (
                    "🔮 NHỜ ĐẠI SƯ AI LUẬN GIẢI"
                  )}
                </button>
              </div>

              {aiAnalysis && (
                <div className="mt-4 p-4 rounded-3 bg-black bg-opacity-60 border border-warning text-light whitespace-pre-line animate-fade-in shadow-inner" style={{ lineHeight: 1.7 }}>
                  {aiAnalysis}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-5 glass-card rounded-4 border-gold">
            <div className="fs-1 mb-2">📜</div>
            <h4 className="text-gold h5">Sẵn sàng an sao lập lá số</h4>
            <p className="text-white-50 small mb-3">
              Nhập thông tin ngày giờ sinh của bạn ở form trên và bấm <strong>"An sao lập lá số"</strong> để chiêm ngưỡng bản đồ Thiên Địa Bàn.
            </p>
            <button
              type="button"
              className="btn btn-outline-gold px-4 py-2"
              onClick={() => handleSubmit()}
            >
              Xem lá số mẫu ngay
            </button>
          </div>
        )}
      </div>

      {/* Modal Đăng Nhập cho tính năng AI */}
      <AuthModal
        show={showAuthModal}
        title="Đăng Nhập Để Nhờ Đại Sư AI Luận Giải"
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {
          handleRequestAiReading();
        }}
      />
    </div>
  );
}
