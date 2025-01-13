// /routes/postRoutes.js
import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { checkBlacklist } from "../middlewares/blacklistMiddleware.js";
import { uploadMiddleware } from "../middlewares/uploadMiddleware.js";
import {
  createPost,
  updatePost,
  deletePost,
  getAllPost,
  getFollowingPost,
  getSinglePost,
} from "../controllers/POSTCONTROLLER/postController.js";

const router = express.Router();

// Create a new post

router.post(
  "/",
  authMiddleware,
  checkBlacklist,
  uploadMiddleware.single("image"),
  createPost
);

// Update an existing post
router.put(
  "/",
  authMiddleware,
  checkBlacklist,
  uploadMiddleware.single("image"),
  updatePost
);

// Delete a post
router.delete("/:postId", authMiddleware, checkBlacklist, deletePost);

// Get all posts (paginated)
router.get("/", authMiddleware, checkBlacklist, getAllPost);

// Get posts from followed users
router.get("/following", authMiddleware, checkBlacklist, getFollowingPost);

// Get a single post
router.get("/:postId", authMiddleware, checkBlacklist, getSinglePost);

export default router;
