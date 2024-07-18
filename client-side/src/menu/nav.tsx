import { LightModeOutlined, DarkModeOutlined } from "@mui/icons-material";
import { IconButton, Switch } from "@mui/material";
import { Tooltip } from "antd";
import { useEffect, useState } from "react";

type Theme = "dark" | "light";

const NavMenu = () => {
  const [theme, setTheme] = useState<Theme>("light");
  const [toggleDarkMode, setToggleDarkMode] = useState(true);

  // function to toggle the dark mode as true or false
  const toggleDarkTheme = () => {
    setToggleDarkMode(!toggleDarkMode);
    setTheme(!toggleDarkMode ? "dark" : "light");
    localStorage.setItem("theme-color", !toggleDarkMode ? "dark" : "light");
  };

  useEffect(() => {
    return document.body.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const currentTheme: any = localStorage.getItem("theme-color");
    if (currentTheme) {
      setTheme(currentTheme);
    }
  }, []);

  return (
    <nav className="nav-menu">
      <div className="nav-log">
        <h2>
          <b>Ablene Melese</b> / DATA SCIENTISTS
        </h2>
      </div>
      <ul className="nav-item-menu">
        <li>
          <a href="/">ABOUT ME</a>
        </li>
        <li>
          <a href="blog">BLOG</a>
        </li>
        <li>
          <a href="project">PROJECT</a>
        </li>
        <li>
          <a href="contactMe">CONTACT</a>
        </li>
      </ul>
      <div>
        <div className="container-switch">
          <Tooltip
            title={`Switch to ${!toggleDarkMode ? "Dark" : "Light"} Mode`}
            placement="bottom"
            color="light"
          >
            <IconButton
              onClick={toggleDarkTheme}
              style={
                !toggleDarkMode
                  ? { backgroundColor: "#1d1d1f" }
                  : { backgroundColor: "#f2de1f" }
              }
            >
              {!toggleDarkMode ? (
                <DarkModeOutlined style={{ color: "#f2de1f" }} />
              ) : (
                <LightModeOutlined style={{ color: "#1d1d1f" }} />
              )}
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </nav>
  );
};

export default NavMenu;
