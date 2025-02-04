import { Button } from "@/components/common";
import { formatTimeAgo } from "@/lib/FormatDate";
import { MenuComment } from "@/components/ui";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";

export const CommentHeader = ({ author, comment, createdAt }) => {
  const [showMenuComment, setShowMenuComment] = useState(false);
  const [showReportMenu, setShowReportMenu] = useState(false);
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2 min-w-0">
        <span className="font-bold hover:underline truncate">
          {author?.username}
        </span>
        <span className="text-neutral-500">·</span>
        <time className="text-neutral-500">{formatTimeAgo(createdAt)}</time>
      </div>
      <div className="relative flex-shrink-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            setShowMenuComment(!showMenuComment);
          }}
          className="rounded-full p-1.5 hover:bg-blue-500/10 hover:text-blue-500"
        >
          <MoreHorizontal size={16} />
        </Button>
        {showMenuComment && (
          <MenuComment
            author={author}
            commentId={comment?._id}
            closeMenuComment={() => setShowMenuComment(false)}
            openReportMenu={() => setShowReportMenu(true)}
            closeReportMenu={() => setShowReportMenu(false)}
            showMenuComment={showMenuComment}
            showReportMenu={showReportMenu}
          />
        )}
      </div>
    </div>
  );
};

export default CommentHeader;
