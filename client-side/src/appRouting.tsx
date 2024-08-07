import { Routes, Route } from "react-router-dom";
import AboutMe from "./component/aboutMe";
import Blog from "./component/blog";
import ContactMe from "./component/contactMe";
import Project from "./component/project";
import Layout from "./menu/layout";
import RoutePrivacy from "./police/route_privacy";
import MainLayout from "./menu/mainLayout";
import Login from "./component/login";
import Registration from "./component/registration";
import ViewProject from "./component/project/view";
import ViewBlog from "./component/blog/view";
import Dashboard from "./component/Dashboard";
import ViewResume from "./component/resume/view";
import ChangePassword from "./component/changePassword";
import Profile from "./component/profile";
import ViewContact from "./component/contactMe/view";
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

        <Route
          path="datawizdipsy"
          element={<RoutePrivacy component={MainLayout} />}
        >
          <Route path="home" element={<Dashboard />} />
          <Route path="viewProject" element={<ViewProject />} />
          <Route path="viewBlog" element={<ViewBlog />} />
          <Route path="viewResume" element={<ViewResume />} />
          <Route path="viewContacts" element={<ViewContact />} />
          <Route path="changePassword" element={<ChangePassword />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default AppRoute;
