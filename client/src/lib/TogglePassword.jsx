import React from "react";
import { Eye, EyeClosed } from "lucide-react";
import { Button } from "@/components/common";

const TogglePassword = ({ toggleShowPassword, showPassword, customClass }) => {
  return (
    <Button
      type="button"
      className={`absolute text-gray-500 ${customClass}`}
      onClick={toggleShowPassword}
    >
      {showPassword ? <EyeClosed size={24} /> : <Eye size={24} />}
    </Button>
  );
};

export default TogglePassword;
