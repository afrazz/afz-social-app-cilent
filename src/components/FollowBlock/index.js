/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import { onFollowingAdd, onFollowRemove } from '../../slices/userSlice';

const useStyles = makeStyles(() => ({
  followBlockCont: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 15,
  },
  followBlock: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  username: {
    color: 'rgba(0, 0, 0, 0.70)',
    fontSize: '15px',
    marginLeft: 20,
  },
  name: {
    color: 'rgba(0, 0, 0, 0.50)',
    fontSize: '13px',
    marginLeft: 20,
  },
}));

const FollowBlock = ({ userId, username, name, profileImg, isfollowLabel }) => {
  const [isFollowing, setIsFollowing] = useState([]);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user, loadingFollow } = useSelector((state) => state.user);
  const btnRef = useRef(null);

  useEffect(() => {
    // eslint-disable-next-line no-underscore-dangle
    if (user._id === userId) {
      if (btnRef.current) {
        btnRef.current.style.display = 'none';
      }
    }
    console.log(profileImg);
    // checking if the user Id matching userId if matching following found
    const followFound = user?.following?.filter(
      (followingUser) => followingUser.userId === userId
    );
    console.log(followFound);
    setIsFollowing(followFound);
  }, [user, userId]);

  const onFollowClick = () => {
    const data = {
      userId,
      username,
      name,
      profileImg,
    };
    console.log(data);
    dispatch(onFollowingAdd(data));
  };

  const onUnFollowClick = () => {
    dispatch(onFollowRemove({ userId }));
  };

  return (
    <div className={classes.followBlockCont}>
      <Avatar aria-label='profileImage' src={profileImg} />
      <div className={classes.followBlock}>
        <Typography>
          <div className={classes.username}>{username}</div>
          <div className={classes.name}>{name}</div>
        </Typography>
        <>
          {isfollowLabel && (
            <>
              {isFollowing?.length > 0 ? (
                <Button
                  color='primary'
                  onClick={onUnFollowClick}
                  disabled={loadingFollow}
                  ref={btnRef}
                >
                  unFollow
                </Button>
              ) : (
                <Button
                  color='primary'
                  onClick={onFollowClick}
                  disabled={loadingFollow}
                  ref={btnRef}
                >
                  Follow
                </Button>
              )}
            </>
          )}
        </>
      </div>
    </div>
  );
};

// Set default props
FollowBlock.defaultProps = {
  isfollowLabel: true,
};

export default FollowBlock;
