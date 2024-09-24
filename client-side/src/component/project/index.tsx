import { Grid, Button } from "@mui/material";
import { Card, Spin } from "antd";
import { Carousel } from "antd";
import { useEffect, useState } from "react";
import { appUrl } from "../../appurl";
import axios from "axios";
import Detail from "./detailProject";

const Project = () => {
  const [projectResponse, setProjectResponse] = useState<any>([]);
  const [selectedProject, setSelectedProject] = useState();
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState("view");
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

  return (
    <div className="proj-container">
      <Card className="proj-container">
        {viewMode == "view" && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card className="project-desc">
                <h1>Projects</h1>
                <p>
                  Welcome to my portfolio, where I showcase a range of data
                  science projects that highlight my analytical skills,
                  technical expertise, and commitment to solving complex
                  problems. Hear, you will find projects that encompass data
                  analysis, machine learning, and data visualization, each
                  meticulously designed to extract actionable insights from
                  diverse datasets. From predictive modeling and statistical
                  analysis to creating interactive dashboards, my work
                  demonstrates proficiency in tools such as Python, R, SQL, and
                  Tableau. Explore my project to see how I leverage data to
                  drive decision-making and foster innovation.
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
                    <Carousel arrows infinite={true}>
                      {projectResponse.map((item: any) => {
                        return (
                          <div className="sec-project-card">
                            <div className="project-image">
                              <img src={item.projectImage} />
                            </div>
                            <div className="project-dec">
                              <h2>{item.projectTitle}</h2>
                              <p className="project-dec-content">
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      item.projectDescription.slice(0, 400) +
                                      "...",
                                  }}
                                />
                              </p>
                              <Button
                                className="more-btn"
                                variant="contained"
                                size="small"
                                color="warning"
                                onClick={() => {
                                  setSelectedProject(item);
                                  setViewMode("detail");
                                }}
                              >
                                See More
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </Carousel>
                  </Spin>
                </Card>
              </div>
            </Grid>
          </Grid>
        )}
        {viewMode == "detail" && (
          <Detail //@ts-ignore
            selectedProject={selectedProject}
            viewMode={viewMode}
            closeedit={() => setViewMode("view")}
          />
        )}
      </Card>
    </div>
  );
};

export default Project;
