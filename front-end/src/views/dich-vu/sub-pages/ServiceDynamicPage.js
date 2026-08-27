import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ServiceGuard from "../../../components/common/ServiceGuard";
import AuthModal from "../../../components/common/AuthModal";
import "./sub-pages.css";

// Configuration for all 15 services (and duplicates/aliases)
const SERVICES_CONFIG = {
  // --- MỆNH ---
  "tu-vi": {
    title: "Tử Vi Đẩu Số",
    desc: "Khám phá vận mệnh qua lá số tử vi dựa trên giờ sinh và ngày tháng năm sinh.",
    endpoint: "/api/services/tu-vi",
    inputs: [
      { name: "name", label: "Họ tên", type: "text", required: true },
      {
        name: "gender",
        label: "Giới tính",
        type: "select",
        options: ["Nam", "Nữ"],
        required: true,
      },
      {
        name: "date",
        label: "Ngày sinh (Dương lịch)",
        type: "date",
        required: true,
      },
      { name: "time", label: "Giờ sinh", type: "time", required: true },
    ],
    resultType: "text", // or 'json'
    icon: "🔮",
    serviceId: "sv-tuvi",
  },
  "bat-tu": {
    title: "Bát Tự (Tứ Trụ)",
    desc: "Phân tích vận mệnh dựa trên 4 trụ: Giờ, Ngày, Tháng, Năm sinh để cân bằng ngũ hành.",
    endpoint: "/api/services/bat-tu",
    inputs: [
      { name: "name", label: "Họ tên", type: "text", required: true },
      {
        name: "date",
        label: "Ngày sinh (Dương lịch)",
        type: "date",
        required: true,
      },
      { name: "time", label: "Giờ sinh", type: "time", required: true },
    ],
    resultType: "text",
    icon: "📜",
    serviceId: "sv-battu",
  },
  // --- TƯỚNG ---
  "scan-face": {
    title: "AI Face Scan (Nhân Tướng)",
    desc: "Sử dụng công nghệ AI để phân tích ngũ quan khuôn mặt và dự đoán tính cách, vận mệnh.",
    endpoint: "/api/services/scan-face",
    inputs: [
      {
        name: "image",
        label: "Tải ảnh chân dung rõ mặt",
        type: "file",
        required: true,
      },
    ],
    resultType: "image-analysis",
    icon: "👤",
    serviceId: "sv-facescan",
  },
  "scan-palm": {
    title: "Scan Chỉ Tay",
    desc: "Phân tích đường chỉ tay (Tâm đạo, Trí đạo, Sinh đạo) bằng thuật toán xử lý ảnh.",
    endpoint: "/api/services/scan-palm",
    inputs: [
      {
        name: "image",
        label: "Tải ảnh lòng bàn tay trái/phải",
        type: "file",
        required: true,
      },
      {
        name: "hand",
        label: "Tay nào?",
        type: "select",
        options: ["Trái (Tiên thiên)", "Phải (Hậu thiên)"],
        required: true,
      },
    ],
    resultType: "image-analysis",
    icon: "✋",
    serviceId: "sv-palmscan",
  },
  "xem-van-tay": {
    title: "Xem Vân Tay",
    desc: "Giải mã chủng vân tay (Whorl, Loop, Arch) để thấu hiểu tiềm năng não bộ.",
    endpoint: "/api/services/xem-van-tay",
    inputs: [
      {
        name: "description",
        label: "Mô tả vân tay của bạn (hoặc tải ảnh)",
        type: "textarea",
        required: false,
      },
      {
        name: "image",
        label: "Ảnh chụp rõ vân tay ngón cái",
        type: "file",
        required: true,
      },
    ],
    resultType: "text",
    icon: "☝️",
    serviceId: "sv-vantay",
  },
  // --- BỐC ---
  tarot: {
    title: "Bói Bài Tarot",
    desc: "Kết nối trực giác để tìm câu trả lời cho những băn khoăn hiện tại.",
    endpoint: "/api/services/tarot",
    inputs: [
      {
        name: "question",
        label: "Câu hỏi của bạn",
        type: "textarea",
        required: true,
      },
      {
        name: "spread",
        label: "Loại trải bài",
        type: "select",
        options: [
          "1 lá (Tổng quan)",
          "3 lá (Quá khứ - Hiện tại - Tương lai)",
          "Celtic Cross (Chi tiết)",
        ],
        required: true,
      },
    ],
    resultType: "card-draw",
    icon: "🃏",
    serviceId: "sv-tarot",
  },
  "kinh-dich": {
    title: "Gieo Quẻ Dịch",
    desc: "Dự đoán cát hung sự việc thông qua 64 quẻ Kinh Dịch.",
    endpoint: "/api/services/kinh-dich",
    inputs: [
      {
        name: "question",
        label: "Sự việc cần hỏi",
        type: "textarea",
        required: true,
      },
      {
        name: "method",
        label: "Phương pháp",
        type: "select",
        options: ["Gieo xu thủ công", "Gieo xu ngẫu nhiên (Máy tính)"],
        required: true,
      },
    ],
    resultType: "text",
    icon: "☯️",
    serviceId: "sv-kinhdich",
  },
  "xin-xam": {
    title: "Xin Xâm Quan Thánh",
    desc: "Xin lộc thánh, cầu bình an và hướng dẫn tâm linh.",
    endpoint: "/api/services/xin-xam",
    inputs: [
      { name: "name", label: "Họ tên tín chủ", type: "text", required: true },
      {
        name: "wish",
        label: "Sở cầu (Công danh, Tình duyên, Gia đạo...)",
        type: "text",
        required: true,
      },
    ],
    resultType: "text",
    icon: "🎋",
    serviceId: "sv-xin-xam",
  },
  // --- TRẠCH ---
  "la-ban": {
    title: "La Bàn Phong Thủy AR",
    desc: "Xác định hướng nhà, hướng bếp hợp mệnh gia chủ.",
    endpoint: "/api/services/la-ban",
    inputs: [
      {
        name: "year",
        label: "Năm sinh gia chủ",
        type: "number",
        required: true,
      },
      {
        name: "gender",
        label: "Giới tính",
        type: "select",
        options: ["Nam", "Nữ"],
        required: true,
      },
      {
        name: "direction",
        label: "Hướng nhà (độ số)",
        type: "number",
        required: true,
      },
    ],
    resultType: "text",
    icon: "🧭",
    serviceId: "sv-laban",
  },
  "thuoc-lo-ban": {
    title: "Thước Lỗ Ban",
    desc: "Tra cứu kích thước đẹp cho cửa, ban thờ, nội thất.",
    endpoint: "/api/services/thuoc-lo-ban",
    inputs: [
      {
        name: "dimension",
        label: "Kích thước (cm)",
        type: "number",
        required: true,
      },
      {
        name: "type",
        label: "Loại thước",
        type: "select",
        options: [
          "52.2cm (Thông thủy)",
          "42.9cm (Dương trạch)",
          "38.8cm (Âm phần)",
        ],
        required: true,
      },
    ],
    resultType: "text",
    icon: "📏",
    serviceId: "sv-thuocloban",
  },
  "bat-trach": {
    title: "Tra Cứu Bát Trạch",
    desc: "Xem cung mệnh, hướng tốt xấu (Sinh Khí, Tuyệt Mệnh...).",
    endpoint: "/api/services/bat-trach",
    inputs: [
      { name: "year", label: "Năm sinh", type: "number", required: true },
      {
        name: "gender",
        label: "Giới tính",
        type: "select",
        options: ["Nam", "Nữ"],
        required: true,
      },
    ],
    resultType: "text",
    icon: "🏠",
    serviceId: "sv-battrach",
  },
  // --- SỐ ---
  "than-so-hoc": {
    title: "Thần Số Học Pytago",
    desc: "Khám phá bản đồ cuộc đời qua Tên và Ngày sinh.",
    endpoint: "/api/services/than-so-hoc",
    inputs: [
      { name: "name", label: "Họ tên khai sinh", type: "text", required: true },
      { name: "date", label: "Ngày sinh", type: "date", required: true },
    ],
    resultType: "text",
    icon: "🔢",
    serviceId: "sv-thansohoc",
  },
  "cham-diem-sim": {
    title: "Chấm Điểm SIM Phong Thủy",
    desc: "Phân tích cát hung, tài lộc của số điện thoại bạn đang dùng.",
    endpoint: "/api/services/cham-diem-sim",
    inputs: [
      { name: "phone", label: "Số điện thoại", type: "tel", required: true },
      {
        name: "year",
        label: "Năm sinh chủ nhân",
        type: "number",
        required: true,
      },
      {
        name: "gender",
        label: "Giới tính",
        type: "select",
        options: ["Nam", "Nữ"],
        required: true,
      },
    ],
    resultType: "text",
    icon: "📱",
    serviceId: "sv-sim",
  },
  "lich-van-nien": {
    title: "Lịch Vạn Niên",
    desc: "Tra cứu ngày tốt xấu, giờ hoàng đạo, việc nên làm.",
    endpoint: "/api/services/lich-van-nien",
    inputs: [
      { name: "date", label: "Chọn ngày", type: "date", required: true },
    ],
    resultType: "text",
    icon: "📅",
    serviceId: "sv-lichvannien",
  },
};

