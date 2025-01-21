import Comment from "../../models/Comment.js";
import Post from "../../models/Post.js";
import User from "../../models/User.js";
import Notification from "../../models/Notification.js";
import { sendResponse } from "../../utils/responseUtils.js";
import { formatDate } from "../../utils/dateUtils.js";

export const createComment = async (req, res) => {
  try {
    const { postId, content, parentCommentId, parentReplyId } = req.body;
    const userId = req.user.id;
    if (!content) return sendResponse(res, 400, "Content is required");
    const post = await Post.findById(postId);
    if (!post) return sendResponse(res, 404, "Post not found");
    const newComment = await Comment.create({
      content,
      author: userId,
      post: postId,
      parentCommentId,
      parentReplyId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await User.findByIdAndUpdate(userId, {
      $addToSet: { commentedPosts: postId },
    });
    const formattedComment = {
      ...newComment.toObject(),
      createdAt: formatDate(newComment.createdAt),
      updatedAt: formatDate(newComment.updatedAt),
    };

    // Create notification
    await Notification.create({
      user: post.author,
      type: "comment",
      message: `Your post received a new comment from ${req.user.username}.`,
    });

    sendResponse(res, 201, "Comment created successfully", formattedComment);
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, "Server error");
  }
};
