import { Card } from "antd";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Notification from "../../../commonComponent/notification";
import Controls from "../../../commonComponent/Controls";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form } from "../../../commonComponent/Form";
import { appUrl, token } from "../../../appurl";
import axios from "axios";
import { Grid, IconButton, TextField } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/Add";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

interface BlogState {
  categoryName: string;
  categoryDescription: string;
  blogItemList: string;
}

const initialState: BlogState = {
  categoryName: "",
  categoryDescription: "",
  blogItemList: "",
};
const AddBlog = ({ ...props }) => {
  const [vewMode, setViewMode] = useState(props.viewMode);
  const [selectedBlog, setSelectedBlog] = useState(props.selectedBlog);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [blogItemInputs, setBlogItemInput] = useState([
    {
      blogTitle: "",
      author: "",
      mainContent: "",
    },
  ]);
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
    categoryName: Yup.string().required("Category Name is required"),
    categoryDescription: Yup.string().required(
      "Category Description is required"
    ),
  });

  const formik = useFormik({
    initialValues: initialState,
    onSubmit: (values) => {},
    validationSchema: validationSchema,
  });

  const onHandleChangeInput = (index: number, event: any) => {
    let value = [...blogItemInputs];
    const field: "blogTitle" | "author" | "mainContent" = event.target.name;
    value[index][field] = event.target.value;
    setBlogItemInput(value);
  };

  const onHandleRemoveInput = (index: number) => {
    const fields = [...blogItemInputs];
    fields.splice(index, 1);
    setBlogItemInput(fields);
  };

  const onHandleAddInput = (index: number) => {
    setBlogItemInput([
      ...blogItemInputs,
      {
        blogTitle: "",
        author: "",
        mainContent: "",
      },
    ]);
  };

  return (
    <div>
      <Card
        title="Add Blog"
        extra={
          <a onClick={() => props.closeedit()}>
            <CloseIcon fontSize="medium" className="close-btn" />
          </a>
        }
      >
        <Form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
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
            </Grid>
            <Grid item xs={6}>
              <Controls.Input
                required
                id="categoryDescription"
                label="Description"
                {...formik.getFieldProps("categoryDescription")}
                error={
                  formik.touched.categoryDescription &&
                  formik.errors.categoryDescription
                    ? formik.errors.categoryDescription
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              {blogItemInputs.map((blogItemInput, index = 1) => {
                return (
                  <div>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          disabled
                          name="blogTitle"
                          label="Article Title"
                          variant="outlined"
                          value={blogItemInput.blogTitle}
                          onChange={(event) => {
                            onHandleChangeInput(index, event);
                          }}
                        />
                        <TextField
                          disabled
                          name="author"
                          label="Author Name"
                          variant="outlined"
                          value={blogItemInput.author}
                          onChange={(event) => {
                            onHandleChangeInput(index, event);
                          }}
                        />
                        <TextField
                          disabled
                          name="mainContent"
                          label="Main Content"
                          variant="outlined"
                          value={blogItemInput.mainContent}
                          onChange={(event) => {
                            onHandleChangeInput(index, event);
                          }}
                        />
                      </Grid>
                      <IconButton
                        disabled={blogItemInputs.length < 2}
                        onClick={() => onHandleRemoveInput(index)}
                      >
                        <RemoveCircleIcon />
                      </IconButton>
                      <IconButton
                        disabled={blogItemInputs.length > 10}
                        onClick={() => onHandleAddInput(index)}
                      >
                        <AddCircleIcon />
                      </IconButton>
                    </Grid>
                  </div>
                );
              })}
            </Grid>
          </Grid>
        </Form>
      </Card>
    </div>
  );
};

export default AddBlog;
