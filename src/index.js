import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import App from "./app";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

// Dùng HashRouter khi build (GitHub Pages), BrowserRouter khi local
const Router =
  process.env.NODE_ENV === "production" ? HashRouter : BrowserRouter;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <App />
  </Router>
);
