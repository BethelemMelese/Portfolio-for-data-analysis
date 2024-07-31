import { Layout } from "antd";
import SideBar from "./sideBar";
import TopBar from "./topBar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
const { Header, Content } = Layout;

const MainLayout = ({ ...props }) => {
  const [routeName, setRouteName] = useState(props.routeName);
  console.log("routeName..",props.routeName);
  return (
    <div className="main-content">
      <Layout>
        <Layout>
          <SideBar />
          <TopBar routeName={routeName} />
          <Content>
            <Outlet />
            <div>{props.children}</div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default MainLayout;
