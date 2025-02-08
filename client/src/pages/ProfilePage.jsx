import React from "react";
import { getSafeMediaUrl } from "@/lib/getSafeMediaUrl";
import {
  ProfileHeader,
  ProfileBody,
  ProfilePosts,
  ProfileAction,
  ProfileActivity,
} from "@/components/profile";
import useProfile from "@/hooks/useProfile";

const ProfilePage = () => {
  const { myProfile, error, isLoading } = useProfile();

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 text-gray-200 p-4">
        <div className="text-center py-12">
          <p className="text-xl">Something went wrong...</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-black-600 hover:bg-indigo-700 rounded-lg transition-colors"
          >
            Refresh The Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="w-full min-h-screen bg-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-neutral-950 border border-neutral-800 rounded-xl shadow-xl">
          <div className="p-6">
            <ProfileHeader
              myProfile={myProfile}
              isLoading={isLoading}
              safeUrl={getSafeMediaUrl}
            />
            <ProfileBody myProfile={myProfile} isLoading={isLoading} />
            <ProfileAction myProfile={myProfile} isLoading={isLoading} />
          </div>
        </div>

        <ProfilePosts
          myProfile={myProfile}
          isLoading={isLoading}
          safeUrl={getSafeMediaUrl}
        />
        <ProfileActivity myProfile={myProfile} isLoading={isLoading} />
      </div>
    </section>
  );
};

export default ProfilePage;
