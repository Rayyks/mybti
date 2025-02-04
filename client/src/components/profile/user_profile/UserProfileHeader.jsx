import { Drama, Link as LinkIcon } from "lucide-react";

export const UserProfileHeader = ({ profile, posts, getSafeMediaUrl }) => {
  return (
    <div className="flex flex-col md:flex-row items-start gap-8 mb-12">
      <div className="w-32 h-32 rounded-full overflow-hidden ring-2 ring-neutral-700 p-1">
        <img
          src={getSafeMediaUrl(profile?.profilePicture)}
          alt={profile?.username}
          className="w-full h-full object-cover rounded-full transition-transform duration-200 hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="flex-1 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <h1 className="text-2xl font-bold tracking-tight">
            {profile?.username}
          </h1>
          <div className="flex gap-3">
            <button className="px-6 py-2 bg-white text-black font-semibold rounded-full hover:bg-neutral-200 transition-colors">
              Follow
            </button>
            <button className="px-6 py-2 bg-neutral-800 text-white font-semibold rounded-full hover:bg-neutral-700 transition-colors">
              Message
            </button>
          </div>
        </div>

        <div className="flex gap-8 text-sm">
          <div className="flex flex-col items-center">
            <span className="font-bold text-lg">{posts?.length}</span>
            <span className="text-neutral-400">posts</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-lg">
              {profile?.followers.length}
            </span>
            <span className="text-neutral-400">followers</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-lg">
              {profile?.following.length}
            </span>
            <span className="text-neutral-400">following</span>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-neutral-300">{profile?.bio}</p>
          <div className="flex items-center gap-2 text-sm text-neutral-400">
            <Drama size={16} />
            <span>{profile?.mbti}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <LinkIcon size={16} className="text-neutral-400" />
            <a href="#" className="text-blue-400 hover:underline">
              {profile?.website || "No website"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileHeader;
