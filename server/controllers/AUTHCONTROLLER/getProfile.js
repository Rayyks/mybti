import User from "../../models/User.js";
import Post from "../../models/Post.js";
import { sendResponse } from "../../utils/responseUtils.js";
import { formatDate } from "../../utils/dateUtils.js";

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId)
      .select("-password")
      .populate({
        path: "commentedPosts",
        select: "content createdAt author image",
        populate: { path: "author", select: "username" },
      })
      .populate({
        path: "savedPosts",
        select: "content createdAt author image",
        populate: { path: "author", select: "username" },
      });

    if (!user) return sendResponse(res, 404, "User not found");

    const formattedUser = {
      ...user.toObject(),
      commentedPosts: user.commentedPosts.map((post) => ({
        ...post.toObject(),
        createdAt: formatDate(post.createdAt),
      })),
      savedPosts: user.savedPosts.map((post) => ({
        ...post.toObject(),
        createdAt: formatDate(post.createdAt),
      })),
      createdAt: formatDate(user.createdAt),
      updatedAt: formatDate(user.updatedAt),
    };

    sendResponse(res, 200, "Profile fetched successfully", formattedUser);
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, "Server error");
  }
};
