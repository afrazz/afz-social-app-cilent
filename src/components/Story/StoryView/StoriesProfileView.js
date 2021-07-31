/* eslint-disable react/prop-types */
import React from 'react';
import HorizontalScroll from '../../HorizontalScroll';
import StatusProfileIcon from '../../StatusProfileIcon';
import { useSelector } from 'react-redux';

const StoriesProfileView = ({ onStoryClick }) => {
  const { storiedUsers } = useSelector((state) => state.userStory);
  return (
    <HorizontalScroll leftScroll={-100} rightScroll={100} containerWidth='100%'>
      {storiedUsers.map((cur) => (
        <StatusProfileIcon
          key={cur._id}
          userId={cur._id}
          profileImg={cur.profileImg}
          username={cur.username}
          onStoryClick={onStoryClick}
        />
      ))}
    </HorizontalScroll>
  );
};

export default StoriesProfileView;
