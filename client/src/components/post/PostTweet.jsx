import { useState } from "react";
import { Button } from "@/components/common";
import { Heart, MessageCircle, Bookmark, MoreHorizontal } from "lucide-react";
import { Link } from "react-router";
import useReport from "@/hooks/useReport";
import { MorePostAction } from "@/components/post";
import { ReportModal } from "@/components/report";
import usePost from "@/hooks/usePost";

export const PostTweet = ({ post, safeUrl, index }) => {
  const { showMore, contentPreview, maxContentPreview, handleShowMore } =
    usePost();

  const [moreAction, setMoreAction] = useState(null);
  const { openReportModal, setOpenReportModal } = useReport();

  return (
    <div key={post._id} className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-start gap-3 mb-4">
        <Link to={`/profile/${post.author.username}`}>
          <img
            src={safeUrl(post.author.profilePicture)}
            alt={post.author.username}
            className="w-10 h-10 rounded-full"
            loading="lazy"
          />
        </Link>
        <div>
          <div className="flex items-center gap-2">
            <Link to={`/profile/${post.author.username}`}>
              <span className="font-bold hover:underline text-white">
                {post.author.username}
              </span>
            </Link>
            <span className="text-gray-300">· {post.author.mbti}</span>
            <span className="text-gray-500">·</span>
            <span className="text-gray-500">
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p className="mt-1 text-white">
            {showMore
              ? maxContentPreview(post.content)
              : contentPreview(post.content)}
            {post.content.length > 100 && (
              <Button
                className="text-gray-400 hover:underline"
                onClick={handleShowMore}
              >
                {showMore ? "show less" : "show more"}
              </Button>
            )}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-6 text-gray-500">
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
      <div className="px-2 py-3 border-t border-gray-200 dark:border-neutral-700">
        <Link
          to={`/p/${post._id}`}
          className="text-sm text-gray-500 dark:text-gray-400"
        >
          View all {post.comments} comments
        </Link>
      </div>
    </div>
  );
};

export default PostTweet;
