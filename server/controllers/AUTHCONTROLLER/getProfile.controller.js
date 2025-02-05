import User from "../../models/User.js";
import Post from "../../models/Post.js";
import Comment from "../../models/Comment.js";
import { sendResponse } from "../../utils/responseUtils.js";
import { formatDate } from "../../utils/dateUtils.js";

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch user details
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
      })
      .populate("followers", "username profilePicture")
      .populate("following", "username profilePicture")
      .lean();

    if (!user) return sendResponse(res, 404, "User not found");

    // Fetch user's own posts
    const userPosts = await Post.find({ author: userId })
      .select("content createdAt likes image")
      .populate({ path: "author", select: "username" })
      .lean();

    // Count comments for each post
    const postsWithCommentCount = await Promise.all(
      userPosts.map(async (post) => {
        const commentCount = await Comment.countDocuments({ post: post._id });
        return {
          ...post,
          commentCount,
          createdAt: formatDate(post.createdAt),
        };
      })
    );

    // Send response with user details and posts
    sendResponse(res, 200, "Profile fetched successfully", {
      user,
      posts: postsWithCommentCount,
    });
  } catch (error) {
    sendResponse(res, 500, "Error retrieving profile", error);
  }
};
