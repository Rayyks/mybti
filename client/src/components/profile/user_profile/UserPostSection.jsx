import { Heart, MessageCircle, Bookmark } from "lucide-react";
import { formatTimeAgo } from "@/lib/FormatDate";

export const UserPostSection = ({ posts, activeTab, getSafeMediaUrl }) => {
  const postWithImages = posts?.filter((post) => post.image);
  const postWithoutImages = posts?.filter((post) => !post.image);

  return (
    <section className="mt-4">
      {activeTab === "posts" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 sm:gap-2">
          {postWithImages?.map(
            (post) =>
              post.image && (
                <div
                  key={post._id}
                  className="aspect-square relative group rounded-md overflow-hidden bg-neutral-900"
                >
                  {post.image.match(/\.(mp4|webm|ogg)$/i) ? (
                    <video
                      src={getSafeMediaUrl(post.image)}
                      controls
                      className="w-full h-full object-cover"
                      loading="lazy"
                      poster={getSafeMediaUrl(post.image)}
                    />
                  ) : (
                    <img
                      src={getSafeMediaUrl(post.image)}
                      alt={post.content}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 text-white transition-all duration-200">
                    <PostStat
                      icon={<Heart size={16} />}
                      count={post.likes.length}
                    />
                    <PostStat
                      icon={<MessageCircle size={16} />}
                      count={post.commentCount || 0}
                    />
                  </div>
                </div>
              )
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {postWithoutImages?.map((post) => (
            <TextPost
              key={post._id}
              post={post}
              getSafeMediaUrl={getSafeMediaUrl}
            />
          ))}
        </div>
      )}
    </section>
  );
};

const PostStat = ({ icon, count }) => (
  <div className="flex items-center gap-1.5">
    {icon}
    <span className="font-semibold text-sm">{count}</span>
  </div>
);

const TextPost = ({ post, getSafeMediaUrl }) => (
  <article className="border border-neutral-800 rounded-xl p-4 hover:bg-neutral-900/50 transition-colors">
    <div className="flex gap-3">
      <img
        src={getSafeMediaUrl(post.author.profilePicture)}
        alt={post.author.username}
        className="w-10 h-10 rounded-full flex-shrink-0"
        loading="lazy"
      />
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="font-semibold text-sm">{post.author.username}</span>
          <span className="text-neutral-500 text-xs">{post.author.mbti}</span>
          <span className="text-neutral-500 text-xs">
            · {formatTimeAgo(post.createdAt)}
          </span>
        </div>
        <p className="text-sm text-neutral-300 break-words mb-3">
          {post.content}
        </p>
        <div className="flex items-center gap-4">
          <InteractionButton
            icon={<Heart size={16} />}
            count={post.likes.length}
            color="red"
          />
          <InteractionButton
            icon={<MessageCircle size={16} />}
            count={post.commentCount}
            color="blue"
          />
          <InteractionButton
            icon={<Bookmark size={16} />}
            count="999k"
            color="yellow"
          />
        </div>
      </div>
    </div>
  </article>
);

const InteractionButton = ({ icon, count, color }) => (
  <button
    className={`flex items-center gap-1.5 text-neutral-400 hover:text-${color}-500 transition-colors`}
  >
    {icon}
    <span className="text-xs">{count}</span>
  </button>
);
