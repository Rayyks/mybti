import { useState } from "react";
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

  const handleCommentPost = async (postId, content) => {
    try {
      await commentPost({ postId, content }).unwrap();
      await refetchSinglePost();
      reset();
      toast.success("Comment posted successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleReplyComment = async (postId, parentCommentId, content) => {
    try {
      await replyComment({
        postId,
        parentCommentId,
        content,
      }).unwrap();
      await refetchSinglePost();
      reset();
      toast.success("Reply posted successfully");
    } catch (error) {
      console.log(error);

      toast.error(error.message);
    }
  };

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
