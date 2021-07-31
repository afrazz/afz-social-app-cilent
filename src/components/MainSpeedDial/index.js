/* eslint-disable react/prop-types */
import React from 'react';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import PostAddIcon from '@material-ui/icons/PostAdd';
import LoyaltyIcon from '@material-ui/icons/Loyalty';

const MainSpeedDial = ({ speedDialOpen, setSpeedDialOpen, onPostAddClick }) => (
  <SpeedDial open={speedDialOpen} setOpen={setSpeedDialOpen}>
    <SpeedDialAction
      key='0'
      icon={<PostAddIcon />}
      tooltipTitle='Post'
      tooltipOpen
      // onClick={() => setOpen(false)}
      onClick={onPostAddClick}
    />
    <SpeedDialAction
      key='1'
      icon={<LoyaltyIcon />}
      tooltipTitle='Story'
      tooltipOpen
      // onClick={onPostAddClick}
    />
  </SpeedDial>
);

export default MainSpeedDial;
