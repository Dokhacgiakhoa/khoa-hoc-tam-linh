import React from "react";
import "./AlertModal.css";

export default function AlertModal({
  show,
  onClose,
  title,
  message,
  type = "info", // 'success', 'error', 'warning', 'info', 'confirm'
  onConfirm,
  confirmText = "Xác nhận",
  cancelText = "Hủy",
}) {
  if (!show) return null;

  const getIcon = () => {
    switch (type) {
      case "success":
        return "✅";
      case "error":
        return "❌";
      case "warning":
        return "⚠️";
      case "confirm":
        return "❓";
      default:
        return "ℹ️";
    }
  };

  const getBorderClass = () => {
    switch (type) {
      case "success":
        return "border-success";
      case "error":
        return "border-danger";
      case "warning":
        return "border-warning";
      case "confirm":
        return "border-info";
      default:
        return "border-info";
    }
  };

  return (
    <div className="alert-modal-overlay" onClick={onClose}>
      <div className="alert-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className={`alert-modal-header ${getBorderClass()}`}>
          <h5 className="alert-modal-title">
            <span className="alert-modal-icon">{getIcon()}</span>
            {title || (type === "confirm" ? "Xác nhận" : "Thông báo")}
          </h5>
          <button className="alert-modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="alert-modal-body">{message}</div>

        <div className="alert-modal-footer">
          {type === "confirm" ? (
            <>
              <button
                className="alert-modal-btn alert-modal-btn-secondary"
                onClick={onClose}
              >
                {cancelText}
              </button>
              <button
                className="alert-modal-btn alert-modal-btn-primary"
                onClick={() => {
                  if (onConfirm) onConfirm();
                  onClose();
                }}
              >
                {confirmText}
              </button>
            </>
          ) : (
            <button
              className="alert-modal-btn alert-modal-btn-primary"
              onClick={onClose}
            >
              Đóng
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
