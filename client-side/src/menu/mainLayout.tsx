import { Layout } from "antd";
import SideBar from "./sideBar";
import TopBar from "./topBar";
import { Outlet } from "react-router-dom";
const { Header, Content } = Layout;

const MainLayout = ({ ...props }) => {
  return (
    <div>
      <Layout>
        <Layout>
          <TopBar />
          <Content>
            <Outlet />
            <div className="main-content">{props.children}</div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default MainLayout;
