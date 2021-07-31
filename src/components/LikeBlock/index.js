/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {IconButton, makeStyles} from '@material-ui/core';

import {
  addLikePost,
  removeLikePost,
  onViewPostLikes,
} from '../../slices/userPostSlice';

const useStyles = makeStyles(() => ({
  postLink: {
    color: 'rgba(0, 0, 0, 0.54)',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

const Like = ({postLikes, postedUserId, postId}) => {
  const [isLiked, setIsLiked] = useState([]);
  const {usersPost, likeLoading} = useSelector(state => state.userPost);
  const {user} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const classes = useStyles();
  useEffect(() => {
    // Sometimes user didn't load fastly
    const likeFound = postLikes?.filter(like => like.user === user._id);
    setIsLiked(likeFound);
  }, [usersPost]);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginRight: 10,
        }}
      >
        {isLiked?.length > 0 ? (
          <IconButton
            aria-label="Likes"
            color="primary"
            disabled={likeLoading}
            onClick={() =>
              dispatch(
                removeLikePost({
                  postedUserId,
                  postId,
                  likeId: isLiked[0]._id,
                }),
              )
            }
          >
            <FavoriteIcon />
          </IconButton>
        ) : (
          <IconButton
            aria-label="Likes"
            disabled={likeLoading}
            onClick={() => dispatch(addLikePost({postedUserId, postId}))}
          >
            <FavoriteIcon />
          </IconButton>
        )}
        <div
          onClick={() => dispatch(onViewPostLikes({postId}))}
          className={classes.postLink}
        >
          {postLikes.length > 0 && `${postLikes.length} Likes`}
        </div>
      </div>
    </div>
  );
};

export default Like;
