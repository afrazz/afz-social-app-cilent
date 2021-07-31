/* eslint-disable react/prop-types */
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';

const useStyles = makeStyles(() => ({
  root: {
    // height: '100vh',
    // transform: 'translateZ(0px)',
    // flexGrow: 1,
  },
  speedDial: {
    position: 'fixed',
    bottom: 20,
    right: 20,
    // bottom: theme.spacing(2),
    // right: theme.spacing(2),
  },
}));

export default function SpeedDialTooltipOpen({open, setOpen, children}) {
  const classes = useStyles();
  //   const [hidden, setHidden] = React.useState(false);

  //   const handleVisibility = () => {
  //     setHidden(prevHidden => !prevHidden);
  //   };

  return (
    <div className={classes.root}>
      {/* <Button onClick={handleVisibility}>Toggle Speed Dial</Button> */}

      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        className={classes.speedDial}
        // hidden={hidden}
        icon={<SpeedDialIcon />}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
      >
        {children}
      </SpeedDial>
    </div>
  );
}
