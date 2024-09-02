import { Card } from "antd";
import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";
import { appUrl } from "../../../../appurl";

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
            src={appUrl + `project/uploads/${selectedBlog.blogImage}`}
            width="40%"
            height="30%"
          />
          <div dangerouslySetInnerHTML={{ __html: selectedBlog.mainContent }} />
        </div>
      </Card>
    </div>
  );
};

export default DetailBlog;
