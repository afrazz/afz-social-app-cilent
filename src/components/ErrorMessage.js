/* eslint-disable react/prop-types */
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  message: {
    color: '#d9534f',
  },
}));

const ErrorMessage = ({message}) => {
  const classes = useStyles();
  return <div className={classes.message}>{message}</div>;
};

export default ErrorMessage;
