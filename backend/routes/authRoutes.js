import { Router } from "express";
import { registerUser, authUser, logoutUser } from "../controllers/authController.js";
import { sendResetCode, verifyResetCode, resetPassword } from "../controllers/passwordResetController.js";
import passport from "passport";
import { googleCallback } from "../controllers/authController.js";
const authRouter = Router();

authRouter.post("/login", authUser);
authRouter.post("/register", registerUser);
authRouter.post("/logout", logoutUser);

authRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
authRouter.get("/google/callback", googleCallback);

// Password reset routes
authRouter.post("/forgot-password", sendResetCode);
authRouter.post("/verify-otp", verifyResetCode);
authRouter.post("/reset-password", resetPassword);

export default authRouter;
