import User from "../../models/User.js";
import Post from "../../models/Post.js";
import { sendResponse } from "../../utils/responseUtils.js";

export const savePost = async (req, res) => {
  const { postId } = req.body;
  const userId = req.user.id;
  try {
    const post = await Post.findById(postId);
    if (!post) return sendResponse(res, 404, "Post not found.");
    const user = await User.findById(userId);
    const isSaved = user.savedPosts.includes(postId);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        [isSaved ? "$pull" : "$addToSet"]: { savedPosts: postId },
      },
      { new: true }
    ).select("-password");
    const message = isSaved
      ? "Post unsaved successfully."
      : "Post saved successfully.";
    sendResponse(res, 200, message, {
      savedPosts: updatedUser.savedPosts,
    });
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, "Server error. Please try again later.");
  }
};
