import { Card } from "antd";
import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";
import ReactPlayer from "react-player";

const DetailProject = ({ ...props }) => {
  const [selectedProject, setSelectedProject] = useState(props.selectedProject);
  return (
    <div>
      <Card
        extra={
          <Button
            variant="contained"
            size="small"
            className="create-btn"
            startIcon={<ArrowBackIcon />}
            onClick={() => {
              props.closeedit();
            }}
          >
            Back
          </Button>
        }
      >
        <div className="detail-proj">
          <img src={selectedProject.projectImage} width="20%" height="10%" />
          <h1>{selectedProject.projectTitle}</h1>
          <div
            className="detail-proj-des"
            dangerouslySetInnerHTML={{
              __html: selectedProject.projectDescription,
            }}
          />
          <div className="detail-proj-link">
            <h4>
              To get the source code of the project, please click
              <a href={selectedProject.sourceCodeLink} target="_blank">
                {" "}
                <u>Here</u>
              </a>
            </h4>
          </div>
          <div className="detail-proj-view">
            <ReactPlayer url={selectedProject.youtubeLink} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DetailProject;
