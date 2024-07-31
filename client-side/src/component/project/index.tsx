import {
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Menu,
} from "@mui/material";
import { Card } from "antd";
import { Carousel } from "antd";
import projectPhoto from "../../images/nasa-Q1p7bh3SHj8-unsplash.jpg";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";

const mokeData = [
  {
    id: 1,
    projectName: "The First Project",
    projectDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
  },
  {
    id: 2,
    projectName: "The Second Project",
    projectDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
  },
  {
    id: 3,
    projectName: "The Third Project",
    projectDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
  },
  {
    id: 4,
    projectName: "The Fourth Project",
    projectDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
  },
  {
    id: 5,
    projectName: "The Fifth Project",
    projectDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
  },
];

const Project = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
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
                <Carousel arrows infinite={true}>
                  {mokeData.map((item: any) => {
                    return (
                      <Card
                        title={<h3>{item.projectName}</h3>}
                        className="sec-project-card"
                        extra={
                          <>
                            <IconButton
                              onClick={handleClick}
                              size="small"
                              className="more-lev-btn"
                              style={{
                                background: "#fff",
                                borderRadius: "50px",
                              }}
                            >
                              <MoreVertIcon />
                            </IconButton>
                            <Menu
                              anchorEl={anchorEl}
                              open={open}
                              onClose={handleClose}
                              onClick={handleClose}
                            >
                              <MenuItem>Source Code</MenuItem>
                              <MenuItem>See More</MenuItem>
                            </Menu>
                          </>
                        }
                      >
                        <div className="project-layout">
                          <div className="project-dec">
                            <p>
                              {item.projectDescription.slice(0, 400) + "..."}
                            </p>
                          </div>
                          <div className="project-image">
                            <img src={projectPhoto} width="90%" height="90%" />
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </Carousel>
              </Card>
            </div>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default Project;
