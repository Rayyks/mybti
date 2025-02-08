import { useState, useEffect } from "react";
import {
  useCommentPostMutation,
  useReplyCommentMutation,
  useDeleteCommentMutation,
  useSavePostMutation,
} from "@/redux/slices/postActionApiSlice";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import usePost from "./usePost";
import useProfile from "./useProfile";

const usePostActions = (postId) => {
  const { refetchSinglePost } = usePost();
  const { myProfile } = useProfile();
  const [isSaved, setIsSaved] = useState(false);
  useEffect(() => {
    if (myProfile && myProfile?.user?.savedPosts) {
      const saved = myProfile?.user?.savedPosts.some(
        (post) => post._id === postId
      );
      setIsSaved(saved);
    }
  }, [postId, myProfile]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [commentPost] = useCommentPostMutation();
  const [replyComment] = useReplyCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [savePost] = useSavePostMutation();

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

  // ======================================== || SAVE POST || ========================================
  const handleSavePost = async (postId) => {
    try {
      await toast.promise(savePost({ postId }).unwrap(), {
        loading: "Saving post...",
        success: "Post saved successfully",
        error: "Failed to save post",
      });
      setIsSaved(!isSaved);
      // refetchSinglePost();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    reset,
    handleCommentPost,
    handleReplyComment,
    handleDeleteComment,
    handleSavePost,
    isSaved,
  };
};

export default usePostActions;
