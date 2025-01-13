import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  createComment,
  deleteComment,
  deleteReply,
  replyComment,
  likeComment,
  unlikeComment,
  savePost,
} from "../controllers/POSTACTIONCONTROLLER/postAction.js";
import { checkBlacklist } from "../middlewares/blacklistMiddleware.js";

const router = express.Router();

// Create a new comment
router.post("/comments", authMiddleware, checkBlacklist, createComment);

// Delete a comment
router.delete(
  "/comments/:commentId",
  authMiddleware,
  checkBlacklist,
  deleteComment
);

// Delete a Reply
router.delete("/reply/:replyId", authMiddleware, checkBlacklist, deleteReply);

// Reply to a comment
router.post("/comments/reply", authMiddleware, checkBlacklist, replyComment);

// Like a comment
router.post("/comments/like", authMiddleware, checkBlacklist, likeComment);

// Unlike a comment
router.post("/comments/unlike", authMiddleware, checkBlacklist, unlikeComment);

//save a post
router.post("/save/post", authMiddleware, checkBlacklist, savePost);

export default router;
