import React, { useState } from "react";
import {
  X,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  Smile,
} from "lucide-react";
import { useNavigate } from "react-router";

const CommentItem = ({ comment }) => (
  <div className="flex gap-3 mb-4">
    <img
      src={comment.userAvatar}
      alt={comment.username}
      className="w-8 h-8 rounded-full object-cover"
    />
    <div className="flex-1">
      <div className="flex gap-2 items-baseline">
        <span className="font-medium text-white">{comment.username}</span>
        <span className="text-gray-400 text-sm">{comment.text}</span>
      </div>
      <div className="flex gap-4 mt-2 text-xs text-gray-400">
        <span>2h</span>
        <button className="hover:text-gray-300">Like</button>
        <button className="hover:text-gray-300">Reply</button>
      </div>
    </div>
  </div>
);

const SinglePostPage = () => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const goBack = () => {
    navigate(-1);
  };

  // Sample comments data
  const comments = [
    {
      id: 1,
      username: "johndoe",
      userAvatar: "/api/placeholder/32/32",
      text: "This is amazing! 🔥",
    },
    {
      id: 2,
      username: "janedoe",
      userAvatar: "/api/placeholder/32/32",
      text: "Love the composition",
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div className="bg-neutral-900 max-w-5xl w-full rounded-lg overflow-hidden flex max-md:flex-col">
        {/* Left side - Image */}
        <div className="w-full md:w-7/12 bg-neutral-950">
          <img
            src="/api/placeholder/600/600"
            alt="Post content"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right side - Content */}
        <div className="w-full md:w-5/12 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/api/placeholder/40/40"
                alt="User avatar"
                className="w-8 h-8 rounded-full"
              />
              <span className="font-medium text-white">username</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-white hover:text-gray-300">
                <MoreHorizontal size={20} />
              </button>
              <button
                onClick={goBack}
                className="text-white hover:text-gray-300"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Comments Section */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Original post content */}
            <div className="flex gap-3 mb-6">
              <img
                src="/api/placeholder/40/40"
                alt="User avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex gap-2 items-baseline">
                  <span className="font-medium text-white">username</span>
                  <span className="text-gray-300">
                    Original post caption goes here... #hashtag
                  </span>
                </div>
                <span className="text-xs text-gray-400 mt-2 block">
                  2 HOURS AGO
                </span>
              </div>
            </div>

            {/* Comments list */}
            {comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </div>

          {/* Action buttons */}
          <div className="p-4 border-t border-neutral-800">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`hover:text-gray-300 ${
                    isLiked ? "text-red-500" : "text-white"
                  }`}
                >
                  <Heart size={24} fill={isLiked ? "currentColor" : "none"} />
                </button>
                <button className="text-white hover:text-gray-300">
                  <MessageCircle size={24} />
                </button>
                <button className="text-white hover:text-gray-300">
                  <Share2 size={24} />
                </button>
              </div>
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`hover:text-gray-300 ${
                  isSaved ? "text-white" : "text-white"
                }`}
              >
                <Bookmark size={24} fill={isSaved ? "currentColor" : "none"} />
              </button>
            </div>

            <div className="text-white mb-4">
              <span className="font-medium">100,532 likes</span>
            </div>

            {/* Comment input */}
            <div className="flex items-center gap-3 mt-2">
              <Smile size={24} className="text-white" />
              <input
                type="text"
                placeholder="Add a comment..."
                className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none"
              />
              <button className="text-blue-400 font-medium hover:text-blue-300">
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePostPage;
