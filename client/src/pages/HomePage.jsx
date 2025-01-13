import React from "react";
import {
  Heart,
  MessageCircle,
  Repeat2,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";
import { Link } from "react-router";
import { posts } from "@/assets/data/posts";

const DashboardPage = () => {
  return (
    <div className="h-full w-full bg-gray-50 dark:bg-neutral-900 ">
      {/* Main Content Container */}
      <div className="lg:max-w-[70%] mx-auto px-0 sm:px-2">
        {/* Posts Feed */}
        <div className="space-y-3 sm:space-y-4">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 sm:rounded-lg overflow-hidden rounded-lg"
            >
              {/* Post Header */}
              <div className="flex items-center justify-between px-3 sm:px-4 h-14 border-b border-gray-200 dark:border-neutral-700">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full ring-2 ring-gray-200 dark:ring-neutral-700">
                    <img
                      src="/api/placeholder/32/32"
                      alt={post.username}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <span className="font-medium text-sm text-gray-900 dark:text-gray-100">
                    {post.username}
                  </span>
                </div>
                <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              {/* Post Image - Instagram-style placeholder */}
              <div className="aspect-square bg-gray-100 dark:bg-neutral-900 border-y border-gray-200 dark:border-neutral-700">
                <img
                  src={post.image}
                  alt="Post content"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Post Actions */}
              <div className="px-3 sm:px-4 pt-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button className="p-2 -ml-2 text-gray-500 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-500 transition-colors">
                      <Heart className="w-6 h-6" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500 transition-colors">
                      <MessageCircle className="w-6 h-6" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-500 transition-colors">
                      <Repeat2 className="w-6 h-6" />
                    </button>
                  </div>
                  <button className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-500 transition-colors">
                    <Bookmark className="w-6 h-6" />
                  </button>
                </div>

                {/* Likes Count */}
                <div className="mt-1 px-2">
                  <p className="font-medium text-sm text-gray-900 dark:text-gray-100">
                    {post.likes.toLocaleString()} likes
                  </p>
                </div>

                {/* Caption */}
                <div className="mt-1 px-2 pb-3">
                  <p className="text-sm">
                    <span className="font-medium text-gray-900 dark:text-gray-100 mr-2">
                      {post.username}
                    </span>
                    <span className="text-gray-800 dark:text-gray-200">
                      {post.content}
                    </span>
                  </p>
                </div>

                {/* Comments Preview */}
                <div className="px-2 py-3 border-t border-gray-200 dark:border-neutral-700">
                  <Link
                    to={`/p/:id`}
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
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
