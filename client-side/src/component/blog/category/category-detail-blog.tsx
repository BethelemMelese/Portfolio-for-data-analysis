import { useEffect, useState } from "react";
import BlogImage from "../../../images/login_header_image.jpg";
import FooterBlog from "../../../menu/footer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";
import { appUrl } from "../../../appurl";
import axios from "axios";

const CategoryDetailBlog = ({ ...props }) => {
  const [viewMode, setViewMode] = useState(props.viewMode);
  const [selectedBlog, setSelectedBlog] = useState(props.selectedBlog);
  const [dataSource, setDataSource] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .create({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .get(appUrl + `blog/byCategoryId/${selectedBlog.id}`)
      .then((res) => {
        setLoading(false);
        setDataSource(res.data);
      });
  }, []);

  return (
    <div>
      <div className="back-btn">
        <Button
          variant="text"
          size="small"
          color="primary"
          startIcon={<ArrowBackIcon />}
          onClick={() => {
            props.closeedit();
          }}
        >
          Back
        </Button>
      </div>
      <section className="main-category-detail-container">
        <div>
          <div className="category-blog-content">
            <h1>{selectedBlog.categoryName}</h1>
            <p>{selectedBlog.categoryDescription}</p>
          </div>

          <div className="category-blog-img">
            {dataSource.length != 0 &&
              dataSource.map((item: any) => {
                return (
                  <div className="blog-item">
                    <img
                      src={appUrl + `blog/uploads/${item.blogImage}`}
                      width="100%"
                      height="50%"
                    />
                    <div className="blog-item-content">
                      <p>
                        <b>{item.categoryName}</b>
                      </p>
                      <h3>{item.blogTitle}</h3>
                      <h6>{item.mainContent.slice(0, 290) + "..."}</h6>
                    </div>
                    <div className="blog-info">
                      <p>
                        {item.publishedDate}, by {item.author}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
      <FooterBlog />
    </div>
  );
};

export default CategoryDetailBlog;
