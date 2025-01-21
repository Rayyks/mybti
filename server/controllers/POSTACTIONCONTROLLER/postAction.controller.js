import { createComment } from "./commentPost.controller.js";
import { deleteComment, deleteReply } from "./deleteComment.controller.js";
import { replyComment } from "./replyComment.controller.js";
import { likeComment } from "./likeComment.controller.js";
import { unlikeComment } from "./unlikeComment.controller.js";
import { reportComment, reportReply } from "./reportComment.controller.js";
import { savePost } from "./savePost.controller.js";

export {
  createComment,
  deleteComment,
  deleteReply,
  replyComment,
  likeComment,
  unlikeComment,
  reportComment,
  reportReply,
  savePost,
};
