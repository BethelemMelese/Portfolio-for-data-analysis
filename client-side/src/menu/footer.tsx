import { Card } from "antd";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import LanguageIcon from "@mui/icons-material/Language";
import { Tooltip } from "@mui/material";

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

const FooterBlog = () => {
  return (
    <div>
      <section>
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
      </footer>
    </div>
  );
};

export default FooterBlog;
