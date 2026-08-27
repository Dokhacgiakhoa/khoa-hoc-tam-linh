"use client";

import React, { useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AlertProvider } from "../../contexts/AlertContext";
import Navbar from "./navbar/navbar";
import Footer from "./footer/footer";

export default function ClientLayout({ children }) {
  const videoRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log("Video background autoplay status:", error);
        });
      }
    }
  }, []);

  const isAdminPage = pathname ? pathname.startsWith("/admin") : false;

  return (
    <AlertProvider>
      <div className="app-root d-flex flex-column min-vh-100 position-relative">
        {/* Nền Video Vũ Trụ Động (z-index: 0) */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="app-bg-video"
        >
          <source src="/media/backgroud-video.mp4" type="video/mp4" />
        </video>
        
        {/* Lớp phủ Gradient Tím Đen Huyền Bí (z-index: 1) */}
        <div className="app-bg-overlay" />

        {/* Nội dung ứng dụng luôn nằm trên nền (z-index: 2) */}
        <div className="d-flex flex-column flex-grow-1 position-relative" style={{ zIndex: 2 }}>
          {!isAdminPage && <Navbar />}
          <main className="app-main flex-grow-1">{children}</main>
          {!isAdminPage && <Footer />}
        </div>
      </div>
    </AlertProvider>
  );
}
