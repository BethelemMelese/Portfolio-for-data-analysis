import { useCallback, useEffect, useRef, useState } from "react";
import { Card, Button as ButtonAnt } from "antd";
import Controls from "../../../commonComponent/Controls";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form } from "../../../commonComponent/Form";
import { appUrl } from "../../../appurl";
import axios from "axios";
import { Grid, Button } from "@mui/material";
import Notification from "../../../commonComponent/notification";
import CloseIcon from "@mui/icons-material/Close";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Upload } from "antd";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { UploadOutlined } from "@ant-design/icons";
const { Dragger } = Upload;

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

const Font = Quill.import("formats/font");
Font.whitelist = ["Arial", "Georgia", "Tahoma", "Times-New-Roman", "Verdana"]; // Add more fonts if needed
Quill.register(Font, true);

// Define custom toolbar options
const modules = {
  toolbar: {
    container: [
      [{ font: [] }, { header: [1, 2, 3, 4, 5, false] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      [{ script: "sub" }, { script: "super" }],
      [{ align: [] }],
      ["link", "image"],
      ["clean"],
    ],
  },
};

const EditProject = ({ ...props }) => {
  const [viewMode, setViewMode] = useState(props.viewMode);
  const [selectedProject, setSelectedProject] = useState(props.selectedProject);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileList, setFileList] = useState<any>([]);
  const [validFileFormat, setValidFileFormat] = useState(false);
  const [fileRequired, setFileRequired] = useState(false);
  const [content, setContent] = useState<string>(
    selectedProject.projectDescription
  );
  const [isContent, setIsContent] = useState(false);
  const quillRef = useRef<ReactQuill | null>(null);
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
    youtubeLink: Yup.string().required("Other Link is required"),
  });

  const formik = useFormik({
    initialValues: selectedProject,
    onSubmit: (values) => {
      setIsSubmitting(true);
      const quill = quillRef.current?.getEditor();
      const contentToSave = quill?.root.innerHTML || ""; // Get Quill content as HTML
      values.projectDescription = contentToSave;
      const formData = new FormData();
      formData.append("file", fileList);
      formData.append("projectTitle", values.projectTitle);
      formData.append("projectDescription", values.projectDescription);
      formData.append("sourceCodeLink", values.sourceCodeLink);
      formData.append("youtubeLink", values.youtubeLink);
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

  // Image handler for file upload
  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files ? input.files[0] : null;
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        try {
          // Upload the image to the backend (update URL as per your backend)
          const res = await axios.post<{ url: string }>(
            appUrl + "project/upload-image",
            formData
          );
          const imageUrl = res.data.url;

          const quill = quillRef.current?.getEditor();
          const range = quill?.getSelection(true); // Get current selection in Quill

          if (range) {
            // Insert the image with custom inline styles
            //@ts-ignore
            quill.clipboard.dangerouslyPasteHTML(
              range.index,
              `<img src="${imageUrl}" style="width:300px;height:200px;object-fit:cover;" />`
            );
          }
        } catch (error) {
          console.error("Error uploading image", error);
        }
      }
    };
  }, []);

  // Custom modules with image handler
  const customModules = {
    ...modules,
    toolbar: {
      ...modules.toolbar,
      handlers: {
        image: imageHandler, // Attach image handler to toolbar
      },
    },
  };

  const customFormats = [
    "font",
    "size",
    "header",
    "list",
    "bold",
    "italic",
    "underline",
    "link",
    "image",
    "align",
    "clean",
  ];

  const handleEditorChange = (value: string) => {
    setContent(value); // Update content state
    setIsContent(false);
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
                id="youtubeLink"
                label="YouTube Link"
                {...formik.getFieldProps("youtubeLink")}
                error={
                  formik.touched.youtubeLink && formik.errors.youtubeLink
                    ? formik.errors.youtubeLink
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Card title="The Project Description">
                <ReactQuill
                  ref={quillRef}
                  value={content}
                  onChange={handleEditorChange}
                  modules={customModules}
                  formats={customFormats}
                  theme="snow" // Snow theme for Quill editor
                />
                <br />
                {isContent ? (
                  <span className="text-danger">
                    Please insert the Description of the project !
                  </span>
                ) : null}
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card title="Update the article image here">
                <Grid container spacing={2}>
                  <img
                    src={selectedProject.projectImage}
                    width="20%"
                    height="10%"
                  />
                  <Grid item xs={6}>
                    <Upload
                      listType="picture"
                      onChange={(response: any) => beforeUpload(response.file)}
                      beforeUpload={() => false}
                    >
                      <ButtonAnt
                        icon={<UploadOutlined translate={undefined} />}
                      >
                       Update Project Image
                      </ButtonAnt>
                      <br />
                      {validFileFormat ? (
                        <span className="text-danger">
                          Invalid file format, Only jpg, jpeg and png files are
                          allowed!
                        </span>
                      ) : null}
                      {fileRequired ? (
                        <span className="text-danger">
                          Project Image is required
                        </span>
                      ) : null}
                    </Upload>
                  </Grid>
                </Grid>
              </Card>
            </Grid>

            <Grid item xs={2} style={{ position: "relative" }}>
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
