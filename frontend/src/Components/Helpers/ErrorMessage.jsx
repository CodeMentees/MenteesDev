import React from "react";

function ErrorMessage(error) {
  return (
    <div>
      {error && (
        <div className="bg-red-100 text-red-800 border-l-4 border-red-500 p-4 mb-4">
          {error}
        </div>
      )}
    </div>
  );
}

export default ErrorMessage;
