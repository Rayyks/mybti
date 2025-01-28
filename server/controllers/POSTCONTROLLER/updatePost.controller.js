import Post from "../../models/Post.js";
import { sendResponse } from "../../utils/responseUtils.js";
import { formatDate } from "../../utils/dateUtils.js";
import { deleteImageFromStorage } from "../../utils/storageUtils.js";

export const updatePost = async (req, res) => {
  try {
    const { postId, content, removeImage } = req.body;
    const userId = req.user.id;

    console.log("Received update request for post:", postId);

    // Find the existing post by ID and author
    const existingPost = await Post.findOne({ _id: postId, author: userId });
    if (!existingPost) {
      return sendResponse(res, 404, "Post not found or unauthorized");
    }

    // Prepare content and image values
    const updatedContent = content || existingPost.content;
    let updatedImage = existingPost.image;

    // Handle image removal
    if (removeImage) {
      if (existingPost.image) {
        await deleteImageFromStorage(existingPost.image);
      }
      updatedImage = "";
    }

    // Handle image replacement
    if (req.file) {
      if (existingPost.image) {
        await deleteImageFromStorage(existingPost.image);
      }
      updatedImage = `/uploads/${req.file.filename}`;
    }

    // Update the post in the database
    const updatedPost = await Post.findOneAndUpdate(
      { _id: postId, author: userId },
      { content: updatedContent, image: updatedImage, updatedAt: new Date() },
      { new: true }
    );

    // Format the updated post for response
    const formattedPost = {
      ...updatedPost.toObject(),
      createdAt: formatDate(updatedPost.createdAt),
      updatedAt: formatDate(updatedPost.updatedAt),
    };

    // Send the response
    sendResponse(res, 200, "Post updated successfully", formattedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    sendResponse(res, 500, "Server error");
  }
};
