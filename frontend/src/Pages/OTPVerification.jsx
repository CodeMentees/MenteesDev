import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ShieldCheck, Loader2, RefreshCw } from "lucide-react";
import Toast from "../Components/UI/Toast";

const OTPVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [timer, setTimer] = useState(60);
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });
  
  const inputRefs = useRef([]);

  useEffect(() => {
    // Try to get email from location state (passed from Register or Login)
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    } else {
      // If no email, redirect back to login
      navigate("/login");
    }
  }, [location, navigate]);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const showToast = (message, type = "success") => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast({ visible: false, message: "", type: "success" }), 3000);
  };

  const handleChange = (index, value) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Dynamic focus to next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const data = e.clipboardData.getData("text").trim();
    if (data.length === 6 && /^\d+$/.test(data)) {
      setOtp(data.split(""));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length < 6) {
      showToast("Please enter the full 6-digit code.", "error");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpValue }),
      });

      const data = await response.json();
      if (response.ok) {
        showToast("Email verified successfully!", "success");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        showToast(data.message || "Verification failed.", "error");
      }
    } catch (error) {
      showToast("Something went wrong. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (timer > 0 || isResending) return;

    setIsResending(true);
    try {
      const response = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        showToast("Verification code resent!", "success");
        setTimer(60);
      } else {
        showToast(data.message || "Failed to resend code.", "error");
      }
    } catch (error) {
      showToast("Something went wrong. Please try again.", "error");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-background px-4">
      {toast.visible && <Toast message={toast.message} type={toast.type} visible={toast.visible} />}
      
      <div className="max-w-md w-full bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl p-8 text-center animate-fade-in">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-dark-btn/20 rounded-full">
            <ShieldCheck className="w-12 h-12 text-dark-btn" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-white mb-2">Verify Your Account</h2>
        <p className="text-gray-400 mb-8">
          We've sent a 6-digit verification code to <br />
          <span className="text-white font-medium">{email}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex justify-between gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-12 h-14 bg-gray-800 text-white text-2xl font-bold border-2 border-gray-700 rounded-xl focus:border-dark-btn focus:ring-2 focus:ring-dark-btn/20 outline-none transition-all text-center"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-dark-btn hover:bg-dark-btn/90 text-gray-900 font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-dark-btn/20 disabled:opacity-50 flex justify-center items-center"
          >
            {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Verify and Activate"}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-sm mb-4">Didn't receive the code?</p>
          <button
            onClick={handleResend}
            disabled={timer > 0 || isResending}
            className="flex items-center justify-center gap-2 mx-auto text-dark-btn font-bold hover:text-dark-btn/80 disabled:opacity-50 transition-colors"
          >
            {isResending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
            {timer > 0 ? `Resend Code in ${timer}s` : "Resend Verification Code"}
          </button>
        </div>

        <div className="mt-6">
          <button
            onClick={() => navigate("/login")}
            className="text-gray-500 hover:text-white text-sm transition-colors"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
