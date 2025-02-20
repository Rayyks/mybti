const followCooldowns = new Map();

export const followUser = async (req, res) => {
  try {
    const { userIdToFollow } = req.body;
    const followerId = req.user?.id;

    if (!userIdToFollow) {
      return sendResponse(res, 400, "User to follow is required.");
    }

    if (userIdToFollow === followerId) {
      return sendResponse(res, 400, "You cannot follow yourself.");
    }

    const follower = await User.findById(followerId);
    if (!follower) {
      return sendResponse(res, 404, "Follower not found.");
    }

    // Check cooldown (e.g., 10 seconds)
    const cooldownDuration = 10000;
    if (
      follower.lastFollowTime &&
      Date.now() - follower.lastFollowTime < cooldownDuration
    ) {
      return sendResponse(
        res,
        429,
        "You're following too fast. Try again later."
      );
    }

    const userToFollow = await User.findById(userIdToFollow);
    if (!userToFollow) {
      return sendResponse(res, 404, "User not found.");
    }

    if (userToFollow.followers.includes(followerId)) {
      return sendResponse(res, 400, "You are already following this user.");
    }

    // Update followers and following lists
    userToFollow.followers.push(followerId);
    await userToFollow.save();

    follower.following.push(userIdToFollow);
    follower.lastFollowTime = new Date(); // Update last follow time
    await follower.save();

    // Create notification
    await Notification.create({
      user: userIdToFollow,
      type: "follow",
      message: `${follower.username} started following you.`,
    });

    sendResponse(res, 200, "User followed successfully.");
  } catch (error) {
    console.error("Error following user:", error);
    sendResponse(res, 500, "Server error");
  }
};
