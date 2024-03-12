import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

const styles = {
  dialog: {
    textAlign: "center",
  },
  alert: {
    marginTop: "1rem",
  },
};

function DialogComponent({
  open,
  handleCloseDialog,
  message,
  title,
  ariaLabelledBy,
  buttonColor,
  buttonText,
  severity,
  titleStyle,
}) {
  return (
    <Dialog
      open={open}
      onClose={handleCloseDialog}
      aria-labelledby={ariaLabelledBy}
      sx={styles.dialog}
    >
      <DialogTitle id={ariaLabelledBy} sx={titleStyle}>
        {title}
      </DialogTitle>
      <DialogContent>
        <Alert severity={severity} sx={styles.alert}>
          {message}
        </Alert>
      </DialogContent>
      <Button onClick={handleCloseDialog} color={buttonColor} autoFocus>
        {buttonText}
      </Button>
    </Dialog>
  );
}

export default DialogComponent;
