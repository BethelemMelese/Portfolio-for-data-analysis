import { Avatar, Button, Grid, Paper } from "@mui/material";
import { Card } from "antd";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Form } from "../../commonComponent/Form";
import Controls from "../../commonComponent/Controls";
import axios from "axios";
import { appUrl } from "../../appurl";
import logo from "../../images/WHite Logo.png";
import Notification from "../../commonComponent/notification";

interface RegistrationState {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  profession: string;
  phone: string;
}

const initialState: RegistrationState = {
  firstName: "",
  middleName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  profession: "",
  phone: "",
};

const Registration = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const onRegistrationSuccess = (response: any) => {
    setNotify({
      isOpen: true,
      type: "success",
      message: response,
    });
    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/");
    }, 2000);
  };

  const onRegistrationError = (response: any) => {
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
    firstName: Yup.string().required("First Name is required"),
    middleName: Yup.string().required("MIddle Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    profession: Yup.string().required("Profession is required"),
    password: Yup.string()
      .min(8, "A Password can't insert less than 8 Characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
        "Must Contain at least 8 Characters, One Uppercase,One Lowercase, One Number and One Special Case Character (!@#$%^&*)"
      )
      .required("Password is Required"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .min(8)
      .oneOf([Yup.ref("password")], "Password must match"),
  });

  const formik = useFormik({
    initialValues: initialState,
    onSubmit: (values) => {
      setIsSubmitting(true);
      axios
        .post(appUrl + "user/register/", values)
        .then((response) => onRegistrationSuccess(response.data))
        .catch((error) => onRegistrationError(error.response.data.message));
    },
    validationSchema: validationSchema,
  });

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      formik.handleSubmit();
    }
  };

  return (
    <div className="register-container">
      <div className="registerForm">
        <Paper elevation={8}>
          <Card className="register-card">
            <Form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  <img
                    src={logo}
                    className="log-img"
                    alt="Profile Picture"
                    style={{ width: 160}}
                  />
                  <h2>
                    <b>Ablene Melese</b> / DATA SCIENTISTS
                  </h2>
                  <p>Dynamic Personal Portfolio</p>
                  <h4>Sign Up</h4>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={1}>
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
                        onKeyPress={(event: any) => handleKeyPress(event)}
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
                        onKeyPress={(event: any) => handleKeyPress(event)}
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
                        onKeyPress={(event: any) => handleKeyPress(event)}
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
                        onKeyPress={(event: any) => handleKeyPress(event)}
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
                        onKeyPress={(event: any) => handleKeyPress(event)}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <Controls.Input
                        className="inputField"
                        id="profession"
                        label="Your Profession"
                        required
                        {...formik.getFieldProps("profession")}
                        error={
                          formik.touched.profession && formik.errors.profession
                            ? formik.errors.profession
                            : ""
                        }
                        onKeyPress={(event: any) => handleKeyPress(event)}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <Controls.Password
                        className="inputField"
                        required
                        id="password"
                        label="Password"
                        {...formik.getFieldProps("password")}
                        error={
                          formik.touched.password && formik.errors.password
                            ? formik.errors.password
                            : ""
                        }
                        onKeyPress={(event: any) => handleKeyPress(event)}
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <Controls.Password
                        className="inputField"
                        required
                        id="confirmPassword"
                        label="Confirm Password"
                        {...formik.getFieldProps("confirmPassword")}
                        error={
                          formik.touched.confirmPassword &&
                          formik.errors.confirmPassword
                            ? formik.errors.confirmPassword
                            : ""
                        }
                        onKeyPress={(event: any) => handleKeyPress(event)}
                      />
                    </Grid>

                    <Grid item xs={12} className="shot-link">
                      <a onClick={() => navigate("/")}>
                        <u>Go to home</u>
                      </a>
                    </Grid>
                    <Grid item xs={12}>
                      {isSubmitting ? (
                        <Button variant="contained" disabled>
                          Signing...
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          className="buttonField"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          Sign In
                        </Button>
                      )}
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      className="shot-link"
                      justifyContent="flex-end"
                    >
                      <a onClick={() => navigate("/mainPage/login")}>
                        Already have an account? <u>Sing In</u> here
                      </a>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          </Card>
        </Paper>
        <Notification notify={notify} setNotify={setNotify} />
      </div>
    </div>
  );
};

export default Registration;
