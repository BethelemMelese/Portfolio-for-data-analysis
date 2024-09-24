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

  const convertBufferToBase64 = (buffer: Buffer): string => {
    const base64String = Buffer.from(buffer).toString("base64");
    return `data:${selectedBlog.blogImage.contentType};base64,${base64String}`;
  };
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
            src={convertBufferToBase64(selectedBlog.blogImage.data)}
            width="40%"
            height="30%"
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
