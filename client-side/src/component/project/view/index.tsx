import { Button, Grid, IconButton, Paper, Tooltip } from "@mui/material";
import { Card, Modal } from "antd";
import { List } from "antd";
import { useEffect, useState } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddProject from "../create";
import EditProject from "../edit";
import DetailProject from "../detail";
import { appUrl, token } from "../../../appurl";
import axios from "axios";
import Notification from "../../../commonComponent/notification";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Buffer } from "buffer";

const { confirm } = Modal;

interface ProjectState {
  projectTitle: string;
  projectDescription: string;
  projectImage: string;
  sourceCodeLink: string;
  youtubeLink: string;
}

const initialState: ProjectState = {
  projectTitle: "",
  projectDescription: "",
  projectImage: "",
  sourceCodeLink: "",
  youtubeLink: "",
};

const ViewProject = () => {
  const [viewMode, setViewMode] = useState("view");
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<any>([]);
  const [selectedProject, setSelectedProject] = useState();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const onDeleteSuccess = (response: any) => {
    setNotify({
      isOpen: true,
      type: "success",
      message: "The Project is Successfully Deleted",
    });
    onFetchProject();
  };

  const onDeleteError = (response: any) => {
    setNotify({
      isOpen: true,
      message: response,
      type: "error",
    });
  };

  //   Notification for Success and error actions
  const onViewError = (response: any) => {
    setNotify({
      isOpen: true,
      type: "error",
      message: response,
    });
  };

  //   for get all data
  const onFetchProject = () => {
    axios
      .create({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .get(appUrl + `project`)
      .then((res) => {
        setLoading(false);
        setDataSource(res.data);
      })
      .catch((error: any) => {
        setLoading(false);
        onViewError(error.response.data.error);
      });
  };

  const showConfirm = (value: any) => {
    confirm({
      title: "Do you want to delete this project?",
      icon: <ExclamationCircleFilled />,
      content: "You aren't unable to undo the deletion of this.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        axios
          .create({
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .delete(appUrl + `project/${value}`)
          .then((response) => {
            onDeleteSuccess(response.data[0]);
          })
          .catch((error) => onDeleteError(error.response.data.message));
      },
      onCancel() {},
    });
  };

  //   to fetch data using useEffect, when every time this page is loaded
  useEffect(() => {
    setLoading(true);
    onFetchProject();
  }, []);

  return (
    <div className="project-container">
      <Grid container spacing={1}>
        <Grid item xs={12}>
          {viewMode == "view" && (
            <Card
              style={{
                marginTop: 10,
              }}
              className="project-list"
              extra={
                <Tooltip title="To add new category">
                  <Button
                    variant="contained"
                    size="small"
                    className="create-btn"
                    onClick={() => {
                      setViewMode("new");
                    }}
                  >
                    Add Project
                  </Button>
                </Tooltip>
              }
            >
              {dataSource != undefined && (
                <List
                  loading={loading}
                  itemLayout="horizontal"
                  size="large"
                  pagination={{
                    pageSize: 5,
                  }}
                  dataSource={dataSource}
                  renderItem={(item: any) => (
                    <List.Item
                      key={item.projectNumber}
                      actions={[
                        <Tooltip title="To edit the project">
                          <IconButton
                            onClick={() => {
                              setSelectedProject(item);
                              setViewMode("edit");
                            }}
                          >
                            <ModeEditIcon color="warning" />
                          </IconButton>
                        </Tooltip>,
                        <Tooltip title="To delete the project">
                          <IconButton
                            onClick={() => {
                              showConfirm(item.id);
                            }}
                          >
                            <DeleteForeverIcon color="error" />
                          </IconButton>
                        </Tooltip>,
                      ]}
                      extra={
                        <a
                          onClick={() => {
                            setSelectedProject(item);
                            setViewMode("detail");
                          }}
                        >
                          <img
                            width={200}
                            alt="Project Image"
                            src={item.projectImage}
                          />
                        </a>
                      }
                    >
                      <List.Item.Meta
                        title={
                          <a
                            onClick={() => {
                              setSelectedProject(item);
                              setViewMode("detail");
                            }}
                          >
                            {item.projectTitle}
                          </a>
                        }
                        description={
                          <div
                            dangerouslySetInnerHTML={{
                              __html:
                                item.projectDescription.slice(0, 400) + "...",
                            }}
                          />
                        }
                      />
                    </List.Item>
                  )}
                />
              )}
            </Card>
          )}
          {viewMode == "new" && (
            <AddProject
              //@ts-ignore
              selectedProject={initialState}
              viewMode={viewMode}
              closeedit={() => setViewMode("view")}
            />
          )}
          {viewMode == "edit" && (
            <EditProject
              //@ts-ignore
              selectedProject={selectedProject}
              viewMode={viewMode}
              closeedit={() => setViewMode("view")}
            />
          )}
          {viewMode == "detail" && (
            <DetailProject //@ts-ignore
              selectedProject={selectedProject}
              viewMode={viewMode}
              closeedit={() => setViewMode("view")}
            />
          )}
        </Grid>
      </Grid>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default ViewProject;
