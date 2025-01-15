import Report from "../../models/Report.js";
import Post from "../../models/Post.js";
import Comment from "../../models/Comment.js";
import Reply from "../../models/Reply.js";
import User from "../../models/User.js";
import { sendResponse } from "../../utils/responseUtils.js";

export const getReported = async (req, res) => {
  try {
    const userId = req.user.id;
    const reports = await Report.find({ reportedBy: userId }).sort({
      createdAt: -1,
    });

    for (const report of reports) {
      switch (report.targetType) {
        case "post":
          await report.populate({
            path: "targetId",
            model: Post,
            select: "title image",
          });
          break;
        case "comment":
          await report.populate({
            path: "targetId",
            model: Comment,
            select: "content author",
            populate: { path: "author", model: User, select: "username email" },
          });
          break;
        case "reply":
          await report.populate({
            path: "targetId",
            model: Reply,
            select: "content author",
            populate: { path: "author", model: User, select: "username email" },
          });
          break;
        case "user":
          await report.populate({
            path: "targetId",
            model: User,
            select: "username email",
          });
          break;
        default:
          break;
      }
    }

    // Transform the reports to include extra details
    const transformedReports = reports.map((report) => {
      const target = report.targetId || {};
      return {
        id: report._id,
        targetType: report.targetType,
        reason: report.reason,
        status: report.status,
        createdAt: report.createdAt,
        target: (() => {
          switch (report.targetType) {
            case "post":
              return { title: target.title, image: target.image || null };
            case "comment":
              return {
                content: target.content,
                author: target.author
                  ? {
                      username: target.author.username,
                      email: target.author.email,
                    }
                  : null,
              };
            case "reply":
              return {
                content: target.content,
                author: target.author
                  ? {
                      username: target.author.username,
                      email: target.author.email,
                    }
                  : null,
              };
            case "user":
              return { username: target.username, email: target.email };
            default:
              return null;
          }
        })(),
      };
    });

    sendResponse(res, 200, "Reports fetched successfully", transformedReports);
  } catch (error) {
    console.error("Error fetching reports:", error);
    sendResponse(res, 500, "Server error");
  }
};
