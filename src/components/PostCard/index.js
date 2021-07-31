/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { useState, useRef } from 'react';
import moment from 'moment';

import { useDispatch, useSelector } from 'react-redux';
// import ForumIcon from '@material-ui/icons/Forum';
// import EditIcon from '@material-ui/icons/Edit';
// import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import { makeStyles } from '@material-ui/core/styles';
import ShowMoreText from 'react-show-more-text';
import ReactPlayer from 'react-player';
import Card from '@material-ui/core/Card';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import LikeBlock from '../LikeBlock';
import ActionInput from '../ActionInput';
import DialogBox from '../DialogBox';
import { onViewPostComments } from '../../slices/userPostSlice';
import { onAddComment } from '../../slices/userPostSlice';

// eslint-disable-next-line import/order
import {
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginBottom: '40px',
  },
  media: {
    width: '100%',
    maxHeight: '600px',
    objectFit: 'cover',
    objectPosition: 'center',
    [theme.breakpoints.down('sm')]: {
      maxHeight: '400px',
    },
    [theme.breakpoints.down('xs')]: {
      maxHeight: '330px',
    },
    // height: '600px',
    // height: 'auto',
    // paddingTop: '56.25%', // 16:9
  },
  mediaCaption: {
    fontSize: 17,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: '#845ec2',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionsModal: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 10,
    padding: 0,
    minWidth: '20vw',
    [theme.breakpoints.down('xs')]: {
      minWidth: '60vw',
    },
  },
  commentLink: {
    color: 'rgba(0, 0, 0, 0.54)',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

const PostCard = ({
  postUrl,
  postCaption,
  postedUser,
  postTime,
  postLikes,
  postCommentCount,
  postId,
  postedUserId,
  fileType,
}) => {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const [commentViewOpen, setCommentViewOpen] = useState(false);
  const [openCommentOption, setOpenCommentOption] = useState(false);
  const [comment, setComment] = useState('');
  const commentInputRef = useRef(null);
  const dispatch = useDispatch();
  const {
    postComments,
    viewPostCommentsLoading,
    createCommentLoading,
    // viewPostCommentsError,
  } = useSelector((state) => state.userPost);
  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const onCommentsViewClick = async () => {
    try {
      await dispatch(onViewPostComments(postId));
      setCommentViewOpen(true);
    } catch (err) {
      setCommentViewOpen(false);
    }
  };

  const onCommentSubmit = (e) => {
    e.preventDefault();
    const commentData = {
      postId,
      postedUserId,
      comment,
    };
    dispatch(onAddComment(commentData));
  };

  return (
    <Card className={classes.root}>
      {postUrl && (
        <>
          <CardHeader
            avatar={
              <Avatar
                aria-label='profileImage'
                className={classes.avatar}
                src={postedUser.profileImg}
              />
            }
            action={
              <>
                <IconButton aria-label='settings' onClick={handleOpen}>
                  <MoreVertIcon />
                </IconButton>
                <Modal
                  aria-labelledby='transition-modal-title'
                  aria-describedby='transition-modal-description'
                  className={classes.modal}
                  open={openModal}
                  onClose={handleClose}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={openModal}>
                    <List
                      component='nav'
                      className={classes.optionsModal}
                      aria-label='mailbox folders'
                    >
                      <ListItem button>
                        <ListItemText primary='Edit' className='tc' />
                      </ListItem>
                      <Divider />
                      <ListItem button divider>
                        <ListItemText primary='Delete' className='tc' />
                      </ListItem>
                      <ListItem button>
                        <ListItemText primary='Copy Link' className='tc' />
                      </ListItem>
                      <Divider light />
                      <ListItem button onClick={handleClose}>
                        <ListItemText primary='Cancel' className='tc' />
                      </ListItem>
                    </List>
                  </Fade>
                </Modal>
              </>
            }
            title={postedUser.username}
            subheader={moment(postTime).fromNow()}
          />
          {fileType?.includes('video/') ? (
            <ReactPlayer
              url={postUrl}
              controls
              width='100%'
              style={{ minHeight: '300px' }}
              key={postUrl}
            />
          ) : (
            <img src={postUrl} className={classes.media} alt='post' />
          )}

          <CardContent>
            <Typography
              variant='body2'
              color='textSecondary'
              component='p'
              className={classes.mediaCaption}
            >
              <ShowMoreText
                lines={2}
                more='Show more'
                less='Show less'
                className='content-css'
                anchorClass='my-anchor-css-class'
                expanded={false}
                width={280}
              >
                {postCaption}
              </ShowMoreText>
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <LikeBlock
              postId={postId}
              postLikes={postLikes}
              postedUserId={postedUserId}
            />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <IconButton
                aria-label='Comment'
                onClick={() => commentInputRef?.current?.focus()}
              >
                <ChatBubbleOutlineIcon />
              </IconButton>
              <div
                style={{ color: 'rgba(0, 0, 0, 0.54)' }}
                className={classes.commentLink}
                onClick={onCommentsViewClick}
              >
                {postCommentCount} Comments
              </div>
            </div>
          </CardActions>
          <ActionInput
            inputRef={commentInputRef}
            setInput={setComment}
            input={comment}
            loading={createCommentLoading}
            onSubmit={onCommentSubmit}
            placeholder='Add Comment'
          />

          {/*  */}
          <Modal
            aria-labelledby='transition-modal-title'
            aria-describedby='transition-modal-description'
            className={classes.modal}
            open={openCommentOption}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={openCommentOption}>
              <List
                component='nav'
                className={classes.optionsModal}
                aria-label='mailbox folders'
              >
                <ListItem button>
                  <ListItemText primary='Edit' className='tc' />
                </ListItem>
                <Divider />
                <ListItem button divider>
                  <ListItemText primary='Delete' className='tc' />
                </ListItem>
                <ListItem button>
                  <ListItemText primary='Copy Link' className='tc' />
                </ListItem>
                <Divider light />
                <ListItem button onClick={handleClose}>
                  <ListItemText primary='Cancel' className='tc' />
                </ListItem>
              </List>
            </Fade>
          </Modal>

          <DialogBox
            open={commentViewOpen}
            setOpen={setCommentViewOpen}
            title='Post Comments'
            actionComponent={
              <ActionInput
                inputRef={commentInputRef}
                setInput={setComment}
                input={comment}
                loading={createCommentLoading}
                onSubmit={onCommentSubmit}
                placeholder='Add Comment'
              />
            }
          >
            <List className={classes.root}>
              {viewPostCommentsLoading ? (
                <CircularProgress />
              ) : (
                postComments.map((post) => (
                  <ListItem alignItems='center' divider key={post._id}>
                    <ListItemAvatar>
                      <Avatar
                        alt={post.user[0].username}
                        src={post.user[0].profileImg}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      secondary={
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <div>
                            <Typography
                              component='span'
                              variant='body2'
                              className={classes.inline}
                              color='textPrimary'
                            >
                              {post.user[0].username}
                            </Typography>
                            {` — ${post.comment}`}
                          </div>
                          <div>
                            <IconButton
                              color='primary'
                              onClick={() => setOpenCommentOption(true)}
                            >
                              <MoreHorizIcon />
                            </IconButton>
                          </div>
                        </div>
                      }
                    />
                  </ListItem>
                ))
              )}
            </List>
          </DialogBox>
        </>
      )}
    </Card>
  );
};

export default PostCard;
