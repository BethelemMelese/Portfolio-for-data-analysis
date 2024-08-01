import { useState } from "react";
import BlogImage from "../../images/login_header_image.jpg";
import FooterBlog from "../../menu/footer";

const CategoryDetailBlog = ({ ...props }) => {
  const [viewMode, setViewMode] = useState(props.viewMode);
  const [selectedBlog, setSelectedBlog] = useState(props.selectedBlog);

  return (
    <div>
      <section>
        <div className="category-detail-container">
          <div className="category-blog-content">
            <h1>Blog Category One</h1>
            <p>
              Ant Design, a design language for background applications, is
              refined by Ant UED TeamF
            </p>
          </div>
          <div className="category-blog-img">
            <div className="blog-item">
              <img src={BlogImage} width="90%" height="60%" />
              <div className="blog-item-content">
                <p>Category Name</p>
                <h3>Blog Title</h3>
                <h6>
                  We supply a series of design principles, practical patterns
                  and high quality design resources (Sketch and Axure), to help
                  people create their product prototypes beautifully and
                  efficiently.
                </h6>
              </div>
              <div className="blog-info">
                <p>July 23, 2023, Ablena Melese</p>
              </div>
            </div>
            <div className="blog-item">
              <img src={BlogImage} width="90%" height="60%" />
              <div className="blog-item-content">
                <p>Category Name</p>
                <h3>Blog Title</h3>
                <h6>
                  We supply a series of design principles, practical patterns
                  and high quality design resources (Sketch and Axure), to help
                  people create their product prototypes beautifully and
                  efficiently.
                </h6>
              </div>
              <div className="blog-info">
                <p>July 23, 2023, Ablena Melese</p>
              </div>
            </div>
            <div className="blog-item">
              <img src={BlogImage} width="90%" height="60%" />
              <div className="blog-item-content">
                <p>Category Name</p>
                <h3>Blog Title</h3>
                <h6>
                  We supply a series of design principles, practical patterns
                  and high quality design resources (Sketch and Axure), to help
                  people create their product prototypes beautifully and
                  efficiently.
                </h6>
              </div>
              <div className="blog-info">
                <p>July 23, 2023, Ablena Melese</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FooterBlog />
    </div>
  );
};

export default CategoryDetailBlog;
