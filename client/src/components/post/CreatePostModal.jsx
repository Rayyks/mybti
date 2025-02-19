import React, { useRef, useEffect } from "react";
import { X, CloudUpload, Loader2 } from "lucide-react";
import { useNavigate } from "react-router";
import usePost from "@/hooks/usePost";
import { Input, Label } from "@/components/ui";
import { Button } from "@/components/common";

export const CreatePostModal = () => {
  const modalRef = useRef(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    errors,
    handleCreatePost,
    preview,
    setPreview,
    handleFileChange,
    isCreatingPost,
    createPostError,
  } = usePost();

  const onClose = () => navigate("/");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [modalRef]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm p-4 flex items-center justify-center overflow-y-auto z-[1000]">
      <div
        ref={modalRef}
        className="w-full max-w-2xl bg-neutral-900 rounded-xl shadow-2xl"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white">
              Create a new post
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors group"
            >
              <X className="w-5 h-5 text-white group-hover:text-black" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit(handleCreatePost)} className="space-y-6">
            <div className="space-y-2">
              <Label className="block text-sm font-medium text-gray-300">
                What's on your mind?
              </Label>
              <textarea
                placeholder="Share your thoughts..."
                className="w-full min-h-[120px] px-4 py-3 rounded-lg border border-gray-200 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 bg-black hover:bg-neutral-950 text-white placeholder:transition-colors resize-none"
                {...register("content", { required: "Content is required" })}
              />
              {errors.content && (
                <p className="text-sm text-red-600">{errors.content.message}</p>
              )}
            </div>

            <div className="space-y-4">
              {preview ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setPreview("")}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-gray-900/70 hover:bg-gray-900 transition-colors"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                  {preview.isVideo ? (
                    <video
                      className="w-full rounded-lg border border-gray-200"
                      src={preview.url}
                      controls
                      loop
                    />
                  ) : (
                    <img
                      className="w-full h-auto max-h-[400px] object-cover rounded-lg border border-gray-200"
                      src={preview.url}
                      alt="Post preview"
                    />
                  )}
                </div>
              ) : (
                <Label
                  htmlFor="dropzone-file"
                  className="group relative flex flex-col items-center justify-center h-48 w-full border-2 border-dashed border-gray-300 rounded-lg bg-black hover:bg-neutral-900 transition-colors cursor-pointer"
                >
                  <div className="space-y-2 text-center px-4">
                    <CloudUpload className="mx-auto h-12 w-12 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    <div className="flex flex-col space-y-1">
                      <span className="text-sm font-medium text-gray-300">
                        Drop your file here or click to upload
                      </span>
                      <span className="text-xs text-gray-500">
                        PNG, JPG or PDF (max. 15MB)
                      </span>
                    </div>
                  </div>
                  <Input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    {...register("image")}
                    onChange={handleFileChange}
                  />
                </Label>
              )}
              {errors.image && (
                <p className="text-sm text-red-600">{errors.image.message}</p>
              )}
            </div>

            {createPostError && (
              <div className="p-4 rounded-lg bg-red-50 text-red-900 text-sm">
                {createPostError.message ||
                  "An error occurred while creating post"}
              </div>
            )}

            <div className="flex justify-end pt-4 space-x-4 border-t border-gray-200">
              <Button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-200 hover:text-black hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isCreatingPost}
                className="px-6 py-2.5 rounded-lg bg-blue-500 text-white hover:bg-blue-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed inline-flex items-center"
              >
                {isCreatingPost ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Post"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
