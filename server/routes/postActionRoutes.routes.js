import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  likePost,
  createComment,
  deleteComment,
  likeComment,
  unlikeComment,
  savePost,
} from "../controllers/POSTACTIONCONTROLLER/postAction.controller.js";
import { checkBlacklist } from "../middlewares/blacklistMiddleware.js";

const router = express.Router();

// like a post
router.put("/like", authMiddleware, checkBlacklist, likePost);

// Create a new comment or reply
router.post("/comments", authMiddleware, checkBlacklist, createComment);

// Delete a comment
router.delete(
  "/comments/:commentId",
  authMiddleware,
  checkBlacklist,
  deleteComment
);

// Like a comment
router.post("/comments/like", authMiddleware, checkBlacklist, likeComment);

// Unlike a comment
router.post("/comments/unlike", authMiddleware, checkBlacklist, unlikeComment);

// Save a post
router.post("/save/post", authMiddleware, checkBlacklist, savePost);

export default router;
