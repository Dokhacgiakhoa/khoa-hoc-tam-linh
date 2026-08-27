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
      {
        label: "Lập lá số Tử Vi",
        path: "/dich-vu/tu-vi",
        serviceId: "sv-tuvi",
      },
      {
        label: "Luận giải Bát Tự",
        path: "/dich-vu/bat-tu",
        serviceId: "sv-battu",
      },
    ],
  },
  {
    id: "tuong",
    title: "TƯỚNG (AI Scanner)",
    sub: "Scan Khuôn Mặt · Scan Chỉ Tay · Xem Vân Tay",
    desc: "Ứng dụng AI phân tích hình tướng, nhận diện khí sắc và dự đoán xu hướng tính cách.",
    img: "/images/banners/tuong-huyen-thuat.png",
    links: [
      {
        label: "AI Face Scan",
        path: "/dich-vu/scan-face",
        serviceId: "sv-facescan",
      },
      {
        label: "Xem Chỉ Tay",
        path: "/dich-vu/scan-palm",
        serviceId: "sv-palmscan",
      },
      {
        label: "Xem Vân Tay",
        path: "/dich-vu/xem-van-tay",
        serviceId: "sv-vantay",
      },
    ],
  },
  {
    id: "boc",
    title: "BỐC (Oracle Tool)",
    sub: "Tarot · Gieo Quẻ Dịch · Xin Xâm",
    desc: "Các công cụ dự đoán xác suất và kết nối trực giác giúp đưa ra quyết định nhanh chóng.",
    img: "/images/banners/boc-huyen-thuat.png",
    links: [
      { label: "Bói Bài Tarot", path: "/dich-vu/tarot", serviceId: "sv-tarot" },
      {
        label: "Gieo Quẻ Dịch",
        path: "/dich-vu/kinh-dich",
        serviceId: "sv-kinhdich",
      },
      {
        label: "Xin Xâm Quan Thánh",
        path: "/dich-vu/xin-xam",
        serviceId: "sv-xin-xam",
      },
    ],
  },
  {
    id: "trach",
    title: "TRẠCH (Feng Shui)",
    sub: "La Bàn AR · Thước Lỗ Ban · Bát Trạch",
    desc: "Tối ưu hóa không gian sống và luân chuyển năng lượng theo phong thủy học.",
    img: "/images/banners/trach-huyen-thuat.png",
    links: [
      { label: "La Bàn AR", path: "/dich-vu/la-ban", serviceId: "sv-laban" },
      {
        label: "Thước Lỗ Ban",
        path: "/dich-vu/thuoc-lo-ban",
        serviceId: "sv-thuocloban",
      },
    ],
  },
  {
    id: "so",
    title: "SỐ (Numerology)",
    sub: "Thần Số Học · Chấm điểm SIM · Lịch Vạn Niên",
    desc: "Khám phá năng lượng của các con số ảnh hưởng đến cuộc sống và thời vận.",
    img: "/images/banners/so-huyen-thuat.png",
    links: [
      {
        label: "Tra cứu Thần Số",
        path: "/dich-vu/than-so-hoc",
        serviceId: "sv-thansohoc",
      },
      {
        label: "Chọn SIM Phong Thủy",
        path: "/dich-vu/cham-diem-sim",
        serviceId: "sv-sim",
      },
      {
        label: "Lịch Vạn Niên",
        path: "/dich-vu/lich-van-nien",
        serviceId: "sv-lichvannien",
      },
    ],
  },
];

function DichVu() {
  const [activeGroup, setActiveGroup] = useState("menh");
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const navRef = React.useRef(null);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch prices from API (Services)
    axios
      .get("/api/services")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.error("Error fetching service prices:", err));
  }, []);

  const getPrice = (serviceId) => {
    const product = products.find((p) => p.service_id === serviceId);
    return product ? Number(product.price) : null;
  };

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
          <div className="text-center mb-4">
            <h1 className="dv-title display-4 fw-bold mb-3">
              Hệ Sinh Thái Ngũ Huyền Thuật AI
            </h1>
            <p className="dv-sub mx-auto" style={{ maxWidth: "800px" }}>
              Chuẩn hóa tri thức huyền học phương Đông qua công nghệ AI:
              <strong> Mệnh – Tướng – Bốc – Trạch – Số</strong>. Công cụ hỗ trợ
              định hướng cuộc sống khoa học và minh bạch.
            </p>
          </div>

          <div className="d-flex justify-content-center mb-3">
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
                      src={(process.env.PUBLIC_URL || "") + g.img}
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
                  <div className="service-actions-grid mt-4">
                    <div className="d-flex gap-3 flex-wrap mb-4">
                      {g.links.map((l, i) => (
                        <Link
                          key={i}
                          to={l.path}
                          className="service-action-card"
                        >
                          <span className="service-card-label">{l.label}</span>
                          <span
                            className={`service-card-price ${
                              getPrice(l.serviceId) === 0 ? "free" : ""
                            }`}
                          >
                            {getPrice(l.serviceId) === 0
                              ? "Free"
                              : getPrice(l.serviceId) !== null
                              ? `${Math.floor(getPrice(l.serviceId) / 1000)} 🔮`
                              : "..."}
                          </span>
                        </Link>
                      ))}
                    </div>

                    <Link to="/hoc-vien-huyen-hoc" className="btn-academy-link">
                      <span>Tìm hiểu chuyên sâu tại Học Viện</span>
                      <i className="bi bi-arrow-right ms-2"></i>
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
