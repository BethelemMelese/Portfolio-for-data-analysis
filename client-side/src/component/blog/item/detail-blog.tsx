import { useEffect, useState } from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import LanguageIcon from "@mui/icons-material/Language";
import { Avatar, Button, Tooltip } from "@mui/material";
import FooterBlog from "../../../menu/footer";
import { appUrl } from "../../../appurl";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { Buffer } from "buffer";

const DetailBlog = ({ ...props }) => {
  const [viewMode, setViewMode] = useState(props.viewMode);
  const [selectedBlog, setSelectedBlog] = useState(props.selectedBlog);
  const [response, setResponse] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  //   Notification for Success and error actions
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
      .get(appUrl + `user`)
      .then((response: any) => {
        setResponse(response.data[0]);
        setIsLoading(false);
      })
      .catch((error: any) => {
        onViewError(error.response.data.error);
        setIsLoading(true);
      });
  }, []);

  return (
    <div>
      <div className="back-btn">
        <Button
          variant="contained"
          size="small"
          className="btn"
          startIcon={<ArrowBackIcon />}
          onClick={() => {
            props.closeedit();
          }}
        >
          Back
        </Button>
      </div>
      <div className="detail-blog-container">
        <section>
          <div className="detail-blog-content">
            <h1>{selectedBlog.blogTitle}</h1>
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
            <p>
              <div
                className="blog-content-container"
                dangerouslySetInnerHTML={{ __html: selectedBlog.mainContent }}
              />
            </p>
          </div>
        </section>
        <section className="detail-blog-contact">
          {response != undefined && (
            <div className="Pp-blog">
              <Avatar className="ava-owner-img" src={response.profileImage} />
              <p>
                {selectedBlog.author}, {selectedBlog.publishedDate}
              </p>
            </div>
          )}

          <div className="detail-sm-link">
            <div className="detail-sm-item">
              <Tooltip title="LinkedIn">
                <a
                  href="https://www.linkedin.com/in/ablene-melese-821b36223"
                  target="_blank"
                >
                  {" "}
                  <LinkedInIcon />
                </a>
              </Tooltip>
            </div>
            <div className="detail-sm-item">
              <Tooltip title="WhatsApp">
                <a href="https://wa.me/+251799001136" target="_blank">
                  <WhatsAppIcon />
                </a>
              </Tooltip>
            </div>
            <div className="detail-sm-item">
              <Tooltip title="Instagram">
                <a href="https://www.instagram.com/ab_lene26/" target="_blank">
                  <InstagramIcon />
                </a>
              </Tooltip>
            </div>
            <div className="detail-sm-item">
              <Tooltip title="WWW">
                <a href="#" target="_blank">
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
