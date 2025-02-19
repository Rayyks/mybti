import User from "../../models/User.js";
import { sendResponse } from "../../utils/responseUtils.js";

export const removeFollower = async (req, res) => {
  try {
    const { followerId } = req.body;
    const userId = req.user?.id;

    if (!followerId) {
      return sendResponse(res, 400, "Follower ID is required.");
    }

    const user = await User.findById(userId);
    if (!user) {
      return sendResponse(res, 404, "User not found.");
    }

    const follower = await User.findById(followerId);
    if (!follower) {
      return sendResponse(res, 404, "Follower not found.");
    }

    // Remove followerId from user's followers list
    user.followers = user.followers.filter(
      (id) => id.toString() !== followerId
    );
    await user.save();

    sendResponse(res, 200, "Follower removed successfully.");
  } catch (error) {
    console.error("Error removing follower:", error);
    sendResponse(res, 500, "Server error");
  }
};
