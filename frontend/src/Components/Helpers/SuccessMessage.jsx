import React from "react";

function SuccessMessage(successMessage) {
  return (
    <div>
      {successMessage && (
        <div className="bg-green-100 text-green-800 border-l-4 border-green-500 p-4 mb-4">
          {successMessage}
        </div>
      )}
    </div>
  );
}

export default SuccessMessage;
