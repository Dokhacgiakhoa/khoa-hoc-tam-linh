"use client";

import React from "react";
import { useParams } from "next/navigation";
import ThiChungChi from "../../../views/hoc-vien-huyen-hoc/sub-pages/ThiChungChi";
import CategoryCourses from "../../../views/hoc-vien-huyen-hoc/sub-pages/CategoryCourses";
import HocVienHuyenHoc from "../../../views/hoc-vien-huyen-hoc/hoc-vien-huyen-hoc";

export default function AcademyCategoryPage() {
  const params = useParams();
  const category = params?.category || "";

  if (category === "thi-chung-chi") return <ThiChungChi />;
  if (["menh", "tuong", "boc", "trach", "so"].includes(category)) return <CategoryCourses />;

  return <HocVienHuyenHoc />;
}
