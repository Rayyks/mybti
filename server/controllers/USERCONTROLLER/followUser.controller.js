import User from "../../models/User.js";
import Notification from "../../models/Notification.js";
import { sendResponse } from "../../utils/responseUtils.js";

export const followUser = async (req, res) => {
  try {
    const { userIdToFollow } = req.body;
    const followerId = req.user?.id;

    if (!userIdToFollow) {
      return sendResponse(res, 400, "User to follow is required.");
    }

    if (userIdToFollow === followerId) {
      return sendResponse(res, 400, "You cannot follow yourself.");
    }

    const userToFollow = await User.findById(userIdToFollow);
    if (!userToFollow) {
      return sendResponse(res, 404, "User not found.");
    }

    if (userToFollow.followers.includes(followerId)) {
      return sendResponse(res, 400, "You are already following this user.");
    }

    userToFollow.followers.push(followerId);
    await userToFollow.save();

    const follower = await User.findById(followerId);
    follower.following.push(userIdToFollow);
    await follower.save();

    // Create notification
    await Notification.create({
      user: userIdToFollow,
      type: "follow",
      message: `${follower.username} started following you.`,
    });

    sendResponse(res, 200, "User followed successfully.");
  } catch (error) {
    console.error("Error following user:", error);
    sendResponse(res, 500, "Server error");
  }
};
