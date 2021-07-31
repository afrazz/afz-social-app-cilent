/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import PaletteIcon from '@material-ui/icons/Palette';
import FormatColorTextIcon from '@material-ui/icons/FormatColorText';
import Picker from 'emoji-picker-react';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CreateIcon from '@material-ui/icons/Create';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import WriteStory from './WriteStory';
import CustomPopper from '../../CustomPopper';
import { onUploadWriteContentStory } from '../../../slices/userStorySlice';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    // width: '900px',
    // [theme.breakpoints.up('sm')]: {
    //   minWidth: '100%',
    // },
  },
  postHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainBtn: {
    padding: 25,
  },
  dialogContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  },
  inputField: {
    width: 60,
    marginRight: 25,
  },
  colorInput: {},
}));

const StoryUpload = ({ open, setOpen }) => {
  const [isWriteStory, setIsWriteStory] = useState(false);
  const [isMediaStory, setIsMediaStory] = useState(false);

  const [bodyText, setBodyText] = useState('');
  const [bgColorStory, setBgColorStory] = useState('#fff');
  const [textColor, setTextColor] = useState('#000');
  const [fontsize, setFontsize] = useState(20);
  const [openEmoji, setOpenEmoji] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState('');

  const [isUploadActionComplete, setIsUploadActionComplete] = useState(false);

  const classes = useStyles();
  const dispatch = useDispatch();

  const bgColorRef = useRef(null);
  const textColorRef = useRef(null);

  const { uploadStoryLoading, uploadStoryError } = useSelector(
    (state) => state.userStory
  );

  // Checking if any error when uploading story if it's not closing story dialog and reseting field state
  useEffect(() => {
    if (!uploadStoryError) {
      setBodyText('');
      setTextColor('#000');
      setBgColorStory('#fff');
      setFontsize(20);
      setOpen(false);
    } else {
      setOpen(true);
    }
    setIsUploadActionComplete(false);
  }, [isUploadActionComplete]);

  const onClose = () => {
    setIsWriteStory(false);
    setIsMediaStory(false);
    setOpen(false);
  };

  const onPostStory = async (onClose) => {
    if (bodyText.length > 0) {
      const storyData = {
        contentBody: bodyText,
        contentFontSize: fontsize,
        contentBackground: bgColorStory,
        contentTextColor: textColor,
      };
      await dispatch(onUploadWriteContentStory(storyData));
      // Needs correction
      setIsUploadActionComplete(true);
      onClose();
    }
  };
  return (
    <div className={classes.container} style={{ padding: 0 }}>
      <Dialog
        onClose={onClose}
        aria-labelledby='customized-dialog-title'
        open={open}
        disableBackdropClick
        fullScreen={isWriteStory}
        style={{ paddingTop: 65 }}
        actionComponent={
          <div style={{ background: 'black', padding: 40 }}>dnkcfledj</div>
        }
      >
        <DialogTitle>
          <div className={classes.postHeader}>
            <Typography>Add Story</Typography>
            {(isWriteStory || isMediaStory) && (
              <div style={{ display: 'flex' }}>
                <div className={classes.inputField}>
                  <CustomPopper
                    clickContent={
                      <IconButton color='primary'>
                        <InsertEmoticonIcon />
                      </IconButton>
                    }
                    open={openEmoji}
                    setOpen={setOpenEmoji}
                  >
                    <Picker
                      onEmojiClick={(e, emojiObject) =>
                        setSelectedEmoji(emojiObject.emoji)
                      }
                      groupVisibility={{
                        recently_used: false,
                      }}
                    />
                  </CustomPopper>
                </div>

                <TextField
                  type='number'
                  className={classes.inputField}
                  onInput={(e) => {
                    if (e.target.value <= 30 && e.target.value >= 14) {
                      console.log(e.target.value);
                      setFontsize(Number(e.target.value));
                    } else if (e.target.value <= 14) {
                      setFontsize(30);
                      e.target.value = 30;
                    } else {
                      setFontsize(14);
                      e.target.value = 14;
                    }
                  }}
                  value={fontsize}
                  helperText='Text Size'
                />
                <div style={{ position: 'relative' }}>
                  <IconButton
                    color='primary'
                    className={classes.inputField}
                    onClick={() => bgColorRef.current.click()}
                  >
                    <PaletteIcon />
                  </IconButton>
                  <input
                    type='color'
                    id='bg-color'
                    ref={bgColorRef}
                    className={classes.inputField}
                    onChange={(e) => {
                      setBgColorStory(e.target.value);
                    }}
                    style={{
                      position: 'absolute',
                      left: 0,
                      visibility: 'hidden',
                    }}
                    value={bgColorStory}
                  />
                </div>

                <div style={{ position: 'relative' }}>
                  <IconButton
                    color='primary'
                    className={classes.inputField}
                    onClick={() => textColorRef.current.click()}
                  >
                    <FormatColorTextIcon />
                  </IconButton>
                  <input
                    type='color'
                    id='bg-color'
                    ref={textColorRef}
                    className={classes.inputField}
                    onChange={(e) => {
                      setTextColor(e.target.value);
                    }}
                    style={{
                      position: 'absolute',
                      left: 0,
                      visibility: 'hidden',
                    }}
                    value={textColor}
                  />
                </div>

                {/* <TextField
                  type='color'
                  className={classes.inputField}
                  onInput={(e) => {
                    setTextColor(e.target.value);
                  }}
                  // onInput={(e) => {
                  //   if (e.target.value <= 30 && e.target.value >= 14) {
                  //     console.log(e.target.value);
                  //     setFontsize(Number(e.target.value));
                  //   } else {
                  //     setFontsize(14);
                  //     e.target.value = 14;
                  //   }
                  // }}
                  // value={fontsize}
                  value={textColor}
                  helperText='Text Color'
                /> */}
              </div>
            )}
            <IconButton color='primary' onClick={onClose}>
              <HighlightOffIcon />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent dividers className={classes.dialogContent}>
          {!isWriteStory && !isMediaStory ? (
            <>
              <Button
                className={classes.mainBtn}
                color='primary'
                startIcon={<CreateIcon />}
                onClick={() => setIsWriteStory(true)}
              >
                Write Story
              </Button>
              <Typography style={{ marginLeft: 10, marginRight: 10 }}>
                Or
              </Typography>
              <Button
                className={classes.mainBtn}
                color='primary'
                startIcon={<DynamicFeedIcon />}
                // onClick={() => fileRef.current.click()}
              >
                Media Story
              </Button>
            </>
          ) : (
            <>
              <WriteStory
                bgColor={bgColorStory}
                fontsize={fontsize}
                textColor={textColor}
                selectedEmoji={selectedEmoji}
                setSelectedEmoji={setSelectedEmoji}
                setBodyText={setBodyText}
                bodyText={bodyText}
              />
            </>
          )}
        </DialogContent>
        {(isWriteStory || isMediaStory) && (
          <DialogActions>
            <Button color='primary' onClick={() => onPostStory(onClose)}>
              {uploadStoryLoading ? (
                <CircularProgress size={20} />
              ) : (
                'Post Story'
              )}
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
};

export default StoryUpload;
