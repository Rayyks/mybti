import { useState } from "react";
import { countReplies } from "@/lib/countReplies";
import {
  CommentHeader,
  CommentActions,
  RepliesSection,
} from "@/components/post/";

export const CommentItem = ({ comment, getSafeMediaUrl, selectedComment }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const { author, content, createdAt, likes, replies = [] } = comment;
  const totalReplies = countReplies(replies);

  const handleLikeClick = () => setIsLiked(!isLiked);
  const handleReplyClick = () => selectedComment(comment?._id);
  const handleToggleReplies = () => setShowReplies(!showReplies);

  return (
    <div className="py-2">
      <article className="px-4 py-3 flex gap-3 hover:bg-neutral-900/40 transition-colors">
        <img
          src={getSafeMediaUrl(author?.profilePicture)}
          alt={author?.username}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          loading="lazy"
        />
        <div className="flex-1 min-w-0">
          <CommentHeader
            author={author}
            comment={comment}
            createdAt={createdAt}
          />
          <p className="mt-1 text-[15px] whitespace-pre-wrap break-words">
            {content}
          </p>
          <CommentActions
            handleReplyClick={handleReplyClick}
            totalReplies={totalReplies}
            handleLikeClick={handleLikeClick}
            isLiked={isLiked}
            likes={likes}
          />
          <RepliesSection
            replies={replies}
            showReplies={showReplies}
            handleToggleReplies={handleToggleReplies}
            getSafeMediaUrl={getSafeMediaUrl}
            selectedComment={selectedComment}
            countReplies={countReplies}
          />
        </div>
      </article>
    </div>
  );
};

export default CommentItem;
