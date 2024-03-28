import { useState } from "react";
import { Snackbar, Alert } from "@mui/material";

export default function useSnackbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("info");

  const handleOpenSnackbar = (message, severity = "info") => {
    setMessage(message);
    setSeverity(severity);
    setIsOpen(true);
  };

  const handleCloseSnackbar = () => {
    setIsOpen(false);
  };

  const snackbar = (
    <Snackbar open={isOpen} autoHideDuration={5000} onClose={handleCloseSnackbar}>
      <Alert onClose={handleCloseSnackbar} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );

  return { handleOpenSnackbar, snackbar };
}
