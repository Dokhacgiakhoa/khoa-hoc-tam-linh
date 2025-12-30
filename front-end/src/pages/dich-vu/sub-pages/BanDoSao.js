import React, { useState } from "react";
import axios from "axios";
import { useAlert } from "../../../contexts/AlertContext";
import ServiceGuard from "../../../components/common/ServiceGuard";
import "./sub-pages.css";

export default function BanDoSao() {
  const { showError } = useAlert();
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    location: "Hà Nội",
    lat: 21.0285,
    lon: 105.8542,
    tzone: 7,
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [svgChart, setSvgChart] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const [year, month, day] = formData.date.split("-");
    const [hour, min] = formData.time.split(":");

    const payload = {
      year,
      month,
      day,
      hour,
      min,
      lat: formData.lat,
      lon: formData.lon,
      tzone: formData.tzone,
    };

    try {
      // 1. Lấy dữ liệu vị trí hành tinh
      const dataRes = await axios.post("/api/astrology/natal", payload);
      setResult(dataRes.data);

      // 2. Lấy biểu đồ SVG
      const chartRes = await axios.post("/api/astrology/chart", payload);
      if (chartRes.data && chartRes.data.chart) {
        setSvgChart(chartRes.data.chart); // Giả sử API trả về { chart: "<svg>..." }
      }
    } catch (error) {
      console.error("Lỗi khi gọi API Bản đồ sao:", error);
      showError("Không thể kết nối với hệ thống Chiêm tinh. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ServiceGuard serviceId="sv-bandosao">
      <div className="sub-page astro-page">
        <section className="sub-hero">
          <div className="container">
            <h1 className="sub-title text-gradient">Bản đồ sao Cá nhân</h1>
            <p className="sub-desc">
              Nhập chính xác giờ sinh để nhận được bản luận giải chi tiết về
              định mệnh của bạn.
            </p>
          </div>
        </section>

        <section className="sub-content container">
          <div className="row g-4">
            <div className="col-lg-5">
              <div className="glass-card info-form-card">
                <h2 className="card-title h4 mb-4">Thông tin ngày sinh</h2>
                <form className="info-form" onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Họ và tên</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Nguyễn Văn A"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="row g-3 mb-3">
                    <div className="col-6">
                      <label className="form-label">Ngày sinh</label>
                      <input
                        type="date"
                        name="date"
                        className="form-control"
                        required
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label">Giờ sinh</label>
                      <input
                        type="time"
                        name="time"
                        className="form-control"
                        required
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">
                      Nơi sinh (Tự động lấy tọa độ)
                    </label>
                    <select
                      name="location"
                      className="form-select"
                      onChange={handleChange}
                    >
                      <option value="Hà Nội">Hà Nội (21.0N, 105.8E)</option>
                      <option value="TP. HCM">TP. HCM (10.8N, 106.6E)</option>
                      <option value="Đà Nẵng">Đà Nẵng (16.0N, 108.2E)</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-gold w-100 py-3 fw-bold"
                    disabled={loading}
                  >
                    {loading ? "Đang giải mã..." : "LẬP BẢN ĐỒ SAO"}
                  </button>
                </form>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="glass-card result-display-card h-100 d-flex align-items-center justify-content-center text-center">
                {loading ? (
                  <div className="spinner-border text-gold" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : svgChart ? (
                  <div
                    className="chart-container w-100 p-4"
                    dangerouslySetInnerHTML={{ __html: svgChart }}
                  />
                ) : result ? (
                  <div className="result-text p-4">
                    <h3 className="text-gold mb-3">
                      {result.interpretation?.title || "Kết quả phân tích"}
                    </h3>
                    <div className="mb-3 opacity-90">
                      <p>Cung Mặt Trời: {result.data?.sun_sign}</p>
                      <p>Cung Mọc: {result.data?.ascendant}</p>
                    </div>
                    <p className="small text-start">
                      {result.interpretation?.content ||
                        "Dữ liệu luận giải chuyên sâu đang được cập nhật."}
                    </p>
                    <div className="alert alert-info bg-transparent border-gold text-white small mt-3">
                      Bản đồ sao đã được tính toán thành công.
                    </div>
                  </div>
                ) : (
                  <div className="placeholder-text p-5 opacity-50">
                    <div className="fs-1 mb-3">🌌</div>
                    <p>
                      Biểu đồ và luận giải của bạn sẽ xuất hiện tại đây sau khi
                      nhập thông tin.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </ServiceGuard>
  );
}
