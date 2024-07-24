import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

 export const Dialogs = ({ ...props }) => {
  const { children, openDialog, setOpenDialog, height, maxHeight } = props;

  return (
    <React.Fragment>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={openDialog}
        sx={{
          "& .MuiDialog-paper": {
            width: "100%",
            height: height,
            maxHeight: maxHeight,
          },
        }}
        fullWidth={true}
        maxWidth="md"
      >
        <DialogContent dividers>{children}</DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
};

export const SamllDialogs = ({ ...props }) => {
  const { children, openDialog, setOpenDialog, height, maxHeight } = props;

  return (
    <React.Fragment>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={openDialog}
        sx={{
          "& .MuiDialog-paper": {
            width: "20%",
            height: height,
            maxHeight: maxHeight,
          },
        }}
        // fullWidth={true}
        maxWidth="sm"
      >
        <DialogContent dividers>{children}</DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
};

