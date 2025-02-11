import { Button } from "@/components/common";
import { MessageCircle } from "lucide-react";

export const CommentActions = ({ handleReplyClick, totalReplies }) => (
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
  </div>
);

export default CommentActions;
