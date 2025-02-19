import React from "react";
import usePost from "@/hooks/usePost";
import { CloudUpload, Loader2, X } from "lucide-react";
import { getSafeMediaUrl } from "@/lib/getSafeMediaUrl";
import { Input, Label } from "@/components/ui";
import { Button } from "@/components/common";

const EditPostPage = () => {
  const {
    preview,
    singlePost,
    singlePostLoading,
    singlePostError,
    register,
    handleSubmit,
    errors,
    handleFileChange,
    handleUpdatePost,
    isUpdatingPost,
    updatePostError,
    currentImage,
    handleRemoveImage,
  } = usePost();

  if (singlePostLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-white">
        <Loader2 className="w-6 h-6 animate-spin mr-2" />
        <span>Loading post...</span>
      </div>
    );
  }

  if (singlePostError) {
    return (
      <div className="p-6 rounded-lg bg-red-500/10 text-red-500 text-center">
        Error loading post. Please try again later.
      </div>
    );
  }

  const onSubmit = async (data) => {
    await handleUpdatePost(data);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 p-8 bg-black text-white shadow-2xl rounded-xl border border-gray-800">
      <div className="space-y-6">
        {/* Header */}
        <div className="border-b border-gray-800 pb-4">
          <h1 className="text-2xl font-bold text-white">Edit Post</h1>
          <p className="text-gray-400 mt-1">
            Update your post content and media
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Content Input */}
          <div className="space-y-2">
            <Label className="block text-sm font-medium text-gray-300">
              What's on your mind?
            </Label>
            <textarea
              defaultValue={singlePost?.content || ""}
              placeholder="Share your thoughts..."
              disabled={isUpdatingPost}
              {...register("content", { required: "Content is required" })}
              className="w-full min-h-[120px] px-4 py-3 rounded-lg border border-gray-700 bg-black text-white placeholder-gray-500 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-colors resize-none disabled:opacity-60"
            />
            {errors.content && (
              <p className="text-sm text-red-500">{errors.content.message}</p>
            )}
          </div>

          {/* Image Section */}
          <div className="space-y-4">
            {preview || currentImage ? (
              <div className="relative space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 text-sm">Media Preview</span>
                  <Button
                    type="button"
                    onClick={handleRemoveImage}
                    className="px-4 py-1.5 rounded-full text-sm font-medium bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                  >
                    Remove Media
                  </Button>
                </div>
                <div className="relative rounded-lg overflow-hidden border border-gray-700">
                  {preview?.isVideo || currentImage?.match(/\.(mp4|mov)$/) ? (
                    <video
                      className="w-full"
                      src={
                        preview ? preview.url : getSafeMediaUrl(currentImage)
                      }
                      controls
                      loop
                    />
                  ) : (
                    <img
                      className="w-full h-auto max-h-[400px] object-cover"
                      src={
                        preview ? preview.url : getSafeMediaUrl(currentImage)
                      }
                      alt="Post preview"
                    />
                  )}
                </div>
              </div>
            ) : (
              <Label
                htmlFor="dropzone-file"
                className="group relative flex flex-col items-center justify-center h-48 w-full border-2 border-dashed border-gray-700 rounded-lg bg-black hover:border-gray-600 transition-colors cursor-pointer"
              >
                <div className="space-y-3 text-center px-4">
                  <CloudUpload className="mx-auto h-12 w-12 text-gray-500 group-hover:text-gray-400 transition-colors" />
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
              <p className="text-sm text-red-500">{errors.image.message}</p>
            )}
          </div>

          {/* Error Message */}
          {updatePostError && (
            <div className="p-4 rounded-lg bg-red-500/10 text-red-500 text-sm">
              {updatePostError}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end pt-6 space-x-4 border-t border-gray-800">
            <Button
              type="button"
              onClick={() => window.history.back()}
              className="px-6 py-2.5 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-900 transition-colors"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isUpdatingPost || singlePostLoading}
              className="px-6 py-2.5 rounded-lg bg-white text-black hover:bg-gray-100 transition-colors disabled:opacity-70 disabled:cursor-not-allowed inline-flex items-center"
            >
              {isUpdatingPost ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Post"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPostPage;
