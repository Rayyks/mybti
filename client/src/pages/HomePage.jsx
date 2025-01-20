import usePost from "@/hooks/usePost";
import { HomePage_SkeletonLoader } from "@/components/post/SkeletonLoading";
import { getSafeImageUrl } from "@/lib/getSafeImageUrl";
import { PostListActions, PostListHeader } from "@/components/post";

const DashboardPage = () => {
  const { post, isLoading, isError } = usePost();

  if (isError) return <p>Error...</p>;
  if (isLoading) return <HomePage_SkeletonLoader />;

  return (
    <div className="h-full w-full bg-gray-50 dark:bg-neutral-900 ">
      {/* Main Content Container */}
      <div className="lg:max-w-[70%] mx-auto px-0 sm:px-2">
        {/* Posts Feed */}
        <div className="space-y-3 sm:space-y-4">
          {post?.data.length > 0 ? (
            post?.data.map((post, index) => (
              <article
                key={post._id}
                className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 sm:rounded-lg overflow-hidden rounded-lg"
              >
                {/* Post Header */}
                <PostListHeader
                  post={post}
                  index={index}
                  safeUrl={getSafeImageUrl}
                />

                {/* Post Image - Instagram-style placeholder */}
                <div className="aspect-square bg-gray-100 dark:bg-neutral-900 border-y border-gray-200 dark:border-neutral-700">
                  <img
                    src={getSafeImageUrl(post.image)}
                    alt="Post content"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Post Actions */}
                <PostListActions post={post} />
              </article>
            ))
          ) : (
            <p className="text-xl my-14 font-bold text-center text-gray-500 dark:text-gray-400">
              No posts to show neagaaa
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
