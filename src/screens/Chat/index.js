import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../components/Navbar';
import ChatEmpty from '../../components/Chat/ChatEmpty';
import ChatPickArea from '../../components/Chat/ChatPickArea';
import { Container, Grid } from '@material-ui/core';
import ChatMessageArea from '../../components/Chat/ChatMessageArea';

const Chat = () => {
  // eslint-disable-next-line no-unused-vars
  const [isChatAvailable, setChatAvailable] = useState(true);
  const { user } = useSelector((state) => state.user);
  return (
    <Container>
      <Navbar profileImg={user.profileImg} style={{ position: 'relative' }} />
      <div style={{ marginTop: 90 }}>
        {!isChatAvailable ? (
          <ChatEmpty />
        ) : (
          <div>
            <Grid container spacing={3}>
              <Grid item md={4}>
                <ChatPickArea />
              </Grid>
              <Grid item md={8}>
                <ChatMessageArea />
              </Grid>
            </Grid>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Chat;
