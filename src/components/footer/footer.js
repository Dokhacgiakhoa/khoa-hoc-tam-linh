// src/components/footer/footer.js
import React from "react";
import "./footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      <p>
        © {new Date().getFullYear()} Khoa học Tâm linh. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
