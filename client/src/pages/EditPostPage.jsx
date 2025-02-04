import React from "react";
import usePost from "@/hooks/usePost";
import { Label, Input, ErrorInput } from "@/components/ui";
import { Button } from "@/components/common";
import { CloudUpload } from "lucide-react";
import { getSafeMediaUrl } from "@/lib/getSafeMediaUrl";

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

  if (singlePostLoading)
    return <div className="text-blue-500 p-4">Loading post...</div>;
  if (singlePostError)
    return <div className="text-red-500 p-4">Error loading post</div>;

  const onSubmit = async (data) => {
    await handleUpdatePost(data);
  };

  return (
    <div className="w-full mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Edit Post</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Content Input */}
        <div>
          <Label htmlFor="content" className="block mb-2 font-medium">
            Tweet
          </Label>
          <Input
            id="content"
            type="text"
            defaultValue={singlePost?.content || ""}
            placeholder="Tweet"
            disabled={isUpdatingPost}
            {...register("content", { required: "Content is required" })}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          <ErrorInput error={errors.content} />
        </div>

        {/* Image Section */}
        <div className="flex flex-col gap-2.5">
          {preview || currentImage ? (
            <div className="relative w-full">
              <div className="flex justify-between w-full">
                <span className="text-gray-800">Preview:</span>
                <Button
                  type="button"
                  className="text-red-500 underline text-sm"
                  onClick={handleRemoveImage}
                >
                  Remove
                </Button>
              </div>

              {preview?.isVideo || currentImage?.match(/\.(mp4|mov)$/) ? (
                <video
                  className="w-full rounded-lg"
                  src={preview ? preview.url : getSafeMediaUrl(currentImage)}
                  controls
                  loop
                />
              ) : (
                <img
                  className="w-full rounded-lg"
                  src={preview ? preview.url : getSafeMediaUrl(currentImage)}
                  alt="Post preview"
                />
              )}
            </div>
          ) : (
            // File Upload
            <Label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center py-9 w-full border border-gray-300 border-dashed rounded-2xl cursor-pointer bg-gray-50"
            >
              <CloudUpload className="w-8 h-8 text-gray-400 mb-3" />
              <span className="text-gray-400 text-xs">
                PNG, JPG, or PDF, smaller than 15MB
              </span>
              <h6 className="text-gray-900 text-sm font-medium">
                Drag and Drop your file here or
              </h6>
              <Input
                id="dropzone-file"
                type="file"
                className="hidden"
                {...register("image")}
                onChange={handleFileChange}
              />
            </Label>
          )}
          <ErrorInput error={errors.image} />
        </div>

        {/* Error Message */}
        {updatePostError && (
          <div className="text-red-500 text-sm">{updatePostError}</div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isUpdatingPost || singlePostLoading}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition disabled:bg-blue-300"
        >
          {isUpdatingPost ? "Updating..." : "Update Post"}
        </Button>
      </form>
    </div>
  );
};

export default EditPostPage;
