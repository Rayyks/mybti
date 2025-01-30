import { useState } from "react";
import {
  Heart,
  MessageCircle,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/common";
import { ReplyItem } from "@/components/post";
import { MenuComment } from "@/components/ui";
import { countReplies } from "@/lib/countReplies";
import { formatTimeAgo } from "@/lib/FormatDate";

export const CommentItem = ({ comment, getSafeMediaUrl, selectedComment }) => {
  const commentReplies = comment.replies || [];

  const [isLiked, setIsLiked] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const { author, content, createdAt, likes } = comment;

  const totalReplies = countReplies(commentReplies);

  return (
    <div className="py-2">
      <article className="px-4 py-3 flex gap-3 hover:bg-neutral-900/40 transition-colors cursor-pointer">
        {/* Avatar */}
        <img
          src={getSafeMediaUrl(author.profilePicture)}
          alt={author.username}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          loading="lazy"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-bold hover:underline truncate">
                {author.username}
              </span>
              <span className="text-neutral-500">·</span>
              <time className="text-neutral-500">
                {formatTimeAgo(createdAt)}
              </time>
            </div>
            <div className="relative flex-shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(!showMenu);
                }}
                className="rounded-full p-1.5 hover:bg-blue-500/10 hover:text-blue-500"
              >
                <MoreHorizontal size={16} />
              </Button>
              {showMenu && (
                <MenuComment author={author} commentId={comment._id} />
              )}
            </div>
          </div>

          <p className="mt-1 text-[15px] whitespace-pre-wrap break-words">
            {content}
          </p>

          <div className="flex items-center gap-16 mt-2">
            <Button
              variant="ghost"
              size="sm"
              className="group flex items-center gap-2 text-neutral-500 hover:text-blue-500"
              onClick={() => selectedComment(comment._id)}
            >
              <MessageCircle size={18} />
              {totalReplies > 0 && (
                <span className="text-sm">{totalReplies}</span>
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsLiked(!isLiked)}
              className="group flex items-center gap-2 text-neutral-500 hover:text-pink-500"
            >
              <Heart
                size={18}
                className={isLiked ? "fill-pink-500 text-pink-500" : ""}
              />
              {likes?.length > 0 && (
                <span className={`text-sm ${isLiked ? "text-pink-500" : ""}`}>
                  {likes.length}
                </span>
              )}
            </Button>
          </div>

          {commentReplies.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowReplies(!showReplies)}
              className="mt-2 text-blue-500 text-sm flex items-center gap-1"
            >
              {showReplies ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
              {showReplies ? "Hide Replies" : `View Replies (${totalReplies})`}
            </Button>
          )}

          {showReplies && (
            <div className="mt-2 pl-4 border-l border-neutral-800">
              {commentReplies.map((reply) => (
                <ReplyItem
                  key={reply._id}
                  reply={reply}
                  getSafeMediaUrl={getSafeMediaUrl}
                  selectedComment={selectedComment}
                />
              ))}
            </div>
          )}
        </div>
      </article>
    </div>
  );
};

export default CommentItem;
