import { Link } from "react-router-dom";
import TarotMienPhiMotLa from "../components/TarotMienPhiMotLa";

const DANH_SACH_DICH_VU = [
  {
    id: "tarot",
    tieuDe: "Tarot / Oracle",
    moTa: "Giải đáp nhanh các câu hỏi về tình cảm, công việc, tài chính, hướng đi.",
    gia: "30 Linh Tệ",
    thoiLuong: "15-20 phút",
    nhan: "Phổ biến",
  },
  {
    id: "ban-do-sao",
    tieuDe: "Chiêm tinh / Bản đồ sao",
    moTa: "Phân tích tính cách, vòng đời, thời vận và các mốc phát triển quan trọng.",
    gia: "90 Linh Tệ",
    thoiLuong: "Theo gói",
    nhan: "Chuyên sâu",
  },
  {
    id: "tu-vi",
    tieuDe: "Tử vi & Dịch lý",
    moTa: "Luận giải vận hạn, tài lộc, công danh, gia đạo và hướng hóa giải.",
    gia: "60 Linh Tệ",
    thoiLuong: "30 phút",
    nhan: null,
  },
  {
    id: "than-so-hoc",
    tieuDe: "Thần số học",
    moTa: "Giải mã sứ mệnh, năng lượng chủ đạo và bài học linh hồn từ ngày sinh.",
    gia: "45 Linh Tệ",
    thoiLuong: "20 phút",
    nhan: "Khuyến nghị",
  },
  {
    id: "dat-lich",
    tieuDe: "Đặt lịch tư vấn 1:1",
    moTa: "Tư vấn riêng, hỏi sâu, xử lý case đặc biệt với chuyên gia phù hợp.",
    gia: "Từ 120 Linh Tệ",
    thoiLuong: "30-60 phút",
    nhan: "Ưu tiên",
  },
];

function DichVu() {
  return (
    <div className="container py-5">
      {/* TIÊU ĐỀ */}
      <div className="row mb-4">
        <div className="col-lg-8">
          <h1 className="mb-3">Dịch vụ Tâm linh</h1>
          <p className="text-muted">
            Mỗi công cụ phản chiếu một khía cạnh khác nhau của bản thân. Chọn
            đúng dịch vụ sẽ giúp bạn nhìn rõ vấn đề và giải pháp phù hợp.
          </p>
        </div>
        <div className="col-lg-4 text-lg-end">
          {/* chữ thường */}
          <Link to="/lien-he" className="btn btn-primary">
            Cần tư vấn chọn dịch vụ
          </Link>
        </div>
      </div>

      {/* TAROT MIỄN PHÍ 1 LÁ */}
      <TarotMienPhiMotLa />

      {/* DANH SÁCH DỊCH VỤ */}
      <div className="row g-4 mt-1">
        {DANH_SACH_DICH_VU.map((dv) => (
          <div key={dv.id} id={dv.id} className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h5 className="card-title mb-0">{dv.tieuDe}</h5>
                  {dv.nhan && (
                    <span className="badge bg-primary">{dv.nhan}</span>
                  )}
                </div>

                <p className="card-text text-muted flex-grow-1">{dv.moTa}</p>

                <ul className="list-unstyled small mb-3">
                  <li>⏱ {dv.thoiLuong}</li>
                  <li>💰 {dv.gia}</li>
                  <li>🪙 Thanh toán bằng Linh Tệ</li>
                </ul>

                <div className="d-grid gap-2 mt-auto">
                  {/* sau này bạn nối tới demo riêng thì đổi Link ở đây */}
                  <button className="btn btn-outline-primary btn-sm">
                    Xem demo
                  </button>
                  <button className="btn btn-primary btn-sm">
                    Đặt lịch ngay
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CHI TIẾT TAROT */}
      <section className="mt-5" aria-labelledby="tarot-detail">
        <div className="row align-items-center gy-4">
          <div className="col-lg-6">
            <h2 id="tarot-detail" className="h4 mb-3">
              🔮 Tarot / Oracle — Dành cho câu hỏi ngắn
            </h2>
            <p>
              Nếu bạn đang cần câu trả lời nhanh: “Người đó có quay lại không?”,
              “Có nên đổi việc không?”, “Tài chính sắp tới ra sao?” → dùng
              Tarot.
            </p>
            <ul className="list-unstyled">
              <li>• 3 lá: Hiện tại – Cản trở – Hướng đi</li>
              <li>• 6 lá: Tình cảm / Công việc / Tài chính</li>
              <li>• 12 lá: Trải bài theo 12 cung / 12 tháng</li>
            </ul>
            <p className="mb-0">
              Sau này có thể tích hợp AI Tarot hoặc mở trải bài tự động bằng
              token.
            </p>
          </div>

          <div className="col-lg-6">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h5 className="card-title mb-3">Bảng giá Tarot</h5>
                <table className="table table-sm align-middle mb-0">
                  <thead>
                    <tr>
                      <th>Gói</th>
                      <th>Số lá</th>
                      <th>Giá</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Câu hỏi nhanh</td>
                      <td>1-3 lá</td>
                      <td>30 Linh Tệ</td>
                    </tr>
                    <tr>
                      <td>Tổng quan tháng</td>
                      <td>6 lá</td>
                      <td>60 Linh Tệ</td>
                    </tr>
                    <tr>
                      <td>12 cung / 12 tháng</td>
                      <td>12 lá</td>
                      <td>90 Linh Tệ</td>
                    </tr>
                  </tbody>
                </table>
                <p className="small text-muted mt-3 mb-0">
                  * Tỷ giá quy đổi: 1 Linh Tệ = 1.000đ (áp dụng chung cho toàn
                  hệ thống của cậu)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TÍCH HỢP AI */}
      <section className="mt-5 py-4 px-4 bg-light rounded-3">
        <div className="row align-items-center gy-3">
          <div className="col-lg-8">
            <h2 className="h4 mb-2">Muốn làm bản xem tự động (AI)?</h2>
            <p className="mb-0">
              Front-end đã chia sẵn từng dịch vụ, chỉ cần kết nối API để trả về
              kết quả tự động. Có thể cho phép người dùng “xem miễn phí 1
              lần/ngày”.
            </p>
          </div>
          <div className="col-lg-4 text-lg-end">
            {/* chữ thường */}
            <Link to="/lien-he" className="btn btn-outline-dark">
              Liên hệ tích hợp AI
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DichVu;
