import React from "react";

export const Input = React.forwardRef(
  ({ type, className, onChange, ...props }, ref) => {
    return (
      <input
        type={type}
        className={className}
        {...props}
        ref={ref}
        onChange={onChange}
      />
    );
  }
);

export default Input;
