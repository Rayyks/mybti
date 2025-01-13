import React, { useEffect } from "react";
import useProfile from "@/hooks/useProfile";
import EditProfilePictureSection from "@/components/profile/EditProfilePictureSection";
import EditProfileFormFields from "@/components/profile/EditProfileFormFields";
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
      reset(myProfile.data);
    }
  }, [myProfile, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 p-8 bg-black text-white">
        <h1 className="text-2xl font-bold text-center">Edit Profile</h1>
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

      <Button
        type="submit"
        className="w-full py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
        disabled={isUpdatingProfile}
      >
        {isUpdatingProfile ? "Updating..." : "Update Profile"}
      </Button>
      {errorUpdateProfile && (
        <span className="text-red-500">{errorUpdateProfile.message}</span>
      )}
    </form>
  );
};

export default EditProfileForm;
