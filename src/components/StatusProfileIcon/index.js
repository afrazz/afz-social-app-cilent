/* eslint-disable react/prop-types */
import React from 'react';
import { styled } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

// Styles
const StatusContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginRight: '15px',
});

const ProfileIcon = styled('img')({
  borderRadius: '50%',
  width: '60px',
  height: '60px',
  // marginRight: '15px',
  border: '5px double #ffc75f',
  cursor: 'pointer',
});

const UsernameText = styled(Typography)({
  textAlign: 'center',
  width: '60px',
  fontSize: 13,
  marginTop: 5,
  color: 'rgba(0, 0, 0, 0.70)',
});

// Class component
const StatusProfileIcon = ({ profileImg, username, userId, onStoryClick }) => {
  return (
    <StatusContainer onClick={() => onStoryClick(userId)}>
      <ProfileIcon src={profileImg} alt={profileImg} />
      <UsernameText
        // className={classes.title}
        // variant="h6"
        noWrap
        // onClick={titleClick}
      >
        {username}
      </UsernameText>
      {/* <div>{username}</div> */}
    </StatusContainer>
  );
};

export default StatusProfileIcon;
