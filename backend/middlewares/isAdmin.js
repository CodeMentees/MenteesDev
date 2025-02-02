//isAdmin middleware
const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(401).send({"message":"user is not admin",data:null});
    throw new Error("Not authorized as an admin");
  }
};
export default isAdmin;
