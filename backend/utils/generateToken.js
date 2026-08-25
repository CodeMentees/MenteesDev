import jwt from 'jsonwebtoken';

const generateToken = (user, expiresIn = '1d') => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      role: user.role,
      isFullAccess: user.isFullAccess || false,
    },
    process.env.JWT_SECRET,
    { expiresIn }
    );
}

export default generateToken;