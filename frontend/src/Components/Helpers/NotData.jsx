import React from "react";

function NoData() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] bg-gray-100 p-4 rounded-lg">
      <svg
        className="w-16 h-16 text-gray-400 mb-2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M2 5a3 3 0 013-3h14a3 3 0 013 3v14a3 3 0 01-3 3H5a3 3 0 01-3-3V5zm15 6a1 1 0 10-2 0v3a1 1 0 102 0v-3zm-4-3a1 1 0 00-2 0v6a1 1 0 102 0V8zM9 9a1 1 0 00-2 0v4a1 1 0 102 0V9z"
          clipRule="evenodd"
        />
      </svg>
      <p className="text-gray-600 text-lg font-semibold">No Data Found</p>
    </div>
  );
}

export default NoData;
