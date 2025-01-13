import { Fragment } from "react";
import { Link as LinkIcon } from "lucide-react";
import { ProfileBody_SkeletonLoading } from "./SkeletonLoading";

export const ProfileBody = ({ myProfile, isLoading }) => {
  if (isLoading) return <ProfileBody_SkeletonLoading />;

  return (
    <Fragment>
      {/* Professional Info */}
      <div className="mt-8 border-t border-gray-100 pt-8">
        <div className="flex items-center gap-2 mb-4">
          <LinkIcon className="w-5 h-5 text-gray-600" />
          <h2 className="text-xl font-semibold text-gray-900">Profession</h2>
        </div>
        <div className="inline-block rounded-full py-3 px-5 bg-gray-100 hover:bg-indigo-100 transition-all duration-500">
          <span className="font-medium text-base text-gray-700">
            {myProfile?.data?.profession || "Not specified"}
          </span>
        </div>
      </div>

      {/* Interests */}
      <div className="mt-8 border-t border-gray-100 pt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Interests</h2>
        <div className="flex flex-wrap gap-2">
          {myProfile?.data?.interests.length > 0 ? (
            myProfile?.data?.interests.map((interest) => (
              <span
                key={interest}
                className="py-2 px-4 rounded-full bg-indigo-50 text-indigo-600 font-medium hover:bg-indigo-100 transition-colors duration-300"
              >
                {interest}
              </span>
            ))
          ) : (
            <span className="text-gray-500">No interests added</span>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProfileBody;
