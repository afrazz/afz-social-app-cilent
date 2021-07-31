/* eslint-disable react/prop-types */
import React, {useRef} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const useStyles = makeStyles(() => ({
  scrollContainer: {
    display: 'flex',
    width: ({containerWidth}) => containerWidth,
    overflow: 'auto',
    whiteSpace: 'nowrap',
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  arrowCont: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px',
  },
  leftArrow: {
    marginRight: '10px',
    cursor: 'pointer',
  },
}));

const HorizontalScroll = ({
  leftScroll,
  rightScroll,
  containerWidth,
  children,
}) => {
  const classes = useStyles({containerWidth});
  const scrollContainer = useRef();

  // For scrolling horizontally
  const scroll = scrollOffset => {
    let pos = scrollContainer?.current?.scrollLeft;
    pos += scrollOffset;
    scrollContainer.current.scrollTo({
      left: pos,
      behavior: 'smooth',
    });
  };
  return (
    <>
      <div className={classes.scrollContainer} ref={scrollContainer}>
        {children}
      </div>
      <div className={classes.arrowCont}>
        <ChevronLeftIcon
          className={classes.leftArrow}
          onClick={() => scroll(leftScroll)}
        />
        <ChevronRightIcon
          style={{cursor: 'pointer'}}
          onClick={() => scroll(rightScroll)}
        />
      </div>
    </>
  );
};

export default HorizontalScroll;
