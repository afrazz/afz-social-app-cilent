/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React, { useRef, useState } from 'react';
import Resizer from 'react-image-file-resizer';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
// import MuiDialogTitle from '@material-ui/core/DialogTitle';
// import MuiDialogContent from '@material-ui/core/DialogContent';
// import MuiDialogActions from '@material-ui/core/DialogActions';
// import IconButton from '@material-ui/core/IconButton';
// import CloseIcon from '@material-ui/icons/Close';
// import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import {
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../slices/userPostSlice';
import AlertMessage from '../AlertMessage';
import getDuration from '../../utils/getVideoDuration';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // minWidth: '400px',
    [theme.breakpoints.down('sm')]: {
      paddingTop: 50,
    },
  },
  postHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postUploadBtn: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

export default function CustomizedDialogs({ open, setOpen }) {
  const { createPostLoading, createPostError } = useSelector(
    (state) => state.userPost
  );

  const [previewUrl, setPreviewUrl] = useState(null);
  const [postFile, setPostFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [openAlert, setOpenAlert] = useState(createPostError);
  const [alertMessage, setAlertMessage] = useState('');
  const fileRef = useRef();
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  // Resizing post image before uploading
  const resizeFile = (file, size) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        size,
        size,
        'JPEG',
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        'base64'
      );
    });

  const onChange = async (event) => {
    let file = event.target.files[0];
    // var fileURL = URL.createObjectURL(file);
    if (file.type.includes('video/')) {
      try {
        const videoDuration = await getDuration(file);
        if (videoDuration <= 1 && file.size <= 30000000) {
          // video duration -> 1 minute && size -> 30mb
          setOpenAlert(false);
          setPreviewUrl({ type: 'video', fileUrl: URL.createObjectURL(file) });
          setPostFile(file);
        } else {
          file = '';
          event.target.value = '';
          setAlertMessage(
            'Video info mismatch: lower than 1minute and maximum 30mb'
          );
          setOpenAlert(true);
        }
      } catch (err) {
        alert('Cannot load Video File');
      }

      // const maxAllowedSize = 50000000; // 50mb
      // if (file.size > maxAllowedSize) {
      // } else {
      // }
    } else {
      try {
        const previewImage = await resizeFile(file, 300);
        setPreviewUrl({ type: 'image', fileUrl: previewImage });

        // Making base64 image to blob
        const postImage = await resizeFile(file, 600);
        const postFileObj = await fetch(postImage);
        const fileObjRes = await postFileObj.blob();
        const postFileBlob = new File([fileObjRes], file.name, {
          type: 'image/jpeg',
        });
        setPostFile(postFileBlob);
      } catch (err) {
        console.log(err);
      }
    }
  };
  const onSaveClick = async () => {
    const data = new FormData();
    data.append('postFile', postFile);
    data.append('caption', caption);
    if (postFile) {
      await dispatch(createPost(data));
      setOpenAlert(false);
      if (!createPostLoading) {
        setPreviewUrl(null);
        setPostFile(null);
        setCaption(null);
        setOpen(false);
      }
    } else {
      setOpenAlert(true);
      setAlertMessage('Please Upload a Image/Video');
    }
  };

  const onCloseDialog = () => {
    setPreviewUrl(null);
    setPostFile(null);
    setCaption(null);
    setOpen(false);
  };
  console.log(previewUrl);
  return (
    <div>
      <Dialog
        onClose={() => setOpen(false)}
        aria-labelledby='customized-dialog-title'
        open={open}
        className={classes.container}
        disableBackdropClick
        fullScreen={fullScreen}
      >
        <DialogTitle onClose={() => setOpen(false)}>
          <div className={classes.postHeader}>
            <Typography>Add Post</Typography>
            <IconButton color='primary' onClick={onCloseDialog}>
              <HighlightOffIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <AlertMessage
          open={openAlert}
          setOpen={setOpenAlert}
          message={alertMessage}
        />
        <DialogContent dividers>
          {!previewUrl ? (
            <label htmlFor='uploadFiles'>
              <Button
                color='primary'
                startIcon={<CloudUploadIcon />}
                onClick={() => fileRef.current.click()}
              >
                Upload Image or Video
              </Button>
              <input
                type='file'
                id='uploadFiles'
                ref={fileRef}
                accept='image/*, video/*'
                hidden
                onChange={onChange}
              />
            </label>
          ) : previewUrl.type === 'image' ? (
            <img src={previewUrl.fileUrl} alt='preview file' />
          ) : (
            <video width='400' controls>
              <source src={previewUrl.fileUrl} />
            </video>
          )}
          <TextField
            id='outlined-multiline-static'
            label='Caption'
            multiline
            rows={4}
            variant='standard'
            style={{ width: '100%' }}
            onChange={(e) => setCaption(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onSaveClick} color='primary'>
            {createPostLoading ? <CircularProgress /> : 'Post'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
