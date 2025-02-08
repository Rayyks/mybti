import Post from "../../models/Post.js";
import User from "../../models/User.js";

export const likePost = async (req, res) => {
  try {
    const { postId } = req.body;
    const userId = req.user._id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
      user.likedPosts = user.likedPosts.filter(
        (id) => id.toString() !== postId.toString()
      );
    } else {
      post.likes.push(userId);
      user.likedPosts.push(postId);
    }

    await post.save();
    await user.save();

    res.status(200).json({
      message: isLiked
        ? "Post unliked successfully"
        : "Post liked successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
