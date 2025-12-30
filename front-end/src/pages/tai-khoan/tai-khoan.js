import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./tai-khoan.css";

// Sub Components
import AuthPage from "./AuthPage";
import Dashboard from "./Dashboard";

function TaiKhoan() {
  const { activeTab } = useParams(); // Get URL param
  const [token, setToken] = useState(localStorage.getItem("auth_token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize: Check token and fetch user
  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const res = await axios.get("/api/user");
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      window.dispatchEvent(new Event("userChanged"));
    } catch (err) {
      // Token expired
      handleLogout();
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = (data) => {
    localStorage.setItem("auth_token", data.access_token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setToken(data.access_token);
    setUser(data.user);
    // Dispatch custom event to notify navbar
    window.dispatchEvent(new Event("userChanged"));
  };

  const handleLogout = () => {
    if (token) {
      axios.post("/api/logout").catch(() => {});
    }
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    // Dispatch custom event to notify navbar
    window.dispatchEvent(new Event("userChanged"));
  };

  if (loading)
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-gold"></div>
      </div>
    );

  return (
    <main id="tai-khoan" className="khctl-page py-4">
      <div className="container">
        {!token || !user ? (
          <AuthPage onLoginSuccess={handleLoginSuccess} />
        ) : (
          <Dashboard
            user={user}
            onLogout={handleLogout}
            initialView={activeTab}
          />
        )}
      </div>
    </main>
  );
}

export default TaiKhoan;
