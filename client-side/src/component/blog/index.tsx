import { Button, Grid, Menu, MenuItem, Tooltip } from "@mui/material";
import BioImage from "../../images/profile-photo.jpg";
import BlogImage from "../../images/login_header_image.jpg";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import LanguageIcon from "@mui/icons-material/Language";
import { Card, List } from "antd";
import { useState } from "react";
import DetailBlog from "./detail-blog";
import CategoryDetailBlog from "./category-detail-blog";
import FooterBlog from "../../menu/footer";

const data = [
  {
    title: "Blog Category 1",
  },
  {
    title: "Blog Category 2",
  },
  {
    title: "Blog Category 3",
  },
  {
    title: "Blog Category 4",
  },
];

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
  {
    id: 4,
    blogName: "Blog Four",
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

const Blog = ({ ...props }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [viewMode, setViewMode] = useState("main");
  const [selectedBlog, setSelectedBlog] = useState();
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
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
                <div>
                  {blogMokeDate.map((item: any) => {
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
                                src={BlogImage}
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
                                {item.blogName}
                              </a>
                            </h3>
                            <p>{item.mainContent.slice(0, 290) + "..."}</p>
                            <div className="blog-au-info">
                              <p>
                                {item.datePublished} . by {item.author}
                              </p>
                              <h6 className="arc-more-btn">
                                <a onClick={handleClick}>
                                  <MoreHorizIcon />
                                </a>
                              </h6>
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
                  <List
                    className="category-list"
                    itemLayout="horizontal"
                    dataSource={data}
                    pagination={{
                      pageSize: 4,
                    }}
                    renderItem={(item: any, index) => (
                      <List.Item>
                        <List.Item.Meta
                          title={
                            <h4 className="category-item-title">
                              <a
                                onClick={() => {
                                  setViewMode("category");
                                  setSelectedBlog(item);
                                }}
                              >
                                {item.title}
                              </a>
                            </h4>
                          }
                          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        />
                      </List.Item>
                    )}
                  />
                </Card>
              </Grid>
            </Grid>
          </section>
          <FooterBlog />
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
      {/* <section>
        <Card className="before-footer">
          <div className="bef-footer-container">
            <div className="footer-quote">
              <h4>
                <b>Ablena Melese/ DATA SCIENTISTS</b>
              </h4>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
            </div>
            <div className="shot-link">
              <h4>Category</h4>
              <ul>
                {data.map((item: any) => {
                  return (
                    <li>
                      <a>{item.title}</a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="blog-sm">
              <h4>Follow Me</h4>
              <div className="blog-sm-link">
                <div className="blog-sm-item">
                  <Tooltip title="LinkedIn">
                    <a href="https://www.linkedin.com/in/ablene-melese-821b36223">
                      {" "}
                      <LinkedInIcon />
                    </a>
                  </Tooltip>
                </div>
                <div className="blog-sm-item">
                  <Tooltip title="WhatsApp">
                    <a href="#">
                      <WhatsAppIcon />
                    </a>
                  </Tooltip>
                </div>
                <div className="blog-sm-item">
                  <Tooltip title="Instagram">
                    <a href="#">
                      <InstagramIcon />
                    </a>
                  </Tooltip>
                </div>
                <div className="blog-sm-item">
                  <Tooltip title="WWW">
                    <a href="#">
                      {" "}
                      <LanguageIcon />
                    </a>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>
      <footer className="contact-footer">
        <div className="created-by">
          <p>Copyright &copy; 2024 by Bethelem Melese, all rights reserved.</p>
        </div>
      </footer> */}
    </div>
  );
};

export default Blog;
