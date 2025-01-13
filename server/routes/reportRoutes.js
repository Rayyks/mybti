import express from "express";
import { reportUser } from "../controllers/USERCONTROLLER/userController.js";
import { reportPost } from "../controllers/POSTCONTROLLER/postController.js";
import {
  reportComment,
  reportReply,
} from "../controllers/POSTACTIONCONTROLLER/postAction.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { checkBlacklist } from "../middlewares/blacklistMiddleware.js";

const router = express.Router();

router.post("/user", authMiddleware, checkBlacklist, reportUser);
router.post("/post", authMiddleware, checkBlacklist, reportPost);
router.post("/comment", authMiddleware, checkBlacklist, reportComment);
router.post("/reply", authMiddleware, checkBlacklist, reportReply);

export default router;
