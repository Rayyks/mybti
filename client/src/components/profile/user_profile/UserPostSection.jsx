import { Heart, MessageCircle, Bookmark } from "lucide-react";
import { formatTimeAgo } from "@/lib/FormatDate";

export const UserPostSection = ({ posts, activeTab, getSafeMediaUrl }) => {
  return (
    <div className="mt-8">
      {activeTab === "posts" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
          {posts?.map(
            (post) =>
              post.image && (
                <div
                  key={post._id}
                  className="aspect-square relative group rounded-lg overflow-hidden bg-neutral-800"
                >
                  <img
                    src={post.image}
                    alt={post.content}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Overlay with interaction stats */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 sm:gap-6 text-white transition-all duration-200">
                    <div className="flex items-center gap-1 sm:gap-2 -translate-y-2 group-hover:translate-y-0 transition-transform">
                      <Heart size={18} className="text-white" />
                      <span className="font-semibold text-sm sm:text-base">
                        {post.likes.length}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 translate-y-2 group-hover:translate-y-0 transition-transform">
                      <MessageCircle size={18} className="text-white" />
                      <span className="font-semibold text-sm sm:text-base">
                        {post.commentCount || 0}
                      </span>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-6">
          {posts?.map((post) => (
            <div
              key={post._id}
              className="border border-neutral-800 rounded-xl p-3 sm:p-4 md:p-6 hover:bg-neutral-900/50 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                {/* Profile picture */}
                <img
                  src={getSafeMediaUrl(post.author.profilePicture)}
                  alt={post.author.username}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
                  loading="lazy"
                />

                {/* Post content */}
                <div className="flex-1 min-w-0">
                  {/* User info and timestamp */}
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-bold">{post.author.username}</span>
                    <span className="text-neutral-500 text-sm">
                      {post.author.mbti}
                    </span>
                    <span className="text-neutral-500 text-sm hidden sm:inline">
                      ·
                    </span>
                    <span className="text-neutral-500 text-sm">
                      {formatTimeAgo(post.createdAt)}
                    </span>
                  </div>
                  {/* Post text */}
                  <p className="text-neutral-300 break-words">{post.content}</p>
                  {/* Interaction buttons */}
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-3 sm:mt-4 text-neutral-400">
                    <button className="flex items-center gap-1 sm:gap-2 hover:text-red-500 transition-colors">
                      <Heart size={18} className="lg:size-6" />
                      <span className="text-sm sm:text-base">
                        {post.likes.length}
                      </span>
                    </button>
                    <button className="flex items-center gap-1 sm:gap-2 hover:text-blue-500 transition-colors">
                      <MessageCircle size={18} className="lg:size-6" />
                      <span className="text-sm sm:text-base">
                        {post.commentCount}
                      </span>
                    </button>
                    <button className="flex items-center gap-1 sm:gap-2 hover:text-yellow-500 transition-colors">
                      <Bookmark size={18} className="lg:size-6" />
                      <span className="text-sm sm:text-base">999k</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserPostSection;
