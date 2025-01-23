import Post from "../../models/Post.js";
import { sendResponse } from "../../utils/responseUtils.js";
import { formatDate } from "../../utils/dateUtils.js";
import { deleteImageFromStorage } from "../../utils/storageUtils.js";

export const updatePost = async (req, res) => {
  try {
    const { postId, content, removeImage } = req.body;
    const userId = req.user.id;

    console.log("Received update request for post:", postId);

    const existingPost = await Post.findOne({ _id: postId, author: userId });
    if (!existingPost)
      return sendResponse(res, 404, "Post not found or unauthorized");

    const updatedContent = content || existingPost.content;

    let image = existingPost.image;

    if (removeImage) {
      if (existingPost.image) {
        await deleteImageFromStorage(existingPost.image);
      }
      image = null;
    } else if (req.file) {
      if (existingPost.image) {
        await deleteImageFromStorage(existingPost.image);
      }
      image = `/uploads/${req.file.filename}`;
    }

    // Update the post with new content and image (if provided)
    const post = await Post.findOneAndUpdate(
      { _id: postId, author: userId },
      { content: updatedContent, image, updatedAt: new Date() },
      { new: true }
    );

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
