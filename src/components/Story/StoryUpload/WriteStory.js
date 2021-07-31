/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  container: {
    background: 'red',
    width: '100vw',
    height: '100%',
  },
  textarea: {
    padding: 20,
    width: '100vw',
    height: '100%',
    overflow: 'hidden',
    resize: 'none',
    border: 'none',
    '&:focus': {
      outline: 'none',
    },
  },
}));

const WriteStory = ({
  bgColor,
  fontsize,
  textColor,
  bodyText,
  selectedEmoji,
  setSelectedEmoji,
  setBodyText,
}) => {
  const classes = useStyles();
  console.log(fontsize);
  useEffect(() => {
    setBodyText(bodyText + selectedEmoji);
    setSelectedEmoji('');
  }, [selectedEmoji]);
  return (
    <div className={classes.container}>
      <textarea
        className={classes.textarea}
        style={{ background: bgColor, color: textColor, fontSize: fontsize }}
        placeholder='Type Here...'
        onChange={(e) => setBodyText(e.target.value)}
        value={bodyText}
      />
    </div>
  );
};

export default WriteStory;
