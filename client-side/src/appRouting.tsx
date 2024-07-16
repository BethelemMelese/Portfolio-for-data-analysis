import { Routes, Route, Link } from "react-router-dom";
import AboutMe from "./component/aboutMe";
import Blog from "./component/blog";
import ContactMe from "./component/contactMe";
import Project from "./component/project";
import NavMenu from "./menu/nav";
import Layout from "./menu/layout";
import "./css/style.css";
import "./App.css";

function AppRoute() {
  return (
    <div className="App">
      <Routes>
        <Route path="/navBar" element={<NavMenu />} />
        <Route element={<Layout />}>
          <Route path="/" element={<AboutMe />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/project" element={<Project />} />
          <Route path="/contactMe" element={<ContactMe />} />
        </Route>
      </Routes>
    </div>
  );
}

export default AppRoute;
