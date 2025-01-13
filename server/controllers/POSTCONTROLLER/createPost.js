import Post from "../../models/Post.js";
import User from "../../models/User.js";
import Notification from "../../models/Notification.js";
import { sendResponse } from "../../utils/responseUtils.js";
import { formatDate } from "../../utils/dateUtils.js";

export const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.user.id;

    if (!content) return sendResponse(res, 400, "Content is required");

    let image;
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    const newPost = await Post.create({
      content,
      author: userId,
      image,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const formattedPost = {
      ...newPost.toObject(),
      createdAt: formatDate(newPost.createdAt),
      updatedAt: formatDate(newPost.updatedAt),
    };

    // Notify followers
    const user = await User.findById(userId).populate("followers");
    const notifications = user.followers.map((follower) => ({
      user: follower._id,
      type: "new_post",
      message: `${user.username} has posted a new post.`,
    }));
    await Notification.insertMany(notifications);

    sendResponse(res, 201, "Post created successfully", formattedPost);
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, "Server error");
  }
};
