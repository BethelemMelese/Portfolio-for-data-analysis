import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Button, Grid, Tooltip } from "@mui/material";
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
import axios from "axios";
import { appUrl } from "../../appurl";
import Notification from "../../commonComponent/notification";

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
  height: "20vh",
};
const center = {
  lat: 7.2905715, // default latitude
  lng: 80.6337262, // default longitude
};

const ContactMe = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setmessage] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const onContactMeSuccess = (response: any) => {
    setNotify({
      isOpen: true,
      type: "success",
      message: "Your message is Successfully send !",
    });
    setTimeout(() => {
      setIsSubmitting(false);
      window.location.reload();
    }, 2000);
  };

  const onContactMeError = (response: any) => {
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
    name: Yup.string().required("Name is required"),
    email: Yup.string().email().required("Email is required"),
    message: Yup.string().required("Message is required"),
  });

  const formik = useFormik({
    initialValues: initialState,
    onSubmit: (values) => {
      console.log("values...", values);
      axios
        .post(appUrl + "contact", values)
        .then((response) => onContactMeSuccess(response.data))
        .catch((error) => onContactMeError(error.response.data.message));
    },
    validationSchema: validationSchema,
  });

  const libraries = "Addis Ababa";
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCYuI2C4_88HVPTBZxqYntZECDV6PKdLY4",
  });

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
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid className="contact-fields">
                    <Grid item xs={12}>
                      <input
                        className="inputField"
                        type="text"
                        id="name"
                        placeholder="Name"
                        {...formik.getFieldProps("name")}
                      />
                      {formik.touched.name && formik.errors.name ? (
                        <div className="error">{formik.errors.name}</div>
                      ) : (
                        ""
                      )}
                    </Grid>

                    <Grid item xs={12}>
                      <input
                        className="inputField"
                        type="email"
                        id="email"
                        placeholder="Email"
                        {...formik.getFieldProps("email")}
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <div className="error">{formik.errors.email}</div>
                      ) : (
                        ""
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <textarea
                        className="inputField"
                        id="message"
                        placeholder="Write your message here..."
                        cols={40}
                        rows={5}
                        {...formik.getFieldProps("message")}
                      ></textarea>
                      {formik.touched.message && formik.errors.message ? (
                        <div className="error">{formik.errors.message}</div>
                      ) : (
                        ""
                      )}
                    </Grid>
                  </Grid>
                  <div className="contact-btn">
                    {isSubmitting ? (
                      <button disabled>Sending...</button>
                    ) : (
                      <button className="contactsubmit" type="submit">
                        Send
                      </button>
                    )}
                  </div>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Card className="back-card">
            <Card className="contact-info-card">
              <div className="google-map-location">
                <h2>Where To Find Me</h2>
                <div className="map-location">
                  <Card style={mapContainerStyle}>Their is Map here</Card>
                  {/* <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={10}
                    center={center}
                  >
                    <Marker position={center} />
                  </GoogleMap> */}
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
                    <a
                      href="https://www.linkedin.com/in/ablene-melese-821b36223/"
                      target="_blank"
                    >
                      {" "}
                      <LinkedInIcon />
                    </a>
                  </Tooltip>
                </div>
                <div className="sm-item">
                  <Tooltip title="WhatsApp">
                    <a href="https://wa.me/+251799001136" target="_blank">
                      <WhatsAppIcon />
                    </a>
                  </Tooltip>
                </div>
                <div className="sm-item">
                  <Tooltip title="Instagram">
                    <a
                      href="https://www.instagram.com/ab_lene26/"
                      target="_blank"
                    >
                      <InstagramIcon />
                    </a>
                  </Tooltip>
                </div>
                <div className="sm-item">
                  <Tooltip title="WWW">
                    <a href="#" target="_blank">
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
                Copyright &copy; 2024 by @Bethisa.m, all rights reserved.
              </p>
            </div>
          </footer>
        </Grid>
      </Grid>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default ContactMe;
