import { MoreHorizontal } from "lucide-react";
import useUser from "@/hooks/useUser";
import { useState } from "react";
import { Button } from "@/components/common";

export const UserProfileHeader = ({ profile, posts, getSafeMediaUrl }) => {
  const { handleFollowToggle, isFollowing } = useUser(profile?._id);
  const [showActions, setShowActions] = useState(false);

  return (
    <div className="space-y-8 mb-12">
      <div className="flex flex-col sm:flex-row items-start gap-8">
        <div className="relative group">
          <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-white ring-opacity-10">
            <img
              src={getSafeMediaUrl(profile?.profilePicture)}
              alt={profile?.username}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>

        <div className="flex-1 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold tracking-tight">
                {profile?.username}
              </h1>
              {profile?.mbti && (
                <span className="text-sm text-neutral-400 mt-1">
                  {profile.mbti}
                </span>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => handleFollowToggle(profile?._id)}
                className="px-6 py-2 bg-white text-black font-semibold rounded-full hover:bg-neutral-200 transition-colors"
              >
                {isFollowing ? "Following" : "Follow"}
              </Button>
              <Button className="px-6 py-2 bg-neutral-800 text-white font-semibold rounded-full hover:bg-neutral-700 transition-colors">
                Message
              </Button>
              <Button
                className="p-2 rounded-full hover:bg-white hover:bg-opacity-10 transition-colors"
                onClick={() => setShowActions(!showActions)}
              >
                <MoreHorizontal className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="flex gap-8">
            <Stat label="Posts" value={posts?.length} />
            <Stat label="Followers" value={profile?.followers?.length} />
            <Stat label="Following" value={profile?.following?.length} />
          </div>

          {profile?.bio && (
            <p className="text-neutral-300 whitespace-pre-wrap break-words max-w-2xl">
              {profile.bio}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const Stat = ({ label, value }) => (
  <div className="flex flex-col items-center sm:items-start">
    <span className="font-bold text-xl">{value}</span>
    <span className="text-sm text-neutral-400">{label}</span>
  </div>
);
