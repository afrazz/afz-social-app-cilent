import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { Divider, IconButton, InputBase } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DialogBox from '../DialogBox';
import { onSearchUser } from '../../slices/userSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    paddingBottom: 0,
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  spacing: {
    padding: '15px 20px',
  },
}));

const ChatPickArea = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { searchedUsers } = useSelector((state) => state.user);

  const [findChatPartnerOpen, setFindPartnerOpen] = useState(false);
  const [selectedfindPartner, setSelectedFindPartner] = useState([]);

  const onSelectedFindPartner = (curUser) => {
    const duplicateFinder = selectedfindPartner.find(
      (user) => user._id === curUser._id
    );
    if (!duplicateFinder) {
      setSelectedFindPartner([...selectedfindPartner, curUser]);
      setFindPartnerOpen(false);
    }
  };

  return (
    <>
      {/* Dialog box for appearing after */}
      <DialogBox
        open={findChatPartnerOpen}
        setOpen={setFindPartnerOpen}
        title='New Message'
        actionComponent={
          <>
            <div>
              <InputBase
                className={classes.spacing}
                style={{ width: '100%' }}
                placeholder='Search...'
                inputProps={{ 'aria-label': 'naked' }}
                onChange={(e) => dispatch(onSearchUser(e.target.value))}
              />
            </div>
            <Divider />
          </>
        }
      >
        <div>
          {searchedUsers.map((curUser) => (
            <>
              <ListItem
                button
                key={curUser._id}
                onClick={() => onSelectedFindPartner(curUser)}
                className={classes.spacing}
              >
                <ListItemAvatar>
                  <Avatar src={curUser.profileImg} />
                </ListItemAvatar>
                <ListItemText
                  primary={curUser.username}
                  secondary={curUser.name}
                />
              </ListItem>
            </>
          ))}
        </div>
      </DialogBox>

      <List
        className={classes.root}
        subheader={
          <>
            <ListSubheader
              style={{
                display: 'flex',
                padding: '5px 15px 6px 15px',
                color: 'rgba(0,0,0, .7)',
                justifyContent: 'space-between',
                fontSize: 16,
              }}
            >
              Chat List
              <IconButton
                aria-label='close'
                color='primary'
                onClick={() => setFindPartnerOpen(true)}
              >
                <PersonAddIcon fontSize='inherit' />
              </IconButton>
            </ListSubheader>
            <Divider />
          </>
        }
      >
        {selectedfindPartner.length > 0 && (
          <>
            {selectedfindPartner.map((curUser) => (
              <>
                <ListItem button className={classes.spacing}>
                  <ListItemAvatar>
                    <Avatar src={curUser.profileImg} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={curUser.username}
                    secondary={curUser.name}
                  />
                </ListItem>
              </>
            ))}
          </>
        )}
      </List>
    </>
  );
};

export default ChatPickArea;
