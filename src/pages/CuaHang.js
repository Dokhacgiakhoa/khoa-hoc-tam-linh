import React from "react";

const sanPhamDemo = [
  {
    id: 1,
    name: "Bộ bài Tarot Rider Waite",
    price: "350.000đ hoặc 350 Linh Tệ",
    img: `${process.env.PUBLIC_URL}/images/shop/tarot-rider.png`,
    cat: "Bài Tarot",
  },
  {
    id: 2,
    name: "Đá thạch anh tím",
    price: "420.000đ hoặc 420 Linh Tệ",
    img: `${process.env.PUBLIC_URL}/images/shop/stone-amethyst.png`,
    cat: "Đá tâm linh",
  },
  {
    id: 3,
    name: "Thác khói trầm mini",
    price: "250.000đ hoặc 250 Linh Tệ",
    img: `${process.env.PUBLIC_URL}/images/shop/incense-fall.png`,
    cat: "Thác khói trầm",
  },
  {
    id: 4,
    name: "Khăn trải bài họa tiết mặt trăng",
    price: "180.000đ hoặc 180 Linh Tệ",
    img: `${process.env.PUBLIC_URL}/images/shop/tarot-cloth.png`,
    cat: "Phụ kiện",
  },
];

const CuaHang = () => {
  return (
    <div className="py-5 bg-body-tertiary">
      <div className="container">
        <div className="mb-5 text-center">
          <h1 className="fw-bold">Cửa hàng tâm linh</h1>
          <p className="text-muted mb-0">
            Đá quý – bài Tarot – phụ kiện – thác khói trầm – đồ trang trí
          </p>
          <p className="text-muted">Thanh toán bằng Linh Tệ hoặc COD</p>
        </div>

        <div className="row g-4 mb-4">
          <div className="col-md-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Danh mục</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Bài Tarot</li>
                  <li className="list-group-item">Đá tâm linh</li>
                  <li className="list-group-item">Phụ kiện trải bài</li>
                  <li className="list-group-item">Thác khói trầm</li>
                  <li className="list-group-item">Đồ trang trí</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md-9">
            <div className="row g-4">
              {sanPhamDemo.map((sp) => (
                <div className="col-md-6 col-lg-4" key={sp.id}>
                  <div className="card h-100 shadow-sm">
                    <img
                      src={sp.img}
                      className="card-img-top"
                      alt={sp.name}
                      onError={(e) => {
                        e.target.src = `${process.env.PUBLIC_URL}/images/shop/placeholder.png`;
                      }}
                    />
                    <div className="card-body d-flex flex-column">
                      <span className="badge bg-secondary mb-2">{sp.cat}</span>
                      <h5 className="card-title">{sp.name}</h5>
                      <p className="card-text text-primary fw-semibold mb-3">
                        {sp.price}
                      </p>
                      <button className="btn btn-outline-primary mt-auto">
                        Thêm vào giỏ
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 alert alert-info">
              Ghi chú: Phần này sau cậu có thể nối sang trang chi tiết sản phẩm,
              form đặt hàng và API thanh toán / webhook MoMo để tự cộng Linh Tệ.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CuaHang;
