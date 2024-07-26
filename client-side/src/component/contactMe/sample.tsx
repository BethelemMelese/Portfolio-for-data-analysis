import { Button, Grid, Paper, Tooltip } from "@mui/material";
import { Card } from "antd";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import LanguageIcon from "@mui/icons-material/Language";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Form } from "../../commonComponent/Form";
import Controls from "../../commonComponent/Controls";

interface ContactMeState {
  name: string;
  email: string;
  message: string;
}

const initialState: ContactMeState = {
  name: "",
  email: "",
  message: "",
};

const ContactMe = () => {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().required("Email is required"),
    phone: Yup.string().required("Phone is required"),
  });

  const formik = useFormik({
    initialValues: initialState,
    onSubmit: (values) => {
      //   setisSumibt(true);
      //   axios
      //     .post(appUrl + "users/login", values)
      //     .then((response) => onRegistrationSuccess(response.data))
      //     .catch((error) => onRegistrationError(error.response.data.message));
    },
    validationSchema: validationSchema,
  });

  return (
    <div className="contactme-container">
      <Grid container spacing={4}>
        <Grid item xs={8}>
          <Paper elevation={1}>
            <Card className="contact-form-card">
              <Grid container spacing={2}>
                <Grid item xs={12} className="contact-title">
                  <h2>
                    <b>Ablene Melese</b> / DATA SCIENTISTS
                  </h2>
                  <p>Dynamic Personal Portfolio</p>
                  <h4>Contact Me</h4>
                </Grid>
                <Grid item xs={12}>
                  <div className="input-forms">
                    <Form
                      autoComplete="off"
                      noValidate
                      onSubmit={formik.handleSubmit}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Controls.Input
                            className="inputField"
                            required
                            id="name"
                            label="Your Name"
                            {...formik.getFieldProps("name")}
                            error={
                              formik.touched.name && formik.errors.name
                                ? formik.errors.name
                                : ""
                            }
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Controls.Input
                            className="inputField"
                            required
                            id="email"
                            label="Your Email"
                            {...formik.getFieldProps("email")}
                            error={
                              formik.touched.email && formik.errors.email
                                ? formik.errors.email
                                : ""
                            }
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Controls.Input
                            className="inputField"
                            required
                            id="message"
                            label="Your Comment"
                            multiline
                            {...formik.getFieldProps("message")}
                            error={
                              formik.touched.message && formik.errors.message
                                ? formik.errors.message
                                : ""
                            }
                          />
                        </Grid>
                        <Grid item xs={8}>
                          <Button
                            variant="contained"
                            className="contactsubmit"
                            type="submit"
                          >
                            Send
                          </Button>
                        </Grid>
                      </Grid>
                    </Form>
                  </div>
                </Grid>
              </Grid>
            </Card>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={1}>
            <Card className="info-card">
              <div className="personal-address">
                <div className="contact-address-item">
                  <h4>
                    <b>Call</b>
                  </h4>
                  <p>+251 799001136</p>
                </div>
                <div className="contact-address-item">
                  <h4>
                    <b>Write</b>
                  </h4>
                  <p>datawizdipsy@gmail.com</p>
                </div>
                <div className="contact-address-item">
                  <h4>
                    <b>Follow</b>
                  </h4>
                  <div className="contact-sm-link">
                    <div className="contact-sm-item">
                      <Tooltip title="LinkedIn">
                        <a href="https://www.linkedin.com/in/ablene-melese-821b36223">
                          {" "}
                          <LinkedInIcon />
                        </a>
                      </Tooltip>
                    </div>
                    <div className="contact-sm-item">
                      <Tooltip title="WhatsApp">
                        <a href="#">
                          <WhatsAppIcon />
                        </a>
                      </Tooltip>
                    </div>
                    <div className="contact-sm-item">
                      <Tooltip title="Instagram">
                        <a href="#">
                          <InstagramIcon />
                        </a>
                      </Tooltip>
                    </div>
                    <div className="contact-sm-item">
                      <Tooltip title="WWW">
                        <a href="#">
                          {" "}
                          <LanguageIcon />
                        </a>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ContactMe;
