import { Grid, ListFilter } from "lucide-react";

export const UserTabNavigation = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="border-t border-b border-neutral-800 mb-6">
      <div className="flex gap-6">
        <TabButton
          active={activeTab === "posts"}
          onClick={() => setActiveTab("posts")}
          icon={<Grid size={18} />}
          label="Posts"
        />
        <TabButton
          active={activeTab === "tweets"}
          onClick={() => setActiveTab("tweets")}
          icon={<ListFilter size={18} />}
          label="Tweets"
        />
      </div>
    </nav>
  );
};

const TabButton = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 py-3 relative transition-colors ${
      active ? "text-white" : "text-neutral-500 hover:text-neutral-300"
    }`}
  >
    {icon}
    <span className="font-medium text-sm">{label}</span>
    {active && (
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
    )}
  </button>
);

export default UserTabNavigation;
