import Post from "../../models/Post.js";
import { sendResponse } from "../../utils/responseUtils.js";
import { formatDate } from "../../utils/dateUtils.js";

export const getFollowingPost = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("following");
    if (!user) return sendResponse(res, 404, "User not found");

    const posts = await Post.find({ user: { $in: user.following } }).sort({
      createdAt: -1,
    });

    const formattedPosts = posts.map((post) => ({
      ...post.toObject(),
      createdAt: formatDate(post.createdAt),
      updatedAt: formatDate(post.updatedAt),
    }));

    sendResponse(
      res,
      200,
      "Following posts fetched successfully",
      formattedPosts
    );
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, "Server error");
  }
};
