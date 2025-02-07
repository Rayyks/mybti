import { useState } from "react";
import { Button } from "@/components/common";
import useUser from "@/hooks/useUser";
import { MoreHorizontal } from "lucide-react";
import { UserActionModal } from "@/components/profile/user_profile/UserActionModal";
import { useModal } from "@/context/modalContext";
import { ReportModal } from "@/components/report";

export const UserProfileHeader = ({ profile, posts, getSafeMediaUrl }) => {
  const profileId = profile?._id;
  const { handleFollowToggle, isFollowing } = useUser(profileId);
  const [isUserActionModalOpen, setIsUserActionModalOpen] = useState(false);
  const { openReportModal, openReportMenu, closeReportMenu } = useModal();

  return (
    <div className="flex flex-col gap-6 mb-8">
      {/* Profile Header Top Section */}
      <div className="flex flex-col sm:flex-row items-start gap-6 relative">
        {/* Profile Picture */}
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden ring-2 ring-neutral-700 p-1 flex-shrink-0">
          <img
            src={getSafeMediaUrl(profile?.profilePicture)}
            alt={profile?.username}
            className="w-full h-full object-cover rounded-full transition-transform duration-200 hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Profile Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col gap-4 sm:gap-6 ">
            {/* Username and Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 relative">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight truncate">
                {profile?.username}
              </h1>
              <div className="flex gap-3">
                <Button
                  onClick={() => handleFollowToggle(profileId)}
                  className="px-4 sm:px-6 py-2 bg-white text-black text-sm font-semibold rounded-full hover:bg-neutral-200 transition-colors"
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </Button>
                <Button className="px-4 sm:px-6 py-2 bg-neutral-800 text-white text-sm font-semibold rounded-full hover:bg-neutral-700 transition-colors">
                  Message
                </Button>
              </div>
              <div className="absolute right-0 top-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-neutral-200 rounded-full"
                  onClick={() => setIsUserActionModalOpen(true)}
                >
                  <MoreHorizontal className="w-5 h-5 text-neutral-600" />
                </Button>
                {isUserActionModalOpen && (
                  <UserActionModal
                    profileId={profileId}
                    closeUserActionModal={() => setIsUserActionModalOpen(false)}
                    openReportMenu={openReportMenu}
                    isOpen={isUserActionModalOpen}
                    isFollowing={isFollowing}
                    handleFollowToggle={handleFollowToggle}
                  />
                )}
                {openReportModal && (
                  <ReportModal
                    reportType={"user"}
                    id={profileId}
                    openReportModal={openReportModal}
                    closeReportMenu={closeReportMenu}
                  />
                )}
              </div>
            </div>

            {/* Rest of the component remains the same */}
            {/* Stats */}
            <div className="flex gap-6 text-sm">
              <div className="flex flex-col items-center">
                <span className="font-bold text-base sm:text-lg">
                  {posts?.length}
                </span>
                <span className="text-neutral-400">posts</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-bold text-base sm:text-lg">
                  {profile?.followers?.length}
                </span>
                <span className="text-neutral-400">followers</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-bold text-base sm:text-lg">
                  {profile?.following?.length}
                </span>
                <span className="text-neutral-400">following</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bio */}
      {profile?.bio && (
        <p className="text-sm sm:text-base text-neutral-300 whitespace-pre-wrap break-words">
          {profile.bio}
        </p>
      )}
    </div>
  );
};

export default UserProfileHeader;
