/* eslint-disable react/prop-types */
import { Button, makeStyles } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import FollowBlock from '../FollowBlock';

const useStyles = makeStyles((theme) => ({
  followSuggestion: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

const TemporaryFindPeople = ({ setUsersOpen }) => {
  const classes = useStyles();
  const { initialFindFollowers } = useSelector((state) => state.user);
  return (
    <div
      className={classes.followSuggestion}
      style={{ position: 'sticky', top: '60px' }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <p style={{ color: 'rgba(0, 0, 0, 0.87)' }}>People you may know</p>

        <Button color='secondary' onClick={() => setUsersOpen(true)}>
          See all
        </Button>
      </div>

      {initialFindFollowers.map((curUser) => (
        <FollowBlock
          userId={curUser._id}
          username={curUser.username}
          name={curUser.name}
          profileImg={curUser.profileImg}
          key={curUser._id}
        />
      ))}
    </div>
  );
};

export default TemporaryFindPeople;
