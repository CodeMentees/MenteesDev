import jwt from 'jsonwebtoken';

const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.email === process.env.ADMIN_EMAIL,
      role: user.role,
      isFullAccess: user.isFullAccess || false,
    },
    process.env.JWT_SECRET
    );
}

export default generateToken;