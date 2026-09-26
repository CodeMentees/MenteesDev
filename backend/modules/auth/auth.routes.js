import { Router } from "express";
import { registerUser, authUser, logoutUser, verifyOTP, resendOTP } from "../controllers/authController.js";
import { sendResetCode, verifyResetCode, resetPassword } from "../controllers/passwordResetController.js";
import passport from "passport";
import { googleCallback } from "../controllers/authController.js";
import rateLimit from "express-rate-limit";

// Strict limiter: 10 attempts per 15 minutes (login, OTP, password reset)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: "Too many attempts. Please try again in 15 minutes." },
  standardHeaders: true,
  legacyHeaders: false,
});

// Slightly looser for register (allow a few more)
const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: { message: "Too many registration attempts. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

const authRouter = Router();

authRouter.post("/login", authLimiter, authUser);
authRouter.post("/register", registerLimiter, registerUser);
authRouter.post("/verify-otp", authLimiter, verifyOTP);
authRouter.post("/resend-otp", authLimiter, resendOTP);
authRouter.get("/verify-email", (req, res) => res.status(410).json({ message: "This verification method is no longer supported. Please use the OTP sent to your email." }));
authRouter.post("/logout", logoutUser);

authRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
authRouter.get("/google/callback", googleCallback);

// Password reset routes (rate limited)
authRouter.post("/forgot-password", authLimiter, sendResetCode);
authRouter.post("/verify-reset-code", authLimiter, verifyResetCode);
authRouter.post("/reset-password", authLimiter, resetPassword);

export default authRouter;
