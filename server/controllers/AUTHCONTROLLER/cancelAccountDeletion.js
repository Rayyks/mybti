// /controllers/AUTHCONTROLLEr/cancelAccountDeletion.js
import User from "../../models/User.js";
import { sendResponse } from "../../utils/responseUtils.js";

export const cancelAccountDeletion = async (req, res) => {
  const userId = req.user.id; // Extract user ID from JWT token

  try {
    // Find user
    const user = await User.findById(userId);
    if (!user) return sendResponse(res, 404, "User not found");

    // Cancel deletion by removing the scheduled deletion date
    user.deletionScheduledAt = null;
    await user.save();

    sendResponse(res, 200, "Account deletion cancelled");
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, "Server error");
  }
};
