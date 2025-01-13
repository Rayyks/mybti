import cron from "node-cron";
import User from "../models/User.js";

// Run this job every day at midnight
cron.schedule("0 0 * * *", async () => {
  try {
    const now = new Date();

    // Find users scheduled for deletion
    const usersToDelete = await User.find({
      deletionScheduledAt: { $lte: now },
    });

    for (const user of usersToDelete) {
      await User.findByIdAndDelete(user._id);
      console.log(`Deleted account for user ${user._id}`);
    }
  } catch (error) {
    console.error("Error running deletion job:", error);
  }
});
