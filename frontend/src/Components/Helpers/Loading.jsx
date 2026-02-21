import React from "react";

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center space-y-3">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-700 text-lg font-medium">Loading...</p>
      </div>
    </div>
  );
}

export default Loading;
