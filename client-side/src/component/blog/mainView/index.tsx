import { Button, Grid, IconButton, Tooltip, Avatar } from "@mui/material";
import { Card, Modal } from "antd";
import { List } from "antd";
import { useEffect, useState } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { appUrl, token } from "../../../appurl";
import axios from "axios";
import Notification from "../../../commonComponent/notification";
import { ExclamationCircleFilled } from "@ant-design/icons";
import AddCategory from "../category/create";
import DetailCategory from "../category/detail";
import DetailBlog from "../item/detail";
import EditBlogCategory from "../category/edit";
import EditBlog from "../item/edit";

const { confirm } = Modal;

interface BlogState {
  categoryName: string;
  categoryDescription: string;
}

const initialState: BlogState = {
  categoryName: "",
  categoryDescription: "",
};

const ViewBlog = () => {
  const [viewMode, setViewMode] = useState("view");
  const [viewCategory, setViewCategory] = useState("view");
  const [loading, setLoading] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [blogDate, setBlogData] = useState<any>([]);
  const [categoryDate, setCategoryData] = useState<any>([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const onDeleteSuccess = (response: any) => {
    setNotify({
      isOpen: true,
      type: "success",
      message: response.message,
    });
    setTimeout(() => {
      onFetchBlog();
      onFetchCategory();
    }, 2000);
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

  const onFetchBlog = () => {
    axios
      .create({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .get(appUrl + `blog/latestBlog/`)
      .then((res) => {
        setLoading(false);
        setBlogData(res.data);
      })
      .catch((error: any) => {
        setLoading(false);
        onViewError(error.response.data.error);
      });
  };

  const onFetchCategory = () => {
    axios
      .create({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .get(appUrl + `blog/category/`)
      .then((res) => {
        setLoading(false);
        setCategoryData(res.data);
      })
      .catch((error: any) => {
        setLoading(false);
        onViewError(error.response.data.error);
      });
  };

  const showConfirm = (value: any) => {
    confirm({
      title: "Do you want to delete this blog?",
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
          .delete(appUrl + `blog/deleteBlog/${value}`)
          .then((response) => {
            onDeleteSuccess(response.data);
          })
          .catch((error) => onDeleteError(error.response.data.message));
      },
      onCancel() {},
    });
  };

  const showConfirmForCategory = (value: any) => {
    confirm({
      title: "Do you want to delete this category?",
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
          .delete(appUrl + `blog/deleteCategory/${value}`)
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
    onFetchBlog();
  }, []);

  useEffect(() => {
    onFetchCategory();
  }, []);

  return (
    <div className="blog-container">
      {viewCategory == "view" && (
        <Grid container spacing={2}>
          <Grid item xs={7}>
            {viewMode == "view" && (
              <div
                style={{
                  height: "660px",
                  overflowX: "hidden",
                  overflowY: "auto",
                }}
              >
                {blogDate.length != 0 &&
                  blogDate.map((item: any) => {
                    return (
                      <>
                        <Card
                          title={
                            <Grid container>
                              <Grid item xs={12}>
                                <h3>{item.blogTitle}</h3>
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
                                    setViewMode("edit");
                                    setSelectedBlog(item);
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
                          style={{ marginTop: "20px" }}
                          className="blog-list"
                        >
                          <Grid container spacing={0}>
                            <Grid item xs={12} style={{ marginTop: "-15px" }}>
                              <Grid container spacing={0}>
                                <Grid item xs={4}>
                                  <img
                                    src={
                                      appUrl + `blog/uploads/${item.blogImage}`
                                    }
                                    width={150}
                                    height={110}
                                    style={{
                                      margin: "20px",
                                      borderRadius: "5px",
                                    }}
                                  />
                                </Grid>
                                <Grid item xs={8}>
                                  <div
                                    className="maincontent"
                                    dangerouslySetInnerHTML={{
                                      __html:
                                        item.mainContent.slice(0, 290) + "...",
                                    }}
                                  />
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
                                Published Date: {item.publishedDate}
                              </h5>
                            </Grid>
                            <Grid item xs={2} className="more-btn">
                              <Button
                                variant="text"
                                size="small"
                                color="warning"
                                onClick={() => {
                                  setViewCategory("detailBlog");
                                  setSelectedBlog(item);
                                }}
                              >
                                More
                              </Button>
                            </Grid>
                          </Grid>
                        </Card>
                      </>
                    );
                  })}
              </div>
            )}
            {viewMode == "new" && (
              <AddCategory
                //@ts-ignore
                selectedBlog={initialState}
                viewMode={viewMode}
                closeedit={() => setViewMode("view")}
              />
            )}
            {viewMode == "edit" && (
              <EditBlog
                //@ts-ignore
                selectedCategory={selectedCategory}
                selectedBlog={selectedBlog}
                viewMode={viewMode}
                closeedit={() => setViewMode("view")}
              />
            )}
            {viewMode == "editcategory" && (
              <EditBlogCategory
                //@ts-ignore
                selectedCategory={selectedCategory}
                viewMode={viewMode}
                closeedit={() => setViewMode("view")}
              />
            )}
          </Grid>
          <Grid item xs={5}>
            <Card
              className="blog-category-list"
              title="Categories"
              extra={
                <Tooltip title="To add new category">
                  <Button
                    variant="contained"
                    size="small"
                    className="create-btn"
                    onClick={() => {
                      setViewMode("new");
                    }}
                  >
                    Add Category
                  </Button>
                </Tooltip>
              }
            >
              {categoryDate.length != 0 && (
                <List
                  itemLayout="horizontal"
                  dataSource={categoryDate}
                  pagination={{
                    pageSize: 5,
                  }}
                  renderItem={(item: any) => (
                    <List.Item
                      actions={[
                        <Tooltip title="To edit the category">
                          <IconButton
                            onClick={() => {
                              setViewMode("editcategory");
                              setSelectedCategory(item);
                            }}
                          >
                            <ModeEditIcon color="warning" />
                          </IconButton>
                        </Tooltip>,
                        <Tooltip title="To delete the category">
                          <IconButton
                            onClick={() => {
                              showConfirmForCategory(item.id);
                            }}
                          >
                            <DeleteForeverIcon color="error" />
                          </IconButton>
                        </Tooltip>,
                        <a
                          key="list-loadmore-edit"
                          onClick={() => {
                            setViewCategory("detail");
                            setSelectedCategory(item);
                          }}
                        >
                          View
                        </a>,
                      ]}
                    >
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            variant="rounded"
                            src={appUrl + `blog/uploads/${item.categoryImage}`}
                          />
                        }
                        title={item.categoryName}
                        description={item.categoryDescription}
                      />
                    </List.Item>
                  )}
                />
              )}
            </Card>
          </Grid>
        </Grid>
      )}
      {viewCategory == "detail" && (
        <DetailCategory
          selectedCategory={selectedCategory}
          viewCategory={viewCategory}
          closeedit={() => setViewCategory("view")}
        />
      )}
      {viewCategory == "detailBlog" && (
        <DetailBlog
          selectedCategory={selectedCategory}
          selectedBlog={selectedBlog}
          viewCategory={viewCategory}
          closeedit={() => setViewCategory("view")}
        />
      )}
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default ViewBlog;
