/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Popper, ClickAwayListener, ButtonBase } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  // root: {
  //   width: 221,
  //   fontSize: 13,
  // },
  popper: {
    border: '1px solid rgba(27,31,35,.15)',
    boxShadow: '0 3px 12px rgba(27,31,35,.15)',
    borderRadius: 3,
    width: 300,
    zIndex: 1300,
    fontSize: 13,
    color: '#586069',
    backgroundColor: '#f6f8fa',
  },
}));

const CustomPopper = ({ clickContent, open, setOpen, children }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };

  return (
    <ClickAwayListener onClickAway={() => open && setOpen(false)}>
      <div>
        <div className={classes.root}>
          <ButtonBase disableRipple onClick={handleClick}>
            {clickContent}
          </ButtonBase>
        </div>
        <Popper
          open={open}
          anchorEl={anchorEl}
          placement='bottom-start'
          className={classes.popper}
        >
          {children}
        </Popper>
      </div>
    </ClickAwayListener>
  );
};

export default CustomPopper;
