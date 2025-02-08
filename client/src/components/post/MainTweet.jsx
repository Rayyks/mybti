import { MoreHorizontal, Heart, Upload, Bookmark } from "lucide-react";
import { CommentInput } from "@/components/ui";
import { Button } from "@/components/common";
import { useCheckProfile } from "@/lib/checkProfile";
import { formatTimeAgo } from "@/lib/FormatDate";
import { useModal } from "@/context/modalContext";
import MorePostAction from "./MorePostAction";
import { ReportModal } from "../report";
import usePostActions from "@/hooks/usePostActions";

export const MainTweet = ({
  getSafeMediaUrl,
  singlePost,
  selectedParentCommentId,
  setSelectedParentCommentId,
}) => {
  const { handleSavePost, handleLikePost, isLiked, likeCount, isSaved } =
    usePostActions(singlePost);

  const {
    openMoreAction,
    openMoreActionMenu,
    closeMoreActionMenu,
    openReportModal,
    openReportMenu,
    closeReportMenu,
  } = useModal();
  const { checkProfile } = useCheckProfile();

  return (
    <article className="border-b border-neutral-800">
      {/* Tweet Header */}
      <div className="flex justify-between p-4">
        <div className="flex gap-3">
          <img
            src={getSafeMediaUrl(singlePost?.author?.profilePicture)}
            alt="Profile"
            className="w-12 h-12 rounded-full cursor-pointer"
            loading="lazy"
            onClick={() => checkProfile(singlePost?.author?.username)}
          />

          <div>
            <div className="flex items-center gap-2">
              <span
                className="font-bold hover:underline cursor-pointer"
                onClick={() => checkProfile(singlePost?.author?.username)}
              >
                {singlePost?.author?.username}
              </span>
              {/* VERIF ICON HERE */}
              <span className="text-neutral-400">
                · {singlePost?.author?.mbti}
              </span>
            </div>
          </div>
        </div>
        <Button
          className="h-fit rounded-full p-2 hover:bg-neutral-900 hover:text-primary-500"
          onClick={openMoreActionMenu}
        >
          <MoreHorizontal size={20} />
        </Button>
        {openMoreAction && (
          <MorePostAction
            openMoreActionMenu={openMoreActionMenu}
            closeMoreActionMenu={closeMoreActionMenu}
            openReportMenu={openReportMenu}
            post={singlePost}
          />
        )}

        {openReportModal && (
          <ReportModal
            reportType={"post"}
            id={singlePost._id}
            openReportModal={openReportModal}
            closeReportMenu={closeReportMenu}
          />
        )}
      </div>

      {/* Tweet Content */}
      <div className="px-4 pb-3">
        <p className="text-xl whitespace-pre-wrap">{singlePost?.content}</p>
        {singlePost?.image &&
          (singlePost.image.match(/\.(mp4|webm|ogg)$/i) ? (
            <video
              src={getSafeMediaUrl(singlePost?.image)}
              controls
              className="mt-3 rounded-2xl border border-neutral-800"
            />
          ) : (
            <img
              src={getSafeMediaUrl(singlePost?.image)}
              alt="Tweet image"
              className="mt-3 rounded-2xl border border-neutral-800"
            />
          ))}
        <time className="block mt-3 text-neutral-500">
          {formatTimeAgo(singlePost?.createdAt)}
        </time>
      </div>

      {/* Tweet Stats */}
      <div className="px-4 py-3 border-y border-neutral-800 flex gap-4">
        <span className="hover:underline cursor-pointer">
          <strong className="text-white">{likeCount}</strong>{" "}
          <span className="text-neutral-500">Likes</span>
        </span>
        <span className="hover:underline cursor-pointer">
          <strong className="text-white">{singlePost?.comments.length}</strong>{" "}
          <span className="text-neutral-500">Comments</span>
        </span>
      </div>

      {/* Tweet Actions */}
      <div className="px-4 py-2 flex justify-around border-b border-neutral-800">
        <Button
          onClick={handleLikePost} // Handling like post with the hook
          className={`rounded-full p-2 ${
            isLiked
              ? "text-pink-500"
              : "hover:bg-pink-500/10 hover:text-pink-500"
          }`}
        >
          <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
        </Button>
        <Button
          className={`p-2 transition-colors ${
            isSaved
              ? "text-blue-600 dark:text-blue-500"
              : "text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500"
          }`}
          onClick={() => handleSavePost(singlePost?._id)}
        >
          <Bookmark
            className="w-6 h-6"
            fill={isSaved ? "currentColor" : "none"}
          />
        </Button>
      </div>

      {/* Comment Input */}
      <CommentInput
        getSafeMediaUrl={getSafeMediaUrl}
        singlePost={singlePost}
        selectedParentCommentId={selectedParentCommentId}
        setSelectedParentCommentId={setSelectedParentCommentId}
      />
    </article>
  );
};

export default MainTweet;
