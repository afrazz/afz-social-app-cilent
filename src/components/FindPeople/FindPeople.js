/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Divider } from '@material-ui/core';
import { findFollowers } from '../../slices/userSlice';
import InfiniteScroll from 'react-infinite-scroll-component';
import DialogBox from '../DialogBox';
import FollowBlock from '../FollowBlock';

const FindPeople = ({ open, setOpen }) => {
  const dispatch = useDispatch();

  const {
    getUsersPageCount,
    allFindFollowers,
    getUsersPageCountLoading,
  } = useSelector((state) => state.user);
  return (
    <div>
      <DialogBox
        style={{ height: '300px', overflow: 'auto' }}
        open={open}
        setOpen={setOpen}
        title='Follow People'
        id='scrollableDiv'
      >
        <InfiniteScroll
          dataLength={allFindFollowers.length}
          next={() =>
            dispatch(
              findFollowers(getUsersPageCount + 1, { isInitialLoad: false })
            )
          }
          hasMore
          loader={
            getUsersPageCountLoading && (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress size={30} />
              </div>
            )
          }
          style={{ overflow: 'hidden' }}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          scrollableTarget='scrollableDiv'
        >
          {allFindFollowers.length !== 0 &&
            allFindFollowers.map((curUser) => (
              <>
                <div style={{ paddingLeft: 20, paddingRight: 20 }}>
                  <FollowBlock
                    userId={curUser._id}
                    username={curUser.username}
                    name={curUser.name}
                    profileImg={curUser.profileImg}
                    key={curUser._id}
                  />
                </div>

                <Divider />
              </>
            ))}
        </InfiniteScroll>
      </DialogBox>
    </div>
  );
};

export default FindPeople;
