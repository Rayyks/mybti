import React, { useState } from "react";
import { Heart, MessageSquare, Bookmark, Activity } from "lucide-react";
import { CustomTab, ActivityTab, PostPreview } from "@/components/ui";
import { ProfileActivity_SkeletonLoading } from "../SkeletonLoading";

export const ProfileActivity = ({ myProfile, isLoading }) => {
  const [activeTab, setActiveTab] = useState("liked");

  const activityData = {
    liked: myProfile?.user?.likedPosts || [],
    commented: myProfile?.user?.commentedPosts || [],
    saved: myProfile?.user?.savedPosts || [],
  };

  if (isLoading) {
    return (
      <ProfileActivity_SkeletonLoading
        CustomTab={CustomTab}
        ActivityTab={ActivityTab}
        activityData={activityData}
        Activity={Activity}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        Heart={Heart}
      />
    );
  }

  return (
    <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-6 mt-8">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-5 h-5 text-indigo-400" />
        <h2 className="text-xl font-semibold text-gray-100">
          Account Activity
        </h2>
      </div>

      <div className="w-full">
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("liked")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === "liked"
                ? "bg-indigo-500/10 text-indigo-300"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            Liked Posts
          </button>
          <button
            onClick={() => setActiveTab("commented")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === "commented"
                ? "bg-indigo-500/10 text-indigo-300"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            Commented Posts
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === "saved"
                ? "bg-indigo-500/10 text-indigo-300"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            Saved Posts
          </button>
        </div>

        <div className="min-h-[200px]">
          {activeTab === "liked" && (
            <div className="space-y-4">
              {activityData.liked.length > 0 ? (
                activityData.liked.map((post) => (
                  <PostPreview
                    key={post.id}
                    post={post}
                    isLoading={isLoading}
                  />
                ))
              ) : (
                <p className="text-gray-500">No liked posts yet</p>
              )}
            </div>
          )}

          {activeTab === "commented" && (
            <div className="space-y-4">
              {activityData.commented.length > 0 ? (
                activityData.commented.map((post) => (
                  <PostPreview
                    key={post._id}
                    post={post}
                    isLoading={isLoading}
                  />
                ))
              ) : (
                <p className="text-gray-500">No commented posts yet</p>
              )}
            </div>
          )}

          {activeTab === "saved" && (
            <div className="space-y-4">
              {activityData.saved.length > 0 ? (
                activityData.saved.map((post) => (
                  <PostPreview key={post._id} post={post} />
                ))
              ) : (
                <p className="text-gray-500">No saved posts yet</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileActivity;
