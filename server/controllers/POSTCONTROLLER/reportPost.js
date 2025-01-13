import Report from "../../models/Report.js";
import Post from "../../models/Post.js";
import { sendResponse } from "../../utils/responseUtils.js";

export const reportPost = async (req, res) => {
  try {
    const { postId, reason } = req.body;
    const reporterId = req.user?.id;

    // Validate the input
    if (!postId || !reason) {
      return sendResponse(res, 400, "Post ID and reason are required.");
    }

    // Check if the post exists
    const postToReport = await Post.findById(postId);
    if (!postToReport) {
      return sendResponse(res, 404, "Post not found.");
    }

    // Create the report document
    const newReport = await Report.create({
      reportedBy: reporterId,
      targetType: "post",
      targetId: postId,
      reason,
    });

    sendResponse(res, 201, "Post reported successfully.", newReport);
  } catch (error) {
    console.error("Error reporting post:", error);
    sendResponse(res, 500, "Server error");
  }
};
