import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import ReactLoading from "react-loading";
import Blacklogo from "../../images/DarkLog.png";

const Loading = (): any => {
  const [loading, setLoading] = useState(false);
  const loadingDuration = 2000;

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
