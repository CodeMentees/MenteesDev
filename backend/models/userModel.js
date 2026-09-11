import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: String,

    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      default: null,
    },

    // Social login provider IDs
    googleId: {
      type: String,
      sparse: true,
    },

    githubId: {
      type: String,
      sparse: true,
    },

    linkedinId: {
      type: String,
      sparse: true,
    },

    isAdmin: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },

    role: {
      type: String,
      enum: [
        "super admin",
        "editor",
        "instructor",
        "intern",
        "viewer",
        "student",
      ],
      default: "student",
    },

    isFullAccess: { type: Boolean, default: false },

    permissions: [{ type: String }],

    phoneNumber: String,

    verificationOTP: String,
    otpExpiresAt: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  try {
    // Do not hash a password that wasn't changed
    if (!this.isModified("password")) {
      return next();
    }

    // Social accounts have no password
    if (!this.password) {
      return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  try {
    if (!this.password) {
      return false;
    }

    return await bcrypt.compare(enteredPassword, this.password);
  } catch (error) {
    throw new Error("Password comparison failed");
  }
};

const User = mongoose.model("User", userSchema);

export default User;