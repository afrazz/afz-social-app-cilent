/* eslint-disable react/prop-types */
import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
} from '@material-ui/core';

const CropDialog = ({open, onClose, children, onSave}) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>File Crop Preview</DialogTitle>
    <DialogContent>{children}</DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Cancel
      </Button>
      <Button onClick={onSave} color="primary" autoFocus>
        Save
      </Button>
    </DialogActions>
  </Dialog>
);

export default CropDialog;
