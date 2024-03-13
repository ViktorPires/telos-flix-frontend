import { useState, useEffect } from "react";
import DialogComponent from "../components/dialog/index";

const useDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState({
    message: "",
    title: "",
    ariaLabelledBy: "",
    buttonColor: "primary",
    buttonText: "OK",
    severity: "success",
    titleStyle: {},
  });
  const [dialogComponent, setDialogComponent] = useState(null);

  const openDialog = (props) => {
    setDialogContent(props);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setDialogComponent(null);
  };

  useEffect(() => {
    if (isOpen) {
      setDialogComponent(() => (
        <DialogComponent
          open={isOpen}
          handleCloseDialog={closeDialog}
          dialogProps={dialogContent}
        />
      ));
    }
  }, [dialogContent]);

  const dialog = {
    isOpen,
    openDialog,
    closeDialog,
    dialogComponent,
  };

  return {
    dialog,
  };
};

export default useDialog;
