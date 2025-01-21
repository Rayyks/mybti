import React, { useState } from "react";
import {
  Heart,
  MessageCircle,
  Bookmark,
  Grid,
  ListFilter,
  MapPin,
  Link as LinkIcon,
} from "lucide-react";

const UsersProfilePage = () => {
  const [activeTab, setActiveTab] = useState("posts");

  // Mock user data
  const user = {
    name: "Jane Smith",
    username: "@janesmith",
    bio: "Digital artist & photographer 📸 | Creating memories one shot at a time ✨",
    location: "New York, NY",
    website: "janesmith.portfolio",
    followers: "12.5K",
    following: "892",
    posts: "234",
    avatarUrl: "/api/placeholder/150/150",
  };

  // Mock posts data
  const posts = [
    {
      id: 1,
      content:
        "Just finished my latest photography project! What do you think? 🎨",
      likes: 234,
      comments: 45,
      image: "/api/placeholder/400/400",
      timestamp: "2h ago",
    },
    {
      id: 2,
      content: "Beautiful sunset at the beach today 🌅",
      likes: 567,
      comments: 89,
      image: "/api/placeholder/400/400",
      timestamp: "5h ago",
    },
    {
      id: 3,
      content: "Working on something exciting! Stay tuned! ✨",
      likes: 123,
      comments: 34,
      timestamp: "1d ago",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto p-6">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-start gap-8 mb-12">
          <div className="w-32 h-32 rounded-full overflow-hidden ring-2 ring-neutral-700 p-1">
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-full h-full object-cover rounded-full transition-transform duration-200 hover:scale-105"
            />
          </div>

          <div className="flex-1 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <h1 className="text-2xl font-bold tracking-tight">{user.name}</h1>
              <div className="flex gap-3">
                <button className="px-6 py-2 bg-white text-black font-semibold rounded-full hover:bg-neutral-200 transition-colors">
                  Follow
                </button>
                <button className="px-6 py-2 bg-neutral-800 text-white font-semibold rounded-full hover:bg-neutral-700 transition-colors">
                  Message
                </button>
              </div>
            </div>

            <div className="flex gap-8 text-sm">
              <div className="flex flex-col items-center">
                <span className="font-bold text-lg">{user.posts}</span>
                <span className="text-neutral-400">posts</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-bold text-lg">{user.followers}</span>
                <span className="text-neutral-400">followers</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-bold text-lg">{user.following}</span>
                <span className="text-neutral-400">following</span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-neutral-300">{user.bio}</p>
              <div className="flex items-center gap-2 text-sm text-neutral-400">
                <MapPin size={16} />
                <span>{user.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <LinkIcon size={16} className="text-neutral-400" />
                <a href="#" className="text-blue-400 hover:underline">
                  {user.website}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="border-t border-neutral-800">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab("posts")}
              className={`flex items-center gap-2 py-4 relative transition-colors ${
                activeTab === "posts"
                  ? "text-white"
                  : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              <Grid size={20} />
              <span className="font-medium">Posts</span>
              {activeTab === "posts" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
              )}
            </button>

            <button
              onClick={() => setActiveTab("tweets")}
              className={`flex items-center gap-2 py-4 relative transition-colors ${
                activeTab === "tweets"
                  ? "text-white"
                  : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              <ListFilter size={20} />
              <span className="font-medium">Tweets</span>
              {activeTab === "tweets" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
              )}
            </button>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="mt-8">
          {activeTab === "posts" ? (
            <div className="grid grid-cols-3 gap-4">
              {posts.map(
                (post) =>
                  post.image && (
                    <div
                      key={post.id}
                      className="aspect-square relative group rounded-lg overflow-hidden"
                    >
                      <img
                        src={post.image}
                        alt={post.content}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-6 text-white transition-all duration-200">
                        <div className="flex items-center gap-2 -translate-y-2 group-hover:translate-y-0 transition-transform">
                          <Heart size={20} className="text-white" />
                          <span className="font-semibold">{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-2 translate-y-2 group-hover:translate-y-0 transition-transform">
                          <MessageCircle size={20} className="text-white" />
                          <span className="font-semibold">{post.comments}</span>
                        </div>
                      </div>
                    </div>
                  )
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="border border-neutral-800 rounded-xl p-6 hover:bg-neutral-900/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={user.avatarUrl}
                      alt={user.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold">{user.name}</span>
                        <span className="text-neutral-500">
                          {user.username}
                        </span>
                        <span className="text-neutral-500">·</span>
                        <span className="text-neutral-500">
                          {post.timestamp}
                        </span>
                      </div>
                      <p className="text-neutral-300">{post.content}</p>
                      {post.image && (
                        <img
                          src={post.image}
                          alt={post.content}
                          className="w-full rounded-xl mt-4"
                        />
                      )}
                      <div className="flex items-center gap-6 mt-4 text-neutral-400">
                        <button className="flex items-center gap-2 hover:text-red-500 transition-colors">
                          <Heart size={20} />
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                          <MessageCircle size={20} />
                          <span>{post.comments}</span>
                        </button>
                        <button className="flex items-center gap-2 hover:text-yellow-500 transition-colors">
                          <Bookmark size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersProfilePage;
