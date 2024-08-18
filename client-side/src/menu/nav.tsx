import { LightModeOutlined, DarkModeOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Tooltip } from "antd";
import { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link, NavLink } from "react-router-dom";
import Whitelogo from "../images/WHite Logo.png";
import Blacklogo from "../images/Black  Logo.png";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Space, Switch } from "antd";
import { CSSTransition } from "react-transition-group";

type Theme = "dark" | "light";

const NavMenu = () => {
  const [theme, setTheme] = useState<Theme>("dark");
  const [toggleDarkMode, setToggleDarkMode] = useState(true);
  const [click, setClick] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="nav-menu">
      <div className="nav-log">
        {/* <h2>
          <b>Ablene Melese</b> / DATA SCIENTISTS
        </h2> */}
        {theme == "light" ? (
          <img src={Whitelogo} width={160} />
        ) : (
          <img src={Blacklogo} width={160} />
        )}
      </div>
      {isMobile && (
        <div className="checkbtn">
          <IconButton id="check" onClick={toggleMenu}>
            <MenuIcon type="checked" className="menubtn" />
          </IconButton>
        </div>
      )}
      {/* <CSSTransition
        in={isMobile ? isOpen : true}
        timeout={1000}
        classNames="menu-transition"
        unmountOnExit
      > */}
        <ul className={`nav-item-menu ${isMobile && isOpen ? "show" : ""}`}>
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
      {/* </CSSTransition> */}

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
