import { Card, Upload, Button as ButtonAnt } from "antd";
import { useEffect, useState } from "react";
import Notification from "../../../../commonComponent/notification";
import Controls from "../../../../commonComponent/Controls";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form } from "../../../../commonComponent/Form";
import { appUrl, token } from "../../../../appurl";
import axios from "axios";
import { Button, Grid } from "@mui/material";
import { UploadOutlined } from "@ant-design/icons";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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
const EditBlog = ({ ...props }) => {
  const [vewMode, setViewMode] = useState(props.viewMode);
  const [selectedBlog, setSelectedBlog] = useState(props.selectedBlog);
  console.log("selectedBlog...", selectedBlog);
  const [selectedCategory, setSelectedCategory] = useState(
    props.selectedCategory
  );
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
    mainContent: Yup.string().required("Content is required"),
  });

  const formik = useFormik({
    initialValues: selectedBlog,
    onSubmit: (values) => {
      setIsSubmitting(true);
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
                <Controls.Input
                  required
                  id="mainContent"
                  label="Main Content"
                  helper="Write your message here..."
                  multiline
                  {...formik.getFieldProps("mainContent")}
                  error={
                    formik.touched.mainContent && formik.errors.mainContent
                      ? formik.errors.mainContent
                      : ""
                  }
                />
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
