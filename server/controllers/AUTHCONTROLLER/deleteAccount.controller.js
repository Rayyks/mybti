import User from "../../models/User.js";
import Post from "../../models/Post.js";
import Comment from "../../models/Comment.js";
import { sendResponse } from "../../utils/responseUtils.js";

export const deleteAccount = async (req, res) => {
  const userId = req.user.id;
  const { immediate, reason } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return sendResponse(res, 404, "User not found");

    if (immediate) {
      user.isDeleted = true;
      user.deletionReason = reason;
      await user.save();
      await Post.updateMany({ author: userId }, { isDeleted: true });
      await Comment.updateMany({ author: userId }, { isDeleted: true });

      // Remove user from followers and following lists
      await User.updateMany(
        { followers: userId },
        { $pull: { followers: userId } }
      );
      await User.updateMany(
        { following: userId },
        { $pull: { following: userId } }
      );

      return sendResponse(
        res,
        200,
        "Account and associated data soft-deleted immediately"
      );
    }
    const deletionDate = new Date();
    deletionDate.setDate(deletionDate.getDate() + 1);
    user.deletionScheduledAt = deletionDate;
    user.deletionReason = reason;
    await user.save();

    sendResponse(res, 200, "Account deletion scheduled for 1 day from now");
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, "Server error");
  }
};
