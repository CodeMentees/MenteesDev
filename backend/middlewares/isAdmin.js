import jwt from "jsonwebtoken"

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

    if (!decode.isAdmin) {
      return res.status(401).json({
        message: "User is not authorized as an admin",
        success: false,
      });
    }
    req.userId = decode._id;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default isAdmin;