import { Grid } from "@mui/material";
import { Card } from "antd";
import { Carousel } from "antd";
import projectPhoto from "../../images/Cameras and Camcorders.jpg";

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: "300px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#80af81",
  border: "none",
};

const mokeData = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
];

const Project = () => {
  return (
    <div className="project-container">
      <Grid container spacing={1}>
        <Grid item xs={8}>
          <div className="project-desc">
            <h1>Projects</h1>
            <p>
              Welcome to my portfolio, where I showcase a range of data science
              projects that highlight my analytical skills, technical expertise,
              and commitment to solving complex problems. Hear, you will find
              projects that encompass data analysis, machine learning, and data
              visualization, each meticulously designed to extract actionable
              insights from diverse datasets. From predictive modeling and
              statistical analysis to creating interactive dashboards, my work
              demonstrates proficiency in tools such as Python, R, SQL, and
              Tableau. Explore my project to see how I leverage data to drive
              decision-making and foster innovation.
            </p>
          </div>
          <div className="project-slides">
            <Carousel arrows infinite={false}>
              {mokeData.map((item: any) => {
                return (
                  <div>
                    <Card className="project-card" style={contentStyle}>
                      <Grid container spacing={0}>
                        <Grid item xs={6}>
                          <div className="project-names">
                            <h3>Project name 01</h3>
                            <h5>
                              Title: SQL Sample Project: Customer Sales Analysis
                            </h5>
                          </div>
                          <div className="project-detail">
                            <p>
                              In this project, I preformed a SQL-based analysis
                              of retail customer sales data, I cleaned and
                              transformed the data, wrote complex queries to
                              identify sales trends, segmented customers, and
                              calculated key performance indicators (KPIs). The
                              project included creating reports and dashboards
                              for easy data visualization and actionable
                              insights.
                            </p>
                          </div>
                        </Grid>
                        <Grid item xs={6}>
                          <img src={projectPhoto} width="100%" height="10%"/>
                        </Grid>
                      </Grid>
                    </Card>
                  </div>
                );
              })}
            </Carousel>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Project;
