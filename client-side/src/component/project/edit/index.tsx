import React, { useEffect, useState } from "react";
import { Card, Button as ButtonAnt } from "antd";
import Controls from "../../../commonComponent/Controls";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form } from "../../../commonComponent/Form";
import { appUrl, token } from "../../../appurl";
import axios from "axios";
import { Grid, Typography, Button } from "@mui/material";
import Notification from "../../../commonComponent/notification";
import CloseIcon from "@mui/icons-material/Close";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";
const { Dragger } = Upload;

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
const EditProject = ({ ...props }) => {
  const [viewMode, setViewMode] = useState(props.viewMode);
  const [selectedProject, setSelectedProject] = useState(props.selectedProject);
  console.log("selectedProject..",selectedProject);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileList, setFileList] = useState<any>([]);
  const [validFileFormat, setValidFileFormat] = useState(false);
  const [fileRequired, setFileRequired] = useState(false);
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

  const onUpdateSuccess = () => {
    setNotify({
      isOpen: true,
      type: "success",
      message: "Project is Successfully Updated !",
    });
    setTimeout(() => {
      setIsSubmitting(false);
      //   window.location.reload();
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

  //   Notification for Success and error actions
  const onViewError = (response: any) => {
    setNotify({
      isOpen: true,
      type: "error",
      message: response,
    });
  };

  const validationSchema = Yup.object().shape({
    projectTitle: Yup.string().required("Project is required"),
    sourceCodeLink: Yup.string().required("Source Code Link is required"),
    otherLink: Yup.string().required("Other Link is required"),
    projectDescription: Yup.string().required(
      "Project Description is required"
    ),
  });

  const formik = useFormik({
    initialValues: selectedProject,
    onSubmit: (values) => {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("file", fileList);
      formData.append("projectTitle", values.projectTitle);
      formData.append("projectDescription", values.projectDescription);
      formData.append("sourceCodeLink", values.sourceCodeLink);
      formData.append("otherLink", values.otherLink);
      axios
        .create({
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .put(appUrl + `project/${selectedProject.id}`, formData)
        .then(() => onUpdateSuccess())
        .catch((error) => onUpdateError(error.response.data.message));
    },
    validationSchema: validationSchema,
  });

  const fileprops: UploadProps = {
    name: "file",
    onChange: (response: any) => beforeUpload(response.file),
  };

  const beforeUpload = (file: any): any => {
    if (
      file.type === "image/jpg" ||
      file.type == "image/jpeg" ||
      file.type == "image/png"
    ) {
      setValidFileFormat(false);
      setFileRequired(false);
      setFileList(file);
    } else {
      setValidFileFormat(true);
    }
  };

  return (
    <div>
      <Card
        title={<h4>Modify the Project Content</h4>}
        extra={
          <a onClick={() => props.closeedit()}>
            <CloseIcon fontSize="medium" className="close-btn" />
          </a>
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
                multiline
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
                label="Other Link"
                {...formik.getFieldProps("otherLink")}
                error={
                  formik.touched.otherLink && formik.errors.otherLink
                    ? formik.errors.otherLink
                    : ""
                }
              />

              <Controls.Inputmuliline
                id="projectDescription"
                label="Write the project description here..."
                {...formik.getFieldProps("projectDescription")}
                error={
                  formik.touched.projectDescription &&
                  formik.errors.projectDescription
                    ? formik.errors.projectDescription
                    : ""
                }
              />
            </Grid>

            <Grid
              item
              xs={12}
              style={{
                marginTop: 20,
                height: "200px",
                overflowX: "hidden",
                overflowY: "auto",
                marginBottom: 100,
              }}
            >
              <Dragger
                {...fileprops}
                listType="picture"
                className="upload-file"
                beforeUpload={() => false}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                {validFileFormat ? (
                  <span className="text-danger">
                    Invalid file format only jpg, jpeg and png files are
                    allowed!
                  </span>
                ) : null}
                <br />
                {fileRequired ? (
                  <span className="text-danger">Project Image is required</span>
                ) : null}
              </Dragger>
            </Grid>

            <Grid item xs={12} style={{ position: "relative" }}>
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
            </Grid>
          </Grid>
        </Form>
      </Card>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default EditProject;
