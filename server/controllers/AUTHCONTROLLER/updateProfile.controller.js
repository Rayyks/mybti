import User from "../../models/User.js";
import { sendResponse } from "../../utils/responseUtils.js";
import { isValidUsername, isValidMBTI } from "../../utils/validationUtils.js";
import { formatDate } from "../../utils/dateUtils.js";

export const updateProfile = async (req, res) => {
  const { username, bio, mbti, profession, interests } = req.body; // Include interests
  const userId = req.user.id;

  const profilePicture = req.file ? `/uploads/${req.file.filename}` : undefined;

  // Validate username
  if (username && !isValidUsername(username)) {
    return sendResponse(res, 400, "Invalid username format.");
  }

  // Validate MBTI
  if (mbti && !isValidMBTI(mbti)) {
    return sendResponse(res, 400, "Invalid MBTI type.");
  }

  // Ensure interests is an array
  let parsedInterests = [];
  if (interests) {
    if (Array.isArray(interests)) {
      parsedInterests = interests; // Directly use if it's already an array
    } else if (typeof interests === "string") {
      parsedInterests = interests.split(",").map((i) => i.trim()); // Convert comma-separated strings into an array
    }
  }

  try {
    // Update the user profile
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        username,
        bio,
        mbti,
        profession,
        interests: parsedInterests,
        profilePicture,
      },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return sendResponse(res, 404, "User not found.");
    }

    const formattedUser = {
      ...updatedUser.toObject(),
      createdAt: formatDate(updatedUser.createdAt),
      updatedAt: formatDate(updatedUser.updatedAt),
    };

    sendResponse(res, 200, "Profile updated successfully.", formattedUser);
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, "Server error. Please try again later.");
  }
};
