import { NavLink } from "react-router-dom";
import GridViewIcon from "@mui/icons-material/GridView";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ArticleIcon from "@mui/icons-material/Article";
import SummarizeIcon from "@mui/icons-material/Summarize";
import ContactsIcon from "@mui/icons-material/Contacts";
import { useEffect, useState } from "react";
import { Divider, IconButton, Tooltip } from "@mui/material";
import { LightModeOutlined, DarkModeOutlined } from "@mui/icons-material";

type Theme = "dark" | "light";

const SideBar = ({ ...props }) => {
  const [theme, setTheme] = useState<Theme>("dark");
  const [routeName, setRouteName] = useState("Dashboard");
  const [toggleDarkMode, setToggleDarkMode] = useState(true);
  const toggleDarkTheme = () => {
    setToggleDarkMode(!toggleDarkMode);
    setTheme(toggleDarkMode ? "dark" : "light");
    localStorage.setItem("theme-color", toggleDarkMode ? "dark" : "light");
  };

  useEffect(() => {
    return document.body.setAttribute("light-theme", theme);
  }, [theme]);

  useEffect(() => {
    const currentTheme: any = localStorage.getItem("theme-color");
    if (currentTheme) {
      setTheme(currentTheme);
    }
  }, []);

  return (
    <>
      <div className="sidebar-menu">
        <h2>
          <b>Ablene Melese</b> / DATA SCIENTISTS
        </h2>
        <Divider orientation="horizontal" sx={{ borderWidth: 1 }} />
        <ul className="menu-items">
          <li>
            <NavLink
              to="/datawizdipsy/home"
              onClick={() => {
                props.setRouteName("Dashboard");
                localStorage.setItem("current-page", "Dashboard");
              }}
              className="sideBar-item"
            >
              <GridViewIcon className="menu-icon" /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/datawizdipsy/viewProject"
              onClick={() => {
                props.setRouteName("Project");
                localStorage.setItem("current-page", "Project");
              }}
              className="sideBar-item"
            >
              <TaskAltIcon className="menu-icon" /> Project
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/datawizdipsy/viewBlog"
              onClick={() => {
                props.setRouteName("Blog");
                localStorage.setItem("current-page", "Blog");
              }}
              className="sideBar-item"
            >
              <ArticleIcon className="menu-icon" /> Blog
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/datawizdipsy/viewResume"
              onClick={() => {
                props.setRouteName("Resume");
                localStorage.setItem("current-page", "Resume");
              }}
              className="sideBar-item"
            >
              <SummarizeIcon className="menu-icon" /> Resume
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/datawizdipsy/viewContacts"
              onClick={() => {
                props.setRouteName("Contacts");
                localStorage.setItem("current-page", "Contacts");
              }}
              className="sideBar-item"
            >
              <ContactsIcon className="menu-icon" /> Contacts
            </NavLink>
          </li>
        </ul>

        <div className="theme-setting">
          <Tooltip
            title={`Switch to ${theme == "light" ? "Dark" : "Light"} Mode`}
            placement="bottom"
            color="light"
          >
            <div
              style={
                theme == "light"
                  ? { backgroundColor: "#262522" }
                  : { backgroundColor: "#f2de1f" }
              }
              className="theme-button"
              onClick={toggleDarkTheme}
            >
              <a>
                {theme == "light" ? (
                  <DarkModeOutlined style={{ color: "#f2de1f" }} />
                ) : (
                  <LightModeOutlined style={{ color: "#262522" }} />
                )}
              </a>
            </div>
          </Tooltip>
        </div>
      </div>
    </>
  );
};

export default SideBar;
