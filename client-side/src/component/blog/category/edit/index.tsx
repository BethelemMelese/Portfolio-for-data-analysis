import { Card, Upload, Button as ButtonAnt } from "antd";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Controls from "../../../../commonComponent/Controls";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form } from "../../../../commonComponent/Form";
import { appUrl, token } from "../../../../appurl";
import axios from "axios";
import { Button, Grid } from "@mui/material";
import { UploadOutlined } from "@ant-design/icons";
import Notification from "../../../../commonComponent/notification";

interface BlogState {
  categoryName: string;
  categoryDescription: string;
}

const initialState: BlogState = {
  categoryName: "",
  categoryDescription: "",
};
const EditBlogCategory = ({ ...props }) => {
  const [vewMode, setViewMode] = useState(props.viewMode);
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
    setSelectedCategory(props.selectedCategory);
    if (props.viewMode === "new") {
      formik.resetForm({
        values: initialState,
      });
    }
  }, [props.viewMode, props.selectedCategory]);

  const onCreateSuccess = () => {
    setNotify({
      isOpen: true,
      type: "success",
      message: "Category is Successfully Updated !",
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
    categoryName: Yup.string().required("Category Name is required"),
    categoryDescription: Yup.string().required("Description is required"),
  });

  const formik = useFormik({
    initialValues: selectedCategory,
    onSubmit: (values) => {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("file", fileList);
      formData.append("categoryName", values.categoryName);
      formData.append("categoryDescription", values.categoryDescription);
      axios
        .create({
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .put(appUrl + `blog/editCategory/${selectedCategory.id}`, formData)
        .then(() => onCreateSuccess())
        .catch((error) => onCreateError(error.response.data.message));
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

  return (
    <div className="create-blog-container">
      <Card
        title="Add Blog"
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
              <Card
                title="Insert the category name and description"
                className="create-card"
              >
                <Controls.Input
                  required
                  id="categoryName"
                  label="Category Name"
                  {...formik.getFieldProps("categoryName")}
                  error={
                    formik.touched.categoryName && formik.errors.categoryName
                      ? formik.errors.categoryName
                      : ""
                  }
                />
                <Controls.Input
                  required
                  id="categoryDescription"
                  label="Description"
                  multiline
                  {...formik.getFieldProps("categoryDescription")}
                  error={
                    formik.touched.categoryDescription &&
                    formik.errors.categoryDescription
                      ? formik.errors.categoryDescription
                      : ""
                  }
                />
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card
                title="Attach the category image here"
                className="create-card"
              >
                <Upload
                  listType="picture"
                  onChange={(response: any) => beforeUpload(response.file)}
                  beforeUpload={() => false}
                >
                  <ButtonAnt icon={<UploadOutlined translate={undefined} />}>
                    Category Image
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
                      Category Image is required
                    </span>
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

export default EditBlogCategory;
