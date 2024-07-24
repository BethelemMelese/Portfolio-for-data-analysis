import React from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Modal, Space } from "antd";

const { confirm } = Modal;

const showConfirm = () => {
  confirm({
    title: "Do you want to delete these items?",
    icon: <ExclamationCircleFilled />,
    content: "Some descriptions",
    onOk() {
      console.log("OK");
    },
    onCancel() {
      console.log("Cancel");
    },
  });
};

const DeleteConfirm = ({ ...props }) => {
    const {confirm,setConfirm}=props
    
  return (
    <Space wrap>
      {<Button onClick={showConfirm}>Confirm</Button>}
    </Space>
  );
};

export default DeleteConfirm;
