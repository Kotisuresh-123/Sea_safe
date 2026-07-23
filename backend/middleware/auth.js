import jwt from "jsonwebtoken";
import User from "../models/User.js";

const ADMIN_EMAIL = "umakrishnakanthchokkapu15@gmail.com";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    return next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Not authorized",
    });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user && req.user.email === ADMIN_EMAIL) {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: "Admin access required",
  });
};