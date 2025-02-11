import User from "../../models/User.js";
import { sendResponse } from "../../utils/responseUtils.js";

export const searchUsers = async (req, res) => {
  try {
    const { username } = req.query;
    if (!username) {
      return sendResponse(res, 400, "Username query parameter is required");
    }

    const users = await User.find({
      username: { $regex: username, $options: "i" },
    }).select("username email mbti profilePicture");

    return sendResponse(res, 200, "Users retrieved successfully", users);
  } catch (error) {
    console.error(error);
    return sendResponse(
      res,
      500,
      "An error occurred while searching for users"
    );
  }
};
