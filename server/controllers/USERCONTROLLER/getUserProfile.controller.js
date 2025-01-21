// Import necessary models
import User from "../../models/User.js";
import Post from "../../models/Post.js";

export const getUserProfileWithPosts = async (req, res) => {
  try {
    const { username } = req.params;
    // Find the user by username, excluding sensitive fields
    const user = await User.findOne({ username })
      .select("-password -isDeleted -deletionScheduledAt -deletionReason")
      .lean();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Fetch all posts authored by the user
    const posts = await Post.find({ author: user._id })
      .select("-reports")
      .sort({ createdAt: -1 })
      .lean();
    // Include posts in the response object
    res.status(200).json({
      user,
      posts,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving user profile and posts", error });
  }
};
