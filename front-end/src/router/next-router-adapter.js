"use client";

import React from "react";
import NextLink from "next/link";
import { usePathname, useRouter, useParams as useNextParams } from "next/navigation";

export function Link({ to, href, children, ...props }) {
  const target = to || href || "/";
  return (
    <NextLink href={target} {...props}>
      {children}
    </NextLink>
  );
}

export function NavLink({ to, href, className, children, ...props }) {
  const pathname = usePathname();
  const target = to || href || "/";
  const isActive = pathname === target || (target !== "/" && pathname?.startsWith(target));

  const resolvedClass =
    typeof className === "function"
      ? className({ isActive })
      : `${className || ""} ${isActive ? "active" : ""}`.trim();

  return (
    <NextLink href={target} className={resolvedClass} {...props}>
      {children}
    </NextLink>
  );
}

export function useLocation() {
  const pathname = usePathname();
  return {
    pathname: pathname || "/",
    search: "",
    hash: "",
  };
}

export function useNavigate() {
  const router = useRouter();
  return (url) => {
    if (typeof url === "number") {
      if (url === -1) router.back();
    } else {
      router.push(url);
    }
  };
}

export function useParams() {
  return useNextParams() || {};
}

export default {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
};
