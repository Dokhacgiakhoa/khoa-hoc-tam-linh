import React from "react";
import "./SkeletonLoader.css";

export default function SkeletonLoader({ type = "card", count = 1, className = "" }) {
  const items = Array.from({ length: count }, (_, i) => i);

  if (type === "card") {
    return (
      <div className={`skeleton-grid ${className}`}>
        {items.map((key) => (
          <div className="skeleton-card" key={key}>
            <div className="skeleton-image shimmer" />
            <div className="skeleton-content">
              <div className="skeleton-title shimmer" />
              <div className="skeleton-text shimmer" />
              <div className="skeleton-text short shimmer" />
              <div className="skeleton-btn shimmer" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "text") {
    return (
      <div className={`skeleton-text-group ${className}`}>
        {items.map((key) => (
          <div className="skeleton-text shimmer" key={key} />
        ))}
      </div>
    );
  }

  if (type === "banner") {
    return <div className={`skeleton-banner shimmer ${className}`} />;
  }

  return <div className={`skeleton-box shimmer ${className}`} />;
}
