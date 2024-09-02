import { Button, Grid, IconButton, Tooltip } from "@mui/material";
import { Card, List } from "antd";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Notification from "../../../commonComponent/notification";
import { useEffect, useState } from "react";
import axios from "axios";
import { appUrl } from "../../../appurl";
import Controls from "../../../commonComponent/Controls";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form } from "../../../commonComponent/Form";
import CloseIcon from "@mui/icons-material/Close";

interface ResumeState {
  resumeLink: string;
}

const initialState: ResumeState = {
  resumeLink: "",
};

const ViewResume = () => {
  const [viewMode, setViewMode] = useState("view");
  const [viewGrid, setViewGrid] = useState<any>(12);
  const [dataSource, setDataSource] = useState<any>();
  const [selectedResume, setSelectedResume] = useState<any>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
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
  //   for get all data
  const onFetchResume = () => {
    axios
      .create({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .get(appUrl + `resume`)
      .then((res) => {
        setLoading(false);
        setDataSource(res.data);
      })
      .catch((error: any) => {
        setLoading(false);
        onViewError(error.response.data.error);
      });
  };

  //   to fetch data using useEffect, when every time this page is loaded
  useEffect(() => {
    setLoading(true);
    onFetchResume();
  }, []);

  //   for the update part

  const onCreateSuccess = () => {
    setNotify({
      isOpen: true,
      type: "success",
      message: "Project is Successfully Added !",
    });
    setTimeout(() => {
      setIsSubmitting(false);
      window.location.reload();
    }, 2000);
  };

  const onCreateError = (response: any) => {
    setNotify({
      isOpen: true,
      type: "error",
      message: response.message,
    });
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  const validationSchema = Yup.object().shape({
    resumeLink: Yup.string().required("Resume Link is required"),
  });

  const formik = useFormik({
    initialValues: initialState,
    onSubmit: (values) => {
      axios
        .create({
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .put(appUrl + `resume/${selectedResume.id}`, values)
        .then(() => onCreateSuccess())
        .catch((error) => onCreateError(error.response.data.message));
    },
    validationSchema: validationSchema,
  });

  return (
    <div className="resume-container">
      <Grid container spacing={2}>
        <Grid item xs={viewGrid}>
          <Card title="Resume Link" className="resume-card">
            <List
              itemLayout="horizontal"
              size="default"
              pagination={false}
              dataSource={dataSource}
              renderItem={(item: any) => (
                <List.Item
                  actions={[
                    viewMode == "view" && (
                      <Tooltip title="To edit the project">
                        <IconButton
                          onClick={() => {
                            setSelectedResume(item);
                            setViewMode("edit");
                            setViewGrid(6);
                          }}
                        >
                          <ModeEditIcon color="warning" />
                        </IconButton>
                      </Tooltip>
                    ),
                  ]}
                >
                  Link: {item.resumeLink}
                </List.Item>
              )}
            />
          </Card>
        </Grid>
        {viewMode == "edit" && (
          <Grid item xs={6}>
            <Card
              title="To Update the link"
              className="resume-card"
              extra={
                <a onClick={() => {
                    setViewGrid(12);
                    setViewMode("view");
                }}>
                  <CloseIcon fontSize="medium" className="close-btn" />
                </a>
              }
            >
              <Form
                autoComplete="off"
                noValidate
                onSubmit={formik.handleSubmit}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Controls.Input
                      required
                      id="resumeLink"
                      label="Resume Link"
                      multiline
                      {...formik.getFieldProps("resumeLink")}
                      error={
                        formik.touched.resumeLink && formik.errors.resumeLink
                          ? formik.errors.resumeLink
                          : ""
                      }
                    />
                  </Grid>
                  <Grid item xs={12} style={{ position: "relative" }}>
                    <div className="btn-form">
                      {isSubmitting ? (
                        <Button
                          size="small"
                          variant="contained"
                          className="submitting-btn"
                          disabled={isSubmitting}
                        >
                          Submitting...
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          type="submit"
                          size="small"
                          className="submit-btn"
                        >
                          Submit
                        </Button>
                      )}
                    </div>
                  </Grid>
                </Grid>
              </Form>
            </Card>
          </Grid>
        )}
      </Grid>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default ViewResume;
