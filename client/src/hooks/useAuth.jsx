import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { Login, Logout, Register } from "@/redux/thunks/auth";
import { profileApi } from "@/redux/slices/profileApiSlice";

const useAuth = () => {
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmitLogin = async (data) => {
    try {
      await dispatch(Login(data)).unwrap();
      reset();
      dispatch(profileApi.util.resetApiState());
      navigate("/");
      toast.success("Login successful");
    } catch (error) {
      console.log("Error:", error);
      toast.error(error.message);
    }
  };

  const handleSubmitRegister = async (data) => {
    try {
      await dispatch(Register(data)).unwrap();
      reset();
      navigate("/login");
      toast.success("Registration successful");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await dispatch(Logout()).unwrap();
      dispatch(profileApi.util.resetApiState());
      navigate("/login");
    } catch (error) {}
  };

  return {
    loading,
    error,
    isAuthenticated,
    register,
    handleSubmit,
    handleSubmitLogin,
    handleSubmitRegister,
    handleLogout,
    errors,

    // Password toggle
    showPassword,
    toggleShowPassword,
  };
};

export default useAuth;
