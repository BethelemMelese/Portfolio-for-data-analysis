import { Card } from "antd";
import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";
import { Buffer } from "buffer";

const DetailBlog = ({ ...props }) => {
  const [selectedCategory, setSelectedCategory] = useState(
    props.selectedCategory
  );
  const [selectedBlog, setSelectedBlog] = useState(props.selectedBlog);
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
          <h1>{selectedBlog.blogTitle}</h1>
          <div className="blog-info">
            <p>
              {selectedBlog.author}, {selectedBlog.publishedDate}
            </p>
          </div>
          <img
            src={selectedBlog.blogImage}
            width={300}
            height={300}
            style={{
              display: "block",
              margin: "0px auto",
              borderRadius: "5px",
              objectFit: "cover",
            }}
          />
          <div className="blog-content">
            <div
              className="blog-content-container"
              dangerouslySetInnerHTML={{ __html: selectedBlog.mainContent }}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DetailBlog;
