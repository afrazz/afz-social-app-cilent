import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import { Button, FormHelperText } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const ChatEmpty = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <SendIcon style={{ fontSize: 100 }} color='primary' />
        <h2 style={{ textAlign: 'center' }}>No Messages Yet</h2>
        <FormHelperText
          style={{
            fontSize: 20,
            margin: '0px 0px 25px 0',
            textAlign: 'center',
          }}
        >
          Send private photos and messages to a friend
        </FormHelperText>
        <Button variant='contained' color='primary'>
          Send Message
        </Button>
      </div>
    </div>
  );
};

export default ChatEmpty;
