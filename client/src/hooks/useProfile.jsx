import { useState, useEffect } from "react";
import {
  useLazyGetProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/slices/profileApiSlice";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { getSafeImageUrl } from "@/lib/getSafeImageUrl";

const useProfile = () => {
  const [fetchProfile, { data: myProfile, error, isLoading }] =
    useLazyGetProfileQuery();
  const [
    updateProfile,
    { isLoading: isUpdatingProfile, error: errorUpdateProfile },
  ] = useUpdateProfileMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    if (myProfile?.data?.profilePicture) {
      setPreview(getSafeImageUrl(myProfile.data.profilePicture));
    }
  }, [myProfile]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setValue("profilePicture", file);
    }
  };

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
      await updateProfile(formData).unwrap();
      toast.success("Profile updated successfully");
      fetchProfile();
      navigate("/profile");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return {
    myProfile,
    error,
    isLoading,
    refetchProfile: fetchProfile,

    // UPDATE PROFILE
    isUpdatingProfile,
    errorUpdateProfile,
    // HOOK FORM
    register,
    handleSubmit,
    errors,
    reset,
    onSubmit,
    navigate,
    preview,
    showLogoutModal,
    setShowLogoutModal,
    handleFileChange,
  };
};

export default useProfile;
