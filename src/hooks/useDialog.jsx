import { useState, useEffect } from "react";
import DialogComponent from "../components/dialog/index";
import useErrorLogger from "../hooks/useErrorLogger";

const useDialog = () => {
  const { logError } = useErrorLogger();
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

  const handleApiError = (error, dialogParams) => {
    logError(error);
    const errorMessage = error.response?.data?.message || dialogParams?.message;
    openDialog({
      message: errorMessage,
      title: dialogParams?.title || "Error",
      ariaLabelledBy: dialogParams?.ariaLabelledBy || "error-dialog-title",
      buttonColor: dialogParams?.buttonColor || "error",
      buttonText: dialogParams?.buttonText || "Close",
      severity: dialogParams?.severity || "error",
      titleStyle: dialogParams?.titleStyle || {
        backgroundColor: "red",
        color: "white",
      },
    });
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
    handleApiError,
    dialogComponent,
  };

  return {
    dialog,
  };
};

export default useDialog;
