import express from "express";
import {
  followUser,
  unFollowUser,
} from "../controllers/USERCONTROLLER/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { checkBlacklist } from "../middlewares/blacklistMiddleware.js";

const router = express.Router();

router.post("/follow", authMiddleware, checkBlacklist, followUser);
router.post("/unfollow", authMiddleware, checkBlacklist, unFollowUser);

export default router;
