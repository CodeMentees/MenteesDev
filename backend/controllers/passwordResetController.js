import asyncHandler from "express-async-handler";
import nodemailer from "nodemailer";
import crypto from "crypto";
import PasswordReset from "../models/passwordResetModel.js";
import User from "../models/userModel.js";

// Create a nodemailer transporter:
// - If EMAIL_USER and EMAIL_PASS are configured → use Gmail
// - Otherwise → use Ethereal (free test SMTP, emails appear in console as a preview URL)
async function createTransporter() {
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        return nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    }

    // Fallback: Ethereal test account (no setup required)
    const testAccount = await nodemailer.createTestAccount();
    console.log("📧 Using Ethereal test email. Credentials:", testAccount.user, testAccount.pass);
    return nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    });
}

// Generate a random 6-digit OTP
const generateOTP = () => {
    return crypto.randomInt(100000, 999999).toString();
};

/**
 * POST /api/auth/forgot-password
 * Accepts user email, generates OTP, sends it via email
 */
export const sendResetCode = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: "No account found with this email" });
    }

    // Remove any existing reset requests for this email
    await PasswordReset.deleteMany({ email });

    const code = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await PasswordReset.create({ email, code, expiresAt });

    // Send email
    const transporter = await createTransporter();
    const info = await transporter.sendMail({
        from: `"CodeMentees" <${process.env.EMAIL_USER || "noreply@codementees.com"}>`,
        to: email,
        subject: "Your Password Reset Code - CodeMentees",
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px; background: #f9f9f9; border-radius: 12px;">
        <h2 style="color: #1a1a2e; margin-bottom: 8px;">Password Reset</h2>
        <p style="color: #555; margin-bottom: 24px;">Use the code below to reset your CodeMentees password. This code expires in <strong>10 minutes</strong>.</p>
        <div style="background: #1a1a2e; color: #ffffff; font-size: 36px; font-weight: bold; letter-spacing: 12px; text-align: center; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
          ${code}
        </div>
        <p style="color: #888; font-size: 13px;">If you did not request this, please ignore this email and your password will remain unchanged.</p>
      </div>
    `,
    });

    // If using Ethereal, print the preview URL to the console
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        const previewUrl = nodemailer.getTestMessageUrl(info);
        console.log("\n✅ OTP EMAIL SENT (Test Mode)");
        console.log("📧 Preview URL:", previewUrl);
        console.log("🔑 OTP Code:", code, "\n");
        return res.json({
            message: "Verification code sent! (Test Mode: check server console for the code and preview link)",
        });
    }

    res.json({ message: "Verification code sent to your email" });
});

/**
 * POST /api/auth/verify-reset-code
 * Validates OTP and marks it as verified, so the final reset step can proceed
 */
export const verifyResetCode = asyncHandler(async (req, res) => {
    const { email, code: reqCode, otp } = req.body;
    const code = reqCode || otp;

    if (!email || !code) {
        return res.status(400).json({ message: "Email and code are required" });
    }

    const resetEntry = await PasswordReset.findOne({ email });

    if (!resetEntry) {
        return res.status(400).json({ message: "No reset request found. Please request a new code." });
    }

    if (new Date() > resetEntry.expiresAt) {
        await PasswordReset.deleteMany({ email });
        return res.status(400).json({ message: "Verification code has expired. Please request a new one." });
    }

    if (resetEntry.code !== code) {
        return res.status(400).json({ message: "Invalid verification code" });
    }

    // Mark as verified
    resetEntry.verified = true;
    await resetEntry.save();

    res.json({ message: "Code verified successfully" });
});

/**
 * POST /api/auth/reset-password
 * Accepts new password and updates user's password in DB (only if OTP was verified)
 */
export const resetPassword = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and new password are required" });
    }

    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const resetEntry = await PasswordReset.findOne({ email, verified: true });

    if (!resetEntry) {
        return res.status(403).json({ message: "OTP not verified. Please complete verification first." });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // Update the password — pre-save hook will hash it
    user.password = password;
    await user.save();

    // Clean up the reset entry
    await PasswordReset.deleteMany({ email });

    res.json({ message: "Password reset successfully. You can now login with your new password." });
});
