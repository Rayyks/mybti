import { useState } from "react";
import { Heart, MessageCircle, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/common";
import { formatTimeAgo } from "@/lib/FormatDate";
import { MenuComment } from "@/components/ui";
import useUser from "@/hooks/useUser";
import { isDeleted } from "@/lib/isDeleted";
import { useCheckProfile } from "@/lib/checkProfile";

export const ReplyItem = ({ reply, getSafeMediaUrl, selectedComment }) => {
  const [showReplyMenu, setShowReplyMenu] = useState(false);
  const [showReportMenu, setShowReportMenu] = useState(false);
  const { author, content, createdAt, likes, replies, replyTo } = reply;
  const { isFollowing, handleFollowToggle } = useUser(author?._id);
  const { checkProfile } = useCheckProfile();

  return (
    <div className="mt-2 first:mt-0">
      <article>
        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between gap-2 relative">
            {/* Avatar */}
            <img
              src={
                isDeleted(author)
                  ? "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
                  : getSafeMediaUrl(author?.profilePicture)
              }
              alt={author?.username}
              className="w-8 h-8 rounded-full object-cover flex-shrink-0 hover:ring-2 ring-blue-500 transition-all ease-linear cursor-pointer"
              loading="lazy"
              onClick={() => {
                isDeleted(author) ? null : checkProfile(author?.username);
              }}
            />
            <div className="absolute left-10 flex gap-2 min-w-0">
              <span
                className="font-bold hover:underline truncate cursor-pointer"
                onClick={() => {
                  isDeleted(author) ? null : checkProfile(author?.username);
                }}
              >
                {isDeleted(author) ? "[Account Deleted]" : author?.username}
              </span>
              <span className="text-neutral-500">replied to</span>
              <span>{isDeleted(author) ? replyTo : "[Account Deleted]"}</span>
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
                  setShowReplyMenu(!showReplyMenu);
                }}
                className="rounded-full p-1.5 hover:bg-blue-500/10 hover:text-blue-500"
              >
                <MoreHorizontal size={16} />
              </Button>
              {showReplyMenu && (
                <MenuComment
                  isFollowing={isFollowing}
                  handleFollowToggle={handleFollowToggle}
                  author={author}
                  commentId={reply?._id}
                  showReplyMenu={showReplyMenu}
                  setShowReplyMenu={setShowReplyMenu}
                  showReportMenu={showReportMenu}
                  openReportMenu={() => setShowReportMenu(true)}
                  closeReportMenu={() => setShowReportMenu(false)}
                  closeMenuComment={() => setShowReplyMenu(false)}
                />
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
              onClick={() => selectedComment(reply?._id, author?.username)}
            >
              <MessageCircle size={16} />
              <span className="text-xs">Reply</span>
            </Button>
          </div>

          {/* Render nested replies */}
          {replies?.length > 0 && (
            <div className="mt-2 border-neutral-800">
              {replies.map((nestedReply) => (
                <ReplyItem
                  key={nestedReply?._id}
                  reply={nestedReply}
                  getSafeMediaUrl={getSafeMediaUrl}
                  selectedComment={selectedComment}
                  showReplyMenu={showReplyMenu}
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
