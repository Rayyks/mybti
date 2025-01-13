import { useState, useEffect } from "react";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/slices/profileApiSlice";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { getSafeImageUrl } from "@/lib/getSafeImageUrl";

const useProfile = () => {
  const { data: myProfile, error, isLoading } = useGetProfileQuery();
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

  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (myProfile?.data?.profilePicture) {
      setPreview(getSafeImageUrl(myProfile.data.profilePicture));
    }
  }, [myProfile]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("File selected:", file);
      setPreview(URL.createObjectURL(file));
      setValue("profilePicture", file);
    }
  };
  const onSubmit = async (data) => {
    console.log("Form Data:", data);
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
      navigate("/profile");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return {
    myProfile,
    error,
    isLoading,
    isUpdatingProfile,
    errorUpdateProfile,
    register,
    handleSubmit,
    errors,
    onSubmit,
    reset,
    navigate,
    preview,
    handleFileChange,
  };
};

export default useProfile;
