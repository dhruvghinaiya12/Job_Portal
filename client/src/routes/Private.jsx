import React from "react";
import { UserToken } from "../UserToken";
import { Navigate } from "react-router-dom";

const Private = ({ children }) => {
  let user = UserToken();
  if (user) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default Private;
