import { useState } from "react";
import { countReplies } from "@/lib/countReplies";
import {
  CommentHeader,
  CommentActions,
  RepliesSection,
} from "@/components/post/";
import { useCheckProfile } from "@/lib/checkProfile";
import useUser from "@/hooks/useUser";

export const CommentItem = ({
  comment,
  getSafeMediaUrl,
  selectedComment,
  isDeleted,
}) => {
  const [showReplies, setShowReplies] = useState(false);

  const { author, content, createdAt, likes, replies = [] } = comment;
  const totalReplies = countReplies(replies);
  const { checkProfile } = useCheckProfile();
  const { isFollowing, handleFollowToggle } = useUser(author?._id);

  const handleReplyClick = () =>
    selectedComment(comment?._id, author?.username);
  const handleToggleReplies = () => setShowReplies(!showReplies);

  return (
    <div className="py-2">
      <article className="px-4 py-3 flex gap-3 hover:bg-neutral-900/40 transition-colors">
        <img
          src={
            isDeleted(author)
              ? "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
              : getSafeMediaUrl(author?.profilePicture)
          }
          alt={author?.username}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0 cursor-pointer hover:ring-2 ring-blue-500 transition-all ease-linear"
          loading="lazy"
          onClick={() =>
            isDeleted(author) ? null : checkProfile(author.username)
          }
        />
        <div className="flex-1 min-w-0">
          <CommentHeader
            isFollowing={isFollowing}
            handleFollowToggle={handleFollowToggle}
            checkProfile={checkProfile}
            isDeleted={isDeleted(author)}
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
