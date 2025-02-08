import React, { useEffect } from "react";
import useProfile from "@/hooks/useProfile";
import EditProfilePictureSection from "@/components/profile/authenticated_profile/EditProfilePictureSection";
import EditProfileFormFields from "@/components/profile/authenticated_profile/EditProfileFormFields";
import { Input, Label } from "@/components/ui";
import { Button } from "@/components/common";

export const EditProfileForm = ({ myProfile, isLoading }) => {
  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    isUpdatingProfile,
    errorUpdateProfile,
    reset,
    navigate,
    preview,
    handleFileChange,
  } = useProfile();

  useEffect(() => {
    if (myProfile) {
      reset(myProfile.user);
    }
  }, [myProfile, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-black text-white py-8">
        <h1 className="text-3xl font-bold text-center tracking-tight">
          Edit Profile
        </h1>
      </div>

      {/* Profile Picture Section */}
      <EditProfilePictureSection
        register={register}
        errors={errors}
        Input={Input}
        Label={Label}
        preview={preview}
        handleFileChange={handleFileChange}
      />

      {/* Form Fields */}
      <EditProfileFormFields
        myProfile={myProfile}
        isLoading={isLoading}
        Label={Label}
        Input={Input}
        register={register}
        errors={errors}
      />

      {/* Action Buttons */}
      <div className="flex justify-center px-8 py-6 bg-gray-50 border-t border-gray-200">
        <Button
          type="submit"
          className="w-full max-w-md py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isUpdatingProfile}
        >
          {isUpdatingProfile ? "Updating..." : "Save Changes"}
        </Button>
      </div>

      {errorUpdateProfile && (
        <div className="text-center py-4">
          <span className="text-red-500 text-sm">
            {errorUpdateProfile.message}
          </span>
        </div>
      )}
    </form>
  );
};

export default EditProfileForm;
