import { useState, useCallback } from "react";
import type { ReactNode } from "react";
import { ToastContext } from "./toastContext";
import { Toast } from "./Toast";

export interface ToastInfo {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  const showToast = useCallback(
    (message: string, type: "success" | "error" | "info" = "success") => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, message, type }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, 4000);
    },
    [],
  );

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="toast-container">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            id={toast.id}
            message={toast.message}
            type={toast.type}
            removeToast={removeToast}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
