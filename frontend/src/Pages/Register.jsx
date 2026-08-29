import React from "react";
import Register from "../Components/Forms/Register";

function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* ✅ Centered Form with Styling */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full ">
        <Register />
      </div>
    </div>
  );
}

export default RegisterPage;
