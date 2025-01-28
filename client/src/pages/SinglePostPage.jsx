import React, { useState } from "react";
import {
  X,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";
import { CommentItem } from "@/components/post";
import { CommentInput } from "@/components/ui";
import { Button } from "@/components/common";
import usePost from "@/hooks/usePost";
import { SinglePost_SkeletonLoader } from "@/components/post/SkeletonLoading";
import { getSafeMediaUrl } from "@/lib/getSafeMediaUrl";
import { formatTimeAgo } from "@/lib/FormatDate";

const SinglePostPage = () => {
  const { singlePost, singlePostLoading, singlePostError, navigate } =
    usePost();
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const goBack = () => {
    navigate(-1);
  };

  if (singlePostLoading) {
    return <SinglePost_SkeletonLoader />;
  }

  if (singlePostError) {
    return (
      <div className="fixed inset-0 bg-black/90 flex items-center justify-center">
        <div className="bg-neutral-900 p-6 rounded-xl text-center">
          <p className="text-red-400 text-lg">Something went wrong...</p>
          <Button
            onClick={goBack}
            className="mt-4 text-white hover:text-gray-300"
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4">
      <div className="bg-neutral-900 max-w-6xl w-full rounded-xl overflow-hidden flex max-md:flex-col shadow-2xl">
        {/* Left side - Image */}
        <div className="w-full md:w-7/12 bg-neutral-950 relative">
          <img
            src={getSafeMediaUrl(singlePost?.data?.image)}
            alt="Post content"
            className="w-full h-full object-cover"
            loading="lazy"
          />

          <Button
            onClick={goBack}
            className="absolute top-4 left-4 text-white hover:text-gray-300 bg-black/50 rounded-full p-2 backdrop-blur-sm"
          >
            <X size={20} />
          </Button>
        </div>

        {/* Right side - Content */}
        <div className="w-full md:w-5/12 flex flex-col bg-neutral-900">
          {/* Header */}
          <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={getSafeMediaUrl(
                    singlePost?.data?.author?.profilePicture
                  )}
                  alt={singlePost?.data?.username}
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-white hover:underline cursor-pointer">
                  {singlePost?.data?.author?.username}
                </span>
              </div>
            </div>
            <Button
              className="text-white hover:text-gray-300 hover:bg-neutral-800 rounded-full p-2"
              onClick
            >
              <MoreHorizontal size={20} />
            </Button>
          </div>

          {/* Comments Section */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-neutral-900">
            {/* Original post content */}
            <div className="flex gap-4">
              <img
                src={getSafeMediaUrl(singlePost?.data?.author?.profilePicture)}
                alt="User avatar"
                className="w-8 h-8 rounded-full object-cover"
                loading="lazy"
              />
              <div className="flex-1">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white hover:underline cursor-pointer">
                      {singlePost?.data?.author?.username}
                    </span>
                    <span className="text-xs text-neutral-400">• Author</span>
                  </div>
                  <span className="text-white leading-relaxed">
                    {singlePost?.data?.content}
                  </span>
                </div>
              </div>
            </div>

            {/* Comments list */}
            <div className="space-y-6">
              {singlePost?.data?.comments.map((comment) => (
                <CommentItem key={comment._id} comment={comment} />
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="p-5 border-t border-neutral-800 bg-neutral-900/90 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <Button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`hover:scale-110 transition-transform ${
                    isLiked ? "text-red-500" : "text-white"
                  }`}
                >
                  <Heart size={26} fill={isLiked ? "currentColor" : "none"} />
                </Button>
                <Button className="text-white hover:scale-110 transition-transform">
                  <MessageCircle size={26} />
                </Button>
                <Button className="text-white hover:scale-110 transition-transform">
                  <Share2 size={26} />
                </Button>
              </div>
              <Button
                onClick={() => setIsSaved(!isSaved)}
                className={`hover:scale-110 transition-transform ${
                  isSaved ? "text-white" : "text-white"
                }`}
              >
                <Bookmark size={26} fill={isSaved ? "currentColor" : "none"} />
              </Button>
            </div>

            <div className="text-white mb-4 border-b border-neutral-700/50 pb-4">
              <span className="font-semibold text-lg">
                {singlePost?.data?.likes.length.toLocaleString()} likes
              </span>
              <span className="text-xs text-neutral-400 mt-2 block">
                {formatTimeAgo(singlePost?.data?.createdAt)}
              </span>
            </div>

            {/* Comment input */}
            <CommentInput />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePostPage;
