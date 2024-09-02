import { useEffect, useState } from "react";
import FooterBlog from "../../../menu/footer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";
import { appUrl } from "../../../appurl";
import axios from "axios";
import { Buffer } from "buffer";
import DetailBlog from "../item/detail-blog";

const CategoryDetailBlog = ({ ...props }) => {
  const [viewMode, setViewMode] = useState("category");
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

  const convertBufferToBase64 = (buffer: Buffer): string => {
    const base64String = Buffer.from(buffer).toString("base64");
    return `data:${dataSource[0].blogImage.contentType};base64,${base64String}`;
  };

  return (
    <div>
      {viewMode == "category" && (
        <>
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
                          src={convertBufferToBase64(item.blogImage.data)}
                          width="100%"
                          height="50%"
                          className="hover-image"
                          onClick={() => {
                            setViewMode("detail");
                            setSelectedBlog(item);
                          }}
                        />
                        <div className="blog-item-content">
                          <p className="blog-category">
                            <b>{item.categoryName}</b>
                          </p>
                          <h3
                            onClick={() => {
                              setViewMode("detail");
                              setSelectedBlog(item);
                            }}
                          >
                            {item.blogTitle}
                          </h3>
                          <h6>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: item.mainContent.slice(0, 290) + "...",
                              }}
                            />
                          </h6>
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
        </>
      )}
      {viewMode == "detail" && (
        <DetailBlog
          viewMode={viewMode}
          selectedBlog={selectedBlog}
          closeedit={() => setViewMode("category")}
        />
      )}
    </div>
  );
};

export default CategoryDetailBlog;
