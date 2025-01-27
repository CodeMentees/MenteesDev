import { Router } from "express";
import { registerUser,authUser } from "../controllers/authController.js";
import passport from "passport";
import { googleCallback } from "../controllers/authController.js";
const authRouter = Router();

authRouter.post("/login", authUser);
authRouter.post("/register", registerUser);

authRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
authRouter.get("/google/callback", googleCallback);

export default authRouter;