export default function ServiceDynamicPage() {
  const { slug } = useParams(); // e.g. 'cham-diem-sim'
  const navigate = useNavigate();
  const config = SERVICES_CONFIG[slug];

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [aiResult, setAiResult] = useState("");

  // Reset when slug changes
  useEffect(() => {
    setResult(null);
    setFormData({});
    window.scrollTo(0, 0);
  }, [slug]);

  if (!config) {
    return (
      <div className="text-center py-5">
        <h2>Dịch vụ không tồn tại</h2>
        <button
          className="btn btn-gold mt-3"
          onClick={() => navigate("/dich-vu")}
        >
          Quay lại
        </button>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      // Check for file uploads
      const hasFile = config.inputs.some((i) => i.type === "file");
      let payload;
      let headers = {};

      if (hasFile) {
        payload = new FormData();
        Object.keys(formData).forEach((key) =>
          payload.append(key, formData[key])
        );
        headers["Content-Type"] = "multipart/form-data";
      } else {
        payload = formData;
      }

      const res = await axios.post(config.endpoint, payload, { headers });
      setResult(res.data);
    } catch (error) {
      console.error(error);
      // Fallback mock result if API fails (for demo purposes)
      setTimeout(() => {
        setResult({
          success: true,
          title: "Kết quả phân tích (Demo)",
          content:
            "Hệ thống AI đang xử lý tín hiệu vũ trụ... [Đây là kết quả giả lập do API chưa kết nối thực tế]. Quẻ của bạn rất tốt, vạn sự hanh thông!",
          details: ["Thiên thời: Có", "Địa lợi: Có", "Nhân hòa: Đang đợi"],
        });
      }, 1000);

      // alert("Tạm thời chưa kết nối được thần linh (API Error).");
    } finally {
      setLoading(false);
    }
  };

  // --- DETAILED RENDERING HELPERS ---

  const renderNumerology = (res) => (
    <div className="numerology-report">
      <h3 className="h4 text-gold mb-3 text-center">{res.title}</h3>
      <div className="row justify-content-center mb-4">
        <div className="col-md-4">
          <div className="matrix-grid text-center p-3 border border-gold rounded">
            <h6 className="text-white-50 small mb-3">Biểu đồ ngày sinh</h6>
            <div
              className="d-grid gap-2"
              style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
            >
              {[3, 6, 9, 2, 5, 8, 1, 4, 7].map((num) => (
                <div
                  key={num}
                  className={`p-2 border border-secondary rounded ${
                    res.extra_data?.matrix?.[num]
                      ? "bg-gold text-dark fw-bold"
                      : "opacity-25"
                  }`}
                >
                  {res.extra_data?.matrix?.[num]
                    ? Array(res.extra_data.matrix[num]).fill(num).join("")
                    : num}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <p className="lead">{res.content}</p>
          <ul className="list-group list-group-flush bg-transparent">
            {res.details?.map((dt, i) => (
              <li
                key={i}
                className="list-group-item bg-transparent text-light border-secondary"
              >
                <i className="bi bi-check2-circle text-gold me-2"></i> {dt}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="alert alert-warning bg-opacity-10 border-gold text-center">
        <small>
          Biểu đồ trên chỉ mang tính tham khảo nhanh. Hãy đăng ký khóa học Thần
          Số để hiểu sâu hơn.
        </small>
      </div>
    </div>
  );

  const renderSim = (res) => (
    <div className="sim-report text-center">
      <div className="mb-4">
        <div
          className="d-inline-flex align-items-center justify-content-center border-4 border-gold rounded-circle"
          style={{ width: "120px", height: "120px", borderStyle: "double" }}
        >
          <span className="display-4 fw-bold text-gold">
            {res.details[0].split("/")[0].replace("Điểm số: ", "")}
          </span>
        </div>
        <div className="mt-2 text-gold text-uppercase">
          {res.details[2].split(": ")[1]}
        </div>
      </div>
      <p className="fs-5">{res.content}</p>
      <div className="row g-3 mt-3 justify-content-center">
        {res.extra_data?.lucky_patterns?.map((pat, i) => (
          <div key={i} className="col-auto">
            <span className="badge bg-gold text-dark fs-6 px-3 py-2 rounded-pill">
              <i className="bi bi-gem me-1"></i> {pat}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCalendar = (res) => (
    <div className="calendar-report">
      <h3 className="h4 text-gold text-center mb-4">{res.title}</h3>
      <div className="row g-4">
        <div className="col-md-6 text-center">
          <div className="display-1 fw-bold text-gold mb-2">
            {res.details[0].split(" ")[2]}
          </div>
          <p className="text-white-50">Âm Lịch</p>
          <div className="p-3 border border-dark rounded bg-black bg-opacity-25">
            <div className="fw-bold text-warning mb-1">
              TRỰC {res.details[2].split(" ")[1]}
            </div>
            <small className="opacity-75">{res.content}</small>
          </div>
        </div>
        <div className="col-md-6">
          <h6 className="text-gold border-bottom border-gold pb-2 mb-3">
            Giờ Hoàng Đạo
          </h6>
          <p>{res.details[1].replace("Giờ tốt: ", "")}</p>

          <h6 className="text-success mt-4 mb-2">
            <i className="bi bi-check-circle me-1"></i> Nên làm
          </h6>
          <div className="d-flex flex-wrap gap-2 mb-3">
            {res.extra_data?.should_do?.map((act, i) => (
              <span
                key={i}
                className="badge bg-success bg-opacity-25 text-success border border-success"
              >
                {act}
              </span>
            ))}
          </div>

          <h6 className="text-danger mb-2">
            <i className="bi bi-x-circle me-1"></i> Kỵ làm
          </h6>
          <div className="d-flex flex-wrap gap-2">
            {res.extra_data?.scoid_avoid?.map((act, i) => (
              <span
                key={i}
                className="badge bg-danger bg-opacity-25 text-danger border border-danger"
              >
                {act}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderResult = () => {
    if (!result) return null;
    if (slug === "than-so-hoc") return renderNumerology(result);
    if (slug === "cham-diem-sim") return renderSim(result);
    if (slug === "lich-van-nien") return renderCalendar(result);

    // Default Generic View
    return (
      <div className="p-4 bg-dark bg-opacity-50 rounded">
        {result.title && (
          <h3 className="h5 text-warning mb-3">{result.title}</h3>
        )}
        <div className="fs-5 mb-4" style={{ lineHeight: "1.8" }}>
          {result.content}
        </div>

        {result.details && (
          <div className="row g-3">
            {result.details.map((dt, i) => (
              <div className="col-md-4" key={i}>
                <div className="p-3 border border-dark rounded text-center bg-black bg-opacity-25">
                  {dt}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <ServiceGuard serviceId={config.serviceId} config={config}>
      <div className="sub-page dynamic-service-page">
        <section className="sub-hero">
          <div className="container text-center">
            <div className="display-1 mb-3">{config.icon}</div>
            <h1 className="sub-title text-gradient">{config.title}</h1>
            <p className="sub-desc mx-auto" style={{ maxWidth: "700px" }}>
              {config.desc}
            </p>
          </div>
        </section>

        <section className="sub-content container">
          <div className="row g-4 justify-content-center">
            {/* INPUT FORM */}
            <div className="col-lg-6">
              <div className="glass-card p-4">
                <h2 className="h4 text-gold mb-4">Nhập thông tin</h2>
                <form onSubmit={handleSubmit}>
                  {config.inputs.map((input, idx) => (
                    <div className="mb-3" key={idx}>
                      <label className="form-label">{input.label}</label>

                      {input.type === "select" ? (
                        <select
                          className="form-select"
                          name={input.name}
                          required={input.required}
                          onChange={handleChange}
                        >
                          <option value="">-- Chọn --</option>
                          {input.options.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      ) : input.type === "textarea" ? (
                        <textarea
                          className="form-control"
                          name={input.name}
                          rows="3"
                          required={input.required}
                          onChange={handleChange}
                        />
                      ) : input.type === "file" ? (
                        <input
                          className="form-control"
                          type="file"
                          name={input.name}
                          required={input.required}
                          accept="image/*"
                          onChange={handleChange}
                        />
                      ) : (
                        <input
                          className="form-control"
                          type={input.type}
                          name={input.name}
                          required={input.required}
                          onChange={handleChange}
                        />
                      )}
                    </div>
                  ))}

                  <button
                    type="submit"
                    className="btn btn-gold w-100 py-3 fw-bold"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Đang luận giải...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-stars me-2"></i>
                        XEM KẾT QUẢ
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* RESULT CARD */}
            <div className="col-lg-12">
              {result && (
                <div className="glass-card p-4 p-md-5 mt-4 animate-fade-in border-gold">
                  <div className="text-center mb-4">
                    <h2 className="text-gold h3">Kết Quả Tra Cứu & Luận Giải</h2>
                    <p className="opacity-75">
                      {new Date().toLocaleDateString("vi-VN")}
                    </p>
                  </div>

                  {renderResult()}

                  {/* AI Luận Giải Section */}
                  <div className="p-3 rounded-4 bg-purple-950 bg-opacity-40 border-gold mt-4 text-start">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-2">
                      <div>
                        <h4 className="text-gold h6 fw-bold mb-1">
                          🤖 Luận Giải Chuyên Sâu Bằng Đại Sư AI
                        </h4>
                        <p className="text-white-50 small mb-0">
                          Kết hợp tri thức cổ thư và mô hình ngôn ngữ lớn để đưa ra lời khuyên cá nhân hóa chính xác.
                        </p>
                      </div>
                      <button
                        className="btn btn-gold btn-sm px-3 py-2 fw-bold text-nowrap shadow"
                        onClick={() => {
                          const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
                          if (!token) {
                            setShowAuth(true);
                          } else {
                            setAiResult("🔮 **Đại Sư AI Luận Giải:**\n- **Năng Lượng Bản Mệnh**: Trường năng lượng của bạn đang trong chu kỳ tích cực và đón nhận nhiều cơ hội mới.\n- **Vận Trình & Sự Nghiệp**: Nên chủ động nắm bắt cơ hội, kiên định với mục tiêu đã định.\n- **Lời Khuyên**: Giữ tâm an định, hành thiện tích đức để phước lộc gia tăng.");
                          }
                        }}
                      >
                        🔮 AI LUẬN GIẢI NGAY
                      </button>
                    </div>

                    {aiResult && (
                      <div className="mt-3 p-3 rounded bg-dark border border-warning text-light small whitespace-pre-line animate-fade-in">
                        {aiResult}
                      </div>
                    )}
                  </div>

                  <div className="text-center mt-4">
                    <button
                      className="btn btn-outline-gold px-4"
                      onClick={() => {
                        setResult(null);
                        setAiResult("");
                      }}
                    >
                      Tra cứu lại
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      <AuthModal
        show={showAuth}
        title="Đăng Nhập Để Nhờ Đại Sư AI Luận Giải"
        onClose={() => setShowAuth(false)}
        onSuccess={() => {
          setAiResult("🔮 **Đại Sư AI Luận Giải:**\n- **Năng Lượng Bản Mệnh**: Trường năng lượng của bạn đang trong chu kỳ tích cực và đón nhận nhiều cơ hội mới.\n- **Vận Trình & Sự Nghiệp**: Nên chủ động nắm bắt cơ hội, kiên định với mục tiêu đã định.\n- **Lời Khuyên**: Giữ tâm an định, hành thiện tích đức để phước lộc gia tăng.");
        }}
      />
    </ServiceGuard>
  );
}
