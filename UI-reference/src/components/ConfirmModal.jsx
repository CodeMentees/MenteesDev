export default function ConfirmModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'info' // 'info', 'warning', 'danger'
}) {
  if (!isOpen) return null;

  const typeStyles = {
    info: 'bg-blue-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500'
  };

  const icons = {
    info: 'ℹ️',
    warning: '⚠️',
    danger: '🗑️'
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
      <div className="panel max-w-md w-full">
        <div className="flex items-start gap-4 mb-6">
          <div className={`${typeStyles[type]} w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0`}>
            {icons[type]}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-dash-ink dark:text-white mb-2">
              {title}
            </h3>
            <p className="text-sm text-muted">{message}</p>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-default rounded-lg hover:bg-surface transition"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 ${typeStyles[type]} text-white rounded-lg hover:opacity-90 transition`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
