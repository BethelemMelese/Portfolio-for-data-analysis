import { Button, Grid, Paper } from "@mui/material";
import { Card } from "antd";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Form } from "../../commonComponent/Form";
import Controls from "../../commonComponent/Controls";
import logo from "../../images/White Img Logo.png";
import axios from "axios";
import { appUrl } from "../../appurl";
import Notification from "../../commonComponent/notification";

interface LoginState {
  email: string;
  password: string;
}

const initialState: LoginState = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const onLoginSuccess = (response: any) => {
    setNotify({
      isOpen: true,
      type: "success",
      message: response.message,
    });
    setTimeout(() => {
      setIsSubmitting(false);
      onAfterLogin(response);
    }, 2000);
  };

  const onLoginError = (response: any) => {
    setNotify({
      isOpen: true,
      type: "error",
      message: response,
    });
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  function onAfterLogin(response: any) {
    localStorage.setItem("token", response.token);
    localStorage.setItem("current-page", "Dashboard");
    localStorage.setItem("name", response.name);
    navigate("/datawizdipsy/home");
    window.location.reload();
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string()
      .min(8, "A Password can't insert less than 8 Characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
        "Must Contain at least 8 Characters, One Uppercase,One Lowercase, One Number and One Special Case Character (!@#$%^&*)"
      )
      .required("Password is Required"),
  });

  const formik = useFormik({
    initialValues: initialState,
    onSubmit: (values) => {
      setIsSubmitting(true);
      axios
        .post(appUrl + "user/login", values)
        .then((response) => onLoginSuccess(response.data))
        .catch((error) => onLoginError(error.response.data.message));
    },
    validationSchema: validationSchema,
  });

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      formik.handleSubmit();
    }
  };

  return (
    <div className="login-container">
      <div className="loginForm">
        <Paper elevation={8}>
          <Card>
            <Form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <img
                    src={logo}
                    className="log-img"
                    alt="Profile Picture"
                    style={{ width: 150, height: 50, borderRadius: 10 }}
                  />
                  <h2>
                    <b>Ablene Melese</b> / DATA SCIENTISTS
                  </h2>
                  <p>Dynamic Personal Portfolio</p>
                  <h4>Sign In</h4>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Controls.Input
                        className="inputField"
                        required
                        id="email"
                        label="Email"
                        {...formik.getFieldProps("email")}
                        error={
                          formik.touched.email && formik.errors.email
                            ? formik.errors.email
                            : ""
                        }
                        helperText="use your Email Address to login !"
                        onKeyPress={(event: any) => handleKeyPress(event)}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Controls.Password
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
                    <Grid item xs={6} className="shot-link">
                      <a onClick={() => navigate("/register")}>
                        <u>Forget Password?</u>
                      </a>
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
                      <a onClick={() => navigate("/mainPage/register")}>
                        Not have Account? <u>Sign Up</u> here
                      </a>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Form>
          </Card>
        </Paper>
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default Login;
