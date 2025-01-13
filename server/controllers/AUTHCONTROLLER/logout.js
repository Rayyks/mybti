// /controllers/AUTHCONTROLLEr/logout.js
import jwt from "jsonwebtoken";
import Blacklist from "../../models/Blacklist.js";
import { sendResponse } from "../../utils/responseUtils.js";

export const logoutUser = async (req, res) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return sendResponse(res, 400, "No token provided");
    }

    // Decode the token to get the expiration time
    const decodedToken = jwt.decode(token);
    if (!decodedToken) {
      return sendResponse(res, 400, "Invalid token");
    }

    const { exp } = decodedToken;
    const expiredAt = new Date(exp * 1000);

    // Store the token in the blacklist collection with the expiration time
    const blacklistedToken = new Blacklist({ token, expiredAt });
    await blacklistedToken.save();

    sendResponse(res, 200, "Logout successful");
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, "Server error");
  }
};
