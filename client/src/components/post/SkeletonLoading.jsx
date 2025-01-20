import React from "react";

export const HomePage_SkeletonLoader = () => {
  const skeletonPosts = Array(3).fill(null);

  return (
    <div className="h-full w-full bg-gray-50 dark:bg-neutral-900">
      <div className="lg:max-w-[70%] mx-auto px-0 sm:px-2">
        <div className="space-y-3 sm:space-y-4">
          {skeletonPosts.map((_, index) => (
            <article
              key={index}
              className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 sm:rounded-lg overflow-hidden rounded-lg animate-pulse"
            >
              {/* Post Header Skeleton */}
              <div className="flex items-center justify-between px-3 sm:px-4 h-14 border-b border-gray-200 dark:border-neutral-700">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-neutral-700" />
                  <div className="h-4 w-24 bg-gray-200 dark:bg-neutral-700 rounded" />
                </div>
                <div className="w-8 h-8 rounded bg-gray-200 dark:bg-neutral-700" />
              </div>

              {/* Post Image Skeleton */}
              <div className="aspect-square bg-gray-200 dark:bg-neutral-700" />

              {/* Post Actions Skeleton */}
              <div className="px-3 sm:px-4 pt-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Action buttons skeleton */}
                    <div className="w-10 h-10 bg-gray-200 dark:bg-neutral-700 rounded" />
                    <div className="w-10 h-10 bg-gray-200 dark:bg-neutral-700 rounded" />
                    <div className="w-10 h-10 bg-gray-200 dark:bg-neutral-700 rounded" />
                  </div>
                  <div className="w-10 h-10 bg-gray-200 dark:bg-neutral-700 rounded" />
                </div>

                {/* Likes Count Skeleton */}
                <div className="mt-1 px-2">
                  <div className="h-4 w-20 bg-gray-200 dark:bg-neutral-700 rounded" />
                </div>

                {/* Caption Skeleton */}
                <div className="mt-1 px-2 pb-3">
                  <div className="space-y-2">
                    <div className="h-4 w-3/4 bg-gray-200 dark:bg-neutral-700 rounded" />
                    <div className="h-4 w-1/2 bg-gray-200 dark:bg-neutral-700 rounded" />
                  </div>
                </div>

                {/* Comments Preview Skeleton */}
                <div className="px-2 py-3 border-t border-gray-200 dark:border-neutral-700">
                  <div className="h-4 w-32 bg-gray-200 dark:bg-neutral-700 rounded" />
                </div>

                {/* Post Time Skeleton */}
                <div className="px-2 pb-3">
                  <div className="h-3 w-16 bg-gray-200 dark:bg-neutral-700 rounded" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
