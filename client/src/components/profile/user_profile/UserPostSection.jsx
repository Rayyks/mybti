import { Heart, MessageCircle, Bookmark } from "lucide-react";
import { formatTimeAgo } from "@/lib/FormatDate";
import { Button } from "@/components/common";
import { Link } from "react-router";

export const PostsGrid = ({ posts, activeTab, getSafeMediaUrl }) => {
  const postWithImages = posts?.filter((post) => post.image);
  const postWithoutImages = posts?.filter((post) => !post.image);

  if (activeTab === "posts") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        {postWithImages?.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            getSafeMediaUrl={getSafeMediaUrl}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6 mt-8">
      {postWithoutImages?.map((post) => (
        <TweetCard
          key={post._id}
          post={post}
          getSafeMediaUrl={getSafeMediaUrl}
        />
      ))}
    </div>
  );
};

const PostCard = ({ post, getSafeMediaUrl }) => (
  <div className="group relative aspect-square overflow-hidden bg-neutral-900 rounded-lg">
    <Link to={`/p/${post._id}`}>
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
      <img
        src={getSafeMediaUrl(post.image)}
        alt={post.content}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <PostStat
              icon={<Heart className="w-4 h-4" />}
              count={post.likes.length}
            />
            <PostStat
              icon={<MessageCircle className="w-4 h-4" />}
              count={post.commentCount}
            />
          </div>
        </div>
      </div>
    </Link>
  </div>
);

const TweetCard = ({ post, getSafeMediaUrl }) => (
  <div className="bg-neutral-900 bg-opacity-50 rounded-lg hover:bg-neutral-900 transition-colors duration-200">
    <div className="p-6">
      <div className="flex gap-4">
        <img
          src={getSafeMediaUrl(post.author.profilePicture)}
          alt={post.author.username}
          className="w-12 h-12 rounded-full"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold">{post.author.username}</span>
            <span className="text-neutral-500 text-sm">·</span>
            <span className="text-neutral-500 text-sm">
              {formatTimeAgo(post.createdAt)}
            </span>
          </div>
          <p className="text-neutral-300 mb-4">{post.content}</p>
          <div className="flex items-center gap-6">
            <InteractionButton
              icon={<Heart className="w-4 h-4" />}
              count={post.likes.length}
            />
            <InteractionButton
              icon={<MessageCircle className="w-4 h-4" />}
              count={post.commentCount}
            />
            <InteractionButton icon={<Bookmark className="w-4 h-4" />} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const PostStat = ({ icon, count }) => (
  <div className="flex items-center gap-1.5">
    {icon}
    <span className="text-sm font-medium">{count}</span>
  </div>
);

const InteractionButton = ({ icon, count }) => (
  <Button className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors">
    {icon}
    {count && <span className="text-sm">{count}</span>}
  </Button>
);
