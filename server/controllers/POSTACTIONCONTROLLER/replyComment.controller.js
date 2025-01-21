import Reply from "../../models/Reply.js";
import Comment from "../../models/Comment.js";
import Notification from "../../models/Notification.js";
import { sendResponse } from "../../utils/responseUtils.js";
import { formatDate } from "../../utils/dateUtils.js";

export const replyComment = async (req, res) => {
  try {
    const { content, parentCommentId, parentReplyId } = req.body;
    const userId = req.user?.id;

    if (!userId) return sendResponse(res, 401, "User not authenticated");
    if (!content) return sendResponse(res, 400, "Content is required");

    let parentAuthorId;
    if (parentCommentId) {
      const parentComment = await Comment.findById(parentCommentId);
      if (!parentComment)
        return sendResponse(res, 404, "Parent comment not found");
      parentAuthorId = parentComment.author;
    } else if (parentReplyId) {
      const parentReply = await Reply.findById(parentReplyId);
      if (!parentReply) return sendResponse(res, 404, "Parent reply not found");
      parentAuthorId = parentReply.author;
    } else {
      return sendResponse(
        res,
        400,
        "Either parentCommentId or parentReplyId is required"
      );
    }

    const newReply = await Reply.create({
      content,
      author: userId,
      parentCommentId: parentCommentId || null,
      parentReplyId: parentReplyId || null,
    });

    const formattedReply = {
      ...newReply.toObject(),
      createdAt: formatDate(newReply.createdAt),
      updatedAt: formatDate(newReply.updatedAt),
    };

    // Create notification
    await Notification.create({
      user: parentAuthorId,
      type: "reply",
      message: `You have a new reply from ${req.user.username}.`,
    });

    sendResponse(res, 201, "Reply created successfully", formattedReply);
  } catch (error) {
    console.error("Error creating reply:", error);
    sendResponse(res, 500, "Server error");
  }
};
