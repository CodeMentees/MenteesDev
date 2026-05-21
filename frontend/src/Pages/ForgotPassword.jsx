import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Toast from "../Components/UI/Toast";

const STEPS = {
    EMAIL: 1,
    OTP: 2,
    NEW_PASSWORD: 3,
    SUCCESS: 4,
};

function ForgotPassword() {
    const navigate = useNavigate();
    const [step, setStep] = useState(STEPS.EMAIL);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState({ visible: false, message: "", type: "success" });
    const otpRefs = useRef([]);

    const showToast = (message, type = "success") => {
        setToast({ visible: true, message, type });
        setTimeout(() => setToast({ visible: false, message: "", type: "success" }), 4000);
    };

    // ─── Step 1: Send OTP ───────────────────────────────────────────────────────
    const handleSendOTP = async (e) => {
        e.preventDefault();
        if (!email.trim()) return showToast("Please enter your email address", "error");

        setIsLoading(true);
        try {
            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();

            if (res.ok) {
                showToast(data.message || "Verification code sent!", "success");
                setStep(STEPS.OTP);
            } else {
                showToast(data.message || "Failed to send code", "error");
            }
        } catch {
            showToast("An error occurred. Please try again.", "error");
        } finally {
            setIsLoading(false);
        }
    };

    // ─── Step 2: Verify OTP ─────────────────────────────────────────────────────
    const handleOtpChange = (index, value) => {
        if (!/^\d*$/.test(value)) return; // Only digits
        const newOtp = [...otp];
        newOtp[index] = value.slice(-1); // Only last digit
        setOtp(newOtp);

        // Auto-focus next box
        if (value && index < 5) {
            otpRefs.current[index + 1]?.focus();
        }
    };

    const handleOtpKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            otpRefs.current[index - 1]?.focus();
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        const code = otp.join("");
        if (code.length !== 6) return showToast("Please enter the complete 6-digit code", "error");

        setIsLoading(true);
        try {
            const res = await fetch("/api/auth/verify-reset-code", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, code }),
            });
            const data = await res.json();

            if (res.ok) {
                showToast("Code verified! Set your new password.", "success");
                setStep(STEPS.NEW_PASSWORD);
            } else {
                showToast(data.message || "Invalid or expired code", "error");
            }
        } catch {
            showToast("An error occurred. Please try again.", "error");
        } finally {
            setIsLoading(false);
        }
    };

    // ─── Step 3: Reset Password ─────────────────────────────────────────────────
    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (password.length < 6) return showToast("Password must be at least 6 characters", "error");
        if (password !== confirmPassword) return showToast("Passwords do not match", "error");

        setIsLoading(true);
        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();

            if (res.ok) {
                setStep(STEPS.SUCCESS);
            } else {
                showToast(data.message || "Failed to reset password", "error");
            }
        } catch {
            showToast("An error occurred. Please try again.", "error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0C172C] flex items-center justify-center py-12 px-4">
            <Helmet>
                <title>Forgot Password | CodeMentees</title>
            </Helmet>

            <Toast visible={toast.visible} message={toast.message} type={toast.type} />

            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-extrabold text-white mb-2">Reset Password</h1>
                    <p className="text-gray-400 text-sm">
                        {step === STEPS.EMAIL && "Enter your email to receive a verification code"}
                        {step === STEPS.OTP && `Enter the 6-digit code sent to ${email}`}
                        {step === STEPS.NEW_PASSWORD && "Create your new password"}
                        {step === STEPS.SUCCESS && "Password reset successfully"}
                    </p>
                </div>

                {/* Step Indicator */}
                {step !== STEPS.SUCCESS && (
                    <div className="flex items-center justify-center gap-2 mb-8">
                        {[1, 2, 3].map((s) => (
                            <React.Fragment key={s}>
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${step >= s
                                            ? "bg-pink-600 text-white shadow-lg shadow-pink-500/30"
                                            : "bg-white/10 text-gray-500"
                                        }`}
                                >
                                    {step > s ? "✓" : s}
                                </div>
                                {s < 3 && (
                                    <div
                                        className={`w-12 h-0.5 transition-all duration-300 ${step > s ? "bg-pink-600" : "bg-white/10"
                                            }`}
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                )}

                {/* Form Card */}
                <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
                    {/* ─── Step 1: Email ─────────────────────────────────────── */}
                    {step === STEPS.EMAIL && (
                        <form onSubmit={handleSendOTP} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-xs text-white mb-2 uppercase tracking-wider">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your registered email"
                                    required
                                    className="w-full bg-transparent text-sm text-white border-b border-gray-500 focus:border-pink-500 py-3 outline-none transition-colors placeholder-gray-600"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3 bg-pink-600 hover:bg-pink-500 disabled:opacity-60 text-white font-bold rounded-xl transition-all shadow-lg"
                            >
                                {isLoading ? "Sending Code..." : "Send Verification Code →"}
                            </button>
                        </form>
                    )}

                    {/* ─── Step 2: OTP ───────────────────────────────────────── */}
                    {step === STEPS.OTP && (
                        <form onSubmit={handleVerifyOTP} className="space-y-6">
                            <div>
                                <label className="block text-xs text-white mb-4 uppercase tracking-wider text-center">
                                    Verification Code
                                </label>
                                <div className="flex gap-3 justify-center">
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            inputMode="numeric"
                                            value={digit}
                                            onChange={(e) => handleOtpChange(index, e.target.value)}
                                            onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                            ref={(el) => (otpRefs.current[index] = el)}
                                            maxLength={1}
                                            className="w-11 h-14 text-center text-white text-xl font-bold bg-white/10 border-2 border-white/20 focus:border-pink-500 rounded-xl outline-none transition-all"
                                        />
                                    ))}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3 bg-pink-600 hover:bg-pink-500 disabled:opacity-60 text-white font-bold rounded-xl transition-all shadow-lg"
                            >
                                {isLoading ? "Verifying..." : "Verify Code →"}
                            </button>

                            <p className="text-center text-gray-400 text-sm">
                                Didn't receive code?{" "}
                                <button
                                    type="button"
                                    onClick={() => { setOtp(["", "", "", "", "", ""]); setStep(STEPS.EMAIL); }}
                                    className="text-pink-400 hover:text-pink-300 font-semibold"
                                >
                                    Resend
                                </button>
                            </p>
                        </form>
                    )}

                    {/* ─── Step 3: New Password ──────────────────────────────── */}
                    {step === STEPS.NEW_PASSWORD && (
                        <form onSubmit={handleResetPassword} className="space-y-6">
                            <div>
                                <label htmlFor="password" className="block text-xs text-white mb-2 uppercase tracking-wider">
                                    New Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="At least 6 characters"
                                    required
                                    className="w-full bg-transparent text-sm text-white border-b border-gray-500 focus:border-pink-500 py-3 outline-none transition-colors placeholder-gray-600"
                                />
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="block text-xs text-white mb-2 uppercase tracking-wider">
                                    Confirm New Password
                                </label>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Repeat your new password"
                                    required
                                    className="w-full bg-transparent text-sm text-white border-b border-gray-500 focus:border-pink-500 py-3 outline-none transition-colors placeholder-gray-600"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3 bg-pink-600 hover:bg-pink-500 disabled:opacity-60 text-white font-bold rounded-xl transition-all shadow-lg"
                            >
                                {isLoading ? "Resetting..." : "Reset Password ✓"}
                            </button>
                        </form>
                    )}

                    {/* ─── Step 4: Success ───────────────────────────────────── */}
                    {step === STEPS.SUCCESS && (
                        <div className="text-center py-4 space-y-6">
                            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-4xl mx-auto">
                                ✓
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white mb-1">Password Reset!</h2>
                                <p className="text-gray-400 text-sm">
                                    Your password has been updated successfully. You can now log in with your new password.
                                </p>
                            </div>
                            <Link
                                to="/login"
                                className="inline-block w-full py-3 bg-pink-600 hover:bg-pink-500 text-white font-bold rounded-xl transition-all text-center"
                            >
                                Go to Login →
                            </Link>
                        </div>
                    )}
                </div>

                {/* Back to Login link */}
                {step !== STEPS.SUCCESS && (
                    <p className="text-center mt-6 text-sm text-gray-500">
                        Remember your password?{" "}
                        <Link to="/login" className="text-pink-400 hover:text-pink-300 font-semibold">
                            Back to Login
                        </Link>
                    </p>
                )}
            </div>
        </div>
    );
}

export default ForgotPassword;
