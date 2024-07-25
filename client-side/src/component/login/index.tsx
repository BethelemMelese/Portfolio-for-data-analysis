import { Button, Grid, Paper } from "@mui/material";
import { Card } from "antd";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Form } from "../../commonComponent/Form";
import Controls from "../../commonComponent/Controls";

interface LoginState {
  username: string;
  password: string;
}

const initialState: LoginState = {
  username: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
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
      //   setisSumibt(true);
      //   axios
      //     .post(appUrl + "users/login", values)
      //     .then((response) => onLoginSuccess(response.data))
      //     .catch((error) => onLoginError(error.response.data.message));
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
                  <h2>
                    <b>Ablene Melese</b> / DATA SCIENTISTS
                  </h2>
                  <p>Dynamic Personal Portfolio</p>
                  <h4>Login</h4>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Controls.Input
                        className="inputField"
                        required
                        id="email"
                        label="Username"
                        {...formik.getFieldProps("username")}
                        helperText="use your Email Address to login !"
                        error={
                          formik.touched.username && formik.errors.username
                            ? formik.errors.username
                            : ""
                        }
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
                      {isSubmit ? (
                        <Button variant="contained" disabled>
                          Signing...
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          className="buttonField"
                          type="submit"
                          disabled={isSubmit}

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
    </div>
  );
};

export default Login;
