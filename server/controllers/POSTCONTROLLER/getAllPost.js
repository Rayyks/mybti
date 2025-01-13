import Post from "../../models/Post.js";
import User from "../../models/User.js";
import { sendResponse } from "../../utils/responseUtils.js";
import { formatDate } from "../../utils/dateUtils.js";

export const getAllPost = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const userId = req.user.id;

    // Get the list of followed users
    const user = await User.findById(userId).populate("following");
    const followedUserIds = user.following.map((user) => user._id);

    // Get posts from followed users
    const followedPosts = await Post.find({ author: { $in: followedUserIds } })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    // Get remaining posts
    const remainingLimit = limit - followedPosts.length;
    const otherPosts = await Post.find({ author: { $nin: followedUserIds } })
      .sort({ createdAt: -1 })
      .skip((page - 1) * remainingLimit)
      .limit(parseInt(remainingLimit));

    const posts = [...followedPosts, ...otherPosts];

    const formattedPosts = posts.map((post) => ({
      ...post.toObject(),
      createdAt: formatDate(post.createdAt),
      updatedAt: formatDate(post.updatedAt),
    }));

    sendResponse(res, 200, "Posts fetched successfully", formattedPosts);
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, "Server error");
  }
};
