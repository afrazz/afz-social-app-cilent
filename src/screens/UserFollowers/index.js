/* eslint-disable no-underscore-dangle */
import React from 'react';
import {useSelector} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import {Divider} from '@material-ui/core';
import Navbar from '../../components/Navbar';
import FollowBlock from '../../components/FollowBlock';

const useStyles = makeStyles(theme => ({
  followBlock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'space-between',
    width: '300px',
    paddingLeft: '50px',
    paddingRight: '50px',
    paddingBottom: '50px',
    marginBottom: 30,
    // paddingBottom: 30,
    borderRadius: '5px',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginLeft: 10,
      marginRight: 10,
    },
    background: '#fff',
  },
  heading: {
    textAlign: 'center',
  },
}));

const UserFollowers = () => {
  const {user} = useSelector(state => state.user);
  const classes = useStyles();
  return (
    <>
      <Navbar profileImg={user.profileImg} style={{position: 'relative'}} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: 90,
        }}
      >
        <div className={classes.followBlock}>
          <h1 className={classes.heading}>Followers</h1>
          {user.followers?.map(followerUser => (
            <>
              <FollowBlock
                userId={followerUser.userId}
                username={followerUser.username}
                name={followerUser.name}
                profileImg={followerUser.profileImg}
                key={followerUser._id}
              />
              <Divider />
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserFollowers;
