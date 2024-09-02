import React, { useEffect, useState } from "react";
import {
  Grid,
  InputLabel,
  Paper,
  Badge,
  Tooltip,
  Button,
  IconButton,
  Avatar
} from "@mui/material";
import { Card } from "antd";
import userService from "../../police/userService";
import axios from "axios";
import { appUrl, token } from "../../appurl";
import Notification from "../../commonComponent/notification";
import EditProfile from "./edit";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { SamllDialogs } from "../../commonComponent/dialog";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

const Profile = () => {
  const [viewMode, setViewMode] = useState("info");
  const [response, setResponse] = useState<any>();
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<any>();
  const [validFormat, setValidFormat] = useState(false);
  const [imageSize, setImageSize] = useState(false);
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

  const beforeUpload = (file: any) => {
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png"
    ) {
      setValidFormat(false);
      setLoading(false);
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        setImageSize(true);
        setLoading(false);
      } else {
        setImageSize(false);
        setLoading(false);
        setImageUrl(file);
      }
    } else {
      setLoading(false);
      setValidFormat(true);
    }
  };

  const onUploadSuccess = () => {
    setOpenDialog(false);
    window.location.reload();
  };

  const onUploadError = (error: any) => {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
  };

  const onUploadPhoto = () => {
    const formDate = new FormData();
    formDate.append("file", imageUrl);
    axios
      .create({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .put(appUrl + `user/photo/${response.id}`, formDate)
      .then((response: any) => onUploadSuccess())
      .catch((error: any) => onUploadError(error));
  };

  return (
    <div className="profile-container">
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Card>
            {viewMode == "info" && (
              <Card
                extra={
                  <Tooltip title="Edit Profile">
                    <IconButton
                      onClick={() => {
                        setViewMode("editProfile");
                      }}
                    >
                      <AutoFixHighIcon fontSize="medium" color="success" />
                    </IconButton>
                  </Tooltip>
                }
              >
                {response != undefined && (
                  <Card>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Badge
                          overlap="circular"
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                          badgeContent={
                            <a onClick={() => setOpenDialog(true)}>
                              <Tooltip title="Edit Profile Photo">
                                <ModeEditOutlineIcon
                                  fontSize="large"
                                  style={{
                                    backgroundImage:
                                      "linear-gradient(to right, #ffff, hsl(346, 72%, 94%))",
                                    color: "#000",
                                    borderRadius: "50%",
                                  }}
                                />
                              </Tooltip>
                            </a>
                          }
                        >
                          {response.profileImage != undefined && (
                            <Avatar
                              src={
                                appUrl +
                                `user/uploads/${response.profileImage}`
                              }
                              sx={{ width: 120, height: 120 }}
                              className="profile-image"
                            ></Avatar>
                          )}
                          {response.profileImage == undefined && (
                            <Avatar
                              sx={{ width: 120, height: 120 }}
                              className="profile-image"
                            ></Avatar>
                          )}
                        </Badge>
                      </Grid>
                      <Grid item xs={4}>
                        <InputLabel>First Name</InputLabel>
                        <h4>{response.firstName}</h4>
                      </Grid>
                      <Grid item xs={4}>
                        <InputLabel>Middle Name</InputLabel>
                        <h4>{response.middleName}</h4>
                      </Grid>
                      <Grid item xs={4}>
                        <InputLabel>Last Name</InputLabel>
                        <h4>{response.lastName}</h4>
                      </Grid>
                      <Grid item xs={4}>
                        <InputLabel>Username</InputLabel>
                        <h4>{response.username}</h4>
                      </Grid>
                      <Grid item xs={4}>
                        <InputLabel>Email</InputLabel>
                        <h4>{response.email}</h4>
                      </Grid>
                      <Grid item xs={4}>
                        <InputLabel>Phone</InputLabel>
                        <h4>{response.phone}</h4>
                      </Grid>
                      <Grid item xs={4}>
                        <InputLabel>Address</InputLabel>
                        <h4>{response.address}</h4>
                      </Grid>
                      <Grid item xs={4}>
                        <InputLabel>Sub City</InputLabel>
                        <h4>{response.subCity}</h4>
                      </Grid>
                      <Grid item xs={4}>
                        <InputLabel>Town</InputLabel>
                        <h4>{response.town}</h4>
                      </Grid>
                    </Grid>
                  </Card>
                )}
              </Card>
            )}

            {viewMode == "editProfile" && (
              <EditProfile
                viewMode={viewMode}
                closeedit={() => setViewMode("info")}
                editProfile={response}
              />
            )}
            <SamllDialogs
              openDialog={openDialog}
              setOpenDialog={openDialog}
              height="40%"
              maxHeight="50"
              children={
                <Card title="Edit Profile Photo">
                  <div>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <div className="upload-pp">
                          <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            beforeUpload={() => false}
                            onChange={(response: any) =>
                              beforeUpload(response.file)
                            }
                          >
                            {imageUrl ? (
                              <img
                                src={imageUrl.name}
                                alt="avatar"
                                style={{ width: "100%" }}
                              />
                            ) : (
                              <button
                                style={{ border: 0, background: "none" }}
                                type="button"
                              >
                                {loading ? (
                                  <LoadingOutlined
                                    style={{ marginRight: 22 }}
                                  />
                                ) : (
                                  <PlusOutlined style={{ marginRight: 22 }} />
                                )}
                                <div style={{ marginTop: 8, marginRight: 15 }}>
                                  Upload
                                </div>
                              </button>
                            )}
                            <br />
                            {validFormat ? (
                              <>
                                <span className="text-danger">
                                  Invalid file format, Only jpg, jpeg and png
                                  files are allowed!
                                </span>
                              </>
                            ) : null}
                            {imageSize ? (
                              <>
                                <br />
                                <span className="text-danger">
                                  Image must smaller than 2MB!
                                </span>
                              </>
                            ) : null}
                          </Upload>
                        </div>
                      </Grid>
                      <Grid item xs={6}>
                        <Button
                          variant="contained"
                          size="small"
                          color="warning"
                          onClick={onUploadPhoto}
                        >
                          Save
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Button
                          variant="outlined"
                          size="small"
                          color="warning"
                          onClick={() => setOpenDialog(false)}
                        >
                          Cancel
                        </Button>
                      </Grid>
                    </Grid>
                  </div>
                </Card>
              }
            />
          </Card>
        </Grid>
      </Grid>

      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default Profile;
