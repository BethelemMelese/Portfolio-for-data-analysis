import { Button, Grid, IconButton, Paper, Tooltip } from "@mui/material";
import { Card, Modal } from "antd";
import { List } from "antd";
import React, { useEffect, useState } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Dialogs } from "../../../commonComponent/dialog";
import AddProject from "../create";
import { appUrl, token } from "../../../appurl";
import axios from "axios";
import Notification from "../../../commonComponent/notification";
import { ExclamationCircleFilled } from "@ant-design/icons";

const { confirm } = Modal;

const data = Array.from({ length: 23 }).map((_, i) => ({
  href: "https://ant.design",
  title: `Project Title Part ${i}`,
  avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
  description:
    "Ant Design, a design language for background applications, is refined by Ant UED Team.",
  content:
    "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
}));

interface ProjectState {
  projectTitle: string;
  projectDescription: string;
  projectImage: string;
  sourceCodeLink: string;
  otherLink: string;
}

const initialState: ProjectState = {
  projectTitle: "",
  projectDescription: "",
  projectImage: "",
  sourceCodeLink: "",
  otherLink: "",
};

const ViewProject = () => {
  const [openDialog, setOpenDialog] = useState(false);
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
      message: response.message,
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
      .get(appUrl + `projects`)
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
      content: "You are unable to undo the deletion of this.",
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
          .delete(appUrl + `projects/${value}`)
          .then((response) => {
            onDeleteSuccess(response.data);
          })
          .catch((error) => onDeleteError(error.response.data.message));
      },
      onCancel() {},
    });
  };

  //   to fetch data using useEffect, when every time this page is loaded
  useEffect(() => {
    setLoading(true);
    // onFetchProject();
  }, []);

  return (
    <div className="project-container">
      <Paper elevation={0}>
        <Card
          style={{
            marginTop: 16,
            height: "660px",
            overflowX: "hidden",
            overflowY: "auto",
          }}
          type="inner"
          title="Inner Card title"
          extra={
            <Button
              variant="contained"
              size="small"
              className="create-btn"
              onClick={() => {
                setViewMode("new");
                setOpenDialog(true);
              }}
            >
              Add Project
            </Button>
          }
        >
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              pageSize: 3,
            }}
            dataSource={data}
            renderItem={(item: any) => (
              <List.Item
                key={item.title}
                actions={[
                  <Tooltip title="To edit the project">
                    <IconButton
                      onClick={() => {
                        setViewMode("edit");
                        setOpenDialog(true);
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
                  <img
                    width={272}
                    alt="logo"
                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                  />
                }
              >
                <List.Item.Meta title={item.title} description={item.content} />
              </List.Item>
            )}
          />

          {/* to open the dialog for create and update form */}
          <Dialogs
            openDialog={openDialog}
            setOpenDialog={openDialog}
            height="70%"
            maxHeight="435"
            children={
              viewMode == "new" ? (
                <AddProject
                  //@ts-ignore
                  selectedProject={initialState}
                  viewMode={viewMode}
                  closeedit={() => setOpenDialog(false)}
                />
              ) : (
                <AddProject
                  //@ts-ignore
                  selectedProject={selectedProject}
                  viewMode={viewMode}
                  closeedit={() => setOpenDialog(false)}
                />
              )
            }
          />
        </Card>
      </Paper>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default ViewProject;
