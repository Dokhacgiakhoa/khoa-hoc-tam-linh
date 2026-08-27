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
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  const isAdminPage = pathname ? pathname.startsWith("/admin") : false;

  return (
    <AlertProvider>
      <div className="app-root d-flex flex-column min-vh-100">
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
        {!isAdminPage && <Navbar />}
        <main className="app-main flex-grow-1">{children}</main>
        {!isAdminPage && <Footer />}
      </div>
    </AlertProvider>
  );
}
