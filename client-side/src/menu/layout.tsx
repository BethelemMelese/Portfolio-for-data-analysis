import NavMenu from "./nav";
import { Outlet } from "react-router-dom";

const Layout = ({ ...props }) => {
  return (
    <div className="sec-container">
      <NavMenu />
      <Outlet />
      <div className="child-container">
      {props.children}
      </div>
    </div>
  );
};

export default Layout;
