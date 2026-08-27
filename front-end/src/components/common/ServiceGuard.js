"use client";

import React from "react";

/**
 * ServiceGuard: Wrapper thân thiện cho các công cụ huyền học.
 * Hiện tại hỗ trợ Open Access 100% cho mọi người dùng (kể cả Guest)
 * để trải nghiệm lập lá số, gieo quẻ, tính số và tra cứu miễn phí.
 */
export default function ServiceGuard({ serviceId, config, children }) {
  return <>{children}</>;
}
