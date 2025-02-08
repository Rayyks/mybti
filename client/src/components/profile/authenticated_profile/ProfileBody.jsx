import { Link as LinkIcon } from "lucide-react";
import { ProfileBody_SkeletonLoading } from "@/components/profile/SkeletonLoading";

export const ProfileBody = ({ myProfile, isLoading }) => {
  if (isLoading) return <ProfileBody_SkeletonLoading />;

  return (
    <div className="mt-12 space-y-8">
      <div className="border-t border-neutral-800 pt-8">
        <div className="flex items-center gap-2 mb-6">
          <LinkIcon className="w-5 h-5 text-indigo-500" />
          <h2 className="text-xl font-semibold text-gray-100">Profession</h2>
        </div>
        <div className="inline-block rounded-xl py-3 px-5 bg-gray-800/50 hover:bg-gray-800 transition-all duration-300">
          <span className="font-medium text-gray-300">
            {myProfile?.user?.profession || "Not specified"}
          </span>
        </div>
      </div>

      <div className="border-t border-neutral-800 pt-8">
        <h2 className="text-xl font-semibold text-gray-100 mb-6">Interests</h2>
        <div className="flex flex-wrap gap-3">
          {myProfile?.user?.interests?.length > 0 ? (
            myProfile?.user?.interests.map((interest) => (
              <span
                key={interest}
                className="py-2 px-4 rounded-xl bg-indigo-500/10 text-indigo-300 font-medium hover:bg-indigo-500/20 transition-colors duration-300"
              >
                {interest}
              </span>
            ))
          ) : (
            <span className="text-gray-500">No interests added</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileBody;
