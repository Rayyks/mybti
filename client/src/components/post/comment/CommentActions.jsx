import { Button } from "@/components/common";
import { Heart, MessageCircle } from "lucide-react";

export const CommentActions = ({
  handleReplyClick,
  totalReplies,
  handleLikeClick,
  isLiked,
  likes,
}) => (
  <div className="flex items-center gap-16 mt-2">
    <Button
      variant="ghost"
      size="sm"
      className="group flex items-center gap-2 text-neutral-500 hover:text-blue-500"
      onClick={handleReplyClick}
    >
      <MessageCircle size={18} />
      {totalReplies > 0 && <span className="text-sm">{totalReplies}</span>}
    </Button>
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLikeClick}
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
);

export default CommentActions;
