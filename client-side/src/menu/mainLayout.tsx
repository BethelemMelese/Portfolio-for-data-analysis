import { Layout } from "antd";
import SideBar from "./sideBar";
import TopBar from "./topBar";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
const { Header, Content } = Layout;

const MainLayout = ({ ...props }) => {
  const [routeName, setRouteName] = useState();
  return (
    <div className="main-content">
      <Layout>
        <Layout>
          <SideBar setRouteName={(value: any) => setRouteName(value)} />
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
