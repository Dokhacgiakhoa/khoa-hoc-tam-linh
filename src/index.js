import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css"; // nếu chưa có thì tạo file rỗng để tránh lỗi

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter basename="/khoa-hoc-tam-linh">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
