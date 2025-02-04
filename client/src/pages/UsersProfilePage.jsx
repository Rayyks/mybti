import { useState } from "react";

import useProfile from "@/hooks/useProfile";
import { getSafeMediaUrl } from "@/lib/getSafeMediaUrl";
import { UserProfile_SkeletonLoading } from "@/components/profile/SkeletonLoading";
import {
  UserPostSection,
  UserProfileHeader,
  UserTabNavigation,
} from "@/components/profile";

const UsersProfilePage = () => {
  const [activeTab, setActiveTab] = useState("posts");
  const { userProfile, userProfileLoading, userProfileError } = useProfile();
  const profile = userProfile?.user;
  const posts = userProfile?.posts;

  if (userProfileLoading) return <UserProfile_SkeletonLoading />;

  if (userProfileError) return <div>Error</div>;

  return (
    <div className="w-full rounded-xl min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto p-6">
        {/* Profile Header */}
        <UserProfileHeader
          profile={profile}
          posts={posts}
          getSafeMediaUrl={getSafeMediaUrl}
        />

        {/* Tabs Navigation */}
        <UserTabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Posts Grid */}
        <UserPostSection
          posts={posts}
          activeTab={activeTab}
          getSafeMediaUrl={getSafeMediaUrl}
        />
      </div>
    </div>
  );
};

export default UsersProfilePage;
