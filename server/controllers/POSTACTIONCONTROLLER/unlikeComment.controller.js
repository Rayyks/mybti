import Comment from "../../models/Comment.js";
import User from "../../models/User.js";
import { sendResponse } from "../../utils/responseUtils.js";

export const unlikeComment = async (req, res) => {
  try {
    const { commentId } = req.body;
    const userId = req.user.id;

    const comment = await Comment.findById(commentId);
    if (!comment) return sendResponse(res, 404, "Comment not found");

    const index = comment.likes.indexOf(userId);
    if (index !== -1) {
      comment.likes.splice(index, 1);
      await comment.save();
      await User.findByIdAndUpdate(userId, {
        $pull: { likedComments: commentId },
      });
    }

    sendResponse(res, 200, "Comment unliked successfully", {
      likes: comment.likes.length,
    });
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, "Server error");
  }
};
