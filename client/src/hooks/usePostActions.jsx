import { useState, useEffect } from "react";
import {
  useLikePostMutation,
  useCommentPostMutation,
  useReplyCommentMutation,
  useDeleteCommentMutation,
  useSavePostMutation,
} from "@/redux/slices/postActionApiSlice";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import usePost from "./usePost";
import useProfile from "./useProfile";

const usePostActions = (post) => {
  const { refetchSinglePost } = usePost();
  const { myProfile } = useProfile();
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post?.likes?.length);

  const checkIfPostIsSaved = () => {
    if (myProfile?.user?.savedPosts) {
      const saved = myProfile.user.savedPosts.some((p) => p._id === post?._id);
      setIsSaved(saved);
    }
  };

  const checkIfPostIsLiked = () => {
    if (myProfile?.user?.likedPosts) {
      const liked = myProfile.user.likedPosts.some((p) => p._id === post?._id);
      setIsLiked(liked);
    }
  };

  useEffect(() => {
    checkIfPostIsSaved();
  }, [post?._id, myProfile]);

  useEffect(() => {
    checkIfPostIsLiked();
  }, [post?._id, myProfile]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [likePost] = useLikePostMutation();
  const [commentPost] = useCommentPostMutation();
  const [replyComment] = useReplyCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [savePost] = useSavePostMutation();

  const handleLikePost = async () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLikeCount((prevCount) =>
      newLikedState ? prevCount + 1 : prevCount - 1
    );

    try {
      const response = await likePost({ postId: post._id }).unwrap();
      if (response?.likes) {
        setLikeCount(response.likes.length);
      }
      refetchSinglePost();
    } catch (error) {
      toast.error(error.message);
      setIsLiked(!newLikedState);
      setLikeCount((prevCount) =>
        newLikedState ? prevCount - 1 : prevCount + 1
      );
    }
  };

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

  const handleReplyComment = async (postId, parentCommentId, content) => {
    try {
      await toast.promise(
        replyComment({ postId, parentCommentId, content }).unwrap(),
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

  const handleSavePost = async (postId) => {
    try {
      await savePost({ postId }).unwrap();
      setIsSaved(!isSaved);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    reset,
    handleLikePost,
    handleCommentPost,
    handleReplyComment,
    handleDeleteComment,
    handleSavePost,
    isSaved,
    isLiked,
    likeCount,
  };
};

export default usePostActions;
