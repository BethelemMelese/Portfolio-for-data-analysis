import { Card } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { appUrl } from "../../appurl";
import logo from "../../images/White Img Logo.png";
import Notification from "../../commonComponent/notification";
import { Form } from "../../commonComponent/Form";
import Controls from "../../commonComponent/Controls";
import { Button, Grid } from "@mui/material";
import UserService from "../../police/userService";

interface LoginState {
  confirmPassword: string;
  oldPassword: string;
  newPassword: string;
}

const initialState: LoginState = {
  confirmPassword: "",
  oldPassword: "",
  newPassword: "",
};

const ChangePassword = () => {
  const navigate = useNavigate();
  const userName = UserService.currentUser;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const onChangeSuccess = (response: any) => {
    setNotify({
      isOpen: true,
      type: "success",
      message: response.message,
    });
    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/datawizdipsy/home");
    }, 2000);
  };

  const onChangeError = (response: any) => {
    setNotify({
      isOpen: true,
      type: "error",
      message: response,
    });
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string()
      .min(8, "A Password can't insert less than 8 Characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
        "Must Contain at least 8 Characters, One Uppercase,One Lowercase, One Number and One Special Case Character (!@#$%^&*)"
      )
      .required("Password is Required"),
    newPassword: Yup.string()
      .min(8, "A Password can't insert less than 8 Characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
        "Must Contain at least 8 Characters, One Uppercase,One Lowercase, One Number and One Special Case Character (!@#$%^&*)"
      )
      .required("Password is Required"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .min(8)
      .oneOf([Yup.ref("newPassword")], "Password must match"),
  });

  const formik = useFormik({
    initialValues: initialState,
    onSubmit: (values) => {
      setIsSubmitting(true);
      axios
        .put(appUrl + `user/changePassword/${userName}`, values)
        .then((response) => onChangeSuccess(response.data))
        .catch((error) => onChangeError(error.response.data.message));
    },
    validationSchema: validationSchema,
  });

  return (
    <div className="chagPassword-container">
      <Card className="change-password-form">
        <Form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <img
                src={logo}
                className="log-img"
                alt="Profile Picture"
                style={{ width: 200, height: 100, borderRadius: 10 }}
              />
              <h2>
                <b>Ablene Melese</b> / DATA SCIENTISTS
              </h2>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Controls.Password
                    className="inputField"
                    required
                    id="oldPassword"
                    label="Old Password"
                    {...formik.getFieldProps("oldPassword")}
                    error={
                      formik.touched.oldPassword && formik.errors.oldPassword
                        ? formik.errors.oldPassword
                        : ""
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controls.Password
                    className="inputField"
                    required
                    id="newPassword"
                    label="New Password"
                    {...formik.getFieldProps("newPassword")}
                    error={
                      formik.touched.newPassword && formik.errors.newPassword
                        ? formik.errors.newPassword
                        : ""
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controls.Password
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
                  />
                </Grid>
                <Grid item xs={12}>
                  {isSubmitting ? (
                    <Button variant="contained" disabled>
                      Changing...
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      className="buttonField"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Change Password
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Form>
        <Notification notify={notify} setNotify={setNotify} />
      </Card>
    </div>
  );
};

export default ChangePassword;
