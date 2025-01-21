import Report from "../../models/Report.js";
import User from "../../models/User.js";
import { sendResponse } from "../../utils/responseUtils.js";

export const reportUser = async (req, res) => {
  try {
    const { userIdToReport, reason } = req.body;
    const reporterId = req.user?.id;

    // Validate the input
    if (!userIdToReport || !reason) {
      return sendResponse(res, 400, "User to report and reason are required.");
    }

    // Ensure the user is not reporting themselves
    if (userIdToReport === reporterId) {
      return sendResponse(res, 400, "You cannot report yourself.");
    }

    // Check if the user exists
    const userToReport = await User.findById(userIdToReport);
    if (!userToReport) {
      return sendResponse(res, 404, "User not found.");
    }

    // Create the report document
    const newReport = await Report.create({
      reportedBy: reporterId,
      targetType: "user",
      targetId: userIdToReport,
      reason,
    });

    sendResponse(res, 201, "User reported successfully.", newReport);
  } catch (error) {
    console.error("Error reporting user:", error);
    sendResponse(res, 500, "Server error");
  }
};
