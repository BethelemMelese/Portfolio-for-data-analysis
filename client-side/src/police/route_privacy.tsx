import React from "react";
import userService from "./userService";
import Login from "../component/login";

interface Props {
  component: React.ComponentType;
  path?: string;
}

const RoutePrivacy: React.FC<Props> = ({ component: RouteComponent }) => {
  const user = userService.token;

  if (user != null) {
    return <RouteComponent />;
  } else {
    return <Login />;
  }
};

export default RoutePrivacy;
