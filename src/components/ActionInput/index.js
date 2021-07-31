/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { TextField, IconButton } from '@material-ui/core';
import Picker from 'emoji-picker-react';
import SendIcon from '@material-ui/icons/Send';
import CustomPopper from '../CustomPopper';
// import { onAddComment } from '../../slices/userPostSlice';

const Comment = ({
  inputRef,
  onSubmit,
  setInput,
  input,
  loading,
  placeholder,
}) => {
  // const [comment, setInput] = useState('');
  const [openEmoji, setOpenEmoji] = useState(false);
  // const dispatch = useDispatch();
  // const { createCommentLoading } = useSelector((state) => state.userPost);
  // const onCommentSubmit = (e) => {
  //   e.preventDefault();
  //   const commentData = {
  //     postId,
  //     postedUserId,
  //     comment,
  //   };
  //   dispatch(onAddComment(commentData));
  // };
  return (
    <form onSubmit={onSubmit}>
      <TextField
        inputRef={inputRef}
        style={{ background: 'white' }}
        variant='outlined'
        id='standard-name'
        placeholder={placeholder}
        value={input}
        fullWidth
        onChange={(e) => setInput(e.target.value)}
        InputProps={{
          endAdornment: (
            <IconButton
              color='primary'
              disabled={input.trim() === '' || loading}
              onClick={onSubmit}
            >
              <SendIcon />
            </IconButton>
          ),
          startAdornment: (
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
                  setInput(input + emojiObject.emoji)
                }
                groupVisibility={{
                  recently_used: false,
                }}
              />
            </CustomPopper>
          ),
        }}
      />
    </form>
  );
};

export default Comment;
