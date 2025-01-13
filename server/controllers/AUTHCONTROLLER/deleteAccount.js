// /controllers/AUTHCONTROLLER/deleteAccount.js
import User from "../../models/User.js";
import { sendResponse } from "../../utils/responseUtils.js";

export const deleteAccount = async (req, res) => {
  const userId = req.user.id;
  const { immediate } = req.body;

  try {
    // Find the user
    const user = await User.findById(userId);
    if (!user) return sendResponse(res, 404, "User not found");

    // If immediate deletion, remove user
    if (immediate) {
      await User.findByIdAndDelete(userId);
      return sendResponse(res, 200, "Account deleted immediately");
    }

    // Schedule deletion by setting the `deletionScheduledAt` field to 1 days from now
    const deletionDate = new Date();
    deletionDate.setDate(deletionDate.getDate() + 1);
    user.deletionScheduledAt = deletionDate;
    await user.save();

    sendResponse(res, 200, "Account deletion scheduled for 1 days from now");
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, "Server error");
  }
};
