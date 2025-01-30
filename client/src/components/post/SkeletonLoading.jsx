import { Button } from "@/components/common";
import { ArrowLeft } from "lucide-react";

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

export const SinglePostPage_SkeletonLoader = () => {
  return (
    <div className="w-full min-h-screen bg-black text-white">
      {/* Header */}
      <div className="flex items-center gap-6 px-4 py-3 border-b border-neutral-800 sticky top-0 bg-black/80 backdrop-blur-sm">
        <Button className="rounded-full p-2 hover:bg-neutral-900">
          <ArrowLeft size={20} />
        </Button>
        <div className="h-6 w-16 rounded-full bg-neutral-800 animate-pulse" />
      </div>

      {/* Main Tweet */}
      <article className="border-b border-neutral-800">
        {/* Tweet Header */}
        <div className="flex justify-between p-4">
          <div className="flex gap-3">
            <div className="w-12 h-12 rounded-full bg-neutral-800 animate-pulse" />
            <div>
              <div className="flex items-center gap-2">
                <div className="h-5 w-32 rounded-full bg-neutral-800 animate-pulse" />
                <div className="w-5 h-5 rounded-full bg-neutral-800 animate-pulse" />
              </div>
              <div className="h-4 w-24 rounded-full bg-neutral-800 animate-pulse mt-1" />
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-neutral-800 animate-pulse" />
        </div>

        {/* Tweet Content */}
        <div className="px-4 pb-3">
          <div className="space-y-2">
            <div className="h-6 w-3/4 rounded-full bg-neutral-800 animate-pulse" />
            <div className="h-6 w-full rounded-full bg-neutral-800 animate-pulse" />
            <div className="h-6 w-1/2 rounded-full bg-neutral-800 animate-pulse" />
          </div>
          <div className="h-4 w-48 rounded-full bg-neutral-800 animate-pulse mt-3" />
        </div>

        {/* Tweet Stats */}
        <div className="px-4 py-3 border-y border-neutral-800 flex gap-4">
          <div className="h-5 w-32 rounded-full bg-neutral-800 animate-pulse" />
          <div className="h-5 w-32 rounded-full bg-neutral-800 animate-pulse" />
        </div>

        {/* Tweet Actions */}
        <div className="px-4 py-2 flex justify-around border-b border-neutral-800">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-full bg-neutral-800 animate-pulse"
            />
          ))}
        </div>

        {/* Reply Input */}
        <div className="p-4 flex gap-4">
          <div className="w-12 h-12 rounded-full bg-neutral-800 animate-pulse" />
          <div className="flex-1">
            <div className="h-12 w-full rounded-lg bg-neutral-800 animate-pulse" />
            <div className="flex justify-between items-center mt-4">
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-neutral-800 animate-pulse"
                  />
                ))}
              </div>
              <div className="h-8 w-20 rounded-full bg-neutral-800 animate-pulse" />
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};
