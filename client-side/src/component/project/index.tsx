import { Grid, Button } from "@mui/material";
import { Card, Spin } from "antd";
import { Carousel } from "antd";
import { useEffect, useState } from "react";
import { appUrl } from "../../appurl";
import axios from "axios";
import { Buffer } from "buffer";

const Project = () => {
  const [projectResponse, setProjectResponse] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

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
      .get(appUrl + `project`)
      .then((res) => {
        setLoading(false);
        setProjectResponse(res.data);
      })
      .catch((error: any) => {
        setLoading(false);
        onViewError(error.response.data.error);
      });
  }, []);

  const convertBufferToBase64 = (buffer: Buffer): string => {
    const base64String = Buffer.from(buffer).toString("base64");
    return `data:${projectResponse[0].projectImage.contentType};base64,${base64String}`;
  };

  return (
    <div className="proj-container">
      <Card className="proj-container">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card className="project-desc">
              <h1>Projects</h1>
              <p>
                Welcome to my portfolio, where I showcase a range of data
                science projects that highlight my analytical skills, technical
                expertise, and commitment to solving complex problems. Hear, you
                will find projects that encompass data analysis, machine
                learning, and data visualization, each meticulously designed to
                extract actionable insights from diverse datasets. From
                predictive modeling and statistical analysis to creating
                interactive dashboards, my work demonstrates proficiency in
                tools such as Python, R, SQL, and Tableau. Explore my project to
                see how I leverage data to drive decision-making and foster
                innovation.
              </p>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <div className="project-slides">
              <Card className="project-card">
                <Spin
                  spinning={loading}
                  delay={500}
                  size="large"
                  tip="Loading..."
                >
                  <Carousel autoplay arrows infinite={true}>
                    {projectResponse.map((item: any) => {
                      return (
                        <Card
                          title={<h3>{item.projectTitle}</h3>}
                          className="sec-project-card"
                          extra={
                            <Button
                              variant="text"
                              size="small"
                              color="warning"
                              target="_blank"
                              href={item.youtubeLink}
                            >
                              See More
                            </Button>
                          }
                        >
                          <div className="project-layout">
                            <div className="project-image">
                              <img
                                src={item.projectImage}
                                width="40%"
                                style={{ maxHeight: "50%", maxWidth: "50%" }}
                                height="40%"
                              />
                            </div>
                            <div className="project-dec">
                              <Grid container spacing={4}>
                                <Grid item xs={12}>
                                  <p>
                                    {item.projectDescription.slice(0, 300) +
                                      "..."}
                                  </p>
                                </Grid>
                                <Grid item xs={12}>
                                  <Button
                                    className="view-code"
                                    variant="outlined"
                                    size="small"
                                    color="warning"
                                    target="_blank"
                                    href={item.sourceCodeLink}
                                  >
                                    Source Code
                                  </Button>
                                </Grid>
                              </Grid>
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </Carousel>
                </Spin>
              </Card>
            </div>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default Project;
