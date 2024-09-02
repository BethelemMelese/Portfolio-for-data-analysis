import { Grid } from "@mui/material";
import { Card, Upload, Button as ButtonAnt } from "antd";
import { useEffect, useState } from "react";
import Notification from "../../commonComponent/notification";
import Controls from "../../commonComponent/Controls";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form } from "../../commonComponent/Form";
import { appUrl, token } from "../../appurl";
import axios from "axios";
import { Button } from "@mui/material";
import { UploadOutlined } from "@ant-design/icons";
import { Buffer } from "buffer";

interface BlogState {
  fileName: string;
  files: string;
}

const initialState: BlogState = {
  fileName: "",
  files: "",
};

type ImageData = {
  id: string;
  fileName: string;
  imageFile: {
    data: Buffer;
    contentType: string;
  };
};

const ImageFile = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileList, setFileList] = useState<any>([]);
  const [validFileFormat, setValidFileFormat] = useState(false);
  const [fileRequired, setFileRequired] = useState(false);
  const [images, setImages] = useState<ImageData[]>([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const onCreateSuccess = () => {
    setNotify({
      isOpen: true,
      type: "success",
      message: "Image is Uploaded Successfully !",
    });
    setTimeout(() => {
      setIsSubmitting(false);
      loadImages();
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
    fileName: Yup.string().required("File Name is required"),
  });

  const formik = useFormik({
    initialValues: initialState,
    onSubmit: (values) => {
      if (fileList.length == 0) {
        setFileRequired(true);
      } else {
        setFileRequired(false);
        setIsSubmitting(true);
        const formData = new FormData();
        formData.append("file", fileList);
        formData.append("fileName", values.fileName);
        axios
          .create({
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .post(appUrl + "imageRoute", formData)
          .then(() => onCreateSuccess())
          .catch((error) => onCreateError(error.response.data.message));
      }
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

  const loadImages = async () => {
    const response = await axios.get(appUrl + "imageRoute/files");
    setImages(response.data);
  };

  useEffect(() => {
    loadImages();
  }, []);

  const convertBufferToBase64 = (buffer: Buffer): string => {
    const base64String = Buffer.from(buffer).toString("base64");
    return `data:${images[0].imageFile.contentType};base64,${base64String}`;
  };

  return (
    <div className="imageFile-container">
      <h1>Using MERN Stack to Upload and Retrieve/Display Image File</h1>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card className="upload-image image-card" title="To Upload the Image">
            <Form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Controls.Input
                    required
                    id="fileName"
                    label="File Name"
                    {...formik.getFieldProps("fileName")}
                    error={
                      formik.touched.fileName && formik.errors.fileName
                        ? formik.errors.fileName
                        : ""
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <Upload
                    listType="picture"
                    onChange={(response: any) => beforeUpload(response.file)}
                    beforeUpload={() => false}
                  >
                    <ButtonAnt icon={<UploadOutlined translate={undefined} />}>
                      Image
                    </ButtonAnt>
                    <br />
                    {validFileFormat ? (
                      <span className="text-danger">
                        Invalid file format, Only jpg, jpeg and png files are
                        allowed!
                      </span>
                    ) : null}
                    {fileRequired ? (
                      <span className="text-danger">Image is required</span>
                    ) : null}
                  </Upload>
                </Grid>
                <Grid item xs={12} style={{ position: "relative" }}>
                  <div className="btn-form">
                    {isSubmitting ? (
                      <Button
                        size="small"
                        variant="contained"
                        disabled={isSubmitting}
                      >
                        Submitting...
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        type="submit"
                        size="small"
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
        </Grid>

        <Grid item xs={12}>
          <Card
            className="retrieve-image image-card"
            title="To Retrieve the Image"
          >
            <h2>Uploaded Images</h2>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {images.map((image: any) => (
                <div
                  key={image.id}
                  style={{ margin: "10px", textAlign: "center" }}
                >
                  <img
                    src={convertBufferToBase64(image.imageFile.data)}
                    alt={image.fileName}
                    style={{ maxWidth: "200px", maxHeight: "200px" }}
                  />
                  <p>{image.fileName}</p>
                </div>
              ))}
            </div>
          </Card>
        </Grid>
      </Grid>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default ImageFile;
