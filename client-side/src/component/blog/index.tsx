import { Avatar, Grid } from "@mui/material";
import { Card, List } from "antd";
import { useEffect, useState } from "react";
import DetailBlog from "./item/detail-blog";
import CategoryDetailBlog from "./category/category-detail-blog";
import FooterBlog from "../../menu/footer";
import Notification from "../../commonComponent/notification";
import CategoryImage from "../../images/IMG_0087.jpg";
import axios from "axios";
import { appUrl } from "../../appurl";
import { Buffer } from "buffer";

const CategoryMoke = [
  {
    id: 1,
    categoryName: "The First Category",
    categoryDescription: "The First Category Description",
  },
  {
    id: 2,
    categoryName: "The First Category",
    categoryDescription: "The First Category Description",
  },
  {
    id: 3,
    categoryName: "The First Category",
    categoryDescription: "The First Category Description",
  },
  {
    id: 4,
    categoryName: "The First Category",
    categoryDescription: "The First Category Description",
  },
];

const Blog = ({ ...props }) => {
  const [viewMode, setViewMode] = useState("main");
  const [loading, setLoading] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState();
  const [categoryDate, setCategoryData] = useState<any>([]);
  const [response, setResponse] = useState<any>();
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

  useEffect(() => {
    axios
      .create({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .get(appUrl + `user`)
      .then((response: any) => {
        setResponse(response.data[0]);
      })
      .catch((error: any) => {
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
            <div className="blog-quote">
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
            <div className="blog-grid-container">
              <div className="blog-grid-category">
                <Card title="Blog Category" className="blog-category"  style={{
                  height: "580px",
                  overflowX: "hidden",
                  overflowY: "auto",
                }}>
                  {categoryDate.length != 0 &&
                    categoryDate.map((item: any) => {
                      return (
                        <div className="category-list">
                          <div className="category-image">
                            <img
                              alt="Category Image"
                              src={convertBufferToBase64ForCategory(
                                item.categoryImage.data
                              )}
                              width={80}
                              height={80}
                            />
                          </div>
                          <div className="category-item">
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
                            <p>
                              {item.categoryDescription.slice(0, 290) + "..."}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                </Card>
              </div>
              <div className="blog-grid-item">
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
              </div>
            </div>
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
