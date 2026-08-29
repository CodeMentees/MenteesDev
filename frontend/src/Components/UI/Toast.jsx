import { useEffect, useState } from "react";

const Toast = ({ message = "I am toast, fix me", type = "success", visible = true, duration = 3000 }) => {
  const [show, setShow] = useState(visible);

  useEffect(() => {
    if (visible && duration) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration]);

  if (!show) return null;

  const toastStyles = {
    success: "text-green-500 bg-green-100",
    error: "text-red-500 bg-red-100",
  };

  return (
    <div className={`fixed z-[9999] top-20 left-1/2 -translate-x-1/2 p-4 text-sm font-medium rounded-lg shadow-2xl ${toastStyles[type]}`}>
      <span>{message}</span>
    </div>
  );
};

export default Toast;
