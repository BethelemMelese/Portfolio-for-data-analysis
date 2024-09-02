import { Avatar, Divider, Grid, Tooltip } from "@mui/material";
import { Card, Spin } from "antd";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import LanguageIcon from "@mui/icons-material/Language";
import { useEffect, useState } from "react";
import axios from "axios";
import { appUrl } from "../../appurl";
import Notification from "../../commonComponent/notification";
import { Buffer } from "buffer";

const AboutMe = () => {
  const [dataSource, setDataSource] = useState<any>();
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

  //   to fetch data using useEffect, when every time this page is loaded
  useEffect(() => {
    axios
      .create({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .get(appUrl + `resume`)
      .then((res) => {
        setDataSource(res.data);
        setIsLoading(false);
      })
      .catch((error: any) => {
        onViewError(error.response.data.error);
        setIsLoading(true);
      });
  }, []);

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

  const convertBufferToBase64 = (buffer: Buffer): string => {
    const base64String = Buffer.from(buffer).toString("base64");
    return `data:${response.profileImage.contentType};base64,${base64String}`;
  };


  return (
    <div className="about-me-container">
      {response != undefined && (
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
                        src={convertBufferToBase64(response.profileImage.data)}
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
                    <h3>{response.fullName}</h3>
                    <div className="divider-sec"></div>
                    <h5>{response.profession}</h5>
                  </Grid>
                  <Grid item xs={12}>
                    <div className="sm-link">
                      <div className="sm-item">
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
                      <div className="sm-item">
                        <Tooltip title="WhatsApp">
                          <a href="https://wa.me/+251799001136" target="_blank">
                            <WhatsAppIcon />
                          </a>
                        </Tooltip>
                      </div>
                      <div className="sm-item">
                        <Tooltip title="Instagram">
                          <a
                            href="https://www.instagram.com/ab_lene26/"
                            target="_blank"
                          >
                            <InstagramIcon />
                          </a>
                        </Tooltip>
                      </div>
                      <div className="sm-item">
                        <Tooltip title="WWW">
                          <a href="#" target="_blank">
                            {" "}
                            <LanguageIcon />
                          </a>
                        </Tooltip>
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
                    {dataSource != undefined && (
                      <>
                        {dataSource.map((item: any) => {
                          return (
                            <div className="bio-btn bio-btn1">
                              <a href={item.resumeLink} target="_blank">
                                Resume
                              </a>
                            </div>
                          );
                        })}
                      </>
                    )}

                    <div className="bio-btn bio-btn2">
                      <a href="project">Projects</a>
                    </div>
                  </div>
                </div>

                <div className="bio-description">
                  <p>
                    I am a Self-taught data scientist equipped with the
                    necessary skills and passion. My unique, hands-on approach
                    to problem-solving and data analysis has been shaped by a
                    deep curiosity and commitment to continuous learning.
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
                <p>
                  Copyright &copy; 2024 by @Bethisa.m, all rights reserved.
                </p>
              </div>

              <div className="address">
                <div className="address-item">
                  <h4>
                    <b>Call</b>
                  </h4>
                  <p>{response.phone}</p>
                </div>
                <div className="address-item">
                  <h4>
                    <b>Write</b>
                  </h4>
                  <p>{response.email}</p>
                </div>
                <div className="address-item">
                  <h4>
                    <b>Follow</b>
                  </h4>
                  <div className="footer-sm-link">
                    <div className="footer-sm-item">
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
                    <div className="footer-sm-item">
                      <Tooltip title="WhatsApp">
                        <a href="https://wa.me/+251799001136" target="_blank">
                          <WhatsAppIcon />
                        </a>
                      </Tooltip>
                    </div>
                    <div className="footer-sm-item">
                      <Tooltip title="Instagram">
                        <a
                          href="https://www.instagram.com/ab_lene26/"
                          target="_blank"
                        >
                          <InstagramIcon />
                        </a>
                      </Tooltip>
                    </div>
                    <div className="footer-sm-item">
                      <Tooltip title="WWW">
                        <a href="#" target="_blank">
                          {" "}
                          <LanguageIcon />
                        </a>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </Grid>
        </Grid>
      )}

      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default AboutMe;
