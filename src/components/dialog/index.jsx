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
  dialogProps,
}) {
  return (
    <Dialog
      open={open}
      onClose={handleCloseDialog}
      aria-labelledby={dialogProps.ariaLabelledBy}
      sx={styles.dialog}
    >
      <DialogTitle id={dialogProps.ariaLabelledBy} sx={dialogProps.titleStyle}>
        {dialogProps.title}
      </DialogTitle>
      <DialogContent>
        <Alert severity={dialogProps.severity} sx={styles.alert}>
          {dialogProps.message}
        </Alert>
      </DialogContent>
      <Button onClick={handleCloseDialog} color={dialogProps.buttonColor} autoFocus>
        {dialogProps.buttonText}
      </Button>
    </Dialog>
  );
}

export default DialogComponent;
