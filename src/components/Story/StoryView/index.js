/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Stories from 'react-insta-stories';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function StoryView({
  setViewStoryOpen,
  setStoriesOpen,
  viewStoryOpen,
  stories,
  setStories,
  requestedStoryUserId,
}) {
  const classes = useStyles();
  // const [open, setOpen] = React.useState(false);
  const { userStory } = useSelector((state) => state.userStory);
  const { user } = useSelector((state) => state.user);

  const handleClose = () => {
    setViewStoryOpen(false);
  };

  useEffect(() => {
    // onStoryClick();
    // if (stories?.length === 0) {
    setStories([]);
    // if (storyClicked) {
    // onStoryClick();
    const currentStories = userStory?.stories?.map(
      ({
        _id,
        contentBody,
        contentFontSize,
        contentBackground,
        contentTextColor,
      }) => ({
        content: () => (
          <div
            style={{
              background: contentBackground,
              padding: 20,
              height: '100%',
              width: '100%',
            }}
            key={_id}
          >
            <h1
              style={{
                marginTop: 30,
                fontSize: contentFontSize,
                color: contentTextColor,
              }}
            >
              {contentBody}
            </h1>
          </div>
        ),
      })
    );

    if (currentStories && currentStories.length > 0) {
      setStories(currentStories);
      setStoriesOpen(false);
      setViewStoryOpen(true);
    } else if (user._id !== requestedStoryUserId) {
      setStories([]);
      setStoriesOpen(false);
      setViewStoryOpen(false);
    } else {
      setStories([]);
      setStoriesOpen(true);
      setViewStoryOpen(false);
    }
    // }
    // if (userStory?.length === 0) {

    // } else {

    // }

    // return () => setStoryClicked(false);

    // }
  }, [userStory]);

  return (
    <div>
      <Dialog
        fullScreen
        open={viewStoryOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge='start'
              color='inherit'
              onClick={handleClose}
              aria-label='close'
            >
              <CloseIcon />
            </IconButton>
            <Typography variant='h6' className={classes.title}>
              Story
            </Typography>
          </Toolbar>
        </AppBar>

        {stories?.length > 0 && (
          <Stories
            stories={stories}
            defaultInterval={3000}
            width='100%'
            height='100%'
            // onStoryStart={(story) => console.log('startedd', story)}
            // renderers={[
            //   {
            //     tester: (story) => {
            //       console.log('story',  === "60f2766204d37105bc53bc50");
            //       return {
            //         // Use this renderer only when the story type is video
            //         condition:  === 'video',
            //         priority: 3,
            //       };
            //     },
            //   },
            // ]}
            onAllStoriesEnd={() => {
              setStories([]);
              setViewStoryOpen(false);
            }}
          />
        )}
      </Dialog>
    </div>
  );
}
