import React from "react";
import {
  ProfileAction,
  ProfileBody,
  ProfileHeader,
  ProfileActivity,
} from "@/components/profile";
import useProfile from "@/hooks/useProfile";

const ProfilePage = () => {
  const { myProfile, error, isLoading } = useProfile();

  if (error)
    return (
      <div>
        Something went wrong...{" "}
        <span
          className="text-2xl font-bold"
          onClick={() => window.location.reload()}
        >
          Refresh The Page
        </span>
      </div>
    );

  return (
    <section className="relative bg-black rounded-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-10">
        {/* Profile Info Card */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <ProfileHeader myProfile={myProfile} isLoading={isLoading} />
          <ProfileBody myProfile={myProfile} isLoading={isLoading} />
          <ProfileAction />
        </div>

        {/* Profile Activity Card */}
        <ProfileActivity myProfile={myProfile} isLoading={isLoading} />
      </div>
    </section>
  );
};

export default ProfilePage;
