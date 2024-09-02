import { Form } from "../../commonComponent/Form";
import Controls from "../../commonComponent/Controls";
import { useFormik } from "formik";
import * as Yup from "yup";
import { appUrl, token } from "../../appurl";
import axios from "axios";
import { Card } from "antd";
import { Grid, Button } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Notification from "../../commonComponent/notification";
import { useState } from "react";
import Images from "../../images/WHite Logo.png";

interface ItemState {
  firstName: string;
  middleName: string;
  lastName: string;
  profession: string;
  phone: string;
  email: string;
  address: string;
  subCity: string;
  town: string;
}

const initialState: ItemState = {
  firstName: "",
  middleName: "",
  lastName: "",
  profession: "",
  phone: "",
  email: "",
  address: "",
  subCity: "",
  town: "",
};

const EditProfile = ({ ...props }) => {
  const [editProfile, setEditProfile] = useState(props.editProfile);
  const [viewMode, setViewMode] = useState(props.viewMode);
  const [editedName,setEditedName]=useState<any>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const onUpdateSuccess = () => {
    setNotify({
      isOpen: true,
      message: "Profile is Updated Successfully !",
      type: "success",
    });
    setTimeout(() => {
      setIsSubmitting(false);
      localStorage.setItem("name", editedName);
      window.location.reload();
    }, 2000);
  };

  const onUpdateError = (error: any) => {
    setIsSubmitting(false);
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    middleName: Yup.string().required("Middle Name is required"),
    email: Yup.string().required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    profession: Yup.string().required("Profession is required"),
  });

  const formik = useFormik({
    initialValues: editProfile,
    onSubmit: (values) => {
      setIsSubmitting(true);
      setEditedName(values.firstName)
      axios
        .create({
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .put(appUrl + `user/profile/${editProfile.id}`, values)
        .then(() => onUpdateSuccess())
        .catch((error) => onUpdateError(error.response.data.message));
    },
    validationSchema: validationSchema,
  });
  return (
    <div>
      <div>
        <Card
          title="Edit Profile"
          extra={
            <a onClick={() => props.closeedit()}>
              <CancelOutlinedIcon fontSize="medium" className="close-btn" />
            </a>
          }
        >
          <Form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Controls.Input
                  className="inputField"
                  required
                  id="firstName"
                  label="First Name"
                  {...formik.getFieldProps("firstName")}
                  error={
                    formik.touched.firstName && formik.errors.firstName
                      ? formik.errors.firstName
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <Controls.Input
                  className="inputField"
                  required
                  id="middleName"
                  label="Middle Name"
                  {...formik.getFieldProps("middleName")}
                  error={
                    formik.touched.middleName && formik.errors.middleName
                      ? formik.errors.middleName
                      : ""
                  }
                />
              </Grid>

              <Grid item xs={6}>
                <Controls.Input
                  className="inputField"
                  id="lastName"
                  label="Last Name"
                  {...formik.getFieldProps("lastName")}
                  error={
                    formik.touched.lastName && formik.errors.lastName
                      ? formik.errors.lastName
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <Controls.Input
                  className="inputField"
                  id="email"
                  label="Email"
                  {...formik.getFieldProps("email")}
                  error={
                    formik.touched.email && formik.errors.email
                      ? formik.errors.email
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <Controls.Input
                  className="inputField"
                  required
                  id="phone"
                  label="Phone"
                  {...formik.getFieldProps("phone")}
                  error={
                    formik.touched.phone && formik.errors.phone
                      ? formik.errors.phone
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <Controls.Input
                  className="inputField"
                  id="profession"
                  label="Profession"
                  {...formik.getFieldProps("profession")}
                  error={
                    formik.touched.profession && formik.errors.profession
                      ? formik.errors.profession
                      : ""
                  }
                />
              </Grid>
            </Grid>

            <div className="btn-form">
              {isSubmitting ? (
                <Button className="maker-btn" variant="contained" disabled>
                  Saving...
                </Button>
              ) : (
                <Button className="maker-btn" variant="contained" type="submit">
                  Save Change
                </Button>
              )}
            </div>
          </Form>
        </Card>
        <Notification notify={notify} setNotify={setNotify} />
      </div>
    </div>
  );
};

export default EditProfile;
