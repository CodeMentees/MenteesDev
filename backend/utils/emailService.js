import nodemailer from "nodemailer";

/**
 * Create a nodemailer transporter:
 * - If EMAIL_USER and EMAIL_PASS are configured → use Gmail
 * - Otherwise → use Ethereal (free test SMTP)
 */
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

  // Fallback: Ethereal test account
  const testAccount = await nodemailer.createTestAccount();
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

/**
 * Send a 6-digit verification code to the user's email
 */
export const sendVerificationOTP = async (email, otp) => {
  const transporter = await createTransporter();

  try {
    const info = await transporter.sendMail({
      from: `"CodeMentees" <${process.env.EMAIL_USER || "noreply@codementees.com"}>`,
      to: email,
      subject: "Your Verification Code - CodeMentees",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px; background: #f9f9f9; border-radius: 12px; border: 1px solid #e0e0e0; text-align: center;">
          <h2 style="color: #1a1a2e; margin-bottom: 16px;">Email Verification</h2>
          <p style="color: #555; margin-bottom: 24px; line-height: 1.5;">Thank you for joining CodeMentees! Use the verification code below to activate your account. This code is valid for <strong>10 minutes</strong>.</p>
          <div style="background: #1a1a2e; color: #ffffff; font-size: 36px; font-weight: bold; letter-spacing: 12px; text-align: center; padding: 20px; border-radius: 8px; margin-bottom: 24px; display: inline-block; width: 80%;">
            ${otp}
          </div>
          <p style="color: #888; font-size: 13px;">If you did not request this, please ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;">
          <p style="color: #888; font-size: 12px;">© ${new Date().getFullYear()} CodeMentees. All rights reserved.</p>
        </div>
      `,
    });

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      const previewUrl = nodemailer.getTestMessageUrl(info);
      console.log("\n✅ VERIFICATION OTP SENT (Test Mode)");
      console.log("📧 Preview URL:", previewUrl);
      console.log("🔑 OTP Code:", otp, "\n");
    }
  } catch (error) {
    if (error.code === 'EAUTH') {
      console.error("\n❌ EMAIL AUTHENTICATION FAILED");
      console.error("Please ensure your EMAIL_USER and EMAIL_PASS (App Password) are correct in .env\n");
    }
    throw error; // Re-throw to be handled by the controller
  }
};

export default createTransporter;
