import User from "../../models/User.js";
import { comparePassword } from "../../utils/passwordUtils.js";
import { generateToken } from "../../utils/jwtUtils.js";
import { sendResponse } from "../../utils/responseUtils.js";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return sendResponse(res, 400, "Email and password are required.");
  }

  try {
    // Check if the email is registered
    const user = await User.findOne({ email });
    if (!user) {
      return sendResponse(
        res,
        404,
        "The email is not registered. Please check or register."
      );
    }

    // Verify the password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return sendResponse(res, 401, "The password is incorrect.");
    }

    // Generate a token
    const token = generateToken(user._id);

    sendResponse(res, 200, "Login successful. Welcome back!", { token });
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, "Server error. Please try again later.");
  }
};
