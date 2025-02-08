import React from "react";
import { Mail, Drama, Users, UserPlus } from "lucide-react";
import { ProfileHeader_SkeletonLoading } from "@/components/profile/SkeletonLoading";

export const ProfileHeader = ({ myProfile, isLoading, safeUrl }) => {
  if (isLoading) return <ProfileHeader_SkeletonLoading />;

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-shrink-0">
        <div className="relative group">
          <div className="w-40 h-40 rounded-full border-4 border-neutral-500/30 overflow-hidden transition-transform duration-300 group-hover:scale-105">
            <img
              src={safeUrl(myProfile?.user?.profilePicture)}
              alt={myProfile?.user?.username}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 rounded-full bg-neutral-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

      <div className="flex-1 space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between items-start gap-6">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-gray-100">
              {myProfile?.user?.username}
            </h1>
            <div className="space-y-2 text-gray-400">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>{myProfile?.user?.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Drama className="w-4 h-4" />
                <span>{myProfile?.user?.mbti}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-6 bg-neutral-700/50 p-6 rounded-xl backdrop-blur-sm">
            <div className="text-center">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-500" />
                <span className="text-2xl font-bold text-gray-100">
                  {myProfile?.user?.followers?.length}
                </span>
              </div>
              <span className="text-sm text-gray-300">Followers</span>
            </div>
            <div className="text-center border-l border-neutral-700 pl-6">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-indigo-500" />
                <span className="text-2xl font-bold text-gray-100">
                  {myProfile?.user?.following?.length}
                </span>
              </div>
              <span className="text-sm text-gray-300">Following</span>
            </div>
          </div>
        </div>

        <p className="text-gray-400">
          {myProfile?.user?.bio || "No bio available"}
        </p>
      </div>
    </div>
  );
};

export default ProfileHeader;
