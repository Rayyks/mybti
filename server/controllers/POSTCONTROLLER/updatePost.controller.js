import Post from "../../models/Post.js";
import { sendResponse } from "../../utils/responseUtils.js";
import { formatDate } from "../../utils/dateUtils.js";

export const updatePost = async (req, res) => {
  try {
    const { postId, content } = req.body;
    const userId = req.user.id;

    if (!content) return sendResponse(res, 400, "Content is required");

    let image;
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    const post = await Post.findOneAndUpdate(
      { _id: postId, author: userId },
      { content, image, updatedAt: new Date() },
      { new: true }
    );

    if (!post) return sendResponse(res, 404, "Post not found or unauthorized");

    const formattedPost = {
      ...post.toObject(),
      createdAt: formatDate(post.createdAt),
      updatedAt: formatDate(post.updatedAt),
    };

    sendResponse(res, 200, "Post updated successfully", formattedPost);
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, "Server error");
  }
};
