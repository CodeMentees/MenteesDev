import { Router } from "express";

import {
  registerUser,
  authUser,
  logoutUser,
  verifyOTP,
  resendOTP,
  googleCallback,
} from "../controllers/authController.js";

import {
  sendResetCode,
  verifyResetCode,
  resetPassword,
} from "../controllers/passwordResetController.js";

import passport from "passport";

import {
  githubCallback,
  linkedinLogin,
  linkedinCallback,
} from "../controllers/socialauthcontroller.js";

import rateLimit from "express-rate-limit";

// Strict limiter: 10 attempts per 15 minutes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    message: "Too many attempts. Please try again in 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Register limiter
const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: {
    message: "Too many registration attempts. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const authRouter = Router();

// ----------------------------------------------------
// Normal authentication
// ----------------------------------------------------

authRouter.post("/login", authLimiter, authUser);

authRouter.post("/register", registerLimiter, registerUser);

authRouter.post("/verify-otp", authLimiter, verifyOTP);

authRouter.post("/resend-otp", authLimiter, resendOTP);

authRouter.get("/verify-email", (req, res) =>
  res.status(410).json({
    message:
      "This verification method is no longer supported. Please use the OTP sent to your email.",
  })
);

authRouter.post("/logout", logoutUser);

// ----------------------------------------------------
// Google Login
// ----------------------------------------------------

authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

authRouter.get(
  "/google/callback",
  googleCallback
);

// ----------------------------------------------------
// GitHub Login
// ----------------------------------------------------

authRouter.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user:email"],
  })
);

authRouter.get(
  "/github/callback",
  passport.authenticate("github", {
    session: false,
    failureRedirect:
      "/api/auth/login?error=github_login_failed",
  }),
  githubCallback
);

// ----------------------------------------------------
// LinkedIn Login
// ----------------------------------------------------

authRouter.get(
  "/linkedin",
  linkedinLogin
);

authRouter.get(
  "/linkedin/callback",
  linkedinCallback
);

// ----------------------------------------------------
// Password Reset
// ----------------------------------------------------

authRouter.post(
  "/forgot-password",
  authLimiter,
  sendResetCode
);

authRouter.post(
  "/verify-reset-code",
  authLimiter,
  verifyResetCode
);

authRouter.post(
  "/reset-password",
  authLimiter,
  resetPassword
);

export default authRouter;