import React from "react";
import { Button } from "@/components/common";
import { Heart, MessageCircle, Bookmark, Repeat2 } from "lucide-react";
import { Link } from "react-router";
import usePost from "@/hooks/usePost";
import { formatTimeAgo } from "@/lib/FormatDate";
import usePostActions from "@/hooks/usePostActions";

export const PostListActions = ({ post, isLoading }) => {
  const { showMore, contentPreview, maxContentPreview, handleShowMore } =
    usePost();
  const { isSaved, handleSavePost, isLiked, handleLikePost, likeCount } =
    usePostActions(post);

  return (
    <div className="px-3 sm:px-4 pt-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            className={`p-2 -ml-2 transition-colors ${
              isLiked
                ? "text-pink-600 dark:text-pink-500"
                : "text-gray-500 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-500"
            }`}
            onClick={handleLikePost}
          >
            {isLoading ? (
              <Heart className="w-6 h-6" fill="none" />
            ) : (
              <Heart
                className="w-6 h-6"
                fill={isLiked ? "currentColor" : "none"}
              />
            )}
          </Button>

          <Link to={`/p/${post._id}`}>
            <Button className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500 transition-colors">
              <MessageCircle className="w-6 h-6" />
            </Button>
          </Link>

          <Button className="p-2 text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-500 transition-colors">
            <Repeat2 className="w-6 h-6" />
          </Button>
        </div>

        <Button
          className={`p-2 transition-colors ${
            isSaved
              ? "text-blue-600 dark:text-blue-500"
              : "text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500"
          }`}
          onClick={() => handleSavePost(post._id)}
        >
          <Bookmark
            className="w-6 h-6"
            fill={isSaved ? "currentColor" : "none"}
          />
        </Button>
      </div>

      <div className="mt-1 px-2 space-y-1">
        <p className="font-medium text-sm text-gray-900 dark:text-gray-100">
          {likeCount} likes
        </p>
        {post.repostCount > 0 && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {post.repostCount.toLocaleString()} reposts
          </p>
        )}
      </div>

      <div className="mt-1 px-2 pb-3">
        <p className="text-sm">
          <Link
            to={`/profile/${post.author.username}`}
            className="font-medium text-gray-900 dark:text-gray-100 hover:underline mr-2"
          >
            {post.author.username}
          </Link>
          <span className="text-gray-800 dark:text-gray-200">
            {showMore
              ? maxContentPreview(post.content)
              : contentPreview(post.content)}
            {post.content.length > 100 && (
              <Button
                className="ml-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                onClick={handleShowMore}
              >
                {showMore ? "show less" : "show more"}
              </Button>
            )}
          </span>
        </p>
      </div>

      <div className="px-2 py-3 border-t border-gray-200 dark:border-neutral-700">
        <Link
          to={`/p/${post._id}`}
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
        >
          View all {post.commentCount} comments
        </Link>
      </div>

      <div className="px-2 pb-3">
        <Link
          to={`/p/${post._id}`}
          className="text-xs text-gray-500 dark:text-gray-400 uppercase hover:underline"
        >
          {formatTimeAgo(post.createdAt)}
        </Link>
      </div>
    </div>
  );
};

export default PostListActions;
