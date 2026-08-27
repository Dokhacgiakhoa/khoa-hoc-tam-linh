import axios from "axios";

/**
 * Centralized Axios API Client
 * - Automatically injects 'auth_token' Bearer Token into requests
 * - Handles 401 Unauthorized globally
 * - Triggers 'userChanged' event on login/logout
 */
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token if invalid/expired (except on login/register endpoints)
      const url = error.config.url || "";
      if (!url.includes("/login") && !url.includes("/register")) {
        console.warn("Session expired or unauthorized. Clearing local token.");
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user");
        window.dispatchEvent(new Event("userChanged"));
      }
    }
    return Promise.reject(error);
  }
);

export default api;
