import { useState, useEffect } from "react";
import {
  useGetAllPostsQuery,
  useGetSinglePostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} from "@/redux/slices/postApiSlice";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router";
import { truncateContent } from "@/pages/auth/contentPreview";

const usePost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [preview, setPreview] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [deletePostImage, setDeletePostImage] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm();

  // =========================== ||TRUNCATE CONTENT|| ===========================
  const contentPreview = (postContent) => truncateContent(postContent, 100);
  const maxContentPreview = (postContent) => truncateContent(postContent);
  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  // Fetch posts
  const { data: post, isLoading, isError, refetch } = useGetAllPostsQuery();
  const {
    data: singlePost,
    isLoading: singlePostLoading,
    isError: singlePostError,
    refetch: refetchSinglePost,
  } = useGetSinglePostQuery(postId);

  const [createPost] = useCreatePostMutation();
  const [updatePost] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();

  useEffect(() => {
    if (singlePost?.data?.image) {
      setCurrentImage(singlePost.data.image);
    }
  }, [singlePost]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setPreview({ url: fileURL, isVideo: file.type.includes("video") });
      setValue("image", file, { shouldValidate: true });
      setCurrentImage(null);
      setDeletePostImage(false);
    }
  };

  // Remove current image
  const handleRemoveImage = () => {
    setCurrentImage(null);
    setPreview(null);
    setDeletePostImage(true);
  };

  // Create Post
  const handleCreatePost = async (data) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      await toast.promise(createPost(formData).unwrap(), {
        loading: "Creating Post...",
        success: "Post Created Successfully!",
        error: "Failed to Create Post!",
      });
      refetch();
      reset();
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Update Post
  const handleUpdatePost = async (data) => {
    try {
      const formData = new FormData();
      // Append other fields
      Object.entries(data).forEach(([key, value]) => {
        if (key !== "image") {
          formData.append(key, value);
        }
      });
      formData.append("postId", postId);
      const imageFile = watch("image");
      if (deletePostImage) {
        formData.append("removeImage", "true");
      } else if (imageFile instanceof File) {
        formData.append("image", imageFile);
      }

      await toast.promise(updatePost(formData).unwrap(), {
        loading: "Updating Post...",
        success: "Post Updated Successfully!",
        error: "Failed to Update Post!",
      });

      refetch();
      reset();
      navigate("/");
    } catch (error) {
      toast.error("Failed to update post: " + error.message);
    }
  };

  // Delete Post
  const handleDeletePost = async (id) => {
    try {
      await toast.promise(deletePost(id).unwrap(), {
        loading: "Deleting Post...",
        success: "Post Deleted Successfully!",
        error: "Failed to Delete Post!",
      });

      navigate("/");
    } catch (error) {
      toast.error("Failed to delete post: " + error.message);
    }
  };

  return {
    contentPreview,
    maxContentPreview,
    handleShowMore,
    showMore,
    navigate,
    register,
    handleSubmit,
    errors,
    preview,
    setPreview,
    setValue,
    handleFileChange,
    currentImage,
    handleRemoveImage,
    post,
    isLoading,
    isError,
    refetch,
    singlePost: singlePost?.data,
    singlePostLoading,
    singlePostError,
    refetchSinglePost,
    createPost,
    handleCreatePost,
    updatePost,
    handleUpdatePost,
    deletePost,
    handleDeletePost,
  };
};

export default usePost;
