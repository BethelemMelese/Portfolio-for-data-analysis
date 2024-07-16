import NavMenu from "./nav";
import { Outlet } from "react-router-dom";

const Layout = ({ ...props }) => {
  return (
    <div>
      <NavMenu />
      <Outlet />
      {props.children}
    </div>
  );
};

export default Layout;
