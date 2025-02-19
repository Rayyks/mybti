import { Grid, ListFilter } from "lucide-react";
import { Button } from "@/components/common";

export const ProfileTabs = ({ activeTab, setActiveTab }) => (
  <div className="border-b border-neutral-800">
    <div className="flex gap-6">
      <TabButton
        active={activeTab === "posts"}
        onClick={() => setActiveTab("posts")}
        icon={<Grid className="w-4 h-4" />}
        label="Posts"
      />
      <TabButton
        active={activeTab === "tweets"}
        onClick={() => setActiveTab("tweets")}
        icon={<ListFilter className="w-4 h-4" />}
        label="Tweets"
      />
    </div>
  </div>
);

const TabButton = ({ active, onClick, icon, label }) => (
  <Button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-3 relative transition-colors ${
      active
        ? "text-white border-b-2 border-white"
        : "text-neutral-500 hover:text-neutral-300"
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </Button>
);
