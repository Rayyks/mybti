import express from "express";
import {
  followUser,
  unFollowUser,
  getUserProfileWithPosts,
  removeFollower,
} from "../controllers/USERCONTROLLER/userController.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { checkBlacklist } from "../middlewares/blacklistMiddleware.js";

const router = express.Router();

router.post("/follow", authMiddleware, checkBlacklist, followUser);
router.post("/unfollow", authMiddleware, checkBlacklist, unFollowUser);
router.post("/remove-follower", authMiddleware, checkBlacklist, removeFollower);
router.get(
  "/profile/:username",
  authMiddleware,
  checkBlacklist,
  getUserProfileWithPosts
);

export default router;
