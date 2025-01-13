import jwt from "jsonwebtoken";

// jwtUtils.js
export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};
