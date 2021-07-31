/* eslint-disable react/display-name */
/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@material-ui/core/Container';
import { styled, makeStyles } from '@material-ui/core/styles';
import { Backdrop, Divider } from '@material-ui/core';
// Speed dial
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import PostAddIcon from '@material-ui/icons/PostAdd';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import FollowBlock from '../../components/FollowBlock';

// /////
import Navbar from '../../components/Navbar';

import { findFollowers } from '../../slices/userSlice';
import { usersPosts } from '../../slices/userPostSlice';
import { viewStoriedUser } from '../../slices/userStorySlice';
import SpeedDial from '../../components/SpeedDial';
import PostUpload from '../../components/PostUpload';
import SkeltonLoader from '../../components/SkeltonLoader';
import DialogBox from '../../components/DialogBox';
import FindPeople from '../../components/FindPeople/FindPeople';

// Test
//
// eslint-disable-next-line import/order
import Grid from '@material-ui/core/Grid';
import PostViewer from '../../components/PostViewer';
import TemporaryFindPeople from '../../components/FindPeople/TemporaryFindPeople';
import StoriesProfileView from '../../components/Story/StoryView/StoriesProfileView';
import StoryUpload from '../../components/Story/StoryUpload';
import StoryView from '../../components/Story/StoryView';

import { viewUserStory } from '../../slices/userStorySlice';

const HomeContainer = styled('div')({
  background: '#FAFAFA',
  minHeight: '100vh',
});

const StatusArea = styled('div')({
  background: '#fff',
  padding: '20px 0 0 0',
  marginBottom: 40,
});

const useStyles = makeStyles((theme) => ({
  followSuggestion: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  backDrop: { height: '100vh', zIndex: 100 },
  paddingHorzontally: {
    paddingLeft: '20px',
    paddingRight: '20px',
  },
}));

const Home = () => {
  const [speedDialOpen, setSpeedDialOpen] = useState(false);
  const [postOpen, setPostOpen] = useState(false);
  const [likesOpen, setLikesOpen] = useState(false);
  const [usersOpen, setUsersOpen] = useState(false);
  const [storiesOpen, setStoriesOpen] = useState(false);
  const [stories, setStories] = useState([]);
  const [viewStoryOpen, setViewStoryOpen] = useState(false);
  const [requestedStoryUserId, setRequestedStoryUserId] = useState(null);
  // const [storyClicked, setStoryClicked] = useState(false);
  // const [isHideNavbar, setIsHideNavbar] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);
  const {
    postLikes,
    // createPostLoading,
    // createPostError,
  } = useSelector((state) => state.userPost);

  useEffect(() => {
    (async () => {
      await dispatch(viewStoriedUser()); // get storied User trigger
      await dispatch(findFollowers(null, { isInitialLoad: true }));
      await dispatch(usersPosts(1));
    })();
  }, []);

  useEffect(() => {
    setLikesOpen(postLikes.length !== 0);
  }, [postLikes]);

  const onPostAddClick = () => {
    // setSpeedDialOpen(false);
    setPostOpen(true);
  };

  console.log('stories', stories);

  const onStoryClick = (userId) => {
    setRequestedStoryUserId(userId);
    console.log('userId', userId);
    dispatch(viewStoriedUser());
    dispatch(viewUserStory(userId));
  };

  return (
    <HomeContainer>
      {loading && <SkeltonLoader />}
      {!loading && !error && user?._id && (
        <>
          {!viewStoryOpen && (
            <Navbar profileImg={user.profileImg} setUsersOpen={setUsersOpen} />
          )}
          <Backdrop open={speedDialOpen} className={classes.backDrop} />
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
              onClick={() => setStoriesOpen(true)}
              // onClick={onPostAddClick}
            />
          </SpeedDial>
          <Container maxWidth='md' style={{ marginTop: '60px' }}>
            <StatusArea>
              <StoriesProfileView onStoryClick={onStoryClick} />
            </StatusArea>
            <StoryView
              setViewStoryOpen={setViewStoryOpen}
              viewStoryOpen={viewStoryOpen}
              setStoriesOpen={setStoriesOpen}
              stories={stories}
              setStories={setStories}
              requestedStoryUserId={requestedStoryUserId}
            />

            <Grid container spacing={3}>
              <Grid item md={8} sm={10}>
                <PostUpload
                  open={postOpen}
                  setOpen={setPostOpen}
                  setSpeedDial={setSpeedDialOpen}
                />
                <StoryUpload open={storiesOpen} setOpen={setStoriesOpen} />
                {/* Post View */}
                <PostViewer />
                {/* To  find Follow people */}
                <FindPeople open={usersOpen} setOpen={setUsersOpen} />

                <DialogBox
                  open={likesOpen}
                  setOpen={setLikesOpen}
                  title='Likes'
                >
                  {postLikes.length !== 0 &&
                    postLikes[0].user.map((likedUser) => (
                      <>
                        <div className={classes.paddingHorzontally}>
                          <FollowBlock
                            userId={likedUser._id}
                            username={likedUser.username}
                            name={likedUser.name}
                            profileImg={likedUser.profileImg}
                            key={likedUser._id}
                          />
                        </div>

                        <Divider />
                      </>
                    ))}
                </DialogBox>

                {/* Tempery Follow people */}
              </Grid>
              <Grid item md={4}>
                <TemporaryFindPeople setUsersOpen={setUsersOpen} />
              </Grid>
            </Grid>
          </Container>
        </>
      )}
    </HomeContainer>
  );
};

export default Home;
