import { useEffect, useState } from 'react';
import { toast } from '../utils/toast';

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const unsubscribe = toast.subscribe(setToasts);
    return unsubscribe;
  }, []);

  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} />
      ))}
    </div>
  );
}

function ToastItem({ toast: t }) {
  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
    loading: '⟳'
  };

  const styles = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    warning: 'bg-yellow-500 text-white',
    info: 'bg-blue-500 text-white',
    loading: 'bg-gray-700 text-white'
  };

  return (
    <div
      className={`${styles[t.type]} px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px] max-w-md pointer-events-auto animate-slideIn`}
      onClick={() => toast.remove(t.id)}
    >
      <span className={`text-xl ${t.type === 'loading' ? 'animate-spin' : ''}`}>
        {icons[t.type]}
      </span>
      <span className="flex-1 text-sm font-medium">{t.message}</span>
      <button
        onClick={() => toast.remove(t.id)}
        className="text-white/80 hover:text-white transition"
      >
        ✕
      </button>
    </div>
  );
}
