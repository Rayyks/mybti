import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/common";
import { MorePostAction } from "@/components/post";
import useReport from "@/hooks/useReport";
import ReportModal from "@/components/report/ReportModal";

export const PostListHeader = ({ post, safeUrl, index }) => {
  const [moreAction, setMoreAction] = useState(null);
  const { openReportModal, setOpenReportModal } = useReport();
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
        <span className="flex shrink-0 space-x-1">
          <Link
            to={`/profile/${post.author.username}`}
            className="font-medium text-sm text-gray-900 dark:text-gray-100"
          >
            {post.author.username}
          </Link>
          <p className="text-sm font-medium text-white ">
            ( {post.author.mbti} )
          </p>
        </span>
      </div>
      <Button
        className={`text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2 ${
          moreAction === index ? "hidden" : ""
        }`}
        onClick={() => setMoreAction(moreAction === index ? null : index)}
      >
        <MoreHorizontal className="w-5 h-5" />
      </Button>
      {moreAction === index && (
        <MorePostAction
          setOpenReportModal={setOpenReportModal}
          setMoreAction={setMoreAction}
          post={post}
          index={index}
        />
      )}
      {openReportModal && (
        <ReportModal
          reportType={"post"}
          id={post._id}
          openReportModal={openReportModal}
          setOpenReportModal={setOpenReportModal}
        />
      )}
    </div>
  );
};

export default PostListHeader;
