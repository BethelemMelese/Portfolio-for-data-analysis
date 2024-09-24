import { Card } from "antd";
import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";
import ReactPlayer from "react-player";

const Detail = ({ ...props }) => {
  const [selectedProject, setSelectedProject] = useState(props.selectedProject);
  return (
    <div className="detail-project-container">
      <Card
        className="more-project"
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
          <img
            src={selectedProject.projectImage}
            width={300}
            height={300}
            style={{
              display: "block",
              margin: "0px auto",
              borderRadius: "5px",
              objectFit: "cover",
            }}
          />
          <h1>{selectedProject.projectTitle}</h1>
          <div
            className="detail-proj-des"
            dangerouslySetInnerHTML={{
              __html: selectedProject.projectDescription,
            }}
          />
          <div className="detail-proj-link">
            <h4>
              To get the source code of the project,{" "}
              <a href={selectedProject.sourceCodeLink} target="_blank">
                Click Here
              </a>
            </h4>
          </div>
          <div className="detail-proj-view">
            <ReactPlayer
              className="react-player"
              width="100%"
              height="100%"
              controls={true}
              url={selectedProject.youtubeLink}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Detail;
