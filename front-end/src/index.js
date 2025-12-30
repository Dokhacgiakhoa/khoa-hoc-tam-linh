import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import App from "./app";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import axios from "axios";

// Configure axios to automatically attach token to all requests
// Force base URL to localhost:8001 to avoid proxy issues and port conflicts
axios.defaults.baseURL = "http://localhost:8001";

axios.interceptors.request.use(
  (config) => {
    // Don't add token for login/register routes
    const authRoutes = ["/api/login", "/api/register"];
    const isAuthRoute = authRoutes.some((route) => config.url?.includes(route));

    if (!isAuthRoute) {
      const token = localStorage.getItem("auth_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Dùng HashRouter khi build (GitHub Pages), BrowserRouter khi local
const Router =
  process.env.NODE_ENV === "production" ? HashRouter : BrowserRouter;

// Suppress benign ResizeObserver error
const resizeObserverLoopErr =
  "ResizeObserver loop completed with undelivered notifications.";
const originalError = console.error;
console.error = (...args) => {
  if (typeof args[0] === "string" && args[0].includes(resizeObserverLoopErr)) {
    return;
  }
  originalError.call(console, ...args);
};

window.addEventListener("error", (e) => {
  if (
    e.message ===
    "ResizeObserver loop completed with undelivered notifications."
  ) {
    const resizeObserverErrDiv = document.getElementById(
      "webpack-dev-server-client-overlay-div"
    );
    const resizeObserverErr = document.getElementById(
      "webpack-dev-server-client-overlay"
    );
    if (resizeObserverErr) {
      resizeObserverErr.setAttribute("style", "display: none");
    }
    if (resizeObserverErrDiv) {
      resizeObserverErrDiv.setAttribute("style", "display: none");
    }
  }
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <App />
  </Router>
);
