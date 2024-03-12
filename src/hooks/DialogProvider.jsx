import React, { useState, createContext, useContext } from "react";
import DialogComponent from "../components/dialog/index";

const DialogContext = createContext();

export const DialogProvider = ({ children }) => {
  const [dialogProps, setDialogProps] = useState({
    open: false,
    message: "",
    title: "",
    ariaLabelledBy: "",
    buttonColor: "primary",
    buttonText: "OK",
    severity: "success",
    titleStyle: {},
  });

  const handleOpenDialog = (props) => {
    setDialogProps({ ...props, open: true });
  };

  const handleCloseDialog = () => {
    setDialogProps({ ...dialogProps, open: false });
  };

  return (
    <DialogContext.Provider value={{ handleOpenDialog, handleCloseDialog }}>
      {children}
      <DialogComponent {...dialogProps} handleCloseDialog={handleCloseDialog} />
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
};
