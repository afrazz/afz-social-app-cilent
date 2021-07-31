/* eslint-disable react/prop-types */
import React from 'react';
// import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles((theme) => ({
  bodyContainer: {
    [theme.breakpoints.up('sm')]: {
      width: '450px',
    },
    padding: 0,
  },
  postHeader: {
    display: 'flex',
    padding: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

export default function ScrollDialog({
  open,
  setOpen,
  title,
  children,
  actionComponent,
  id,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  return (
    <div style={{ overflow: 'hidden' }}>
      <Dialog
        style={{ marginTop: 56 }}
        open={open}
        onClose={() => setOpen(false)}
        scroll='paper'
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
        fullScreen={fullScreen}
      >
        <DialogTitle id='scroll-dialog-title' style={{ padding: '5px 20px' }}>
          <div className={classes.postHeader}>
            <Typography>{title}</Typography>
            <IconButton color='primary' onClick={() => setOpen(false)}>
              <HighlightOffIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent dividers id={id} className={classes.bodyContainer}>
          <DialogContentText id='scroll-dialog-description' tabIndex={-1}>
            {children}
          </DialogContentText>
        </DialogContent>
        {actionComponent && actionComponent}
      </Dialog>
    </div>
  );
}
