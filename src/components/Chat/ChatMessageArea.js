import React, { useState, useRef } from 'react';
import {
  Avatar,
  Divider,
  FormHelperText,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ActionInput from '../ActionInput';

const options = ['None', 'Atria', 'Callisto', 'Dione', 'Ganymede'];

const ITEM_HEIGHT = 48;

const ChatMessageArea = () => {
  const [message, setMessage] = useState('');
  const messageInpRef = useRef(null);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onSendMessage = () => {
    console.log('clicked');
  };
  return (
    <div style={{ background: 'white', height: '84vh', position: 'relative' }}>
      <List style={{ padding: 0 }}>
        <ListItem>
          <ListItemAvatar>
            <Avatar src='https://as01.epimg.net/en/imagenes/2019/09/24/football/1569310945_447431_noticia_normal.jpg' />
          </ListItemAvatar>
          <div style={{ marginRight: 'auto' }}>
            <ListItemText primary='Sporty_area' style={{ margin: 0 }} />
            <FormHelperText
              style={{ display: 'flex', alignItems: 'center', margin: 0 }}
            >
              <div
                style={{
                  height: 10,
                  width: 10,
                  background: '#44b700',
                  borderRadius: '50%',
                  marginRight: 5,
                }}
              ></div>
              Active now
            </FormHelperText>
          </div>
          <div>
            <IconButton
              aria-label='more'
              aria-controls='long-menu'
              aria-haspopup='true'
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id='long-menu'
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
              // style={{ marginTop: 75 }}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: '20ch',
                },
              }}
            >
              {options.map((option) => (
                <MenuItem
                  key={option}
                  selected={option === 'Pyxis'}
                  onClick={handleClose}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </ListItem>
      </List>
      <Divider />
      <div
        style={{
          overflow: 'auto',
          height: '74%',
          padding: 20,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ alignSelf: 'flex-end', marginBottom: 0 }}>
          <div
            style={{
              background: '#DCDCDC',
              padding: 20,
              borderRadius: 20,
            }}
          >
            Hi
          </div>
          <FormHelperText>12:30pm</FormHelperText>
        </div>

        <div style={{ alignSelf: 'flex-start', marginBottom: 0 }}>
          <div
            style={{
              background: '#fff',
              padding: 20,
              border: '1px solid #DCDCDC',
              borderRadius: 20,
            }}
          >
            Hi
          </div>
          <FormHelperText>12:42pm</FormHelperText>
        </div>
      </div>
      {/* <div style={{ position: 'absolute', bottom: 0, width: '100%' }}> */}
      <ActionInput
        input={message}
        setInput={setMessage}
        inputRef={messageInpRef}
        onSubmit={onSendMessage}
        loading={false}
        placeholder='Message...'
      />
      {/* </div> */}
    </div>
  );
};

export default ChatMessageArea;
