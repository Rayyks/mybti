import { useState } from "react";
import { Heart, MessageCircle, Bookmark, Grid, ListFilter } from "lucide-react";
import { ProfilePosts_SkeletonLoading } from "./SkeletonLoading";
import { Link } from "react-router";
import { Button } from "@/components/common";

export const ProfilePosts = ({ myProfile, isLoading, safeUrl }) => {
  const [activeTab, setActiveTab] = useState("posts");

  const postsWithImages = myProfile?.data?.authoredPosts.filter(
    (post) => post.image
  );
  const postsWithoutImages = myProfile?.data?.authoredPosts.filter(
    (post) => !post.image
  );

  if (isLoading) return <ProfilePosts_SkeletonLoading />;

  return (
    <section>
      <div className="bg-white mt-10 p-2 rounded-t-lg border-t border-gray-200">
        <div className="flex gap-8">
          <Button
            onClick={() => setActiveTab("posts")}
            className={`flex items-center gap-2 py-3 ${
              activeTab === "posts"
                ? "border-t-2 border-black"
                : "text-gray-500"
            }`}
          >
            <Grid size={20} />
            <span>Posts</span>
          </Button>

          <Button
            onClick={() => setActiveTab("tweets")}
            className={`flex items-center gap-2 py-3 ${
              activeTab === "tweets"
                ? "border-t-2 border-black"
                : "text-gray-500"
            }`}
          >
            <ListFilter size={20} />
            <span>Tweets</span>
          </Button>
        </div>
      </div>
      <div className="bg-white  rounded-b-lg p-1">
        {activeTab === "posts" ? (
          <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-1">
            {postsWithImages?.map((post) => (
              <div
                key={post._id}
                className="aspect-square relative group border-[1px] rounded-md border-neutral-600"
              >
                <Link to={`/p/${post._id}`}>
                  {post.image && post.image.match(/\.(mp4|webm|ogg)$/i) ? (
                    <video
                      src={safeUrl(post.image)}
                      // controls
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

                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-6 text-white transition-opacity">
                    <div className="flex items-center gap-1">
                      <Heart size={20} />
                      <span>{post.likes.length}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle size={20} />
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
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-start gap-3 mb-4">
                  <img
                    src={safeUrl(myProfile.data.profilePicture)}
                    alt={myProfile.data.username}
                    className="w-10 h-10 rounded-full"
                    loading="lazy"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">
                        {myProfile.data.username}
                      </span>
                      <span className="text-gray-500">
                        {myProfile.data.username}
                      </span>
                      <span className="text-gray-500">·</span>
                      <span className="text-gray-500">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="mt-1">{post.content}</p>
                  </div>
                </div>
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.content}
                    className="w-full rounded-lg mb-4"
                    loading="lazy"
                  />
                )}
                <div className="flex items-center gap-6 text-gray-500">
                  <Button className="flex items-center gap-1 hover:text-red-500">
                    <Heart size={20} />
                    <span>{post.likes.length}</span>
                  </Button>
                  <Button className="flex items-center gap-1 hover:text-blue-500">
                    <MessageCircle size={20} />
                    <span>{post.comments.length}</span>
                  </Button>
                  <Button className="flex items-center gap-1 hover:text-yellow-500">
                    <Bookmark size={20} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfilePosts;
