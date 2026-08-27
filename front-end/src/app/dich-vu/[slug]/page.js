"use client";

import React from "react";
import { useParams } from "next/navigation";
import KinhDich from "../../../views/dich-vu/sub-pages/KinhDich";
import ThanSoHoc from "../../../views/dich-vu/sub-pages/ThanSoHoc";
import TuVi from "../../../views/dich-vu/sub-pages/TuVi";
import BanDoSao from "../../../views/dich-vu/sub-pages/BanDoSao";
import DatLich from "../../../views/dich-vu/sub-pages/DatLich";
import TarotMienPhi from "../../../views/dich-vu-mien-phi/tarot-mien-phi";
import ServiceDynamicPage from "../../../views/dich-vu/sub-pages/ServiceDynamicPage";

export default function DynamicServicePage() {
  const params = useParams();
  const slug = params?.slug || "";

  if (slug === "kinh-dich") return <KinhDich />;
  if (slug === "than-so-hoc") return <ThanSoHoc />;
  if (slug === "tu-vi") return <TuVi />;
  if (slug === "ban-do-sao") return <BanDoSao />;
  if (slug === "dat-lich") return <DatLich />;
  if (slug === "tarot" || slug === "tarot-mien-phi") return <TarotMienPhi />;

  // Render ServiceDynamicPage cho toàn bộ các dịch vụ còn lại (bat-tu, scan-face, scan-palm, xem-van-tay, xin-xam, la-ban, thuoc-lo-ban, bat-trach, cham-diem-sim, lich-van-nien...)
  return <ServiceDynamicPage />;
}
