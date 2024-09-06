import NavMenu from "./nav";
import { Outlet } from "react-router-dom";
import Loading from "../component/loading";

const Layout = ({ ...props }) => {
  return (
    <>
      <Loading />
      <div className="sec-container">
        <NavMenu />
        <Outlet />
        <div className="child-container">{props.children}</div>
      </div>
    </>
  );
};

export default Layout;
