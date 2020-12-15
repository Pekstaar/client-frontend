import React from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";

export const UserRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));

  return user && user.token ? (
    <Route {...rest} render={() => children} />
  ) : (
    <h4 className="text-waring">Loading...</h4>
  );
};
