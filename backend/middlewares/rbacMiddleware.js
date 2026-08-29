import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

/**
 * Middleware to check if the authenticated user has at least one of the required permissions.
 * @param {Array|String} requiredPermissions - A single permission string or an array of permission strings.
 */
export const requirePermission = (requiredPermissions) => {
  return async (req, res, next) => {
    try {
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({
          message: "User not authenticated",
          success: false,
        });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded) {
        return res.status(401).json({
          message: "Invalid token",
          success: false,
        });
      }

      // Fetch the latest user from DB to get up-to-date permissions
      // Support both decode._id and decode.id (depending on token signing)
      const userId = decoded._id || decoded.id;
      const user = await User.findById(userId).select("permissions role");
      if (!user) {
        return res.status(401).json({
          message: "User no longer exists",
          success: false,
        });
      }

      // Super admins always have full access
      if (user.role === "super admin") {
        req.userId = user._id;
        req.userPermissions = user.permissions;
        return next();
      }

      // Format to array
      const permissionsToCheck = Array.isArray(requiredPermissions) 
        ? requiredPermissions 
        : [requiredPermissions];

      // Check if user has AT LEAST ONE of the required permissions
      const hasPermission = permissionsToCheck.some(p => user.permissions.includes(p));

      if (!hasPermission) {
        return res.status(403).json({
          message: "You do not have permission to perform this action",
          success: false,
        });
      }

      req.userId = user._id;
      req.userPermissions = user.permissions;
      next();
    } catch (error) {
      console.error("RBAC Middleware Error:", error);
      res.status(401).json({
        message: "Authentication failed",
        success: false,
      });
    }
  };
};
