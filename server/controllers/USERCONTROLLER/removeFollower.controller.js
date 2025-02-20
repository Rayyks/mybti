export const removeFollower = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { followerId } = req.body;
    const userId = req.user?.id;

    if (!followerId) return sendResponse(res, 400, "Follower ID is required.");

    const [user, follower] = await Promise.all([
      User.findById(userId).session(session),
      User.findById(followerId).session(session),
    ]);

    if (!user || !follower) return sendResponse(res, 404, "User not found.");

    user.followers = user.followers.filter(
      (id) => id.toString() !== followerId
    );
    follower.following = follower.following.filter(
      (id) => id.toString() !== userId
    );

    await Promise.all([user.save({ session }), follower.save({ session })]);

    await redisClient.del(`user:${userId}`); // Invalidate cache

    await session.commitTransaction();
    session.endSession();

    return sendResponse(res, 200, "Follower removed successfully.");
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error removing follower:", error);
    return sendResponse(res, 500, "Server error.");
  }
};
