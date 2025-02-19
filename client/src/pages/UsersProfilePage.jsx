import useProfile from "@/hooks/useProfile";
import { useState } from "react";
import { UserProfile_SkeletonLoading } from "@/components/profile/SkeletonLoading";
import {
  PostsGrid,
  UserProfileHeader,
  ProfileTabs,
} from "@/components/profile";
import { getSafeMediaUrl } from "@/lib/getSafeMediaUrl";

const UsersProfilePage = () => {
  const [activeTab, setActiveTab] = useState("posts");
  const { userProfile, userProfileLoading, userProfileError } = useProfile();
  const profile = userProfile?.user;
  const posts = userProfile?.posts;

  if (userProfileLoading) return <UserProfile_SkeletonLoading />;
  if (userProfileError) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md p-6 text-center bg-red-900 bg-opacity-20 border border-red-500 border-opacity-50 rounded-lg">
          <p className="text-red-400">Failed to load profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <UserProfileHeader
          profile={profile}
          posts={posts}
          getSafeMediaUrl={getSafeMediaUrl}
        />
        <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <PostsGrid
          posts={posts}
          activeTab={activeTab}
          getSafeMediaUrl={getSafeMediaUrl}
        />
      </div>
    </div>
  );
};

export default UsersProfilePage;
