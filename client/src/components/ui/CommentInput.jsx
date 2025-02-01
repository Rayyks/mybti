import React from "react";
import { Button } from "@/components/common";
import useProfile from "@/hooks/useProfile";
import usePostActions from "@/hooks/usePostActions";
import { Smile } from "lucide-react";

export const CommentInput = ({
  getSafeMediaUrl,
  singlePost,
  selectedParentCommentId,
  setSelectedParentCommentId,
}) => {
  const { myProfile } = useProfile();
  const {
    register,
    handleSubmit,
    errors,
    commentPostLoading,
    replyCommentLoading,
    handleCommentPost,
    handleReplyComment,
  } = usePostActions();

  const onSubmit = (data) => {
    if (selectedParentCommentId) {
      handleReplyComment(
        singlePost?._id,
        selectedParentCommentId,
        data.content
      );
    } else {
      handleCommentPost(singlePost?._id, data.content);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="p-4 flex gap-4">
        <img
          src={getSafeMediaUrl(myProfile?.data?.profilePicture)}
          alt="Your profile"
          className="w-12 h-12 rounded-full"
          loading="lazy"
        />
        <div className="flex-1">
          <textarea
            {...register("content", { required: true })}
            placeholder={
              selectedParentCommentId
                ? "Post your reply!"
                : "Post your comment!"
            }
            className="w-full bg-transparent resize-none outline-none text-lg placeholder:text-neutral-500"
            rows={1}
          />
          {errors.content && (
            <span className="text-red-500 text-sm">Content is required</span>
          )}
          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-1">
              <Button className="rounded-full p-2 hover:bg-blue-500/10 text-primary-500">
                <Smile size={20} />
              </Button>
              {selectedParentCommentId && (
                <Button
                  className="border-b-[1px] border-blue-600"
                  onClick={() => setSelectedParentCommentId(null)}
                >
                  Switch to comment
                </Button>
              )}
            </div>
            <Button
              type="submit"
              disabled={commentPostLoading || replyCommentLoading}
              className={`px-4 py-1.5 bg-neutral-700 text-white font-bold rounded-full ${
                commentPostLoading || replyCommentLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-neutral-500 transition-colors ease-linear"
              }`}
            >
              {commentPostLoading || replyCommentLoading
                ? "Loading..."
                : selectedParentCommentId
                ? "Reply"
                : "Comment"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CommentInput;
