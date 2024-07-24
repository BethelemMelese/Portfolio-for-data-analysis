import { Avatar, Divider, Grid } from "@mui/material";
import { Card } from "antd";
import profilePhoto from "../../images/Pp.jpeg";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import LanguageIcon from "@mui/icons-material/Language";

const AboutMe = () => {
  return (
    <div className="about-me-container">
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <Card className="pic-card">
            <Card className="pic-item-card">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <div>
                    <Avatar
                      className="pic-photo"
                      alt="Profile Picture"
                      sx={{ width: 200, height: 200 }}
                      src={profilePhoto}
                    />
                  </div>
                  <div className="divider-fir"></div>
                </Grid>
                <Divider
                  orientation="horizontal"
                  flexItem
                  className="divider-fir"
                />
                <Grid item xs={12} className="personal-name">
                  <h3>Ablene Melese</h3>
                  <div className="divider-sec"></div>
                  <h5>Data Analysis</h5>
                </Grid>
                <Grid item xs={12}>
                  <div className="sm-link">
                    <div className="sm-item">
                      <a href="https://www.linkedin.com/in/ablene-melese-821b36223">
                        {" "}
                        <LinkedInIcon />
                      </a>
                    </div>
                    <div className="sm-item">
                      <a href="#">
                        <WhatsAppIcon />
                      </a>
                    </div>
                    <div className="sm-item">
                      <a href="#">
                        <InstagramIcon />
                      </a>
                    </div>
                    <div className="sm-item">
                      <a href="#">
                        {" "}
                        <LanguageIcon />
                      </a>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Card>
          </Card>
        </Grid>
        <Grid item xs={8}>
          <Card className="bio-card">
            <div className="bio">
              <div className="bio-detail">
                <h1>Hello</h1>
                <p>Here's Who I am & What i do</p>
                <div className="bio-buttons">
                  <div className="bio-btn bio-btn1">
                    <a href="#">Resume</a>
                  </div>
                  <div className="bio-btn bio-btn2">
                    <a href="project">Projects</a>
                  </div>
                </div>
              </div>

              <div className="bio-description">
                <p>
                  I am a Self-taught data scientist equipped with the necessary
                  skills and passion. My unique, hands-on approach to
                  problem-solving and data analysis has been shaped by a deep
                  curiosity and commitment to continuous learning.
                </p>
                <p>
                  Through dedication and self-directed education, I have
                  developed a robust understanding of data science principles
                  and techniques. My drive to explore and master new concepts
                  has empowered me to tackle complex data challenges with
                  confidence and creativity.
                </p>
              </div>
            </div>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <footer className="aboutme-footer">
            <div className="created-by">
              <p>&copy; 2024, by Bethelem Melese</p>
            </div>

            <div className="address">
              <div className="address-item">
                <h4>
                  <b>Call</b>
                </h4>
                <p>+251 799001136</p>
              </div>
              <div className="address-item">
                <h4>
                  <b>Write</b>
                </h4>
                <p>datawizdipsy@gmail.com</p>
              </div>
              <div className="address-item">
                <h4>
                  <b>Follow</b>
                </h4>
                <div className="footer-sm-link">
                  <div className="footer-sm-item">
                    <a href="https://www.linkedin.com/in/ablene-melese-821b36223">
                      {" "}
                      <LinkedInIcon />
                    </a>
                  </div>
                  <div className="footer-sm-item">
                    <a href="#">
                      <WhatsAppIcon />
                    </a>
                  </div>
                  <div className="footer-sm-item">
                    <a href="#">
                      <InstagramIcon />
                    </a>
                  </div>
                  <div className="footer-sm-item">
                    <a href="#">
                      {" "}
                      <LanguageIcon />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </Grid>
      </Grid>
    </div>
  );
};

export default AboutMe;
