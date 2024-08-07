import { Avatar, Button, Grid, Tooltip } from "@mui/material";
import { Card, Upload, Button as ButtonAnt } from "antd";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Images from "../../images/Pp.jpeg";
import axios from "axios";
import { useEffect, useState } from "react";
import { appUrl } from "../../appurl";
import userService from "../../police/userService";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { SamllDialogs } from "../../commonComponent/dialog";
import Notification from "../../commonComponent/notification";
import { Form } from "../../commonComponent/Form";
import Controls from "../../commonComponent/Controls";
import EditProfile from "./edit";
import { UploadOutlined } from "@ant-design/icons";

const Profile = ({ ...props }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [response, setResponse] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<any>();
  const [validFormat, setValidFormat] = useState(false);
  const [fileRequired, setFileRequired] = useState(false);
  const [imageSize, setImageSize] = useState(false);
  const [viewMode, setViewMode] = useState("view");
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

  const onUploadPhoto = () => {
    if (imageUrl == null) {
      setFileRequired(true);
    } else {
      setFileRequired(false);
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
    }
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

  return (
    <div className="profile-container">
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Card title="Profile Picture">
            <div className="img-pp">
              <Upload
                listType="picture"
                onChange={(response: any) => beforeUpload(response.file)}
                beforeUpload={() => false}
                onRemove={() => setImageUrl("")}
              >
                {response != undefined && (
                  <Tooltip title="Click here to upload">
                    <Avatar
                      sx={{ width: 100, height: 100 }}
                      className="profile-image"
                      src={appUrl + `user/uploads/${response.profileImage}`}
                    ></Avatar>
                  </Tooltip>
                )}

                <br />
                {validFormat ? (
                  <span className="text-danger">
                    Invalid file format, Only jpg, jpeg and png files are
                    allowed!
                  </span>
                ) : null}
                {fileRequired ? (
                  <span className="text-danger">
                    Please upload new picture first !
                  </span>
                ) : null}
              </Upload>
            </div>
            <div className="photo-content">
              <div className="upload-photo">
                <Button
                  variant="contained"
                  size="small"
                  color="warning"
                  startIcon={<FileUploadIcon />}
                  onClick={onUploadPhoto}
                >
                  Change Picture
                </Button>
              </div>
              <div className="remove-photo">
                <Button
                  variant="outlined"
                  size="small"
                  color="error"
                  startIcon={<DeleteOutlineIcon />}
                  onClick={() => window.location.reload()}
                >
                  Delete Picture
                </Button>
              </div>
            </div>
          </Card>
        </Grid>
        <Grid item xs={12}>
          {response != undefined && viewMode == "view" && (
            <Card className="profile-form" title="Your Info">
              <Form autoComplete="off" noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Controls.Input
                      className="inputField"
                      required
                      id="firstName"
                      label="Your Name"
                      disabled
                      value={response.fullName}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Controls.Input
                      className="inputField"
                      id="email"
                      label="Email"
                      disabled
                      value={response.email}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Controls.Input
                      className="inputField"
                      required
                      id="phone"
                      label="Phone"
                      disabled
                      value={response.phone}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Controls.Input
                      className="inputField"
                      id="profession"
                      label="Profession"
                      disabled
                      value={response.profession}
                    />
                  </Grid>
                </Grid>
                <div className="profile-btn">
                  <Button
                    className="maker-btn"
                    variant="contained"
                    onClick={() => setViewMode("edit")}
                  >
                    Make Change
                  </Button>
                </div>
              </Form>
            </Card>
          )}
          {viewMode == "edit" && (
            <EditProfile
              viewMode={viewMode}
              closeedit={() => setViewMode("view")}
              editProfile={response}
            />
          )}
        </Grid>
      </Grid>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default Profile;
