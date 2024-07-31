import { Routes, Route, Link } from "react-router-dom";
import AboutMe from "./component/aboutMe";
import Blog from "./component/blog";
import ContactMe from "./component/contactMe";
import Project from "./component/project";
import Layout from "./menu/layout";
import SideBar from "./menu/sideBar";
import TopBar from "./menu/topBar";
import MainLayout from "./menu/mainLayout";
import Login from "./component/login";
import Registration from "./component/registration";
import ViewProject from "./component/project/view";
import ViewBlog from "./component/blog/view";
import Dashboard from "./component/Dashboard";
import "./css/style.css";
import "./css/responsive.css";
import "./css/main.style.css";
import "./App.css";

function AppRoute() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<AboutMe />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/project" element={<Project />} />
          <Route path="/contactMe" element={<ContactMe />} />
        </Route>

        <Route path="mainPage">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Registration />} />
        </Route>

        <Route path="datawizdipsy" element={<MainLayout />}>
          <Route path="home" element={<Dashboard />} />
          <Route path="viewProject" element={<ViewProject />} />
          <Route path="viewBlog" element={<ViewBlog />} />
        </Route>
      </Routes>
    </div>
  );
}

export default AppRoute;
