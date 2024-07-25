import { IconButton, Tooltip } from "@mui/material";
import { LightModeOutlined, DarkModeOutlined } from "@mui/icons-material";
import * as React from "react";
import Badge from "@mui/material/Badge";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  Avatar,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
// import { userService } from "../../polices/userService";
import { useNavigate } from "react-router-dom";
import SyncLockIcon from "@mui/icons-material/SyncLock";
import LogoutIcon from "@mui/icons-material/Logout";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import profilePhoto from "../images/Pp.jpeg";
import SideBar from "./sideBar";

type Theme = "dark" | "light";

const TopBar = () => {
  const [theme, setTheme] = useState<Theme>("light");
  const [toggleDarkMode, setToggleDarkMode] = useState(true);
  const [userInfo, setUserInfo] = useState<any>();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorE2, setAnchorE2] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorE2);
  const id = open ? "simple-popover" : undefined;
  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("permission");
    localStorage.removeItem("role");
    localStorage.removeItem("controller");
    navigate("/");
  };

  return (
    <div>
      <div className="top-bar-header">
        <nav className="top-bar-menu">
          <div className="tob-bar-log">
            <h2>
              <b>Ablene Melese</b> / DATA SCIENTISTS
            </h2>
          </div>
          <div className="main-setting">
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
          {/* </div> */}
          {/* <div className="notify">
            <IconButton id="check" onClick={handleClick}>
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </div> */}
          {/* <div className="profile"> */}
            <Box>
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Badge
                    badgeContent="Ablena"
                    color="warning"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                  >
                    <Avatar
                      sx={{ width: 45, height: 45 }}
                      src={profilePhoto}
                    ></Avatar>
                  </Badge>
                </IconButton>
              </Tooltip>

              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: "left", vertical: "top" }}
                anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
              >
                <MenuItem onClick={() => navigate("/egila/info")}>
                  <ListItemIcon>
                    <PermIdentityIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Profile</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => navigate("/egila/changePassword")}>
                  <ListItemIcon>
                    <SyncLockIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Change Password</ListItemText>
                </MenuItem>
                <MenuItem onClick={logOut}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </div>
        </nav>
      </div>
      <SideBar />
    </div>
  );
};

export default TopBar;
