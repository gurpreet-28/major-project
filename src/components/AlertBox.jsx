import React from "react";
import { CryptoState } from "../CryptoContext";
import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";

const AlertBox = () => {
  const { alert, setAlert } = CryptoState();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ open: false });
  };
  return (
    <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        elevation={10}
        variant="filled"
        severity={alert.type}
      >
        {alert.message}
      </Alert>
    </Snackbar>
  );
};

export default AlertBox;
