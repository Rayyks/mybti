import { useState } from "react";
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
  const [preview, setPreview] = useState("");
  const [removeImage, setRemoveImage] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  // =========================== ||TRUNCATE CONTENT|| ===========================
  const [showMore, setShowMore] = useState(false);
  const contentPreview = (postContent) => truncateContent(postContent, 100);
  const maxContentPreview = (postContent) => truncateContent(postContent);
  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  //  =========================== ||STATE QUERY HOOKS|| ===========================
  const { data: post, isLoading, isError, refetch } = useGetAllPostsQuery();
  const {
    data: singlePost,
    isLoading: singlePostLoading,
    isError: singlePostError,
  } = useGetSinglePostQuery(postId);
  const [createPost, { isLoading: isCreatingPost, isError: createPostError }] =
    useCreatePostMutation();
  const [updatePost, { isLoading: isUpdatingPost, isError: updatePostError }] =
    useUpdatePostMutation();
  const [deletePost, { isLoading: isDeletingPost, isError: deletePostError }] =
    useDeletePostMutation();

  // =========================== ||HANDLER FUNCTION|| ===========================
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      const isVideo = file.type.match(/^video\//);
      setPreview({ url: fileURL, isVideo });
      setValue("image", file);
    }
  };

  const handleRemoveImage = () => {
    setPreview("");
    setValue("image", null);
    setRemoveImage(true);
  };

  // =========================== ||CREATE POST|| ===========================
  const handleCreatePost = async (data) => {
    const { image, ...rest } = data;
    const formData = new FormData();
    Object.keys(rest).forEach((key) => {
      formData.append(key, rest[key]);
    });
    if (image) {
      formData.append("image", image);
    }
    try {
      await createPost(formData).unwrap();
      toast.success("Post created successfully");
      refetch();
      reset();
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // =========================== ||UPDATE POST|| ===========================
  const handleUpdatePost = async (data) => {
    const { image, ...rest } = data;
    const formData = new FormData();
    Object.keys(rest).forEach((key) => {
      formData.append(key, rest[key]);
    });

    if (image) {
      formData.append("image", image);
    }

    if (removeImage) {
      formData.append("removeImage", true);
    }

    try {
      await updatePost(formData).unwrap();
      toast.success("Post updated successfully");
      refetch();
      reset();
      navigate("/");
    } catch (error) {
      toast.error("Failed to update post: " + error.message);
    }
  };

  return {
    // FORM STATE && HANDLERS
    register,
    handleSubmit,
    errors,
    preview,
    setPreview,
    handleFileChange,
    handleRemoveImage,
    // TRUNCATE CONTENT
    showMore,
    setShowMore,
    contentPreview,
    maxContentPreview,
    handleShowMore,
    // GET ALL POST
    post,
    isLoading,
    isError,
    //  GET SINGLE POST
    singlePost,
    singlePostLoading,
    singlePostError,
    // CREATE POST
    createPost,
    isCreatingPost,
    createPostError,
    handleCreatePost,
    // UPDATE POST
    updatePost,
    isUpdatingPost,
    updatePostError,
    handleUpdatePost,
  };
};

export default usePost;
