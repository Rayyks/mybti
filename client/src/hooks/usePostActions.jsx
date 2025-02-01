import {
  useCommentPostMutation,
  useReplyCommentMutation,
  useDeleteCommentMutation,
} from "@/redux/slices/postActionApiSlice";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import usePost from "./usePost";

const usePostActions = () => {
  const { refetchSinglePost } = usePost();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [commentPost, { isLoading: commentPostLoading }] =
    useCommentPostMutation();
  const [replyComment, { isLoading: replyCommentLoading }] =
    useReplyCommentMutation();
  const [deleteComment, { isLoading: deleteCommentLoading }] =
    useDeleteCommentMutation();

  // ======================================== || COMMENT POST || ========================================
  const handleCommentPost = async (postId, content) => {
    try {
      toast.promise(commentPost({ postId, content }).unwrap(), {
        loading: "Posting comment...",
        success: "Comment posted successfully",
        error: "Failed to post comment",
      });
      refetchSinglePost();
      reset();
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ======================================== || REPLY COMMENT || ========================================
  const handleReplyComment = async (postId, parentCommentId, content) => {
    try {
      await toast.promise(
        replyComment({
          postId,
          parentCommentId,
          content,
        }).unwrap(),
        {
          loading: "Posting reply...",
          success: "Reply posted successfully",
          error: "Failed to post reply",
        }
      );
      refetchSinglePost();
      reset();
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // ======================================== || DELETE COMMENT || ========================================
  const handleDeleteComment = async (commentId) => {
    try {
      await toast.promise(deleteComment({ commentId }).unwrap(), {
        loading: "Deleting comment...",
        success: "Comment deleted successfully",
        error: "Failed to delete comment",
      });
      await refetchSinglePost();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    reset,
    commentPostLoading,
    handleCommentPost,
    replyCommentLoading,
    handleReplyComment,
    deleteCommentLoading,
    handleDeleteComment,
  };
};

export default usePostActions;
