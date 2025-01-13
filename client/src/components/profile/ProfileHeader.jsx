import React from "react";
import { Mail, Users, UserPlus } from "lucide-react";
import { getSafeImageUrl } from "@/lib/getSafeImageUrl";
import { ProfileHeader_SkeletonLoading } from "@/components/profile/SkeletonLoading";

export const ProfileHeader = ({ myProfile, isLoading }) => {
  if (isLoading) return <ProfileHeader_SkeletonLoading />;

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex-shrink-0">
        <div className="w-40 h-40 rounded-full border-4 border-white shadow-lg overflow-hidden">
          <img
            src={getSafeImageUrl(myProfile?.data?.profilePicture)}
            alt={myProfile?.data?.username}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:justify-between items-start gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {myProfile?.data?.username}
            </h1>
            <div className="flex items-center gap-2 text-gray-600 mt-2">
              <Mail className="w-4 h-4" />
              <span>{myProfile?.data?.email}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 mt-1">
              <span className="font-semibold">MBTI:</span>
              <span>{myProfile?.data?.mbti}</span>
            </div>
          </div>

          {/* FOLLOWER/ING COUNTS */}
          <div className="flex gap-6 bg-neutral-950 p-4 rounded-lg">
            <div className="text-center">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-gray-50" />
                <span className="text-2xl font-bold text-gray-100">
                  {myProfile?.data?.followers.length}
                </span>
              </div>
              <span className="text-sm text-gray-100">Followers</span>
            </div>
            <div className="text-center border-l border-gray-200 pl-6">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-gray-50" />
                <span className="text-2xl font-bold text-gray-100">
                  {myProfile?.data?.following.length}
                </span>
              </div>
              <span className="text-sm text-gray-100">Following</span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-6">
          <p className="text-gray-600">
            {myProfile?.data?.bio || "No bio available"}
          </p>
        </div>

        {/* ACCOUNT ACTIVITY */}
        <div className="mt-6 "></div>
      </div>
    </div>
  );
};

export default ProfileHeader;
