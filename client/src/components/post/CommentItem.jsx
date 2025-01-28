import { formatTimeAgo } from "@/lib/FormatDate";
import { getSafeMediaUrl } from "@/lib/getSafeMediaUrl";
import React from "react";

export const CommentItem = ({ comment }) => {
  return (
    <div className="flex gap-3 mb-4">
      <img
        src={getSafeMediaUrl(comment.author.profilePicture)}
        alt={comment.author.username}
        className="w-8 h-8 rounded-full object-cover"
      />
      <div className="flex-1">
        <div className="flex gap-2 items-baseline">
          <span className="font-medium text-white">
            {comment.author.username}
          </span>
          <span className="text-white text-sm">{comment.content}</span>
        </div>
        <div className="flex gap-4 mt-2 text-xs text-gray-400">
          <span>{formatTimeAgo(comment.createdAt)}</span>
          <button className="hover:text-gray-300">Like</button>
          <button className="hover:text-gray-300">Reply</button>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
