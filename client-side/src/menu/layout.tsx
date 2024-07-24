import NavMenu from "./nav";
import { Outlet } from "react-router-dom";

const Layout = ({ ...props }) => {
  return (
    <div className="sec-container">
      <NavMenu />
      <Outlet />
      {props.children}
    </div>
  );
};

export default Layout;
