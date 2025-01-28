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

export const SinglePost_SkeletonLoader = () => {
  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div className="bg-neutral-900 max-w-5xl w-full rounded-lg overflow-hidden flex max-md:flex-col">
        {/* Left side - Image skeleton */}
        <div className="w-full md:w-7/12 bg-neutral-950">
          <div className="w-full h-full aspect-square animate-pulse bg-neutral-800" />
        </div>

        {/* Right side - Content skeleton */}
        <div className="w-full md:w-5/12 flex flex-col">
          {/* Header skeleton */}
          <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full animate-pulse bg-neutral-800" />
              <div className="h-4 w-24 rounded animate-pulse bg-neutral-800" />
            </div>
            <div className="flex items-center gap-4">
              <div className="w-5 h-5 rounded animate-pulse bg-neutral-800" />
              <div className="w-5 h-5 rounded animate-pulse bg-neutral-800" />
            </div>
          </div>

          {/* Comments Section skeleton */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Original post content skeleton */}
            <div className="flex gap-3 mb-6">
              <div className="w-8 h-8 rounded-full animate-pulse bg-neutral-800" />
              <div className="flex-1">
                <div className="flex flex-col gap-2">
                  <div className="h-4 w-24 rounded animate-pulse bg-neutral-800" />
                  <div className="h-4 w-3/4 rounded animate-pulse bg-neutral-800" />
                </div>
              </div>
            </div>

            {/* Comments list skeleton */}
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex gap-3">
                <div className="w-8 h-8 rounded-full animate-pulse bg-neutral-800" />
                <div className="flex-1">
                  <div className="flex flex-col gap-2">
                    <div className="h-4 w-24 rounded animate-pulse bg-neutral-800" />
                    <div className="h-4 w-2/3 rounded animate-pulse bg-neutral-800" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action buttons skeleton */}
          <div className="p-4 border-t border-neutral-800">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="w-6 h-6 rounded animate-pulse bg-neutral-800"
                  />
                ))}
              </div>
              <div className="w-6 h-6 rounded animate-pulse bg-neutral-800" />
            </div>

            <div className="mb-4 border-b border-neutral-700 pb-4">
              <div className="h-4 w-32 rounded animate-pulse bg-neutral-800 mb-2" />
              <div className="h-3 w-20 rounded animate-pulse bg-neutral-800" />
            </div>

            {/* Comment input skeleton */}
            <div className="h-10 rounded-full animate-pulse bg-neutral-800" />
          </div>
        </div>
      </div>
    </div>
  );
};
