import { LightModeOutlined, DarkModeOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Tooltip } from "antd";
import { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link, NavLink } from "react-router-dom";
import Whitelogo from "../images/LigthLog.png";
import Blacklogo from "../images/DarkLog.png";

type Theme = "dark" | "light";

const NavMenu = () => {
  const [theme, setTheme] = useState<Theme>("dark");
  const [toggleDarkMode, setToggleDarkMode] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  // const handleClick = () => setClick(!click);

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
    <nav className="nav-menu">
      <div className="hamburger">
        <IconButton id="check" onClick={toggleMenu}>
          {isOpen ? (
            <CloseIcon className="bar" />
          ) : (
            <MenuIcon className="bar" />
          )}
        </IconButton>
      </div>
      <div className="nav-log">
        {theme == "light" ? (
          <img src={Whitelogo} width={100}  height={100}/>
        ) : (
          <img src={Blacklogo} width={100} height={100}/>
        )}
      </div>
      <ul className={`nav-item-menu ${isOpen ? "open" : ""}`}>
        <li>
          <NavLink to="/" className="nav-item" onClick={toggleMenu}>
            ABOUT ME
          </NavLink>
        </li>
        <li>
          <NavLink to="blog" className="nav-item" onClick={toggleMenu}>
            BLOG
          </NavLink>
        </li>
        <li>
          <NavLink to="project" className="nav-item" onClick={toggleMenu}>
            PROJECT
          </NavLink>
        </li>
        <li>
          <NavLink to="contactMe" className="nav-item" onClick={toggleMenu}>
            CONTACT
          </NavLink>
        </li>
      </ul>

      <div>
        <div className="container-switch">
          <Tooltip
            title={`Switch to ${theme == "light" ? "Dark" : "Light"} Mode`}
            placement="bottom"
            color="light"
          >
            <IconButton
              size="small"
              onClick={toggleDarkTheme}
              style={
                theme == "light"
                  ? { backgroundColor: "#1d1d1f" }
                  : { backgroundColor: "#f4f3f0" }
              }
            >
              {theme == "light" ? (
                <DarkModeOutlined style={{ color: "#f4f3f0" }} />
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
