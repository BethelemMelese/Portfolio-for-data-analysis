import React, { useEffect, useState } from "react";
import { Card } from "antd";
import Controls from "../../../commonComponent/Controls";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form } from "../../../commonComponent/Form";
import { appUrl, token } from "../../../appurl";
import axios from "axios";
import { Grid, Typography, Button } from "@mui/material";
import Notification from "../../../commonComponent/notification";
import CloseIcon from "@mui/icons-material/Close";

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
const AddProject = ({ ...props }) => {
  const [viewMode, setViewMode] = useState(props.viewMode);
  const [selectedProject, setSelectedProject] = useState(props.selectedProject);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    setViewMode(props.viewMode);
    setSelectedProject(props.selectedProject);
    if (props.viewMode === "new") {
      formik.resetForm({
        values: initialState,
      });
    }
  }, [props.viewMode, props.selectedProject]);

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

  const onUpdateSuccess = () => {
    setNotify({
      isOpen: true,
      type: "success",
      message: "Project is Successfully Updated !",
    });
    setTimeout(() => {
      setIsSubmitting(false);
      window.location.reload();
    }, 2000);
  };

  const onUpdateError = (response: any) => {
    setNotify({
      isOpen: true,
      type: "error",
      message: response,
    });
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  const validationSchema = Yup.object().shape({
    projectTitle: Yup.string().required("Project is required"),
  });

  const formik = useFormik({
    initialValues: selectedProject,
    onSubmit: (values) => {
      if (viewMode == "new") {
        setIsSubmitting(true);
        axios
          .create({
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .post(appUrl + "project", values)
          .then(() => onCreateSuccess())
          .catch((error) => onCreateError(error.response.data.message));
      } else {
        setIsSubmitting(true);
        axios
          .create({
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .put(appUrl + `project/${selectedProject.id}`, values)
          .then(() => onUpdateSuccess())
          .catch((error) => onUpdateError(error.response.data.message));
      }
    },
    validationSchema: validationSchema,
  });

  return (
    <div>
      <Card
        title={
          viewMode == "new" ? <h4>New Project</h4> : <h4>Modify the Project Content</h4>
        }
        extra={
          viewMode == "edit" && (
            <a onClick={() => props.closeedit()}>
              <CloseIcon fontSize="medium" className="close-btn" />
            </a>
          )
        }
        className="create-card"
      >
        <Form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controls.Input
                required
                id="projectTitle"
                label="Project Title"
                {...formik.getFieldProps("projectTitle")}
                error={
                  formik.touched.projectTitle && formik.errors.projectTitle
                    ? formik.errors.projectTitle
                    : ""
                }
              />

              <Controls.Input
                required
                id="sourceCodeLink"
                label="Source Code Link"
                {...formik.getFieldProps("sourceCodeLink")}
                error={
                  formik.touched.sourceCodeLink && formik.errors.sourceCodeLink
                    ? formik.errors.sourceCodeLink
                    : ""
                }
              />

              <Controls.Input
                required
                id="otherLink"
                label="OtherLink"
                {...formik.getFieldProps("otherLink")}
                error={
                  formik.touched.otherLink && formik.errors.otherLink
                    ? formik.errors.otherLink
                    : ""
                }
              />

              <Controls.Input
                id="projectDescription"
                label="Project Description"
                multiline
                {...formik.getFieldProps("projectDescription")}
                error={
                  formik.touched.projectDescription &&
                  formik.errors.projectDescription
                    ? formik.errors.projectDescription
                    : ""
                }
              />
            </Grid>
          </Grid>

          {viewMode == "new" ? (
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
          ) : (
            <div className="btn-form">
              {isSubmitting ? (
                <Button
                  variant="contained"
                  className="submitting-btn"
                  disabled={isSubmitting}
                >
                  Updating...
                </Button>
              ) : (
                <Button
                  variant="contained"
                  type="submit"
                  size="small"
                  className="submit-btn"
                >
                  Update
                </Button>
              )}
            </div>
          )}
        </Form>
      </Card>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default AddProject;
