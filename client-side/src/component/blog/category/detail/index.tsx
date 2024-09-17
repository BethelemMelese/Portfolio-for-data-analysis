import { Button, Grid, IconButton, Avatar } from "@mui/material";
import { Card, Tooltip, Modal } from "antd";
import { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ExclamationCircleFilled } from "@ant-design/icons";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { appUrl, token } from "../../../../appurl";
import axios from "axios";
import AddBlog from "../../item/create";
import DetailBlog from "../../item/detail";
import { Buffer } from "buffer";

const { confirm } = Modal;

interface BlogState {
  categoryName: string;
  categoryDescription: string;
}

const initialState: BlogState = {
  categoryName: "",
  categoryDescription: "",
};

const DetailCategory = ({ ...props }) => {
  const [selectedCategory, setSelectedCategory] = useState(
    props.selectedCategory
  );
  const [selectedBlog, setSelecteBlog] = useState();
  const [viewCategory, setViewCategory] = useState("view");
  const [viewMode, setViewMode] = useState("view");
  const [dataSource, setDataSource] = useState<any>([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);
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
    onFetchBlog();
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
      .get(appUrl + `blog/byCategoryId/${selectedCategory.id}`)
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

  //   to fetch data using useEffect, when every time this page is loaded
  useEffect(() => {
    setLoading(true);
    onFetchBlog();
  }, []);

  const convertBufferToBase64 = (buffer: Buffer): string => {
    const base64String = Buffer.from(buffer).toString("base64");
    return `data:${dataSource[0].blogImage.contentType};base64,${base64String}`;
  };

  const convertBufferToBase64ForCategory = (buffer: Buffer): string => {
    const base64String = Buffer.from(buffer).toString("base64");
    return `data:${selectedCategory.categoryImage.contentType};base64,${base64String}`;
  };

  return (
    <div className="category-detail-container">
      {viewMode == "view" && (
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Card>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Avatar
                    variant="rounded"
                    style={{
                      margin: "0px auto",
                      borderRadius: "5px",
                      width: 350,
                      height: 200,
                      maxHeight: 200,
                      maxWidth: 400,
                    }}
                    alt="Blog Image"
                    src={convertBufferToBase64ForCategory(
                      selectedCategory.categoryImage.data
                    )}
                  />
                  <h2>{selectedCategory.categoryName}</h2>
                  <p>{selectedCategory.categoryDescription}</p>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    size="small"
                    className="create-btn"
                    onClick={() => {
                      setViewCategory("new");
                    }}
                  >
                    Add Blog
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={8}>
            {viewCategory == "view" && (
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
                    marginTop: "-20px",
                  }}
                >
                  {dataSource.length != 0 &&
                    dataSource.map((item: any) => {
                      return (
                        <>
                          <Card
                            title={
                              <Grid container>
                                <Grid item xs={12}>
                                  <h3 className="blog-title-link">
                                    <a
                                      onClick={() => {
                                        setViewMode("detail");
                                        setSelecteBlog(item);
                                      }}
                                    >
                                      {item.blogTitle}
                                    </a>
                                  </h3>
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
                            style={{ marginTop: "10px" }}
                          >
                            <Grid container spacing={0}>
                              <Grid item xs={12} style={{ marginTop: "-15px" }}>
                                <Grid container spacing={0}>
                                  <Grid item xs={4}>
                                    <img
                                      src={convertBufferToBase64(
                                        item.blogImage.data
                                      )}
                                      width={100}
                                      height={100}
                                      style={{
                                        margin: "20px",
                                        borderRadius: "5px",
                                      }}
                                    />
                                  </Grid>
                                  <Grid item xs={8}>
                                    <h5 className="maincontent">
                                      <div
                                        className="maincontent"
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            item.mainContent.slice(0, 290) +
                                            "...",
                                        }}
                                      />
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
                                  Published Date: {item.publishedDate}
                                </h5>
                              </Grid>
                            </Grid>
                          </Card>
                        </>
                      );
                    })}
                </div>
              </Card>
            )}

            {viewCategory == "new" && (
              <AddBlog
                //@ts-ignore
                selectedBlog={initialState}
                selectedCategory={selectedCategory}
                viewMode={viewCategory}
                closeedit={() => setViewCategory("view")}
              />
            )}
          </Grid>
        </Grid>
      )}

      {viewMode == "detail" && (
        <DetailBlog
          //@ts-ignore
          selectedBlog={selectedBlog}
          selectedCategory={selectedCategory}
          viewMode={viewCategory}
          closeedit={() => {
            setViewCategory("view");
            setViewMode("view");
          }}
        />
      )}
    </div>
  );
};

export default DetailCategory;
