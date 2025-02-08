import { useState } from "react";
import { Heart, MessageCircle, Bookmark, Grid, ListFilter } from "lucide-react";
import { ProfilePosts_SkeletonLoading } from "@/components/profile/SkeletonLoading";
import { Link } from "react-router";
import { Button } from "@/components/common";
import { formatTimeAgo } from "@/lib/FormatDate";

export const ProfilePosts = ({ myProfile, isLoading, safeUrl }) => {
  const [activeTab, setActiveTab] = useState("posts");

  const postsWithImages = myProfile?.posts.filter((post) => post.image);
  const postsWithoutImages = myProfile?.posts.filter((post) => !post.image);

  if (isLoading) return <ProfilePosts_SkeletonLoading />;

  return (
    <section className="mt-8">
      <div className="bg-neutral-950 border border-neutral-800 rounded-t-lg p-2">
        <div className="flex gap-8">
          <Button
            onClick={() => setActiveTab("posts")}
            className={`flex items-center gap-2 py-3 ${
              activeTab === "posts"
                ? "border-t-2 border-indigo-500 text-indigo-400"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            <Grid size={20} />
            <span>Posts</span>
          </Button>

          <Button
            onClick={() => setActiveTab("tweets")}
            className={`flex items-center gap-2 py-3 ${
              activeTab === "tweets"
                ? "border-t-2 border-indigo-500 text-indigo-400"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            <ListFilter size={20} />
            <span>Tweets</span>
          </Button>
        </div>
      </div>

      <div className="bg-neutral-950 border-x border-b border-neutral-800 rounded-b-lg p-4">
        {activeTab === "posts" ? (
          <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-4">
            {postsWithImages?.map((post) => (
              <div
                key={post._id}
                className="aspect-square relative group rounded-xl overflow-hidden border border-neutral-800"
              >
                <Link to={`/p/${post._id}`}>
                  {post.image && post.image.match(/\.(mp4|webm|ogg)$/i) ? (
                    <video
                      src={safeUrl(post.image)}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <img
                      src={safeUrl(post.image)}
                      alt="Post Image"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  )}

                  <div className="absolute inset-0 bg-neutral-900/70 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-6 text-white transition-all duration-300">
                    <div className="flex items-center gap-1">
                      <Heart size={20} className="text-red-400" />
                      <span>{post.likes.length}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle size={20} className="text-blue-400" />
                      <span>{post.comment}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {postsWithoutImages?.map((post) => (
              <div
                key={post._id}
                className="border border-neutral-800 rounded-xl p-3 sm:p-4 bg-neutral-800/30 hover:bg-neutral-900/40 transition-colors"
              >
                {/* Header Section */}
                <Link to={`/p/${post._id}`}>
                  <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4 ">
                    <img
                      src={safeUrl(myProfile.user.profilePicture)}
                      alt={myProfile.user.username}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-700 flex-shrink-0"
                      loading="lazy"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                        <span className="font-bold text-gray-200 text-sm sm:text-base">
                          {myProfile.user.username}
                        </span>
                        <span className="text-gray-400 text-sm hidden sm:inline">
                          {myProfile.user.username}
                        </span>
                        <span className="text-gray-500 mx-1">·</span>
                        <span className="text-gray-400 text-xs sm:text-sm">
                          {formatTimeAgo(post.createdAt)}
                        </span>
                      </div>
                      <p className="mt-1 text-gray-300 text-sm sm:text-base break-words">
                        {post.content}
                      </p>
                    </div>
                  </div>

                  {/* Image Section */}
                  {post.image && (
                    <div className="mx-[-12px] sm:mx-0 mb-3 sm:mb-4">
                      <img
                        src={post.image}
                        alt={post.content}
                        className="w-full rounded-none sm:rounded-xl object-cover max-h-[512px]"
                        loading="lazy"
                      />
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between sm:justify-start sm:gap-6 text-gray-400">
                    <Button className="flex items-center gap-1 hover:text-red-400 transition-colors text-sm sm:text-base py-1 px-2 sm:px-3">
                      <Heart size={16} className="sm:w-5 sm:h-5" />
                      <span>{post.likes.length}</span>
                    </Button>
                    <Button className="flex items-center gap-1 hover:text-blue-400 transition-colors text-sm sm:text-base py-1 px-2 sm:px-3">
                      <MessageCircle size={16} className="sm:w-5 sm:h-5" />
                      <span>{post.commentCount}</span>
                    </Button>
                    <Button className="flex items-center gap-1 hover:text-yellow-400 transition-colors text-sm sm:text-base py-1 px-2 sm:px-3">
                      <Bookmark size={16} className="sm:w-5 sm:h-5" />
                    </Button>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfilePosts;
