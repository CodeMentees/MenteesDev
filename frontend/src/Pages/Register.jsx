import React from "react";
import Register from "../Components/Forms/Register";
import { Helmet } from "react-helmet-async";

function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* ✅ SEO Optimization */}
      <Helmet>
        <title>Register | Codementees</title>
        <meta name="description" content="Create an account on Codementees to access exclusive coding courses and mentorship." />
        <meta name="keywords" content="register, sign up, coding, mentorship" />
        <meta property="og:title" content="Register | Codementees" />
        <meta property="og:description" content="Join Codementees today and start learning from top mentors!" />
        <meta property="og:url" content="https://codementees.com/register" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* ✅ Centered Form with Styling */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full ">
        <Register />
      </div>
    </div>
  );
}

export default RegisterPage;
