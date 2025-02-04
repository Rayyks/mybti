import Post from "../../models/Post.js";
import { sendResponse } from "../../utils/responseUtils.js";
import { formatDate } from "../../utils/dateUtils.js";
import { deleteImageFromStorage } from "../../utils/storageUtils.js";

export const updatePost = async (req, res) => {
  try {
    const { postId, content, removeImage } = req.body;
    const userId = req.user.id;

    console.log(`Updating post: ${postId} by user: ${userId}`);

    // Find post by ID and check ownership
    const existingPost = await Post.findOne({ _id: postId, author: userId });
    if (!existingPost) {
      return sendResponse(res, 404, "Post not found or unauthorized");
    }

    let updatedImage = existingPost.image;

    // Remove existing image if requested
    if (removeImage && existingPost.image) {
      await deleteImageFromStorage(existingPost.image);
      updatedImage = "";
    }

    // Handle new image upload
    if (req.file) {
      if (existingPost.image) {
        await deleteImageFromStorage(existingPost.image);
      }
      updatedImage = `/uploads/${req.file.filename}`;
    }

    // Update post in database
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        content: content || existingPost.content,
        image: updatedImage,
        updatedAt: new Date(),
      },
      { new: true }
    );

    // Format response
    const formattedPost = {
      ...updatedPost.toObject(),
      createdAt: formatDate(updatedPost.createdAt),
      updatedAt: formatDate(updatedPost.updatedAt),
    };

    return sendResponse(res, 200, "Post updated successfully", formattedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    return sendResponse(res, 500, "Server error");
  }
};
