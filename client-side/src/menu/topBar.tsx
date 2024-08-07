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
import UserService from "../police/userService";
import axios from "axios";
import { appUrl } from "../appurl";
import userService from "../police/userService";

const TopBar = ({ ...props }) => {
  const [dataSource, setDataSource] = useState<any>(0);
  const [response, setResponse] = useState<any>();
  const [pageTitle, setPageTitle] = useState();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const userName = UserService.currentUser;
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const onFetchSuccess = (response: any) => {
    setResponse(response);
  };

  const onFetchError = (error: any) => {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
  };

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("current-page");
    localStorage.removeItem("name");
    navigate("/mainpage/login");
  };

  useEffect(() => {
    const currentPage: any = localStorage.getItem("current-page");
    if (currentPage) {
      setPageTitle(currentPage);
    }
  }, [props.routeName == undefined]);

  //   Notification for Success and error actions
  const onViewError = (response: any) => {
    setNotify({
      isOpen: true,
      type: "error",
      message: response,
    });
  };

  //   for get all data
  const onFetchContacts = () => {
    axios
      .create({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .get(appUrl + "contact/notify")
      .then((res) => {
        setDataSource(res.data.message);
      })
      .catch((error: any) => {
        onViewError(error.response.data.error);
      });
  };

  //   to fetch data using useEffect, when every time this page is loaded
  useEffect(() => {
    onFetchContacts();
  }, []);

  useEffect(() => {
    const userToken = userService.token;
    axios
      .create({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .get(appUrl + `user/userInfo/${userToken}`)
      .then((response: any) => onFetchSuccess(response.data))
      .catch((error: any) => onFetchError(error));
  }, []);

  return (
    <div>
      <nav className="top-bar-menu">
        <div className="page-title">
          <h2>{props.routeName == undefined ? pageTitle : props.routeName}</h2>
        </div>
        <div className="profile-setting">
          <IconButton id="check" onClick={handleClick}>
            <Badge badgeContent={dataSource} color="error">
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
                color="success"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
              >
                {response != undefined && (
                  <Avatar
                    sx={{ width: 45, height: 45 }}
                    src={appUrl + `user/uploads/${response.profileImage}`}
                  />
                )}
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
            <MenuItem
              onClick={() => {
                localStorage.setItem("current-page", "Profile");
                navigate("/datawizdipsy/profile");
              }}
            >
              <ListItemIcon>
                <PermIdentityIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Profile</ListItemText>
            </MenuItem>
            <MenuItem
              onClick={() => {
                localStorage.setItem("current-page", "Change Password");
                navigate("/datawizdipsy/changePassword");
              }}
            >
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
