import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      <h1 className="text-9xl font-bold text-blue-600">404</h1>
      <h2 className="text-3xl font-semibold mt-4">Oops! Page Not Found</h2>
      <p className="text-lg text-gray-600 mt-2">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-md transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
