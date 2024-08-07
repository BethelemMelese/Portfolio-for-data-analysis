import { Button, Grid, IconButton, MenuItem, Menu } from "@mui/material";
import { Card, Tooltip, Modal } from "antd";
import { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BlogImage from "../../../images/login_header_image.jpg";
import Notification from "../../../commonComponent/notification";
import { ExclamationCircleFilled } from "@ant-design/icons";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { appUrl, token } from "../../../appurl";
import axios from "axios";

const { confirm } = Modal;

interface BlogState {
  categoryName: string;
  categoryDescription: string;
  blogItemList: string;
}

const initialState: BlogState = {
  categoryName: "",
  categoryDescription: "",
  blogItemList: "",
};

const blogMokeDate = [
  {
    id: 1,
    blogName: "Blog One",
    author: "Ablene Melese",
    datePublished: "12/03/2024",
    mainContent:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    comment: [
      { id: 1, name: "Betty Melese", message: "I liked your title" },
      { id: 2, name: "Betty Melese", message: "I liked your title" },
      { id: 3, name: "Betty Melese", message: "I liked your title" },
    ],
  },
  {
    id: 2,
    blogName: "Blog Two",
    author: "Ablene Melese",
    datePublished: "12/05/2024",
    mainContent:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    comment: [
      { id: 1, name: "Betty Melese", message: "I liked your title" },
      { id: 2, name: "Betty Melese", message: "I liked your title" },
      { id: 3, name: "Betty Melese", message: "I liked your title" },
    ],
  },
  {
    id: 3,
    blogName: "Blog Three",
    author: "Ablene Melese",
    datePublished: "12/06/2024",
    mainContent:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    comment: [
      { id: 1, name: "Betty Melese", message: "I liked your title" },
      { id: 2, name: "Betty Melese", message: "I liked your title" },
      { id: 3, name: "Betty Melese", message: "I liked your title" },
    ],
  },
];

const DetailCategory = ({ ...props }) => {
  const [selectedCategory, setSelectedCategory] = useState(
    props.selectedCategory
  );
  const [viewCategory, setViewCategory] = useState(props.viewCategory);
  const [dataSource, setDataSource] = useState<any>([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const onDeleteSuccess = (response: any) => {
    setNotify({
      isOpen: true,
      type: "success",
      message: response.message,
    });
    onFetchProject();
  };

  const onDeleteError = (response: any) => {
    setNotify({
      isOpen: true,
      message: response,
      type: "error",
    });
  };

  //   Notification for Success and error actions
  const onViewError = (response: any) => {
    setNotify({
      isOpen: true,
      type: "error",
      message: response,
    });
  };

  const onFetchProject = () => {
    axios
      .create({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .get(appUrl + `projects`)
      .then((res) => {
        setLoading(false);
        setDataSource(res.data);
      })
      .catch((error: any) => {
        setLoading(false);
        onViewError(error.response.data.error);
      });
  };

  const showConfirm = (value: any) => {
    confirm({
      title: "Do you want to delete this project?",
      icon: <ExclamationCircleFilled />,
      content: "You are unable to undo the deletion of this.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        axios
          .create({
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .delete(appUrl + `projects/${value}`)
          .then((response) => {
            onDeleteSuccess(response.data);
          })
          .catch((error) => onDeleteError(error.response.data.message));
      },
      onCancel() {},
    });
  };

  //   to fetch data using useEffect, when every time this page is loaded
  useEffect(() => {
    setLoading(true);
    // onFetchProject();
  }, []);
  return (
    <div className="category-detail-container">
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Card>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <h2>{selectedCategory.title}</h2>
                <p>
                  Ant Design, a design language for background applications, is
                  refined by Ant UED Team
                </p>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  size="small"
                  className="create-btn"
                  onClick={() => {
                    props.closeedit();
                  }}
                >
                  Add Blog
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={8}>
          <Card
            extra={
              <Button
                variant="text"
                size="small"
                color="error"
                startIcon={<ArrowBackIcon />}
                onClick={() => {
                  props.closeedit();
                }}
              >
                Back
              </Button>
            }
          >
            <div
              style={{
                height: "660px",
                overflowX: "hidden",
                overflowY: "auto",
                marginTop:"-20px"
              }}
            >
              {blogMokeDate.map((item: any) => {
                return (
                  <>
                    <Card
                      title={
                        <Grid container>
                          <Grid item xs={12}>
                            <h3>{item.blogName}</h3>
                            <h5
                              style={{
                                fontSize: "10px",
                                marginTop: "-10px",
                                color: "#5f5e53fe",
                              }}
                            >
                              Author: {item.author}
                            </h5>
                          </Grid>
                        </Grid>
                      }
                      extra={
                        <>
                          <Tooltip title="To edit the blog">
                            <IconButton
                              onClick={() => {
                                // setViewMode("edit");
                              }}
                            >
                              <ModeEditIcon color="warning" />
                            </IconButton>
                          </Tooltip>
                          |
                          <Tooltip title="To delete the blog">
                            <IconButton
                              onClick={() => {
                                showConfirm(item.id);
                              }}
                            >
                              <DeleteForeverIcon color="error" />
                            </IconButton>
                          </Tooltip>
                        </>
                      }
                      style={{marginTop:"10px"}}
                    >
                      <Grid container spacing={0}>
                        <Grid item xs={12} style={{ marginTop: "-15px" }}>
                          <Grid container spacing={0}>
                            <Grid item xs={4}>
                              <img
                                src={BlogImage}
                                width={150}
                                height={110}
                                style={{
                                  margin: "20px",
                                  borderRadius: "5px",
                                }}
                              />
                            </Grid>
                            <Grid item xs={8}>
                              <h5 className="maincontent">
                                {item.mainContent.slice(0, 290) + "..."}
                              </h5>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={10}>
                          <h5
                            style={{
                              marginTop: "-20px",
                              color: "#5f5e53fe",
                              marginLeft: "20px",
                            }}
                          >
                            Published Date: {item.datePublished}
                          </h5>
                        </Grid>
                        <Grid item xs={2} className="more-btn">
                          <Button
                            variant="outlined"
                            size="small"
                            color="warning"
                            onClick={handleClick}
                          >
                            More
                          </Button>
                          <Menu
                            keepMounted
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            open={Boolean(anchorEl)}
                          >
                            <MenuItem onClick={handleClose}>
                              Source Code Link
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                              Other Link
                            </MenuItem>
                          </Menu>
                        </Grid>
                      </Grid>
                    </Card>
                  </>
                );
              })}
            </div>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default DetailCategory;
