import type { ToastInfo } from "./ToastProvider";

interface ToastProps extends ToastInfo {
  removeToast: (id: number) => void;
}

export function Toast({ message, type, id, removeToast }: ToastProps) {
  return (
    <div className={`toast toast-${type}`}>
      <span role="alert">{message}</span>
      <button
        type="button"
        className="toast-close"
        onClick={() => removeToast(id)}
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
}
