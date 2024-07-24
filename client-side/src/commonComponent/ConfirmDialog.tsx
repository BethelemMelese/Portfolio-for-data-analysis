import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { makeStyles } from "tss-react/mui";
import NotListedLocationIcon from "@mui/icons-material/NotListedLocation";

const useStyles = makeStyles<any>()((theme: any) => ({
  root: {
    margin: theme.spacing(0.5),
  },
  label: {
    textTransform: "none",
  },
  dialog: {
    padding: theme.spacing(2),
    position: "absolute",
    top: theme.spacing(5),
  },
  dialogTitle: {
    textAlign: "center",
  },
  dialogContent: {
    textAlign: "center",
  },
  dialogAction: {
    justifyContent: "center",
  },
  titleIcon: {
    color: theme.palette.error.main,
    "&:hover": {
      cursor: "default",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "5rem",
    },
  },
}));
const ConfirmationDialog = ({ ...props }) => {
  const { classes } = useStyles(props);

  const { confirmDialog, setConfirmDialog } = props;
  return (
    <Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
      <DialogTitle className={classes.dialogTitle}>
        <IconButton disableRipple className={classes.titleIcon}>
          <NotListedLocationIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Typography variant="h6" style={{ fontSize: 20 }}>
          {confirmDialog.title}
        </Typography>
        <Typography variant="h6" style={{ fontSize: 15 }}>
          {confirmDialog.subTitle}
        </Typography>
      </DialogContent>
      <DialogActions className={classes.dialogAction}>
        <Button
          variant="contained"
          color="error"
          classes={{ root: classes.root }}
          onClick={confirmDialog.onConfirm}
        >
          Yes
        </Button>
        <Button
          variant="contained"
          color="primary"
          classes={{ root: classes.root }}
          onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        >
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ConfirmationDialog;
