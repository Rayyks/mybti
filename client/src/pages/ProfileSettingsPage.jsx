import {
  AccountDeletionSection,
  YourReportListStatus,
} from "@/components/profile";
import useReport from "@/hooks/useReport";
import React, { useState } from "react";

const ProfileSettingsPage = () => {
  const [deletionReason, setDeletionReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [isDeletionRequested, setIsDeletionRequested] = useState(false);
  const [activeTab, setActiveTab] = useState("accounts");

  const { getReportedData: reports, getReportedLoading } = useReport();

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
          getReportedLoading={getReportedLoading}
          getStatusColor={getStatusColor}
        />
      </div>
    </div>
  );
};

export default ProfileSettingsPage;
