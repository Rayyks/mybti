import { useLazySearchQuery } from "@/redux/slices/searchApiSlice";
import { useForm } from "react-hook-form";

export const useSearch = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [triggerSearch, { data, error, isLoading }] = useLazySearchQuery();

  const onSubmit = async (formData) => {
    try {
      await triggerSearch({ query: formData.username });
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    reset,
    onSubmit,
    data,
    error,
    isLoading,
  };
};
