import { IconButton, Tooltip } from "@mui/material";
import * as React from "react";
import Badge from "@mui/material/Badge";
import { useEffect, useState } from "react";
import {
  Avatar,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SyncLockIcon from "@mui/icons-material/SyncLock";
import LogoutIcon from "@mui/icons-material/Logout";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import profilePhoto from "../images/Pp.jpeg";
import NotificationsIcon from "@mui/icons-material/Notifications";

const TopBar = ({ ...props }) => {
  const [routeName, setRouteName] = useState(props.routeName);
  const [pageTitle, setPageTitle] = useState();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("permission");
    localStorage.removeItem("role");
    localStorage.removeItem("controller");
    navigate("/");
  };

  useEffect(() => {
    const currentPage: any = localStorage.getItem("current-page");
    if (currentPage) {
      setPageTitle(currentPage);
    }
  }, [props.routeName == undefined]);

  return (
    <div>
      {/* <div className="top-bar-header"> */}
      <nav className="top-bar-menu">
        <div className="page-title">
          <h2>{props.routeName == undefined ? pageTitle : props.routeName}</h2>
        </div>
        <div className="profile-setting">
          <IconButton id="check" onClick={handleClick}>
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

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
                color="success"
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
        </div>
      </nav>
    </div>
  );
};

export default TopBar;
