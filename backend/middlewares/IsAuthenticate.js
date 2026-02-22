import jwt from "jsonwebtoken"

//isAuthenticated middleware
const isAuthenticated = async (req, res, next) => {
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
    req.userId = decode._id;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export default isAuthenticated;
