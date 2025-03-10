import React from "react";

const Toast = ({ visible, message, type = "success" }) => {
  if (!visible) return null;

  const toastStyles = {
    success: "text-green-500 bg-green-100",
    error: "text-red-500 bg-red-100",
  };

  return (
    <div
      className={`fixed z-500 top-10 right-10 inline-flex items-center p-4 space-x-2 text-sm font-medium rounded-lg ${toastStyles[type]}`}
    >
      <svg
        className="w-5 h-5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
      </svg>
      <span>{message}</span>
    </div>
  );
};

export default Toast;
