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
  if (userProfileError)
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <p className="text-red-500">Failed to load profile</p>
      </div>
    );

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 md:px-8">
        <UserProfileHeader
          profile={profile}
          posts={posts}
          getSafeMediaUrl={getSafeMediaUrl}
        />
        <UserTabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
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
