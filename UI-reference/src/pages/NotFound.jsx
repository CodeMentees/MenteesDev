import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto px-6 py-32 text-center flex flex-col items-center justify-center min-h-[60vh]">
      <span className="text-8xl mb-6 select-none animate-bounce">🔍</span>
      <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
        404
      </h1>
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        Page Not Found
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm">
        Oops! The page you are looking for doesn't exist, has been removed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg shadow-indigo-500/20 transform hover:-translate-y-0.5"
      >
        Go Back Home
      </Link>
    </div>
  );
}
