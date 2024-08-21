import React, { useState, useEffect } from "react";
import { CircularProgress, Grid } from "@mui/material";
import ReactLoading from "react-loading";
import Blacklogo from "../../images/Black  Logo.png";

const Loading = (): any => {
  const [loading, setLoading] = useState(false);
  const loadingDuration = 1000;

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, loadingDuration);
  }, []);

  return (
    loading !== false && (
      <div className="loading-container">
        <div className="loading-icon">
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <img src={Blacklogo} width={250} className="loading-grid" />
              <ReactLoading
                type="cylon"
                color="#f2de1f"
                height={150}
                width={150}
                delay={50}
                className="loading-prog"
              />
            </Grid>
          </Grid>
        </div>
      </div>
    )
  );
};

export default Loading;
