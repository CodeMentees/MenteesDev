import jwt from "jsonwebtoken"

// Admin roles that are allowed access through this middleware
const ADMIN_ROLES = ["super admin", "editor", "instructor", "intern"];

const isAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }
    const decode = await jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }

    // HIGH-2 Fix: check role explicitly — do NOT rely on the legacy isAdmin flag alone
    if (!ADMIN_ROLES.includes(decode.role)) {
      return res.status(403).json({
        message: "User is not authorized as an admin",
        success: false,
      });
    }
    req.userId = decode._id;
    next();
  } catch (error) {
    console.error("isAdmin middleware error:", error.message);
    next(error);
  }
};

export default isAdmin;