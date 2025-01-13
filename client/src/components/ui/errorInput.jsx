import React from "react";
import { Fragment } from "react";

export const ErrorInput = ({ error }) => {
  return (
    <Fragment>
      {error && <p className="text-red-500 text-xs italic">{error.message}</p>}
    </Fragment>
  );
};

export default ErrorInput;
