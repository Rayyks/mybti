import { Button } from "@/components/common";
import { Heart, MessageCircle, Bookmark, MoreHorizontal } from "lucide-react";
import { Link } from "react-router";
import { MorePostAction } from "@/components/post";
import { ReportModal } from "@/components/report";
import usePost from "@/hooks/usePost";
import { useModal } from "@/context/modalContext";
import { formatTimeAgo } from "@/lib/FormatDate";
import { useCheckProfile } from "@/lib/checkProfile";

export const PostTweet = ({ post, safeUrl, index }) => {
  const { showMore, contentPreview, maxContentPreview, handleShowMore } =
    usePost();
  const {
    openMoreAction,
    openReportModal,
    openReportMenu,
    closeReportMenu,
    openMoreActionMenu,
    closeMoreActionMenu,
  } = useModal();
  const { checkProfile } = useCheckProfile();

  return (
    <div key={post._id} className="border border-gray-200 rounded-lg p-4">
      {/* Main post content container */}
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          <img
            src={safeUrl(post.author.profilePicture)}
            alt={post.author.username}
            className="w-10 h-10 rounded-full cursor-pointer"
            loading="lazy"
            onClick={() => checkProfile(post.author.username)}
          />
        </div>
        <div className="flex-grow min-w-0">
          {/* User info */}
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="font-bold hover:underline text-white cursor-pointer"
              onClick={() => checkProfile(post.author.username)}
            >
              {post.author.username}
            </span>
            <span className="text-gray-300">· {post.author.mbti}</span>
          </div>

          {/* Post content */}
          <div className="mt-1 text-white break-words">
            {showMore
              ? maxContentPreview(post.content)
              : contentPreview(post.content)}
            {post.content.length > 100 && (
              <Button
                className="text-gray-400 hover:underline ml-1"
                onClick={handleShowMore}
              >
                {showMore ? "show less" : "show more"}
              </Button>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-6 text-gray-500 mt-4">
            <Button className="flex items-center gap-1 hover:text-red-500">
              <Heart size={20} />
              <span>{post.likes.length}</span>
            </Button>
            <Link
              to={`/p/${post._id}`}
              className="flex items-center gap-1 hover:text-blue-500"
            >
              <Button className="flex items-center gap-1 hover:text-blue-500">
                <MessageCircle size={20} />
                <span>{post.commentCount}</span>
              </Button>
            </Link>
            <Button className="flex items-center gap-1 hover:text-yellow-500">
              <Bookmark size={20} />
            </Button>
            <Button
              className={`ml-auto text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2 ${
                openMoreAction === index ? "hidden" : ""
              }`}
              onClick={() =>
                openMoreActionMenu(openMoreAction === index ? null : index)
              }
            >
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* More actions popup */}
      {openMoreAction === index && (
        <MorePostAction
          openReportMenu={openReportMenu}
          closeMoreActionMenu={closeMoreActionMenu}
          post={post}
          index={index}
        />
      )}

      {/* Report modal */}
      {openReportModal && (
        <ReportModal
          reportType={"post"}
          id={post._id}
          openReportModal={openReportModal}
          closeReportMenu={closeReportMenu}
        />
      )}

      {/* Comments section */}
      <div className="mt-4 px-2 py-3 border-t border-gray-200 dark:border-neutral-700">
        <Link
          to={`/p/${post._id}`}
          className="text-sm text-gray-500 dark:text-gray-400"
        >
          View all {post.commentCount} comments
        </Link>
      </div>

      {/* Post time */}
      <div className="px-2 pb-3">
        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">
          {formatTimeAgo(post.createdAt)}
        </p>
      </div>
    </div>
  );
};

export default PostTweet;
