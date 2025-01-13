import React from "react";
import { EditProfileForm } from "@/components/profile";
import useProfile from "@/hooks/useProfile";

const EditProfilePage = () => {
  const { myProfile, isLoading } = useProfile();

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold">Edit Profile</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg">
          <EditProfileForm myProfile={myProfile} />
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
