import Report from "../../models/Report.js";
import Comment from "../../models/Comment.js";
import Reply from "../../models/Reply.js";
import { sendResponse } from "../../utils/responseUtils.js";

export const reportComment = async (req, res) => {
  try {
    const { commentId, reason } = req.body;
    const reporterId = req.user?.id;

    // Validate input
    if (!commentId || !reason) {
      return sendResponse(res, 400, "Comment ID and reason are required.");
    }

    // Check if the comment exists
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return sendResponse(res, 404, "Comment not found.");
    }

    // Create the report document
    const newReport = await Report.create({
      reportedBy: reporterId,
      targetType: "comment",
      targetId: commentId,
      reason,
    });

    sendResponse(res, 201, "Comment reported successfully.", newReport);
  } catch (error) {
    console.error("Error reporting comment:", error);
    sendResponse(res, 500, "Server error");
  }
};

export const reportReply = async (req, res) => {
  try {
    const { replyId, reason } = req.body;
    const reporterId = req.user?.id;

    // Validate input
    if (!replyId || !reason) {
      return sendResponse(res, 400, "Reply ID and reason are required.");
    }

    // Check if the reply exists
    const reply = await Reply.findById(replyId);
    if (!reply) {
      return sendResponse(res, 404, "Reply not found.");
    }

    // Create the report document
    const newReport = await Report.create({
      reportedBy: reporterId,
      targetType: "reply",
      targetId: replyId,
      reason,
    });

    sendResponse(res, 201, "Reply reported successfully.", newReport);
  } catch (error) {
    console.error("Error reporting reply:", error);
    sendResponse(res, 500, "Server error");
  }
};
