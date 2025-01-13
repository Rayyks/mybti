import React from "react";

export const Button = ({ type, children, ...props }) => {
  return (
    <button type={type} {...props}>
      {children}
    </button>
  );
};

export default Button;
