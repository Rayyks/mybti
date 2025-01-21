import User from "../../models/User.js";
import { sendResponse } from "../../utils/responseUtils.js";

export const unFollowUser = async (req, res) => {
  try {
    const { userIdToUnfollow } = req.body; // User to unfollow
    const followerId = req.user?.id; // The user who is unfollowing

    // Validate input
    if (!userIdToUnfollow) {
      return sendResponse(res, 400, "User to unfollow is required.");
    }

    if (userIdToUnfollow === followerId) {
      return sendResponse(res, 400, "You cannot unfollow yourself.");
    }

    // Ensure the user exists
    const userToUnfollow = await User.findById(userIdToUnfollow);
    if (!userToUnfollow) {
      return sendResponse(res, 404, "User not found.");
    }

    // Check if the user is already not following
    if (!userToUnfollow.followers.includes(followerId)) {
      return sendResponse(res, 400, "You are not following this user.");
    }

    // Remove the follower from the user's followers list
    userToUnfollow.followers = userToUnfollow.followers.filter(
      (follower) => follower.toString() !== followerId.toString()
    );
    await userToUnfollow.save();

    // Remove the user from the followers list of the follower
    const follower = await User.findById(followerId);
    follower.following = follower.following.filter(
      (following) => following.toString() !== userIdToUnfollow.toString()
    );
    await follower.save();

    sendResponse(res, 200, "User unfollowed successfully.");
  } catch (error) {
    console.error("Error unfollowing user:", error);
    sendResponse(res, 500, "Server error");
  }
};
