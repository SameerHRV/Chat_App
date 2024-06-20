import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React from "react";

const ConformDeleteDialog = ({ open, handleClose, deleteHandler, customMessage }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Conform Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>{customMessage}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>No</Button>
        <Button onClick={deleteHandler} color="error">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConformDeleteDialog;
