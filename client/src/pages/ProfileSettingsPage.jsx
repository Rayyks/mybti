import {
  AccountDeletionSection,
  YourReportListStatus,
} from "@/components/profile";
import React, { useState } from "react";

const ProfileSettingsPage = () => {
  const [deletionReason, setDeletionReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [isDeletionRequested, setIsDeletionRequested] = useState(false);
  const [activeTab, setActiveTab] = useState("accounts");

  // Sample data - in a real app, this would come from an API
  const reports = {
    accounts: [
      {
        id: 1,
        reportedUser: "user123",
        reason: "Spam",
        status: "pending",
        date: "2025-01-10",
      },
      {
        id: 2,
        reportedUser: "user456",
        reason: "Harassment",
        status: "resolved",
        date: "2025-01-08",
      },
    ],
    comments: [
      {
        id: 1,
        content: "Inappropriate comment",
        reason: "Offensive content",
        status: "pending",
        date: "2025-01-12",
      },
      {
        id: 2,
        content: "Spam comment",
        reason: "Spam",
        status: "rejected",
        date: "2025-01-07",
      },
    ],
    posts: [
      {
        id: 1,
        title: "Misleading post",
        reason: "Misinformation",
        status: "resolved",
        date: "2025-01-11",
      },
      {
        id: 2,
        title: "Promotional content",
        reason: "Spam",
        status: "pending",
        date: "2025-01-09",
      },
    ],
  };

  const handleDeleteAccount = () => {
    const finalReason =
      deletionReason === "other" ? customReason : deletionReason;
    setIsDeletionRequested(true);
    console.log("Requesting account deletion with reason:", finalReason);
  };

  const handleCancelDeletion = () => {
    setIsDeletionRequested(false);
    setDeletionReason("");
    setCustomReason("");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-neutral-100 text-neutral-800";
      case "resolved":
        return "bg-white text-black border border-black";
      case "rejected":
        return "bg-black text-white";
      default:
        return "bg-neutral-100 text-neutral-800";
    }
  };

  return (
    <div className="min-h-screen w-full bg-neutral-950 rounded-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Account Deletion Section */}
        <AccountDeletionSection
          deletionReason={deletionReason}
          setDeletionReason={setDeletionReason}
          customReason={customReason}
          setCustomReason={setCustomReason}
          isDeletionRequested={isDeletionRequested}
          handleDeleteAccount={handleDeleteAccount}
          handleCancelDeletion={handleCancelDeletion}
        />

        {/* Reports Section */}
        <YourReportListStatus
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          reports={reports}
          getStatusColor={getStatusColor}
        />
      </div>
    </div>
  );
};

export default ProfileSettingsPage;
