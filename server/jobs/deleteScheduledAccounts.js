import cron from "node-cron";
import User from "../models/User.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

// Run this job every day at midnight
cron.schedule("0 0 * * *", async () => {
  try {
    const now = new Date();
    const usersToDelete = await User.find({
      deletionScheduledAt: { $lte: now },
    });
    for (const user of usersToDelete) {
      const userId = user._id;
      await Comment.updateMany({ author: userId }, { isDeleted: true });
      await Post.updateMany({ author: userId }, { isDeleted: true });
      user.isDeleted = true;
      user.deletionScheduledAt = null;
      await user.save();

      // Remove user from followers and following lists
      await User.updateMany(
        { followers: userId },
        { $pull: { followers: userId } }
      );
      await User.updateMany(
        { following: userId },
        { $pull: { following: userId } }
      );

      console.log(
        `Soft-deleted user account, posts, and comments for user ${userId}`
      );
    }
  } catch (error) {
    console.error("Error running deletion job:", error);
  }
});
