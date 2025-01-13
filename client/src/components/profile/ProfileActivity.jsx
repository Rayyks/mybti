import React, { useState } from "react";
import { Heart, MessageSquare, Bookmark, Activity } from "lucide-react";
import { CustomTab, ActivityTab, PostPreview } from "@/components/ui";
import { ProfileActivity_SkeletonLoading } from "./SkeletonLoading";

export const ProfileActivity = ({ myProfile, isLoading }) => {
  const [activeTab, setActiveTab] = useState("liked");

  const activityData = {
    liked: myProfile?.data?.likedPosts || [],
    commented: myProfile?.data?.commentedPosts || [],
    saved: myProfile?.data?.savedPosts || [],
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
    <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-5 h-5 text-gray-600" />
        <h2 className="text-xl font-semibold text-gray-900">
          Account Activity
        </h2>
      </div>

      <div className="w-full">
        {/* Custom Tabs */}
        <div className="flex gap-2 mb-6">
          <CustomTab
            active={activeTab === "liked"}
            onClick={() => setActiveTab("liked")}
          >
            Liked Posts
          </CustomTab>
          <CustomTab
            active={activeTab === "commented"}
            onClick={() => setActiveTab("commented")}
          >
            Commented Posts
          </CustomTab>
          <CustomTab
            active={activeTab === "saved"}
            onClick={() => setActiveTab("saved")}
          >
            Saved Posts
          </CustomTab>
        </div>

        {/* Tab Content */}
        <div className="min-h-[200px]">
          {activeTab === "liked" && (
            <ActivityTab
              icon={Heart}
              label="Liked Posts"
              count={activityData.liked.length}
            >
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
            </ActivityTab>
          )}

          {activeTab === "commented" && (
            <ActivityTab
              icon={MessageSquare}
              label="Commented Posts"
              count={activityData.commented.length}
            >
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
            </ActivityTab>
          )}

          {activeTab === "saved" && (
            <ActivityTab
              icon={Bookmark}
              label="Saved Posts"
              count={activityData.saved.length}
            >
              {activityData.saved.length > 0 ? (
                activityData.saved.map((post) => (
                  <PostPreview key={post._id} post={post} />
                ))
              ) : (
                <p className="text-gray-500">No saved posts yet</p>
              )}
            </ActivityTab>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileActivity;
