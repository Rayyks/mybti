import Comment from "../../models/Comment.js";
import Reply from "../../models/Reply.js";
import { sendResponse } from "../../utils/responseUtils.js";
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.id;

    // Find the comment by ID and ensure the user is the author
    const comment = await Comment.findOne({ _id: commentId, author: userId });
    if (!comment)
      return sendResponse(res, 404, "Comment not found or unauthorized");

    // Delete the comment
    await Comment.deleteOne({ _id: commentId });

    sendResponse(res, 200, "Comment deleted successfully");
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, "Server error");
  }
};

export const deleteReply = async (req, res) => {
  try {
    const { replyId } = req.params;
    const userId = req.user.id;

    // Find the reply by ID and ensure the user is the author
    const reply = await Reply.findOne({ _id: replyId, author: userId });
    if (!reply) {
      return sendResponse(res, 404, "Reply not found or unauthorized");
    }

    // Use deleteOne to remove the reply
    await Reply.deleteOne({ _id: replyId });

    sendResponse(res, 200, "Reply deleted successfully");
  } catch (error) {
    console.error("Error deleting reply:", error);
    sendResponse(res, 500, "Server error");
  }
};
