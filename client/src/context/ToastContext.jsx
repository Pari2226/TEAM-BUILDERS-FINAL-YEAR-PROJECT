import { createContext, useContext, useEffect, useState } from "react";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const pushToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((current) => [...current, { id, message, type }]);
    setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 3200);
  };

  return (
    <ToastContext.Provider value={{ pushToast }}>
      {children}
      <div className="fixed right-4 top-4 z-[80] flex w-full max-w-sm flex-col gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`rounded-2xl border px-4 py-3 shadow-glow backdrop-blur-xl ${toast.type === "success" ? "border-emerald-400/40 bg-emerald-500/15 text-emerald-50" : "border-rose-400/40 bg-rose-500/15 text-rose-50"}`}
          >
            <div className="flex items-center gap-3 text-sm font-medium">
              {toast.type === "success" ? <FiCheckCircle /> : <FiAlertCircle />}
              <span>{toast.message}</span>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
};
