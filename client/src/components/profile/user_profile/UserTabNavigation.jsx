import { Grid, ListFilter } from "lucide-react";

export const UserTabNavigation = ({ activeTab, setActiveTab }) => {
  return (
    <div className="border-t border-neutral-800">
      <div className="flex gap-8">
        <button
          onClick={() => setActiveTab("posts")}
          className={`flex items-center gap-2 py-4 relative transition-colors ${
            activeTab === "posts"
              ? "text-white"
              : "text-neutral-500 hover:text-neutral-300"
          }`}
        >
          <Grid size={20} />
          <span className="font-medium">Posts</span>
          {activeTab === "posts" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("tweets")}
          className={`flex items-center gap-2 py-4 relative transition-colors ${
            activeTab === "tweets"
              ? "text-white"
              : "text-neutral-500 hover:text-neutral-300"
          }`}
        >
          <ListFilter size={20} />
          <span className="font-medium">Tweets</span>
          {activeTab === "tweets" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
          )}
        </button>
      </div>
    </div>
  );
};

export default UserTabNavigation;
