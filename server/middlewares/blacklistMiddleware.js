// /middlewares/blacklistMiddleware.js
import Blacklist from "../models/Blacklist.js";
import { sendResponse } from "../utils/responseUtils.js";

export const checkBlacklist = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from Authorization header

  if (!token) {
    return sendResponse(res, 401, "No token provided");
  }

  try {
    // Check if the token is blacklisted
    const blacklistedToken = await Blacklist.findOne({ token });

    if (blacklistedToken) {
      // If token is found, it means it is blacklisted
      return sendResponse(res, 401, "Token is blacklisted");
    }

    next(); // Token is not blacklisted, proceed with the request
  } catch (err) {
    console.error(err);
    sendResponse(res, 500, "Internal server error");
  }
};
