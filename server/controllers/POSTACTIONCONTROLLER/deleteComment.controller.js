import Comment from "../../models/Comment.js";

import { sendResponse } from "../../utils/responseUtils.js";

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.id;

    const comment = await Comment.findById(commentId);
    if (!comment) return sendResponse(res, 404, "Comment not found");

    // Only allow the author to delete
    if (comment.author.toString() !== userId) {
      return sendResponse(res, 403, "Unauthorized to delete this comment");
    }

    // Delete comment (this also deletes all replies)
    await Comment.deleteMany({
      $or: [{ _id: commentId }, { parentComment: commentId }],
    });

    sendResponse(res, 200, "Comment deleted successfully");
  } catch (error) {
    console.error("Error deleting comment:", error);
    sendResponse(res, 500, "Server error");
  }
};
