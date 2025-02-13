import { ReplyItem } from "@/components/post";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/common";
export const RepliesSection = ({
  replies,
  showReplies,
  handleToggleReplies,
  getSafeMediaUrl,
  selectedComment,
  countReplies,
}) => {
  return (
    <>
      {replies.length > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleToggleReplies}
          className="mt-2 text-blue-500 text-sm flex items-center gap-1"
        >
          {showReplies ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          {showReplies
            ? "Hide Replies"
            : `View Replies (${countReplies(replies)})`}
        </Button>
      )}

      {showReplies && (
        <div className="mt-2 pl-4 border-l border-neutral-800">
          {replies.map((reply) => (
            <ReplyItem
              key={reply?._id}
              reply={reply}
              getSafeMediaUrl={getSafeMediaUrl}
              selectedComment={selectedComment}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default RepliesSection;
