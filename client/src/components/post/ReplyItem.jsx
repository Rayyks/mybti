import { useState } from "react";
import { Heart, MessageCircle, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/common";
import { formatTimeAgo } from "@/lib/FormatDate";
import { MenuComment } from "@/components/ui";

export const ReplyItem = ({ reply, getSafeMediaUrl, selectedComment }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { author, content, createdAt, likes, replies } = reply;

  return (
    <div className="mt-2 first:mt-0">
      <article>
        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between gap-2 relative">
            {/* Avatar */}
            <img
              src={getSafeMediaUrl(author.profilePicture)}
              alt={author.username}
              className="w-8 h-8 rounded-full object-cover flex-shrink-0"
              loading="lazy"
            />
            <div className="absolute left-10 flex gap-2 min-w-0">
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
                <MenuComment author={author} commentId={reply._id} />
              )}
            </div>
          </div>

          {/* Reply text */}
          <p className="mt-1 text-sm whitespace-pre-wrap break-words">
            {content}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-16 mt-2">
            <Button
              variant="ghost"
              size="sm"
              className="group flex items-center gap-2 text-neutral-500 hover:text-blue-500"
              onClick={() => selectedComment(reply._id)}
            >
              <MessageCircle size={16} />
              <span className="text-xs">Reply</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsLiked(!isLiked)}
              className="group flex items-center gap-2 text-neutral-500 hover:text-pink-500"
            >
              <Heart
                size={16}
                className={isLiked ? "fill-pink-500 text-pink-500" : ""}
              />
              {likes?.length > 0 && (
                <span className={`text-xs ${isLiked ? "text-pink-500" : ""}`}>
                  {likes.length}
                </span>
              )}
            </Button>
          </div>

          {/* Render nested replies */}
          {replies?.length > 0 && (
            <div className="mt-2 border-neutral-800">
              {replies.map((nestedReply) => (
                <ReplyItem
                  key={nestedReply._id}
                  reply={nestedReply}
                  getSafeMediaUrl={getSafeMediaUrl}
                />
              ))}
            </div>
          )}
        </div>
      </article>
    </div>
  );
};

export default ReplyItem;
