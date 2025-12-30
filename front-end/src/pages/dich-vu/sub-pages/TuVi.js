import React, { useState } from "react";
import axios from "axios";
import { useAlert } from "../../../contexts/AlertContext";
import ServiceGuard from "../../../components/common/ServiceGuard";
import "./sub-pages.css";

export default function TuVi() {
  const { showError } = useAlert();
  const [formData, setFormData] = useState({
    name: "",
    gender: "Nam",
    date: "",
    time: "",
    location: "Hà Nội",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

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
      ...formData,
      year,
      month,
      day,
      hour,
      min,
    };

    try {
      const res = await axios.post("/api/tu-vi/lap-la-so", payload);
      setResult(res.data);
    } catch (error) {
      console.error("Lỗi khi lập lá số Tử vi:", error);
      showError("Hệ thống đang bận. Vui lòng thử lại sau!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ServiceGuard serviceId="sv-tuvi">
      <div className="sub-page anime-fade-in">
        <div className="container py-5">
          <h1 className="text-center text-gold mb-4">Lập Lá Số Tử Vi</h1>
          <p className="sub-desc mx-auto" style={{ maxWidth: "700px" }}>
            Môn khoa học dự đoán vận mệnh con người dựa trên triết lý Âm Dương
            Ngũ Hành và các chòm sao đặc hữu của phương Đông.
          </p>
        </div>

        <section className="sub-content container">
          <div className="row g-4 justify-content-center">
            <div className="col-lg-6">
              <div className="glass-card p-4">
                <h2 className="h4 text-gold mb-4">Thông tin lá số</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Họ tên chủ sự</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Giới tính</label>
                      <select
                        name="gender"
                        className="form-select"
                        onChange={handleChange}
                      >
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">
                        Năm sinh (Dương lịch)
                      </label>
                      <input
                        type="date"
                        name="date"
                        className="form-control"
                        required
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Giờ sinh</label>
                    <input
                      type="time"
                      name="time"
                      className="form-control"
                      required
                      onChange={handleChange}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-gold w-100 py-3 fw-bold"
                    disabled={loading}
                  >
                    {loading ? "Đang an sao..." : "AN SAO LẬP LÁ SỐ"}
                  </button>
                </form>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="glass-card p-4 mt-4 min-vh-50 d-flex align-items-center justify-content-center">
                {loading ? (
                  <div className="text-center">
                    <div className="spinner-grow text-gold mb-3"></div>
                    <p>Đang xoay chuyển càn khôn...</p>
                  </div>
                ) : result ? (
                  <div className="w-100">
                    <div className="row text-center mb-4">
                      <div className="col-md-4">
                        <h4 className="text-gold">Năm {result.can_chi.year}</h4>
                        <p className="small opacity-75">
                          Âm lịch: Ngày {result.lunar_date.lunarDay} tháng{" "}
                          {result.lunar_date.lunarMonth}
                        </p>
                      </div>
                      <div className="col-md-4 border-start border-end border-gold">
                        <h4 className="text-gold">
                          Mệnh: {result.can_chi.day}
                        </h4>
                        <p className="small opacity-75">Bản mệnh vững vàng</p>
                      </div>
                      <div className="col-md-4">
                        <h4 className="text-gold">Giờ {result.can_chi.hour}</h4>
                      </div>
                    </div>
                    <div className="row g-2">
                      {/* Mock 12 cung */}
                      {Object.entries(result.la_so).map(([cung, stars]) => (
                        <div className="col-md-3" key={cung}>
                          <div className="p-3 border border-secondary rounded bg-dark-50">
                            <h6 className="text-warning small mb-2">{cung}</h6>
                            <ul className="list-unstyled mb-0 small">
                              {stars.map((s) => (
                                <li key={s} className="text-white">
                                  ⭐ {s}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 interpret-section">
                      <h3 className="text-gold h4 mb-3">Giải mã cung Mệnh</h3>
                      <div className="row g-3">
                        {result.interpretations?.map((item) => (
                          <div className="col-md-6" key={item.id}>
                            <div className="glass-card p-3 h-100">
                              <h5 className="text-gold small">{item.title}</h5>
                              <p className="small opacity-75 mb-0">
                                {item.content}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="alert alert-warning mt-4 bg-transparent border-gold text-center">
                      Ghi chú: Bản luận giải chuyên sâu về 108 vì tinh tú đang
                      được hoàn thiện.
                    </div>
                  </div>
                ) : (
                  <div className="text-center opacity-50">
                    <div className="fs-1">🐲</div>
                    <p>Hãy nhập thông tin để xem lá số cuộc đời bạn.</p>
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
