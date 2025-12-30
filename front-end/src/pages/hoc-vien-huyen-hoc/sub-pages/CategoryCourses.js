import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../hoc-vien-huyen-hoc.css";

export default function CategoryCourses() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    type: "success",
    course: null,
  });

  const handlePurchase = (course) => {
    console.log("handlePurchase called with course:", course);

    const token = localStorage.getItem("auth_token");
    if (!token) {
      setModalData({
        type: "error",
        message: "Vui lòng đăng nhập để mua khóa học!",
        action: () => (window.location.href = "/tai-khoan"),
      });
      setShowModal(true);
      return;
    }

    // Add course to cart
    const cart = JSON.parse(localStorage.getItem("kh_cart") || "[]");
    console.log("Current cart:", cart);

    // Check if course already in cart
    const existingIndex = cart.findIndex(
      (item) => item.type === "course" && item.id === course.id
    );

    if (existingIndex >= 0) {
      setModalData({
        type: "warning",
        message: "Khóa học đã có trong giỏ hàng!",
        showButtons: false,
      });
      setShowModal(true);
      return;
    }

    // Add course to cart
    cart.push({
      id: course.id,
      type: "course",
      name: course.title,
      price: Number(course.price),
      quantity: 1,
      image_url: "/images/banners/hoc-vien-huyen-hoc-banner.png",
      slug: course.slug,
    });

    localStorage.setItem("kh_cart", JSON.stringify(cart));
    console.log("Updated cart:", cart);

    // Trigger cart update event
    window.dispatchEvent(new Event("cartChanged"));

    // Show success modal
    setModalData({
      type: "success",
      course: course,
      message: `Đã thêm "${course.title}" vào giỏ hàng!`,
    });
    setShowModal(true);
  };

  useEffect(() => {
    setLoading(true);

    const token = localStorage.getItem("auth_token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    axios
      .get(`/api/academy/category/${slug}`, { headers })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  const getCategoryImage = (slug) => {
    const images = {
      menh: "/images/banners/menh-huyen-thuat.png",
      tuong: "/images/banners/tuong-huyen-thuat.png",
      boc: "/images/banners/boc-huyen-thuat.png",
      trach: "/images/banners/trach-huyen-thuat.png",
      so: "/images/banners/so-huyen-thuat.png",
    };
    return images[slug] || "/images/banners/hoc-vien-huyen-hoc-banner.png";
  };

  if (loading)
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center bg-dark text-gold">
        <div className="text-center">
          <div className="spinner-grow text-gold mb-3" role="status"></div>
          <p className="ls-2 text-uppercase small opacity-75">
            Đang tải tri thức...
          </p>
        </div>
      </div>
    );

  if (!data || !data.category)
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center bg-dark text-white">
        <div className="text-center">
          <div className="display-1 mb-4">🕯️</div>
          <h2 className="mb-4">Không tìm thấy danh mục tri thức này</h2>
          <Link to="/hoc-vien" className="btn btn-gold px-4">
            Quay lại Học Viện
          </Link>
        </div>
      </div>
    );

  const { category, courses } = data;

  return (
    <main className="khctl-page">
      {/* Premium Subject Hero */}
      <section className="subject-hero position-relative overflow-hidden">
        <div className="subject-hero-bg">
          <img
            src={getCategoryImage(slug)}
            alt={category.name}
            className="subject-banner-img"
          />
          <div className="subject-hero-overlay"></div>
        </div>

        <div className="container position-relative z-1 py-5">
          <nav aria-label="breadcrumb" className="mb-4">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/hoc-vien" className="text-gold opacity-75">
                  Học Viện
                </Link>
              </li>
              <li
                className="breadcrumb-item active text-white"
                aria-current="page"
              >
                {category.name}
              </li>
            </ol>
          </nav>

          <div className="row">
            <div className="col-lg-8">
              <span className="display-1 opacity-25 float-end d-none d-lg-block">
                {category.icon}
              </span>
              <h1 className="subject-title display-3 fw-bold text-gold mb-3">
                {category.name}
              </h1>
              <p
                className="subject-desc lead text-white-50 mb-4"
                style={{ maxWidth: "600px" }}
              >
                {category.description}
              </p>
              <div className="d-flex align-items-center gap-4">
                <div className="text-center bg-dark-glass p-3 rounded-3 border border-gold border-opacity-10">
                  <div className="h3 mb-0 text-gold fw-bold">
                    {courses.length}
                  </div>
                  <div className="small opacity-50 text-uppercase ls-1">
                    Khóa học
                  </div>
                </div>
                <div className="opacity-75">
                  <i className="bi bi-person-workspace me-2 text-gold"></i>
                  Lộ trình học từ cơ bản đến chuyên sâu
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course List Section */}
      <section className="container py-5">
        <div className="d-flex justify-content-between align-items-end mb-5">
          <div>
            <h2 className="section-title text-white mb-2">
              Chương Trình Đào Tạo
            </h2>
            <div
              className="section-divider bg-gold"
              style={{ width: "60px", height: "3px" }}
            ></div>
          </div>
        </div>

        <div className="row g-4">
          {courses.length > 0 ? (
            courses.map((course) => (
              <div className="col-md-6 col-lg-4" key={course.id}>
                <div className="card-3d h-100 overflow-hidden d-flex flex-column">
                  <div className="card-body p-4 d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <span
                        className="badge py-2 px-4 rounded-pill fw-bold"
                        style={{
                          fontSize: "1.1rem",
                          letterSpacing: "0.5px",
                          backgroundColor:
                            Number(course.price) === 0 ? "#28a745" : "#d4af37",
                          color:
                            Number(course.price) === 0 ? "#fff" : "#1a1a1a",
                          boxShadow: "0 4px 12px rgba(212, 175, 55, 0.4)",
                          border: "2px solid rgba(255, 255, 255, 0.2)",
                        }}
                      >
                        {Number(course.price) === 0
                          ? "🎁 Miễn phí"
                          : `💰 ${Math.floor(
                              Number(course.price) / 1000
                            ).toLocaleString("vi-VN", {
                              maximumFractionDigits: 0,
                            })} Linh Tệ`}
                      </span>
                      <span
                        className="badge py-1 px-3"
                        style={{
                          backgroundColor: "rgba(0, 0, 0, 0.5)",
                          color: "#fff",
                        }}
                      >
                        {course.level}
                      </span>
                    </div>

                    <h3 className="h4 text-white hover-gold transition-all mb-3">
                      {course.title}
                    </h3>

                    <p className="small text-white-50 mb-4 flex-grow-1">
                      {course.summary}
                    </p>

                    {course.progress_percent > 0 && (
                      <div className="mb-3">
                        <div className="d-flex justify-content-between small text-gold mb-1">
                          <span>Tiến độ</span>
                          <span>{course.progress_percent}%</span>
                        </div>
                        <div
                          className="progress"
                          style={{
                            height: "6px",
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                          }}
                        >
                          <div
                            className="progress-bar bg-gold"
                            role="progressbar"
                            style={{ width: `${course.progress_percent}%` }}
                            aria-valuenow={course.progress_percent}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                    )}

                    <Link
                      to={
                        Number(course.price) === 0 || course.is_enrolled
                          ? `/hoc-vien/khoa-hoc/${course.slug}`
                          : "#"
                      }
                      className={`btn ${
                        Number(course.price) === 0 || course.is_enrolled
                          ? "btn-gold"
                          : "btn-outline-gold"
                      } w-100 py-2`}
                      onClick={(e) => {
                        if (Number(course.price) > 0 && !course.is_enrolled) {
                          e.preventDefault();
                          handlePurchase(course);
                        }
                      }}
                    >
                      {Number(course.price) === 0 || course.is_enrolled
                        ? course.progress_percent > 0
                          ? "Tiếp tục học"
                          : "Bắt đầu học ngay"
                        : `Mua khóa học - ${Math.floor(
                            Number(course.price) / 1000
                          ).toLocaleString("vi-VN")} Linh Tệ`}
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <div className="card-3d p-5">
                <div className="display-1 opacity-10 mb-3">🕯️</div>
                <h4 className="opacity-50">Đang cập nhật tri thức...</h4>
                <p className="small opacity-25">
                  Các bài giảng cho danh mục này đang được các bậc thầy biên
                  soạn.
                </p>
                <Link to="/hoc-vien" className="btn btn-outline-gold mt-3">
                  Quay lại Học Viện
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Custom Modal */}
      {showModal && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
          onClick={() => setShowModal(false)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content bg-dark border-gold">
              <div
                className={`modal-header border-bottom ${
                  modalData.type === "success"
                    ? "border-success"
                    : modalData.type === "warning"
                    ? "border-warning"
                    : "border-danger"
                }`}
              >
                <h5 className="modal-title text-white d-flex align-items-center gap-2">
                  {modalData.type === "success" && "✅"}
                  {modalData.type === "warning" && "⚠️"}
                  {modalData.type === "error" && "❌"}
                  <span>
                    {modalData.type === "success" && "Thành công!"}
                    {modalData.type === "warning" && "Thông báo"}
                    {modalData.type === "error" && "Lỗi"}
                  </span>
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body text-white">
                <p className="mb-0">{modalData.message}</p>
                {modalData.course && (
                  <div
                    className="mt-3 p-3 rounded"
                    style={{ backgroundColor: "rgba(212, 175, 55, 0.1)" }}
                  >
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={
                          modalData.course.image ||
                          "/images/banners/hoc-vien-huyen-hoc-banner.png"
                        }
                        alt={modalData.course.title}
                        className="rounded"
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                        }}
                      />
                      <div className="flex-grow-1">
                        <h6 className="mb-1 text-gold">
                          {modalData.course.title}
                        </h6>
                        <p className="mb-0 small opacity-75">
                          {Math.floor(
                            Number(modalData.course.price) / 1000
                          ).toLocaleString("vi-VN")}{" "}
                          Linh Tệ
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="modal-footer border-top border-secondary">
                {modalData.showButtons !== false && (
                  <>
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => {
                        setShowModal(false);
                        if (modalData.type === "success") {
                          window.location.reload();
                        }
                      }}
                    >
                      Tiếp tục mua sắm
                    </button>
                    <button
                      type="button"
                      className="btn btn-gold"
                      onClick={() => {
                        setShowModal(false);
                        if (modalData.action) {
                          modalData.action();
                        } else if (modalData.type === "success") {
                          window.location.href = "/gio-hang";
                        }
                      }}
                    >
                      {modalData.type === "error"
                        ? "Đăng nhập"
                        : "Đến giỏ hàng"}
                    </button>
                  </>
                )}
                {modalData.showButtons === false && (
                  <button
                    type="button"
                    className="btn btn-gold"
                    onClick={() => setShowModal(false)}
                  >
                    Đóng
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
