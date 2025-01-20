import { Button } from "@/components/common";
import { Heart, MessageCircle, Bookmark, Repeat2 } from "lucide-react";
import { Link } from "react-router";

export const PostListActions = ({ post }) => {
  return (
    <div className="px-3 sm:px-4 pt-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button className="p-2 -ml-2 text-gray-500 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-500 transition-colors">
            <Heart className="w-6 h-6" />
          </Button>
          <Button className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500 transition-colors">
            <MessageCircle className="w-6 h-6" />
          </Button>
          <Button className="p-2 text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-500 transition-colors">
            <Repeat2 className="w-6 h-6" />
          </Button>
        </div>
        <Button className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500 transition-colors">
          <Bookmark className="w-6 h-6" />
        </Button>
      </div>

      {/* Likes Count */}
      <div className="mt-1 px-2">
        <p className="font-medium text-sm text-gray-900 dark:text-gray-100">
          {post.likes.length.toLocaleString()} likes
        </p>
      </div>

      {/* Caption */}
      <div className="mt-1 px-2 pb-3">
        <p className="text-sm">
          <span className="font-medium text-gray-900 dark:text-gray-100 mr-2">
            {post.author.username}
          </span>
          <span className="text-gray-800 dark:text-gray-200">
            {post.content}
          </span>
        </p>
      </div>

      {/* Comments Preview */}
      <div className="px-2 py-3 border-t border-gray-200 dark:border-neutral-700">
        <Link
          to={`/p/${post._id}`}
          className="text-sm text-gray-500 dark:text-gray-400"
        >
          View all {post.comments} comments
        </Link>
      </div>

      {/* Post Time */}
      <div className="px-2 pb-3">
        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">
          {post.date}
        </p>
      </div>
    </div>
  );
};

export default PostListActions;
