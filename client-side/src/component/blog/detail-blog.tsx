import { useState } from "react";
import BlogImage from "../../images/login_header_image.jpg";
import PpBlogImg from "../../images/Pp.jpeg";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import LanguageIcon from "@mui/icons-material/Language";

import { Avatar, Tooltip } from "@mui/material";
import FooterBlog from "../../menu/footer";

const DetailBlog = ({ ...props }) => {
  const [viewMode, setViewMode] = useState(props.viewMode);
  const [selectedBlog, setSelectedBlog] = useState(props.selectedBlog);
  return (
    <div>
      <div className="detail-blog-container">
        <section>
          <div className="detail-blog-content">
            <h1>{selectedBlog.blogName}</h1>
            <img src={BlogImage} width="40%" height="30%" />
            <p>{selectedBlog.mainContent}</p>
            <p>{selectedBlog.mainContent}</p>
            <p>{selectedBlog.mainContent}</p>
            <p>{selectedBlog.mainContent}</p>
          </div>
        </section>
        <section className="detail-blog-contact">
          <div className="Pp-blog">
            <Avatar src={PpBlogImg} />
            <p>
              {selectedBlog.author}, {selectedBlog.datePublished}
            </p>
          </div>
          <div className="detail-sm-link">
            <div className="detail-sm-item">
              <Tooltip title="LinkedIn">
                <a href="https://www.linkedin.com/in/ablene-melese-821b36223">
                  {" "}
                  <LinkedInIcon />
                </a>
              </Tooltip>
            </div>
            <div className="detail-sm-item">
              <Tooltip title="WhatsApp">
                <a href="#">
                  <WhatsAppIcon />
                </a>
              </Tooltip>
            </div>
            <div className="detail-sm-item">
              <Tooltip title="Instagram">
                <a href="#">
                  <InstagramIcon />
                </a>
              </Tooltip>
            </div>
            <div className="detail-sm-item">
              <Tooltip title="WWW">
                <a href="#">
                  {" "}
                  <LanguageIcon />
                </a>
              </Tooltip>
            </div>
          </div>
        </section>
      </div>
      <FooterBlog />
    </div>
  );
};

export default DetailBlog;
