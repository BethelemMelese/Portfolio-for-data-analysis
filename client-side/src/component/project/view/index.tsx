import { Button, Grid, IconButton, Paper } from "@mui/material";
import { Card } from "antd";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { Avatar, List, Space } from "antd";
import React from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const data = Array.from({ length: 23 }).map((_, i) => ({
  href: "https://ant.design",
  title: `Project Title Part ${i}`,
  avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
  description:
    "Ant Design, a design language for background applications, is refined by Ant UED Team.",
  content:
    "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
}));

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const ViewProject = () => {
  return (
    <div className="project-container">
      <Paper elevation={0}>
        <Card
          style={{
            marginTop: 16,
            height: "660px",
            overflowX: "hidden",
            overflowY: "auto",
          }}
          type="inner"
          title="Inner Card title"
          extra={
            <Button variant="contained" size="small" className="create-btn">
              Add Project
            </Button>
          }
        >
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 3,
            }}
            dataSource={data}
            renderItem={(item) => (
              <List.Item
                key={item.title}
                actions={[
                  <IconButton
                    onClick={() => console.log("The Edit button is clicked")}
                  >
                    <ModeEditIcon color="warning" />
                  </IconButton>,
                  <IconButton
                    onClick={() => console.log("The Delete button is clicked")}
                  >
                    <DeleteForeverIcon color="error" />
                  </IconButton>,
                ]}
                extra={
                  <img
                    width={272}
                    alt="logo"
                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                  />
                }
              >
                <List.Item.Meta title={item.title} description={item.content} />
              </List.Item>
            )}
          />
        </Card>
      </Paper>
    </div>
  );
};

export default ViewProject;
