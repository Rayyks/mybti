import Comment from "../../models/Comment.js";
import Notification from "../../models/Notification.js";
import { sendResponse } from "../../utils/responseUtils.js";

export const likeComment = async (req, res) => {
  try {
    const { commentId } = req.body;
    const userId = req.user.id;

    const comment = await Comment.findById(commentId);
    if (!comment) return sendResponse(res, 404, "Comment not found");

    if (!comment.likes.includes(userId)) {
      comment.likes.push(userId);
      await comment.save();
    }

    // Create notification
    await Notification.create({
      user: comment.author,
      type: "like",
      message: `Your comment was liked by ${req.user.username}.`,
    });

    sendResponse(res, 200, "Comment liked successfully", {
      likes: comment.likes.length,
    });
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, "Server error");
  }
};
