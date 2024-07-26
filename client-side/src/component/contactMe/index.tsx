import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  Paper,
  TextField,
  Tooltip,
} from "@mui/material";
import { Card } from "antd";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import LanguageIcon from "@mui/icons-material/Language";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form } from "../../commonComponent/Form";
import Controls from "../../commonComponent/Controls";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

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

const mapContainerStyle = {
  width: "22vw",
  height: "25vh",
};
const center = {
  lat: 7.2905715, // default latitude
  lng: 80.6337262, // default longitude
};

const ContactMe = () => {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().required("Email is required"),
    message: Yup.string().required("Message is required"),
  });

  const formik = useFormik({
    initialValues: initialState,
    onSubmit: (values) => {
      // setisSumibt(true);
      // axios
      //   .post(appUrl + "users/login", values)
      //   .then((response) => onRegistrationSuccess(response.data))
      //   .catch((error) => onRegistrationError(error.response.data.message));
    },
    validationSchema: validationSchema,
  });

  const libraries = "Addis Ababa";
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCYuI2C4_88HVPTBZxqYntZECDV6PKdLY4",
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }
  return (
    <div className="contact-container">
      <Grid container spacing={4}>
        <Grid item xs={8} className="contact-form">
          <Grid container spacing={2}>
            <Grid item xs={12} className="contact-message">
              <h2>I'd love to hear from you.</h2>
              <p>
                Leave a message below, and I'll get back to you as soon as
                possible
              </p>
            </Grid>
            <Grid item xs={12} className="contact-inputs">
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
                      label="Name"
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
                      label="Email"
                      {...formik.getFieldProps("email")}
                      error={
                        formik.touched.email && formik.errors.email
                          ? formik.errors.email
                          : ""
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controls.Inputmuliline
                      className="inputField"
                      required
                      id="message"
                      label="Write Your Message..."
                      {...formik.getFieldProps("message")}
                      error={
                        formik.touched.message && formik.errors.message
                          ? formik.errors.message
                          : ""
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
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
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Card className="back-card">
            <Card className="contact-info-card">
              <div className="google-map-location">
                <h2>Where To Find Me</h2>
                <div className="map-location">
                  <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={10}
                    center={center}
                  >
                    <Marker position={center} />
                  </GoogleMap>
                </div>
              </div>

              <div className="contact-info">
                <h3>Contact Me</h3>
                <div className="contact-address">
                  <div className="contact-address-item">
                    <p>
                      {" "}
                      <CallIcon className="contact-icon" /> +251 799001136
                    </p>
                  </div>
                  <div className="contact-address-item">
                    <p>
                      {" "}
                      <EmailIcon className="contact-icon" />{" "}
                      datawizdipsy@gmail.com
                    </p>
                  </div>
                  <div className="contact-address-item">
                    <p>
                      {" "}
                      <LocationOnIcon className="contact-icon" /> Ayer tena,
                      Addis Ababa, Ethiopia
                    </p>
                  </div>
                </div>
              </div>
              <div className="contact-sm-link">
                <div className="sm-item">
                  <Tooltip title="LinkedIn">
                    <a href="https://www.linkedin.com/in/ablene-melese-821b36223">
                      {" "}
                      <LinkedInIcon />
                    </a>
                  </Tooltip>
                </div>
                <div className="sm-item">
                  <Tooltip title="WhatsApp">
                    <a href="#">
                      <WhatsAppIcon />
                    </a>
                  </Tooltip>
                </div>
                <div className="sm-item">
                  <Tooltip title="Instagram">
                    <a href="#">
                      <InstagramIcon />
                    </a>
                  </Tooltip>
                </div>
                <div className="sm-item">
                  <Tooltip title="WWW">
                    <a href="#">
                      {" "}
                      <LanguageIcon />
                    </a>
                  </Tooltip>
                </div>
              </div>
            </Card>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <footer className="contact-footer">
            <div className="created-by">
              <p>
                Copyright &copy; 2024 by Bethelem Melese, all rights reserved.
              </p>
            </div>
          </footer>
        </Grid>
      </Grid>
    </div>
  );
};

export default ContactMe;
