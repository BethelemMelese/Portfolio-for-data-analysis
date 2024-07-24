import { LightModeOutlined, DarkModeOutlined } from "@mui/icons-material";
import { IconButton, Switch } from "@mui/material";
import { Tooltip } from "antd";
import { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link, NavLink } from "react-router-dom";

type Theme = "dark" | "light";

const NavMenu = () => {
  const [theme, setTheme] = useState<Theme>("light");
  const [toggleDarkMode, setToggleDarkMode] = useState(true);
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const toggleDarkTheme = () => {
    setToggleDarkMode(!toggleDarkMode);
    setTheme(toggleDarkMode ? "dark" : "light");
    localStorage.setItem("theme-color", toggleDarkMode ? "dark" : "light");
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
          <NavLink to="/" className="nav-item">
            ABOUT ME
          </NavLink>
        </li>
        <li>
          <NavLink to="blog" className="nav-item">
            BLOG
          </NavLink>
        </li>
        <li>
          <NavLink to="project" className="nav-item">
            PROJECT
          </NavLink>
        </li>
        <li>
          <NavLink to="contactMe" className="nav-item">
            CONTACT
          </NavLink>
        </li>
      </ul>
      <div className="checkbtn">
        <IconButton id="check" onClick={handleClick}>
          <MenuIcon type="checked" className="menubtn" />
        </IconButton>
      </div>
      <div>
        <div className="container-switch">
          <Tooltip
            title={`Switch to ${theme == "light" ? "Dark" : "Light"} Mode`}
            placement="bottom"
            color="light"
          >
            <IconButton
              onClick={toggleDarkTheme}
              style={
                theme == "light"
                  ? { backgroundColor: "#1d1d1f" }
                  : { backgroundColor: "#f2de1f" }
              }
            >
              {theme == "light" ? (
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
