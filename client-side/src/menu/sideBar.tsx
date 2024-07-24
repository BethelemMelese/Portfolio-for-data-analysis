import { NavLink } from "react-router-dom";
import GridViewIcon from "@mui/icons-material/GridView";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ArticleIcon from "@mui/icons-material/Article";
import SummarizeIcon from "@mui/icons-material/Summarize";
import { useState } from "react";

const SideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="sidebar-menu">
      <ul>
        <li>
          <NavLink to="/datawizdipsy/sidebar" className="sideBar-item">
            <GridViewIcon className="menu-icon" /> Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/datawizdipsy/viewProject" className="sideBar-item">
            <TaskAltIcon className="menu-icon" /> Project
          </NavLink>
        </li>
        <li>
          <NavLink to="/datawizdipsy/viewBlog" className="sideBar-item">
            <ArticleIcon className="menu-icon" /> Blog
          </NavLink>
        </li>
        <li>
          <NavLink to="/datawizdipsy/viewResume" className="sideBar-item">
            <SummarizeIcon className="menu-icon" /> Resume
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
