import React from "react";
import { Redirect, Route } from "react-router";

const PrivateRoute = ({ component: Component, isLogin, logout, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin ? (
          <Component logout={logout} {...props} />
        ) : (
          <Redirect to="/auth" />
        )
      }
    />
  );
};

export default PrivateRoute;
