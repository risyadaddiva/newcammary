"use client";

import { useEffect } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
}

export default function Toast({
  message,
  type = "success",
  onClose,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-6 right-6 z-[100] px-5 py-3 rounded-lg shadow-lg text-sm font-medium animate-slide-in ${
        type === "success"
          ? "bg-green-900 text-green-100 border border-green-700"
          : "bg-red-900 text-red-100 border border-red-700"
      }`}
    >
      {message}
    </div>
  );
}
