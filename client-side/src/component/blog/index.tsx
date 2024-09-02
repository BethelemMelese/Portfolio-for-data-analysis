import { Avatar, Grid } from "@mui/material";
import BioImage from "../../images/profile-photo.jpg";
import { Card, List } from "antd";
import { useEffect, useState } from "react";
import DetailBlog from "./item/detail-blog";
import CategoryDetailBlog from "./category/category-detail-blog";
import FooterBlog from "../../menu/footer";
import Notification from "../../commonComponent/notification";
import axios from "axios";
import { appUrl } from "../../appurl";
import { Buffer } from "buffer";

const Blog = ({ ...props }) => {
  const [viewMode, setViewMode] = useState("main");
  const [loading, setLoading] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState();
  const [categoryDate, setCategoryData] = useState<any>([]);
  const [blogDate, setBlogData] = useState<any>([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  //Notification for Success and error actions
  const onViewError = (response: any) => {
    setNotify({
      isOpen: true,
      type: "error",
      message: response,
    });
  };

  useEffect(() => {
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
  }, []);

  useEffect(() => {
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
  }, []);

  const convertBufferToBase64ForCategory = (buffer: Buffer): string => {
    const base64String = Buffer.from(buffer).toString("base64");
    return `data:${categoryDate[0].categoryImage.contentType};base64,${base64String}`;
  };

  const convertBufferToBase64ForBlog = (buffer: Buffer): string => {
    const base64String = Buffer.from(buffer).toString("base64");
    return `data:${blogDate[0].blogImage.contentType};base64,${base64String}`;
  };

  return (
    <div className="blog-main-container">
      {viewMode == "main" && (
        <>
          <div className="blog-hero">
            <div className="blog-hero-image">
              <img src={BioImage} />
            </div>
            <div className="blog-qute">
              <h1>
                <b>Ablena Melese/ DATA SCIENTISTS</b>
              </h1>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
              <div className="anc-more-btn">
                <a href="#contact">Learn More</a>
              </div>
            </div>
          </div>
          <section id="contact" className="blog-content">
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <div className="blog-list">
                  {blogDate.length != 0 &&
                    blogDate.map((item: any) => {
                      return (
                        <>
                          <div className="blog-item-fis">
                            <div className="blog-item-img">
                              <a
                                onClick={() => {
                                  setViewMode("detail");
                                  setSelectedBlog(item);
                                }}
                              >
                                <img
                                  src={convertBufferToBase64ForBlog(
                                    item.blogImage.data
                                  )}
                                  width={200}
                                  height={200}
                                  style={{
                                    margin: "20px",
                                    borderRadius: "5px",
                                  }}
                                />
                              </a>
                            </div>
                            <div className="blog-item-msg">
                              <h3>
                                <a
                                  onClick={() => {
                                    setViewMode("detail");
                                    setSelectedBlog(item);
                                  }}
                                >
                                  {item.blogTitle}
                                </a>
                              </h3>
                              <p>
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      item.mainContent.slice(0, 290) + "...",
                                  }}
                                />
                              </p>

                              <div className="blog-au-info">
                                <p>
                                  {item.publishedDate}, by {item.author}
                                </p>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                </div>
              </Grid>
              <Grid item xs={4}>
                <Card title="Blog Category" className="blog-category">
                  {categoryDate.length != 0 && (
                    <List
                      className="category-list"
                      itemLayout="horizontal"
                      dataSource={categoryDate}
                      pagination={{
                        pageSize: 4,
                      }}
                      renderItem={(item: any, index) => (
                        <List.Item>
                          <List.Item.Meta
                            avatar={
                              <Avatar
                                variant="rounded"
                                src={convertBufferToBase64ForCategory(
                                  item.categoryImage.data
                                )}
                              />
                            }
                            title={
                              <h4 className="category-item-title">
                                <a
                                  onClick={() => {
                                    setViewMode("category");
                                    setSelectedBlog(item);
                                  }}
                                >
                                  {item.categoryName}
                                </a>
                              </h4>
                            }
                            description={item.categoryDescription}
                          />
                        </List.Item>
                      )}
                    />
                  )}
                </Card>
              </Grid>
            </Grid>
          </section>
          <FooterBlog />
          <Notification notify={notify} setNotify={setNotify} />
        </>
      )}

      {viewMode == "detail" && (
        <DetailBlog
          viewMode={viewMode}
          selectedBlog={selectedBlog}
          closeedit={() => setViewMode("main")}
        />
      )}
      {viewMode == "category" && (
        <CategoryDetailBlog
          viewMode={viewMode}
          selectedBlog={selectedBlog}
          closeedit={() => setViewMode("main")}
        />
      )}
    </div>
  );
};

export default Blog;
