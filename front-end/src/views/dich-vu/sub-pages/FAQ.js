import React from "react";
import "./sub-pages.css";

export default function FAQDichVu() {
  const faqs = [
    {
      q: "Khoa học Tâm linh có phải là bói toán mê tín không?",
      a: "Không. Chúng tôi sử dụng các hệ thống tri thức cổ xưa kết hợp với phân tích dữ liệu và AI để đưa ra các gợi ý mang tính tham khảo, giúp bạn tự thấu hiểu và ra quyết định.",
    },
    {
      q: "Làm thế nào để bắt đầu trải nghiệm dịch vụ?",
      a: "Bạn có thể bắt đầu với các dịch vụ miễn phí như Tarot 1 lá. Sau đó nếu muốn đi sâu hơn, hãy đăng ký tài khoản và chọn các gói dịch vụ chuyên sâu.",
    },
    {
      q: "Dữ liệu cá nhân của tôi có được bảo mật không?",
      a: "Hoàn toàn bảo mật. Chúng tôi tích hợp xác thực 2FA và mã hóa dữ liệu người dùng theo tiêu chuẩn cao nhất.",
    },
    {
      q: "Tôi có thể yêu cầu hoàn tiền nếu không hài lòng?",
      a: "Chúng tôi có chính sách hỗ trợ hoàn trả Linh Tệ vào ví nếu phiên tư vấn gặp sự cố kỹ thuật hoặc không đáp ứng cam kết ban đầu.",
    },
  ];

  return (
    <div className="sub-page faq-page">
      <section className="sub-hero">
        <div className="container">
          <h1 className="sub-title">FAQ Dịch vụ</h1>
          <p className="sub-desc">
            Giải đáp các thắc mắc thường gặp về cách thức hoạt động, bảo mật và
            quyền lợi của bạn khi sử dụng hệ sinh thái Khoa học Tâm linh.
          </p>
        </div>
      </section>

      <section className="sub-content container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="accordion glass-accordion" id="faqAccordion">
              {faqs.map((faq, i) => (
                <div
                  className="accordion-item bg-transparent border-bottom border-white border-opacity-10"
                  key={i}
                >
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed bg-transparent text-white py-4 shadow-none"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${i}`}
                    >
                      {faq.q}
                    </button>
                  </h2>
                  <div
                    id={`collapse${i}`}
                    className="accordion-collapse collapse"
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body opacity-75 pb-4">
                      {faq.a}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
