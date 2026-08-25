import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import { OAuth2Client } from "google-auth-library";
import asyncHandler from "express-async-handler";
import crypto from "crypto";
import { sendVerificationOTP } from "../utils/emailService.js";

const client = new OAuth2Client();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: API for user authentication and management
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               credential:
 *                 type: string
 *               client_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: User already exists or invalid data
 */
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phoneNumber, credential, client_id } = req.body;
  let user;

  if (credential) {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: client_id,
    });
    const payload = ticket.getPayload();
    const { email, given_name, family_name } = payload;

    user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    user = await User.create({ email, name: `${given_name} ${family_name}`, phoneNumber });
  } else {
    user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user = await User.create({ name, email, password, phoneNumber, verificationOTP: otp, otpExpiresAt, isVerified: false });

    // Send verification OTP
    try {
      await sendVerificationOTP(email, otp);
    } catch (error) {
      console.error("Error sending verification OTP:", error);
      // Delete the unverified user if email fails to prevent "ghost" accounts
      await User.deleteOne({ _id: user._id });
      return res.status(500).json({ 
        message: "Failed to send verification email. Please check your email configuration or try again later.",
        error: error.message 
      });
    }
  }

  res.status(201).json({
    message: "Verification code has been sent to your email.",
    email: email // Send email back so frontend can use it
  });
});

/**
 * POST /api/auth/verify-otp
 * Verifies user's email using the 6-digit OTP
 */
export const verifyOTP = asyncHandler(async (req, res) => {
  const { email, otp: reqOtp, code } = req.body;
  const otp = reqOtp || code;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and code are required" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.isVerified) {
    return res.status(400).json({ message: "Email is already verified" });
  }

  if (!user.verificationOTP || user.verificationOTP !== otp) {
    return res.status(400).json({ message: "Invalid verification code" });
  }

  if (new Date() > user.otpExpiresAt) {
    return res.status(400).json({ message: "Verification code has expired. Please request a new one." });
  }

  user.isVerified = true;
  user.verificationOTP = undefined;
  user.otpExpiresAt = undefined;
  await user.save();

  res.json({ message: "Email verified successfully! You can now log in." });
});

/**
 * POST /api/auth/resend-otp
 * Resends a new 6-digit OTP to the user
 */
export const resendOTP = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.isVerified) {
    return res.status(400).json({ message: "Email is already verified" });
  }

  const otp = crypto.randomInt(100000, 999999).toString();
  const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  user.verificationOTP = otp;
  user.otpExpiresAt = otpExpiresAt;
  await user.save();

  try {
    await sendVerificationOTP(email, otp);
    res.json({ message: "A new verification code has been sent to your email." });
  } catch (error) {
    console.error("Error resending OTP:", error);
    res.status(500).json({ message: "Failed to send verification code. Please try again later." });
  }
});

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Authenticate user and return token
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               credential:
 *                 type: string
 *               client_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *       401:
 *         description: Invalid email or password
 *       404:
 *         description: User not found
 */
export const authUser = asyncHandler(async (req, res) => {
  const { email, password, credential, client_id, remember_me } = req.body;

  let user;
  if (credential) {
    const ticket = await client.verifyIdToken({ idToken: credential, audience: client_id });
    const payload = ticket.getPayload();
    user = await User.findOne({ email: payload.email });

    // Auto-register via Google if user does not exist
    if (!user) {
      const { email, given_name, family_name } = payload;
      user = await User.create({ email, name: `${given_name || ''} ${family_name || ''}`.trim() || 'Google User' });
    }
  } else {
    user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (!user.isVerified && user.email !== process.env.ADMIN_EMAIL) {
      return res.status(401).json({ message: "Please verify your email address before logging in.", email: user.email, needsVerification: true });
    }
  }

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  const expiresInDays = remember_me ? 30 : 1;
  const cookieMaxAge = expiresInDays * 24 * 60 * 60 * 1000;
  const tokenExpiresIn = `${expiresInDays}d`;
  const token = generateToken(user, tokenExpiresIn);

  res.cookie("token", token, { maxAge: cookieMaxAge, httpOnly: true })
    .json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isFullAccess: user.isFullAccess,
      token: token,
      message: "User signed in successfully",
    });
});

/**
 * @swagger
 * /api/users/google/callback:
 *   get:
 *     summary: Google OAuth callback endpoint
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Google callback successful
 */
export const googleCallback = asyncHandler(async (req, res) => {
  res.json({ message: "Google callback successful" });
});

/**
 * @swagger
 * /api/users/logout:
 *   post:
 *     summary: Logout user and clear jwt cookie
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Logged out successfully
 */
export const logoutUser = (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};
