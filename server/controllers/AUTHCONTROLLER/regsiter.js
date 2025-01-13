import User from "../../models/User.js";
import { hashPassword } from "../../utils/passwordUtils.js";
import { sendResponse } from "../../utils/responseUtils.js";
import {
  isValidEmail,
  isValidUsername,
  isValidMBTI,
} from "../../utils/validationUtils.js";

export const registerUser = async (req, res) => {
  const { username, email, password, mbti } = req.body;

  console.log("Request body:", req.body);

  // Validate inputs
  if (!email || !isValidEmail(email)) {
    return sendResponse(
      res,
      400,
      "Invalid email format. Please enter a valid email (e.g., user@example.com)."
    );
  }
  if (!username || !isValidUsername(username)) {
    return sendResponse(
      res,
      400,
      "Invalid username format. Username must be alphanumeric and between 3 to 20 characters."
    );
  }
  if (!password || password.length < 6) {
    return sendResponse(
      res,
      400,
      "Password must be at least 6 characters long."
    );
  }
  if (!mbti || !isValidMBTI(mbti)) {
    return sendResponse(
      res,
      400,
      "Invalid MBTI type. Please select a valid MBTI type (e.g., INTJ, INFP, etc.)."
    );
  }

  try {
    // Check if email is already registered
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return sendResponse(
        res,
        400,
        "Email is already registered. Please use a different email."
      );
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      mbti,
    });

    await newUser.save();

    sendResponse(res, 201, "User registered successfully.", {
      userId: newUser._id,
    });
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, "Server error. Please try again later.");
  }
};
