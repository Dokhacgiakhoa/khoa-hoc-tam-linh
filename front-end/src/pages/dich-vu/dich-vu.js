import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./dich-vu.css";

const GROUPS = [
  {
    id: "menh",
    title: "MỆNH (Destiny)",
    sub: "Tử Vi Đẩu Số · Bát Tự · Quản lý hồ sơ",
    desc: "Thấu hiểu bản mệnh và chu kỳ đời người thông qua các hệ thống mệnh lý phương Đông.",
    img: "/images/banners/menh-huyen-thuat.png",
    links: [
      { label: "Lập lá số Tử Vi", path: "/dich-vu/tu-vi", price: 297000 },
      { label: "Luận giải Bát Tự", path: "/dich-vu/bat-tu", price: 197000 },
    ],
  },
  {
    id: "tuong",
    title: "TƯỚNG (AI Scanner)",
    sub: "Scan Khuôn Mặt · Scan Chỉ Tay · Xem Vân Tay",
    desc: "Ứng dụng AI phân tích hình tướng, nhận diện khí sắc và dự đoán xu hướng tính cách.",
    img: "/images/banners/tuong-huyen-thuat.png",
    links: [
      { label: "AI Face Scan", path: "/dich-vu/scan-face", price: 97000 },
      { label: "Xem Chỉ Tay", path: "/dich-vu/scan-palm", price: 97000 },
      { label: "Xem Vân Tay", path: "/dich-vu/xem-van-tay", price: 0 }, // Free
    ],
  },
  {
    id: "boc",
    title: "BỐC (Oracle Tool)",
    sub: "Tarot · Gieo Quẻ Dịch · Xin Xâm",
    desc: "Các công cụ dự đoán xác suất và kết nối trực giác giúp đưa ra quyết định nhanh chóng.",
    img: "/images/banners/boc-huyen-thuat.png",
    links: [
      { label: "Bói Bài Tarot", path: "/dich-vu/tarot", price: 0 }, // Free
      { label: "Gieo Quẻ Dịch", path: "/dich-vu/kinh-dich", price: 47000 },
    ],
  },
  {
    id: "trach",
    title: "TRẠCH (Feng Shui)",
    sub: "La Bàn AR · Thước Lỗ Ban · Bát Trạch",
    desc: "Tối ưu hóa không gian sống và luân chuyển năng lượng theo phong thủy học.",
    img: "/images/banners/trach-huyen-thuat.png",
    links: [
      { label: "La Bàn AR", path: "/dich-vu/la-ban", price: 147000 },
      { label: "Thước Lỗ Ban", path: "/dich-vu/thuoc-lo-ban", price: 0 }, // Free
    ],
  },
  {
    id: "so",
    title: "SỐ (Numerology)",
    sub: "Thần Số Học · Chấm điểm SIM · Lịch Vạn Niên",
    desc: "Khám phá năng lượng của các con số ảnh hưởng đến cuộc sống và thời vận.",
    img: "/images/banners/so-huyen-thuat.png",
    links: [
      { label: "Tra cứu Thần Số", path: "/dich-vu/than-so-hoc", price: 299000 }, // Paid
      {
        label: "Chọn SIM Phong Thủy",
        path: "/dich-vu/cham-diem-sim",
        price: 97000,
      },
    ],
  },
];

function DichVu() {
  const [activeGroup, setActiveGroup] = useState("menh");
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const navRef = React.useRef(null);

  React.useEffect(() => {
    const updateIndicator = () => {
      if (navRef.current) {
        const activeButton = navRef.current.querySelector(".group-pill.active");
        if (activeButton) {
          setIndicatorStyle({
            width: `${activeButton.offsetWidth}px`,
            height: `${activeButton.offsetHeight}px`,
            left: `${activeButton.offsetLeft}px`,
          });
        }
      }
    };

    // Delay nhỏ để đảm bảo DOM đã render
    const timer = setTimeout(updateIndicator, 10);

    // Update khi resize window
    window.addEventListener("resize", updateIndicator);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateIndicator);
    };
  }, [activeGroup]);

  return (
    <main id="dich-vu" className="khctl-page">
      <section className="dv-hero">
        <div className="container">
          <div className="text-center mb-5">
            <h1 className="dv-title display-4 fw-bold mb-3">
              Hệ Sinh Thái Ngũ Huyền Thuật AI
            </h1>
            <p className="dv-sub mx-auto" style={{ maxWidth: "800px" }}>
              Chuẩn hóa tri thức huyền học phương Đông qua công nghệ AI:
              <strong> Mệnh – Tướng – Bốc – Trạch – Số</strong>. Công cụ hỗ trợ
              định hướng cuộc sống khoa học và minh bạch.
            </p>
          </div>

          <div className="d-flex justify-content-center mb-5">
            <div className="dv-nav-groups gap-2" ref={navRef}>
              <div className="group-indicator" style={indicatorStyle}></div>
              {GROUPS.map((g) => (
                <button
                  key={g.id}
                  className={`group-pill ${
                    activeGroup === g.id ? "active" : ""
                  }`}
                  onClick={() => setActiveGroup(g.id)}
                >
                  {g.title.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section-feature py-0">
        <div className="container">
          {GROUPS.map((g) => (
            <div
              key={g.id}
              className={`dv-group-detail ${
                activeGroup === g.id ? "show" : "hide"
              }`}
            >
              <div className="row align-items-center g-5">
                <div className="col-lg-6">
                  <div className="group-media position-relative">
                    <img
                      src={g.img}
                      alt={g.title}
                      className="img-fluid rounded-4 shadow-gold"
                    />
                    <div className="group-overlay"></div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <h2 className="text-gold h1 mb-1">{g.title}</h2>
                  <p className="h5 text-white-50 mb-3">{g.sub}</p>
                  <p className="lead opacity-75 mb-4">{g.desc}</p>
                  <div className="d-flex gap-3 flex-wrap">
                    {g.links.map((l, i) => (
                      <div key={i} className="position-relative">
                        <Link to={l.path} className="btn btn-gold px-4 py-2">
                          {l.label}
                        </Link>
                        <span
                          className="badge position-absolute top-0 start-100 translate-middle"
                          style={{
                            fontSize: "0.75rem",
                            padding: "0.25rem 0.5rem",
                            backgroundColor:
                              l.price === 0 ? "#28a745" : "#d4af37",
                            color: "#fff",
                            fontWeight: "bold",
                            borderRadius: "12px",
                            border: "2px solid rgba(255, 255, 255, 0.3)",
                          }}
                        >
                          {l.price === 0
                            ? "0 LT"
                            : `${Math.floor(l.price / 1000)} LT`}
                        </span>
                      </div>
                    ))}
                    <Link
                      to="/hoc-vien-huyen-hoc"
                      className="btn btn-outline-gold px-4 py-2"
                    >
                      Tìm hiểu tại Học Viện
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section py-5">
        <div className="container text-center">
          <div className="glass-card p-4 mx-auto" style={{ maxWidth: "900px" }}>
            <h3 className="text-gold mb-3">Bạn chưa biết bắt đầu từ đâu?</h3>
            <p className="mb-4 opacity-75">
              Hãy để công cụ AI của chúng tôi phân tích tổng quan và gợi ý lộ
              trình phù hợp nhất cho bạn.
            </p>
            <Link to="/tai-khoan" className="btn btn-gold btn-lg px-5">
              Bắt đầu ngay miễn phí
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default DichVu;
