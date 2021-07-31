import { CircularProgress } from '@material-ui/core';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { usersPosts } from '../../slices/userPostSlice';
import PostCard from '../PostCard';

const PostViewer = () => {
  const dispatch = useDispatch();

  const {
    usersPost,
    postLoading,
    usersPostPage,
    // createPostLoading,
    // createPostError,
  } = useSelector((state) => state.userPost);

  console.log('done', usersPostPage);

  return (
    <InfiniteScroll
      dataLength={usersPosts.length}
      next={() => dispatch(usersPosts(usersPostPage + 1))}
      hasMore
      loader={
        postLoading && (
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
    >
      {usersPost.length !== 0 &&
        usersPost.map((post) => (
          <PostCard
            key={post._id}
            postUrl={post.url}
            fileType={post.fileType}
            postCaption={post.caption}
            postedUser={post.user[0]}
            postTime={post.createdAt}
            postLikes={post.likes}
            postCommentCount={post.commentsCount}
            postId={post._id}
            postedUserId={post.user[0]._id}
          />
        ))}
    </InfiniteScroll>
  );
};

export default PostViewer;
