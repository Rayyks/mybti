import User from "../../models/User.js";
import Post from "../../models/Post.js";
import Comment from "../../models/Comment.js";
import { formatDate } from "../../utils/dateUtils.js";

export const getUserProfileWithPosts = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username })
      .select("-password -isDeleted -deletionScheduledAt -deletionReason")
      .populate("followers", "username profilePicture")
      .populate("following", "username profilePicture")
      .lean();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const posts = await Post.find({ author: user._id })
      .populate("author", "username profilePicture mbti")
      .sort({ createdAt: -1 })
      .lean();
    const postsWithCommentCount = await Promise.all(
      posts.map(async (post) => {
        const commentCount = await Comment.countDocuments({ post: post._id });
        return {
          ...post,
          commentCount,
          createdAt: formatDate(post.createdAt),
        };
      })
    );
    res.status(200).json({
      user,
      posts: postsWithCommentCount,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving user profile and posts", error });
  }
};
