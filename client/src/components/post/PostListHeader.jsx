import { MoreHorizontal } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/common";
import { MorePostAction } from "@/components/post";
import ReportModal from "@/components/report/ReportModal";
import { useModal } from "@/context/modalContext";

export const PostListHeader = ({ post, safeUrl, index }) => {
  const {
    openMoreAction,
    openReportModal,
    openReportMenu,
    closeReportMenu,
    openMoreActionMenu,
    closeMoreActionMenu,
  } = useModal();
  return (
    <div className="flex items-center justify-between px-3 sm:px-4 h-14 border-b border-gray-200 dark:border-neutral-700">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-full ring-2 ring-gray-200 dark:ring-neutral-700">
          <Link to={`/profile/${post.author.username}`}>
            <img
              src={safeUrl(post.author.profilePicture)}
              alt={post.username}
              className="w-full h-full rounded-full object-cover"
            />
          </Link>
        </div>
        <span className="flex items-center gap-2">
          <Link
            to={`/profile/${post.author.username}`}
            className="font-medium text-sm text-gray-900 dark:text-gray-100 hover:underline"
          >
            {post.author.username}
          </Link>
          <span className="text-gray-300">· {post.author.mbti}</span>
        </span>
      </div>
      <Button
        className={`text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2 ${
          openMoreAction === index ? "hidden" : ""
        }`}
        onClick={() =>
          openMoreActionMenu(openMoreAction === index ? null : index)
        }
      >
        <MoreHorizontal className="w-5 h-5" />
      </Button>
      {openMoreAction === index && (
        <MorePostAction
          openReportMenu={openReportMenu}
          closeMoreActionMenu={closeMoreActionMenu}
          post={post}
          index={index}
        />
      )}
      {openReportModal && (
        <ReportModal
          reportType={"post"}
          id={post._id}
          openReportModal={openReportModal}
          closeReportMenu={closeReportMenu}
        />
      )}
    </div>
  );
};

export default PostListHeader;
