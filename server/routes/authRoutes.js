// /routes/authRoutes.js
import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  logoutUser,
  deleteAccount,
  cancelAccountDeletion,
} from "../controllers/AUTHCONTROLLER/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { checkBlacklist } from "../middlewares/blacklistMiddleware.js";
import { uploadMiddleware } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// Register a new user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

// Get user profile (protected route)
router.get("/profile", authMiddleware, checkBlacklist, getProfile);

// Update user profile (protected route)
router.put(
  "/profile-update",
  authMiddleware,
  checkBlacklist,
  uploadMiddleware.single("profilePicture"),
  updateProfile
);

// Logout user (blacklist token)
router.post("/logout", authMiddleware, checkBlacklist, logoutUser);

// Delete user account
router.delete("/delete-account", authMiddleware, checkBlacklist, deleteAccount);

// Cancel account deletion
router.post(
  "/cancel-deletion",
  authMiddleware,
  checkBlacklist,
  cancelAccountDeletion
);

export default router;
