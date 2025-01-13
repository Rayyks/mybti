import React from "react";
import { EditProfileForm } from "@/components/profile";
import useProfile from "@/hooks/useProfile";
import { ArrowLeft } from "lucide-react";

const EditProfilePage = () => {
  const { myProfile, isLoading, navigate } = useProfile();

  return (
    <div className="min-h-screen bg-neutral-950 w-full">
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
