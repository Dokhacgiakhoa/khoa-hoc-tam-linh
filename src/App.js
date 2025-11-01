import React from "react";
import "./App.css";
import Navbar from "./components/navigation/Navbar";
import Footer from "./components/footer/footer";
import AppRouter from "./router/app-router";

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-main">
        <AppRouter />
      </main>
      <Footer />
    </div>
  );
}

export default App;
