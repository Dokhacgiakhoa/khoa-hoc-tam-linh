import React, { createContext, useContext, useState } from "react";
import AlertModal from "../components/common/AlertModal";

const AlertContext = createContext();

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within AlertProvider");
  }
  return context;
};

export const AlertProvider = ({ children }) => {
  const [alertState, setAlertState] = useState({
    show: false,
    type: "info",
    title: "",
    message: "",
    onConfirm: null,
  });

  const showAlert = (message, type = "info", title = "") => {
    setAlertState({
      show: true,
      type,
      title,
      message,
      onConfirm: null,
    });
  };

  const showConfirm = (message, onConfirm, title = "") => {
    setAlertState({
      show: true,
      type: "confirm",
      title,
      message,
      onConfirm,
    });
  };

  const showSuccess = (message, title = "Thành công") => {
    showAlert(message, "success", title);
  };

  const showError = (message, title = "Lỗi") => {
    showAlert(message, "error", title);
  };

  const showWarning = (message, title = "Cảnh báo") => {
    showAlert(message, "warning", title);
  };

  const showInfo = (message, title = "Thông báo") => {
    showAlert(message, "info", title);
  };

  const hideAlert = () => {
    setAlertState({ ...alertState, show: false });
  };

  const value = {
    showAlert,
    showConfirm,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    hideAlert,
  };

  return (
    <AlertContext.Provider value={value}>
      {children}
      <AlertModal
        show={alertState.show}
        onClose={hideAlert}
        type={alertState.type}
        title={alertState.title}
        message={alertState.message}
        onConfirm={alertState.onConfirm}
      />
    </AlertContext.Provider>
  );
};
