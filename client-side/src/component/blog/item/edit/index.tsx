import { Card, Upload, Button as ButtonAnt } from "antd";
import { useCallback, useEffect, useRef, useState } from "react";
import Notification from "../../../../commonComponent/notification";
import Controls from "../../../../commonComponent/Controls";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form } from "../../../../commonComponent/Form";
import { appUrl } from "../../../../appurl";
import axios from "axios";
import { Button, Grid } from "@mui/material";
import { UploadOutlined } from "@ant-design/icons";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

interface BlogState {
  blogTitle: string;
  author: string;
  mainContent: string;
  blogCategoryId: any;
}

const initialState: BlogState = {
  blogTitle: "",
  author: "",
  mainContent: "",
  blogCategoryId: "",
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

const EditBlog = ({ ...props }) => {
  const [vewMode, setViewMode] = useState(props.viewMode);
  const [selectedBlog, setSelectedBlog] = useState(props.selectedBlog);
  const [selectedCategory, setSelectedCategory] = useState(
    props.selectedCategory
  );
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
    setSelectedBlog(props.selectedBlog);
    if (props.viewMode === "new") {
      formik.resetForm({
        values: initialState,
      });
    }
  }, [props.viewMode, props.selectedBlog]);

  const onUpdateSuccess = () => {
    setNotify({
      isOpen: true,
      type: "success",
      message: "Blog is Successfully Modified !",
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
      message: response.message,
    });
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  const validationSchema = Yup.object().shape({
    blogTitle: Yup.string().required("Article Title is required"),
    author: Yup.string().required("Author Name is required"),
  });

  const formik = useFormik({
    initialValues: selectedBlog,
    onSubmit: (values) => {
      setIsSubmitting(true);
      const quill = quillRef.current?.getEditor();
      const contentToSave = quill?.root.innerHTML || ""; // Get Quill content as HTML
      values.mainContent = contentToSave;
      const formData = new FormData();
      formData.append("file", fileList);
      formData.append("blogTitle", values.blogTitle);
      formData.append("author", values.author);
      formData.append(`mainContent`, values.mainContent);
      axios
        .create({
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .put(appUrl + `blog/addBlog/${selectedBlog.id}`, formData)
        .then(() => onUpdateSuccess())
        .catch((error) => onUpdateError(error.response.data.message));
    },
    validationSchema: validationSchema,
  });

  const onValidFileRequired = () => {
    if (fileList.length == 0) {
      setFileRequired(true);
    } else {
      setFileRequired(false);
    }
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
        formData.append("file", file);

        try {
          // Upload the image to the backend (update URL as per your backend)
          const res = await axios.post<{ url: string }>(
            appUrl + "blog/upload-image",
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
    <div className="create-blog-container">
      <Card
        title="Modify the article"
        extra={
          <Button
            variant="text"
            size="small"
            color="error"
            startIcon={<ArrowBackIcon />}
            onClick={() => {
              props.closeedit();
            }}
          >
            Back
          </Button>
        }
        className="create-card"
      >
        <Form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card className="create-card">
                <Controls.Input
                  required
                  id="blogTitle"
                  label="Article Title"
                  {...formik.getFieldProps("blogTitle")}
                  error={
                    formik.touched.blogTitle && formik.errors.blogTitle
                      ? formik.errors.blogTitle
                      : ""
                  }
                />
                <Controls.Input
                  required
                  id="author"
                  label="Author Name"
                  multiline
                  {...formik.getFieldProps("author")}
                  error={
                    formik.touched.author && formik.errors.author
                      ? formik.errors.author
                      : ""
                  }
                />
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card title="The Article Content">
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
                    Please insert the Content of the article !
                  </span>
                ) : null}
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card title="To modify the article image here">
                <img
                  src={appUrl + `blog/uploads/${selectedBlog.blogImage}`}
                  width={150}
                  height={110}
                  style={{
                    margin: "20px",
                    borderRadius: "5px",
                  }}
                />
                <Upload
                  listType="picture"
                  onChange={(response: any) => beforeUpload(response.file)}
                  beforeUpload={() => false}
                >
                  <ButtonAnt icon={<UploadOutlined translate={undefined} />}>
                    Blog Image
                  </ButtonAnt>
                  <br />
                  {validFileFormat ? (
                    <span className="text-danger">
                      Invalid file format, Only jpg, jpeg and png files are
                      allowed!
                    </span>
                  ) : null}
                  {fileRequired ? (
                    <span className="text-danger">Blog Image is required</span>
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
                    Changing...
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    type="submit"
                    size="small"
                    className="submit-btn"
                    onClick={onValidFileRequired}
                  >
                    Save Change
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

export default EditBlog;
