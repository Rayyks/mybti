import Comment from "../../models/Comment.js";

import { sendResponse } from "../../utils/responseUtils.js";

export const unlikeComment = async (req, res) => {
  try {
    const { commentId } = req.body;
    const userId = req.user.id;

    // Find the comment by ID
    const comment = await Comment.findById(commentId);
    if (!comment) return sendResponse(res, 404, "Comment not found");

    // Remove user from likes array if already liked
    const index = comment.likes.indexOf(userId);
    if (index !== -1) {
      comment.likes.splice(index, 1);
      await comment.save();
    }

    sendResponse(res, 200, "Comment unliked successfully", {
      likes: comment.likes.length,
    });
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, "Server error");
  }
};
