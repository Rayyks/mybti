import { useState, useEffect } from "react";
import {
  useLazyGetProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/slices/profileApiSlice";
import { useGetUserProfileQuery } from "@/redux/slices/userApiSlice";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { getSafeMediaUrl } from "@/lib/getSafeMediaUrl";
import toast from "react-hot-toast";

const useProfile = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  // State
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [preview, setPreview] = useState("");

  // API Hooks
  const [fetchProfile, { data: myProfile, error, isLoading }] =
    useLazyGetProfileQuery();
  const {
    data: userProfile,
    isLoading: userProfileLoading,
    error: userProfileError,
    refetch: refetchUserProfile,
  } = useGetUserProfileQuery({ username });
  const [
    updateProfile,
    { isLoading: isUpdatingProfile, error: errorUpdateProfile },
  ] = useUpdateProfileMutation();

  // Form Hooks
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  // Fetch profile on mount
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Set profile picture preview
  useEffect(() => {
    if (myProfile?.data?.profilePicture) {
      setPreview(getSafeMediaUrl(myProfile.data.profilePicture));
    }
  }, [myProfile]);

  // Handle file change for profile picture
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setValue("profilePicture", file);
    }
  };

  // Handle profile update form submission
  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key !== "profilePicture") {
        formData.append(key, data[key]);
      }
    });
    if (data.profilePicture) {
      formData.append("profilePicture", data.profilePicture);
    }
    try {
      await toast.promise(updateProfile(formData).unwrap(), {
        loading: "Updating Profile...",
        success: "Profile Updated!",
        error: "Failed to Update Profile!",
      });
      fetchProfile();
      navigate("/profile");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return {
    // Profile Data
    myProfile: myProfile?.data,
    userProfile,
    error,
    isLoading,
    userProfileLoading,
    userProfileError,
    refetchProfile: fetchProfile,
    refetchUserProfile,

    // Profile Update
    isUpdatingProfile,
    errorUpdateProfile,
    onSubmit,

    // Form Hooks
    register,
    handleSubmit,
    errors,
    reset,

    // Navigation
    navigate,

    // State
    preview,
    showLogoutModal,
    setShowLogoutModal,
    handleFileChange,
  };
};

export default useProfile;
