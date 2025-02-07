import Post from "../../models/Post.js";
import User from "../../models/User.js";
import { sendResponse } from "../../utils/responseUtils.js";
import { formatDate } from "../../utils/dateUtils.js";
import Comment from "../../models/Comment.js";

export const getAllPost = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const userId = req.user.id;

    // Get the list of followed users
    const user = await User.findById(userId).populate("following");
    const followedUserIds = user.following.map((user) => user._id);

    // Get posts from followed users
    const followedPosts = await Post.find({ author: { $in: followedUserIds } })
      .populate("author", "id username profilePicture mbti")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    // Get remaining posts
    const remainingLimit = limit - followedPosts.length;
    const otherPosts = await Post.find({ author: { $nin: followedUserIds } })
      .populate("author", "id username profilePicture mbti")
      .sort({ createdAt: -1 })
      .skip((page - 1) * remainingLimit)
      .limit(parseInt(remainingLimit));

    const posts = [...followedPosts, ...otherPosts];

    // Fetch comments dynamically for each post
    const formattedPosts = await Promise.all(
      posts.map(async (post) => {
        const commentCount = await Comment.countDocuments({ post: post._id });

        return {
          ...post.toObject(),
          createdAt: formatDate(post.createdAt),
          updatedAt: formatDate(post.updatedAt),
          author: {
            id: post.author._id,
            username: post.author.username,
            profilePicture: post.author.profilePicture,
            mbti: post.author.mbti,
          },
          commentCount,
        };
      })
    );

    // Sort posts based on engagement and recency
    const sortedPosts = formattedPosts.sort((a, b) => {
      const engagementA = a.likes.length + a.commentCount;
      const engagementB = b.likes.length + b.commentCount;
      const recencyA = new Date(a.createdAt).getTime();
      const recencyB = new Date(b.createdAt).getTime();

      // Combine engagement and recency scores
      const scoreA = engagementA * 0.7 + recencyA * 0.3;
      const scoreB = engagementB * 0.7 + recencyB * 0.3;

      return scoreB - scoreA;
    });

    sendResponse(
      res,
      200,
      true,
      sortedPosts,
      null,
      "Posts retrieved successfully"
    );
  } catch (error) {
    sendResponse(
      res,
      500,
      false,
      null,
      error.message,
      "Error retrieving posts"
    );
  }
};
