import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  isAdmin: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  isVerified: { type: Boolean, default: false },
  role: { type: String, default: "viewer" },
  isFullAccess: { type: Boolean, default: false },
  phoneNumber: String,
  verificationOTP: String,
  otpExpiresAt: Date,
}, { timestamps: true });

userSchema.pre("save", async function (next) {
  try {
    // If the password is not modified, skip the hashing process
    if (!this.isModified("password")) {
      return next();
    }

    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error); // Pass any errors to the next middleware
  }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  try {
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (error) {
    throw new Error("Password comparison failed");
  }
};

const User = mongoose.model("User", userSchema);

export default User;
