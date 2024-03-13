import useErrorLogger from "./useErrorLogger";
import useDialog from "./useDialog";

const useApiError = () => {
  const { logError } = useErrorLogger();
  const { dialog } = useDialog();

  const handleApiError = (error, dialogParams) => {
    logError(error);
    const errorMessage = error.response?.data?.message || dialogParams?.message;
    dialog.openDialog({
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

  return {
    handleApiError,
    dialogComponent: dialog.dialogComponent,
  };
};

export default useApiError;
