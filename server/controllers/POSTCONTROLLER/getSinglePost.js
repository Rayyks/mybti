import Post from "../../models/Post.js";
import Comment from "../../models/Comment.js";
import Reply from "../../models/Reply.js";
import { sendResponse } from "../../utils/responseUtils.js";
import { formatDate } from "../../utils/dateUtils.js";

export const getSinglePost = async (req, res) => {
  try {
    const { postId } = req.params;

    // Fetch the main post
    const post = await Post.findById(postId).populate(
      "author",
      "username profilePicture"
    );
    if (!post) return sendResponse(res, 404, "Post not found");

    // Fetch all comments belonging to the post
    const comments = await Comment.find({ post: postId })
      .populate("author", "username profilePicture")
      .lean();

    // Get comment IDs to scope replies
    const commentIds = comments.map((comment) => comment._id);

    // Fetch first-level replies (directly to comments)
    const firstLevelReplies = await Reply.find({
      parentCommentId: { $in: commentIds },
    })
      .populate("author", "username profilePicture")
      .lean();

    // Fetch second-level replies (replies to first-level replies, scoped to the current post)
    const secondLevelReplies = await Reply.find({
      parentReplyId: { $in: firstLevelReplies.map((reply) => reply._id) },
    })
      .populate("author", "username profilePicture")
      .lean();

    // Combine all replies, scoped to the current post
    const allReplies = [...firstLevelReplies, ...secondLevelReplies];

    // Attach replies to their respective comments
    comments.forEach((comment) => {
      comment.replies = allReplies
        .filter(
          (reply) =>
            reply.parentCommentId?.toString() === comment._id.toString() &&
            !reply.parentReplyId
        )
        .map((reply) => ({
          ...reply,
          createdAt: formatDate(reply.createdAt),
          updatedAt: formatDate(reply.updatedAt),
        }));

      comment.createdAt = formatDate(comment.createdAt);
      comment.updatedAt = formatDate(comment.updatedAt);
    });

    // Format the post with comments and replies
    const formattedPost = {
      ...post.toObject(),
      createdAt: formatDate(post.createdAt),
      updatedAt: formatDate(post.updatedAt),
      comments,
      replies: allReplies.map((reply) => ({
        ...reply,
        createdAt: formatDate(reply.createdAt),
        updatedAt: formatDate(reply.updatedAt),
      })),
    };

    sendResponse(res, 200, "Post fetched successfully", formattedPost);
  } catch (error) {
    console.error("Error fetching post:", error);
    sendResponse(res, 500, "Server error");
  }
};
