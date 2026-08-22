export default function LoadingSpinner({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
    xl: 'w-16 h-16 border-4'
  };

  return (
    <div className={`inline-block ${sizes[size]} border-current border-t-transparent rounded-full animate-spin ${className}`} />
  );
}

export function LoadingOverlay({ message = 'Loading...' }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9998]">
      <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-2xl flex flex-col items-center gap-4">
        <LoadingSpinner size="xl" className="text-teal-600" />
        <p className="text-lg font-semibold text-dash-ink dark:text-white">{message}</p>
      </div>
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="xl" className="text-teal-600 mx-auto mb-4" />
        <p className="text-muted">Loading...</p>
      </div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="dash-card animate-pulse">
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
    </div>
  );
}
