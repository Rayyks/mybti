import Post from "../../models/Post.js";
import Comment from "../../models/Comment.js";
import { sendResponse } from "../../utils/responseUtils.js";
import { formatDate } from "../../utils/dateUtils.js";

export const getSinglePost = async (req, res) => {
  try {
    const { postId } = req.params;

    // Fetch the post along with the author
    const post = await Post.findById(postId)
      .populate("author", "username profilePicture")
      .lean();
    if (!post) return sendResponse(res, 404, "Post not found");

    // Fetch all comments (including replies)
    const comments = await Comment.find({ post: postId })
      .populate("author", "username profilePicture")
      .lean();

    // **🔥 Nest replies under their parent comments**
    const commentMap = {}; // Store comments by ID for quick access
    comments.forEach((comment) => {
      comment.replies = []; // Initialize replies array
      comment.createdAt = formatDate(comment.createdAt);
      comment.updatedAt = formatDate(comment.updatedAt);
      commentMap[comment._id.toString()] = comment;
    });

    // **🔥 Attach replies to their parent comments**
    comments.forEach((comment) => {
      if (comment.parentComment) {
        const parent = commentMap[comment.parentComment.toString()];
        if (parent) parent.replies.push(comment);
      }
    });

    // **🔥 Get only top-level comments (parentComment: null)**
    const topLevelComments = comments.filter(
      (comment) => !comment.parentComment
    );

    // Format the post with structured comments
    const formattedPost = {
      ...post,
      createdAt: formatDate(post.createdAt),
      updatedAt: formatDate(post.updatedAt),
      comments: topLevelComments, // Replies are already nested inside
    };

    sendResponse(res, 200, "Post fetched successfully", formattedPost);
  } catch (error) {
    console.error("Error fetching post:", error);
    sendResponse(res, 500, "Server error");
  }
};
