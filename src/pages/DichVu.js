import React from "react";
import "./DichVu.css";

const DichVu = () => {
  const serviceGroups = [
    {
      id: "tarot",
      title: "Tarot & Bài Trà",
      desc: "Trải bài có dẫn dắt, phù hợp tình cảm, sự nghiệp, chữa lành và định hướng.",
      tag: "Trải nghiệm nhanh",
      items: [
        {
          name: "Tarot AI – Trải 3 lá",
          brief: "Chatbot Tarot theo bộ bài gốc của hệ thống.",
          price: "Miễn phí",
          badge: "Popular",
        },
        {
          name: "Tarot chuyên gia 30 phút",
          brief: "Chuyên gia thật, gọi/nhắn, giải từng bối cảnh.",
          price: "199.000đ",
        },
        {
          name: "Bài Trà – Năng lượng hằng tuần",
          brief: "Đọc năng lượng tổng quan / tình cảm / công việc.",
          price: "129.000đ",
        },
      ],
    },
    {
      id: "menh",
      title: "Mệnh & Lá số",
      desc: "Hệ thống Mệnh – Tướng – Bốc – Trạch – Số, tích hợp dữ liệu sinh ngày/giờ.",
      tag: "Chẩn đoán mệnh lý",
      items: [
        {
          name: "Thần số học theo ngày sinh",
          brief: "Phân tích số chủ đạo, linh hồn, sứ mệnh.",
          price: "99.000đ",
        },
        {
          name: "Bát tự / Tứ trụ",
          brief: "Luận tính cách, vận 10 năm, hợp tác & hôn nhân.",
          price: "249.000đ",
          badge: "Pro",
        },
        {
          name: "Tử vi lá số",
          brief: "Khai lá số đầy đủ, có file PDF gửi kèm.",
          price: "299.000đ",
        },
      ],
    },
    {
      id: "booking",
      title: "Đặt lịch chuyên gia",
      desc: "Kết nối mentor, reader, thầy phong thủy trong hệ thống.",
      tag: "Kết nối 1-1",
      items: [
        {
          name: "Tư vấn chọn ngày – phong thủy",
          brief: "Chọn ngày khai trương, nhập trạch, cưới hỏi.",
          price: "399.000đ",
        },
        {
          name: "Coaching tâm linh 60 phút",
          brief: "Gỡ nút thắt cảm xúc, định tuyến lại hành trình.",
          price: "499.000đ",
          badge: "Hot",
        },
        {
          name: "Đặt lịch theo yêu cầu",
          brief: "Chọn chuyên gia, chọn giờ, thanh toán sau.",
          price: "Theo yêu cầu",
        },
      ],
    },
    {
      id: "goi",
      title: "Gói dịch vụ",
      desc: "Combo tiết kiệm cho học viên / khách hàng dùng thường xuyên.",
      tag: "Tiết kiệm",
      items: [
        {
          name: "Gói Tarot 4 buổi / tháng",
          brief: "Dành cho người cần theo dõi tiến trình.",
          price: "599.000đ",
        },
        {
          name: "Gói Mệnh + Tarot",
          brief: "Vừa luận mệnh nền, vừa theo dõi từng tháng.",
          price: "749.000đ",
        },
        {
          name: "Gói VIP Học viện",
          brief: "Mở khóa học viện + ưu đãi dịch vụ.",
          price: "1.200.000đ",
          badge: "VIP",
        },
      ],
    },
  ];

  const pricingPlans = [
    {
      name: "Gói Cơ bản",
      price: "Miễn phí",
      features: [
        "Tarot AI 3 lá",
        "Lưu lịch sử phiên",
        "Nhận ưu đãi dịch vụ mới",
      ],
      highlight: false,
    },
    {
      name: "Gói Chuyên sâu",
      price: "299.000đ",
      features: [
        "1 phiên Tarot chuyên gia",
        "1 bản Thần số học",
        "Ưu tiên đặt lịch",
        "Hỗ trợ qua hộp thư",
      ],
      highlight: true,
    },
    {
      name: "Gói Hành giả",
      price: "899.000đ",
      features: [
        "3 phiên chuyên gia / tháng",
        "Luận mệnh + PDF",
        "Giảm 15% cửa hàng",
        "Mở khóa 1 khóa học",
      ],
      highlight: false,
    },
  ];

  return (
    <div className="dichvu-page">
      {/* Hero */}
      <section className="dv-hero">
        <div className="dv-hero-content">
          <p className="dv-badge">DỊCH VỤ TÂM LINH AI ✴︎ HỆ SINH THÁI</p>
          <h1 className="dv-title">Trung tâm Dịch vụ Khoa học Tâm linh</h1>
          <p className="dv-subtitle">
            Từ trải bài Tarot, luận mệnh – lá số, đến đặt lịch chuyên gia và gói
            dịch vụ dài hạn. Tất cả nằm trong một hệ thống đồng bộ, dùng được
            với Ví Linh Tệ.
          </p>
          <div className="dv-actions">
            <a href="#nhom-dich-vu" className="dv-btn primary">
              Xem dịch vụ
            </a>
            <a href="#dat-lich" className="dv-btn secondary">
              Đặt lịch ngay
            </a>
          </div>
          <p className="dv-meta">
            Hỗ trợ: Tarot AI ✦ Email OTP ✦ Ví Linh Tệ ✦ Đặt lịch chuyên gia
          </p>
        </div>
        <div className="dv-hero-media">
          <div className="dv-glow"></div>
          <div className="dv-card-floating">
            <p className="label">Phiên hôm nay</p>
            <h3>12 phiên đang diễn ra</h3>
            <p className="muted">4 Tarot • 5 Mệnh • 3 Đặt lịch</p>
          </div>
          <div className="dv-card-floating right">
            <p className="label">Chế độ AI</p>
            <h3>Online</h3>
            <p className="muted">Trải bài tự động</p>
          </div>
        </div>
      </section>

      {/* Quick filter */}
      <section className="dv-quick">
        <h2>Chọn nhóm dịch vụ</h2>
        <div className="dv-quick-list">
          {serviceGroups.map((group) => (
            <a key={group.id} href={`#${group.id}`} className="dv-quick-item">
              <span className="dv-quick-tag">{group.tag}</span>
              <span className="dv-quick-title">{group.title}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Service Groups */}
      <section id="nhom-dich-vu" className="dv-groups">
        {serviceGroups.map((group) => (
          <div key={group.id} id={group.id} className="dv-group-block">
            <div className="dv-group-head">
              <p className="dv-tag">{group.tag}</p>
              <h2>{group.title}</h2>
              <p>{group.desc}</p>
            </div>
            <div className="dv-group-grid">
              {group.items.map((item, index) => (
                <div key={index} className="dv-card">
                  {item.badge && (
                    <span className="dv-card-badge">{item.badge}</span>
                  )}
                  <h3>{item.name}</h3>
                  <p className="dv-card-brief">{item.brief}</p>
                  <p className="dv-card-price">{item.price}</p>
                  <button className="dv-card-btn">Xem chi tiết</button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Booking */}
      <section id="dat-lich" className="dv-booking">
        <div className="dv-booking-content">
          <h2>Đặt lịch chuyên gia</h2>
          <p>
            Điền yêu cầu, hệ thống sẽ gợi ý chuyên gia phù hợp (Tarot, Mệnh,
            Phong thủy) và khung giờ trống. Nếu cậu đã bật 2FA ở trang Tài
            khoản, lịch sẽ được giữ ưu tiên cao hơn.
          </p>
          <form className="dv-form">
            <div className="dv-form-group">
              <label>Họ và tên</label>
              <input type="text" placeholder="Nhập họ tên..." />
            </div>
            <div className="dv-form-group">
              <label>Loại dịch vụ</label>
              <select defaultValue="Tarot 1-1">
                <option>Tarot 1-1</option>
                <option>Luận mệnh & lá số</option>
                <option>Phong thủy – chọn ngày</option>
                <option>Coaching tâm linh</option>
              </select>
            </div>
            <div className="dv-form-group two-col">
              <div>
                <label>Ngày mong muốn</label>
                <input type="date" />
              </div>
              <div>
                <label>Khung giờ</label>
                <select defaultValue="Tối (19h-21h)">
                  <option>Sáng (9h-11h)</option>
                  <option>Chiều (14h-17h)</option>
                  <option>Tối (19h-21h)</option>
                </select>
              </div>
            </div>
            <div className="dv-form-group">
              <label>Ghi chú</label>
              <textarea
                rows="3"
                placeholder="Mô tả ngắn vấn đề của bạn..."
              ></textarea>
            </div>
            <button type="submit" className="dv-btn primary full">
              Gửi yêu cầu đặt lịch
            </button>
            <p className="dv-form-note">
              * Có thể thanh toán bằng Linh Tệ, Momo hoặc COD – hệ thống sẽ
              hướng dẫn sau khi xác nhận lịch.
            </p>
          </form>
        </div>
        <div className="dv-booking-side">
          <div className="dv-side-card">
            <h3>Ưu tiên thành viên</h3>
            <p>
              Nếu bạn đã đăng nhập và bật bảo mật 2FA trong trang{" "}
              <strong>Tài khoản</strong>, hệ thống sẽ:
            </p>
            <ul>
              <li>Giữ lịch tối đa 24h</li>
              <li>Ưu tiên chuyên gia được đánh giá cao</li>
              <li>Gửi OTP xác thực vào email</li>
            </ul>
          </div>
          <div className="dv-side-card">
            <h3>Thời gian chuyên gia online</h3>
            <p>09:00 – 22:00 hằng ngày</p>
            <p className="muted">Ngoài giờ: đặt trước 3h</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="dv-pricing">
        <h2>Gói dịch vụ đề xuất</h2>
        <p className="dv-pricing-sub">
          Phù hợp khi bạn muốn dùng dịch vụ định kỳ để theo dõi hành trình tâm
          linh – phát triển bản thân.
        </p>
        <div className="dv-pricing-grid">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`dv-pricing-card ${plan.highlight ? "highlight" : ""}`}
            >
              <h3>{plan.name}</h3>
              <p className="dv-pricing-price">{plan.price}</p>
              <ul>
                {plan.features.map((ft, i) => (
                  <li key={i}>{ft}</li>
                ))}
              </ul>
              <button className="dv-card-btn">Chọn gói này</button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="dv-cta">
        <div className="dv-cta-content">
          <h2>Sẵn sàng trải nghiệm?</h2>
          <p>
            Vào Trang chủ để xem demo AI, hoặc vào Học viện nếu bạn muốn đi sâu
            Ngũ Huyền Thuật.
          </p>
        </div>
        <div className="dv-cta-actions">
          <a href="/" className="dv-btn primary">
            Về Trang chủ
          </a>
          <a href="/kien-thuc" className="dv-btn secondary">
            Vào Học viện
          </a>
        </div>
      </section>
    </div>
  );
};

export default DichVu;
