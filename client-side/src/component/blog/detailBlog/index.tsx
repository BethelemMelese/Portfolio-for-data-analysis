import { Card } from "antd";
import { useState } from "react";
import BlogImage from "../../../images/login_header_image.jpg";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";

const DetailBlog = ({ ...props }) => {
  const [viewCategory, setViewCategory] = useState(props.viewCategory);
  const [selectedCategory, setSelectedCategory] = useState(
    props.selectedCategory
  );
  const [selectedBlog, setSelectedBlog] = useState(props.selectedBlog);
  console.log("selectedBlog...", selectedBlog);
  return (
    <div className="detailBlog-container">
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
        <div className="detailBlog-content">
          <h1>{selectedBlog.blogName}</h1>
          <div className="blog-info">
            <p>
              {selectedBlog.author}, {selectedBlog.datePublished}
            </p>
          </div>
          <img src={BlogImage} width="40%" height="30%" />
          <div className="blog-links">
            <a>Source Code Link</a>
            <a>Other Link</a>
          </div>
          <p>{selectedBlog.mainContent}</p>
          <p>{selectedBlog.mainContent}</p>
        </div>
      </Card>
    </div>
  );
};

export default DetailBlog;
