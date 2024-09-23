import { useCallback, useEffect, useRef, useState } from "react";
import { Card, Upload, Button as ButtonAnt } from "antd";
import Controls from "../../../commonComponent/Controls";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form } from "../../../commonComponent/Form";
import { appUrl } from "../../../appurl";
import axios from "axios";
import { Grid, Button } from "@mui/material";
import Notification from "../../../commonComponent/notification";
import type { UploadProps } from "antd";
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

const AddProject = ({ ...props }) => {
  const [viewMode, setViewMode] = useState(props.viewMode);
  const [selectedProject, setSelectedProject] = useState(props.selectedProject);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileList, setFileList] = useState<any>([]);
  const [validFileFormat, setValidFileFormat] = useState(false);
  const [fileRequired, setFileRequired] = useState(false);
  const [content, setContent] = useState<string>("");
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
    projectTitle: Yup.string().required("Project is required"),
    sourceCodeLink: Yup.string().required("Source Code Link is required"),
    youtubeLink: Yup.string().required("YouTube Link is required"),
    projectDescription: Yup.string().required(
      "Project Description is required"
    ),
  });

  const onValidFileRequired = () => {
    if (fileList.length == 0) {
      setFileRequired(true);
    } else {
      setFileRequired(false);
    }
  };

  const formik = useFormik({
    initialValues: selectedProject,
    onSubmit: (values) => {
      if (fileList.length == 0) {
        setFileRequired(true);
      } else {
        setFileRequired(false);
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
          .post(appUrl + "project", formData)
          .then(() => onCreateSuccess())
          .catch((error) => onCreateError(error.response.data.message));
      }
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
        formData.append("image", file);

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
  };

  return (
    <div>
      <Card
        title={<h4>Add New Project to the Portfolio</h4>}
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
              <Card title="Attach the article image here">
                <Upload
                  listType="picture"
                  onChange={(response: any) => beforeUpload(response.file)}
                  beforeUpload={() => false}
                >
                  <ButtonAnt icon={<UploadOutlined translate={undefined} />}>
                    Project Image
                  </ButtonAnt>
                  <br />
                  {validFileFormat ? (
                    <span className="text-danger">
                      Invalid file format, Only jpg, jpeg and png files are
                      allowed!
                    </span>
                  ) : null}
                  {fileRequired ? (
                    <span className="text-danger">Project Image is required</span>
                  ) : null}
                </Upload>
              </Card>
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
                    onClick={onValidFileRequired}
                  >
                    Submit
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

export default AddProject;
