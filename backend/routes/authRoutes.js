import { Router } from "express";
import { registerUser, authUser, logoutUser, verifyOTP, resendOTP } from "../controllers/authController.js";
import { sendResetCode, verifyResetCode, resetPassword } from "../controllers/passwordResetController.js";
import passport from "passport";
import { googleCallback } from "../controllers/authController.js";
const authRouter = Router();

authRouter.post("/login", authUser);
authRouter.post("/register", registerUser);
authRouter.post("/verify-otp", verifyOTP);
authRouter.post("/resend-otp", resendOTP);
authRouter.get("/verify-email", (req, res) => res.status(410).json({ message: "This verification method is no longer supported. Please use the OTP sent to your email." }));
authRouter.post("/logout", logoutUser);

authRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
authRouter.get("/google/callback", googleCallback);

// Password reset routes
authRouter.post("/forgot-password", sendResetCode);
authRouter.post("/verify-reset-code", verifyResetCode);
authRouter.post("/reset-password", resetPassword);

export default authRouter;
