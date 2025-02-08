import Comment from "../../models/Comment.js";
import Post from "../../models/Post.js";
import User from "../../models/User.js";
import Notification from "../../models/Notification.js";
import { sendResponse } from "../../utils/responseUtils.js";
import { formatDate } from "../../utils/dateUtils.js";

export const createComment = async (req, res) => {
  try {
    const { postId, content, parentCommentId } = req.body;
    const userId = req.user.id;

    if (!content) return sendResponse(res, 400, "Content is required");

    // Check if it's a new comment or a reply
    let parentComment = null;
    let replyTo = null;
    if (parentCommentId) {
      parentComment = await Comment.findById(parentCommentId).populate(
        "author",
        "username"
      );
      if (!parentComment)
        return sendResponse(res, 404, "Parent comment not found");
      replyTo = parentComment.author.username;
    }

    // Create the comment (or reply)
    const newComment = await Comment.create({
      content,
      author: userId,
      post: postId,
      parentComment: parentCommentId || null,
      replyTo: replyTo || null,
    });

    // Update the user's commentedPosts field
    await User.findByIdAndUpdate(userId, {
      $addToSet: { commentedPosts: postId },
    });

    // If it's a reply, notify the parent comment author
    if (parentComment) {
      await Notification.create({
        user: parentComment.author._id,
        type: "reply",
        message: `You have a new reply from ${req.user.username}.`,
      });
    } else {
      // If it's a new comment, notify the post author
      const post = await Post.findById(postId);
      await Notification.create({
        user: post.author,
        type: "comment",
        message: `Your post received a new comment from ${req.user.username}.`,
      });
    }

    sendResponse(res, 201, "Comment posted successfully", {
      ...newComment.toObject(),
      createdAt: formatDate(newComment.createdAt),
      updatedAt: formatDate(newComment.updatedAt),
    });
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, "Server error");
  }
};
