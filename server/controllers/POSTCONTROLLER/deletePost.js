import Post from "../../models/Post.js";
import { sendResponse } from "../../utils/responseUtils.js";

export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    const post = await Post.findOneAndDelete({ _id: postId, author: userId });

    if (!post) return sendResponse(res, 404, "Post not found or unauthorized");

    sendResponse(res, 200, "Post deleted successfully");
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, "Server error");
  }
};
