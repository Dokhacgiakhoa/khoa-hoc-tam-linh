import React from "react";
import AppRouter from "./router/app-router";
import Navbar from "./components/navigation/Navbar";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <div className="app-root bg-dark-layout">
      {/* Navbar cố định trên cùng */}
      <Navbar />

      {/* Phần nội dung có top padding để tránh đè lên navbar fixed-top */}
      <main style={{ minHeight: "100vh", paddingTop: "72px" }}>
        <AppRouter />
      </main>

      {/* Footer cố định cuối trang */}
      <Footer />
    </div>
  );
}

export default App;
