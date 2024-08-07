import { Avatar, Button, Grid } from "@mui/material";
import { Card } from "antd";
import { useEffect, useState } from "react";
import Notification from "../../../commonComponent/notification";
import axios from "axios";
import { appUrl } from "../../../appurl";

function stringToColor(string: string) {
  let hash = 0;
  let i;
  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}`,
  };
}

const ViewContact = () => {
  const [dataSource, setDataSource] = useState<any>([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  //   Notification for Success and error actions
  const onViewError = (response: any) => {
    setNotify({
      isOpen: true,
      type: "error",
      message: response,
    });
  };

  //   for get all data
  const onFetchContacts = () => {
    axios
      .create({
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .get(appUrl + "contact")
      .then((res) => {
        setDataSource(res.data);
      })
      .catch((error: any) => {
        onViewError(error.response.data.error);
      });
  };

  //   to fetch data using useEffect, when every time this page is loaded
  useEffect(() => {
    onFetchContacts();
  }, []);

  return (
    <div className="contacts-main-container">
      <Card className="comment-list">
        {dataSource.length != 0 && (
          <>
            {dataSource.map((item: any) => {
              return (
                <>
                  <Card style={{marginTop:"10px"}}>
                    <Grid container spacing={2}>
                      <Grid item xs={8} className="comment-contact">
                        <div className="comment-avatar">
                          <Avatar {...stringAvatar(item.name)} />
                        </div>
                        <div className="comment-info">
                          <h4>{item.name}</h4>
                          <h5>{item.email}</h5>
                          <div className="comment-content">
                            <p>{item.message}</p>
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </Card>
                </>
              );
            })}
          </>
        )}
      </Card>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default ViewContact;
