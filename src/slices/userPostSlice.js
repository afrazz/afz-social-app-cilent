/* eslint-disable no-underscore-dangle */
import { createSlice } from '@reduxjs/toolkit';
import {
  uploadPost,
  getUsersPosts,
  likePost,
  unLikePost,
  viewPostLikes,
  addComment,
  viewPostComments,
} from '../api/post/post';

const initialState = {
  currentUserPosts: [],
  usersPost: [],
  postLikes: [], // Here will store every viewPostLikes api's response
  currentRecievedUserPost: null, // Currently userPosts returning post page by page
  usersPostPage: 1,
  postComments: [],
  // Loading and errors state
  viewPostLikeLoading: false,
  viewPostLikeError: false,
  postLoading: false,
  postError: false,
  createPostLoading: false,
  createPostError: false,
  likeLoading: false,
  likeError: false,
  createCommentLoading: false,
  createCommentError: false,
  viewPostCommentsLoading: false,
  viewPostCommentsError: false,
};

const userPostSlice = createSlice({
  name: 'userPost',
  initialState,
  reducers: {
    setCurrentUserPost: (state, action) => {
      state.currentUserPosts = action.payload;
    },
    setUsersPost: (state, action) => {
      state.currentRecievedUserPost = action.payload;
      if (action.payload?.length > 0) {
        action.payload.forEach((post) => state.usersPost.push(post));

        // Removing duplicated post if exists
        const removeDuplicatedPost = Object.values(
          state.usersPost.reduce(
            (acc, cur) => Object.assign(acc, { [cur._id]: cur }),
            {}
          )
        );
        state.usersPost = removeDuplicatedPost;
      }
    },
    modifyingPosts: (state, action) => {
      state.currentUserPosts.unshift(action.payload);
      state.usersPost.unshift(action.payload);
    },
    setUsersPostPage: (state, action) => {
      state.usersPostPage = Number(action.payload);
    },
    modifyPostLike: (state, action) => {
      const { _id, likes } = action.payload;
      state.usersPost = state.usersPost.map((post) =>
        post._id === _id ? { ...post, likes } : post
      );
    },
    setPostLikes: (state, action) => {
      state.postLikes = action.payload;
    },
    setPostComments: (state, action) => {
      state.postComments = action.payload;
    },
    modifyPostComment: (state, action) => {
      state.postComments.unshift(action.payload);
    },
    // Updating User Post commentCount when we Add a new comment
    modifyPostCommentCount: (state, action) => {
      const { postId, comment } = action.payload;
      if (comment) {
        state.usersPost = state.usersPost.map((post) =>
          post._id === postId
            ? { ...post, commentsCount: post.commentsCount + 1 }
            : post
        );
      }
    },
    // Loading and error stuffs
    setPostLikeLoading: (state, action) => {
      state.likeLoading = action.payload;
    },
    setPostLikeError: (state, action) => {
      state.likeError = action.payload;
    },
    setViewingPostLikeLoading: (state, action) => {
      state.getPostLoading = action.payload;
    },
    setViewingPostLikeError: (state, action) => {
      state.getPostError = action.payload;
    },
    setPostLoading: (state, action) => {
      state.postLoading = action.payload;
    },
    setPostError: (state, action) => {
      state.postError = action.payload;
    },
    setCreatePostLoading: (state, action) => {
      state.createPostLoading = action.payload;
    },
    setCreatePostError: (state, action) => {
      state.createPostError = action.payload;
    },
    setCreateCommentLoading: (state, action) => {
      state.createCommentLoading = action.payload;
    },
    setCreateCommentError: (state, action) => {
      state.createCommentError = action.payload;
    },
    setViewingPostCommentError: (state, action) => {
      state.viewPostCommentsError = action.payload;
    },
    setViewingPostCommentLoading: (state, action) => {
      state.viewPostCommentsLoading = action.payload;
    },
  },
});

export const {
  setViewingPostLikeLoading,
  setViewingPostLikeError,
  setPostLoading,
  setPostError,
  setCreatePostLoading,
  setCreatePostError,
  setCurrentUserPost,
  setPostLikes,
  setUsersPost,
  setPostComments,
  modifyingPosts,
  modifyPostLike,
  modifyPostComment,
  modifyPostCommentCount,
  setUsersPostPage,
  setPostLikeLoading,
  setPostLikeError,
  setCreateCommentLoading,
  setCreateCommentError,
  setViewingPostCommentLoading,
  setViewingPostCommentError,
} = userPostSlice.actions;

export const createPost = (postData) => async (dispatch) => {
  dispatch(setCreatePostLoading(true));
  dispatch(setCreatePostError(false));
  try {
    const { data } = await uploadPost(postData);
    dispatch(setCreatePostLoading(false));
    dispatch(setCreatePostError(false));
    // Putting user data inside of  data.post[0].user
    data.post[0].user = [data.user];
    dispatch(modifyingPosts(data.post[0]));
  } catch (err) {
    dispatch(setCreatePostLoading(false));
    dispatch(
      setCreatePostError(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    );
  }
};

export const usersPosts = (requestedPage) => async (dispatch) => {
  dispatch(setPostLoading(true));
  dispatch(setPostError(false));
  try {
    console.log(requestedPage);
    const { data } = await getUsersPosts(requestedPage);
    dispatch(setPostLoading(false));
    dispatch(setPostError(false));
    dispatch(setUsersPost(data[0]?.post));
    dispatch(setUsersPostPage(data[0]?._id));
    console.log(data[0]);
  } catch (err) {
    dispatch(setPostLoading(false));
    dispatch(
      setPostError(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    );
  }
};

export const addLikePost = (likeData) => async (dispatch) => {
  dispatch(setPostLikeLoading(true));
  dispatch(setPostLikeError(false));
  try {
    const { data } = await likePost(likeData);
    dispatch(setPostLikeLoading(false));
    dispatch(setPostLikeError(false));
    dispatch(modifyPostLike(data.post[0]));
  } catch (err) {
    dispatch(setPostLikeLoading(false));
    dispatch(
      setPostLikeError(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    );
  }
};

export const removeLikePost = (unLikeData) => async (dispatch) => {
  dispatch(setPostLikeLoading(true));
  dispatch(setPostLikeError(false));
  try {
    const { data } = await unLikePost(unLikeData);
    dispatch(setPostLikeLoading(false));
    dispatch(setPostLikeError(false));
    dispatch(modifyPostLike(data.post[0]));
  } catch (err) {
    dispatch(setPostLikeLoading(false));
    dispatch(
      setPostLikeError(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    );
  }
};

// Add comment
export const onAddComment = (commentData) => async (dispatch, getState) => {
  dispatch(setCreateCommentLoading(true));
  dispatch(setCreateCommentError(false));
  try {
    const { data } = await addComment(commentData);
    dispatch(setCreateCommentLoading(false));
    dispatch(setCreateCommentError(false));
    const { _id, profileImg, username, name } = getState().user.user;
    // Formating recieved data to store postComment state
    const newCommentData = {
      _id: data._id,
      user: [{ _id, profileImg, username, name }],
      comment: data.comment,
    };
    dispatch(modifyPostComment(newCommentData));
    dispatch(modifyPostCommentCount(data));
  } catch (err) {
    dispatch(setCreateCommentLoading(false));
    dispatch(
      setCreateCommentError(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    );
  }
};

// Viewing Post Likes
export const onViewPostLikes = (id) => async (dispatch) => {
  dispatch(setViewingPostLikeLoading(true));
  dispatch(setViewingPostLikeError(false));

  try {
    const { data } = await viewPostLikes(id);
    dispatch(setViewingPostLikeLoading(false));
    dispatch(setViewingPostLikeError(false));
    dispatch(setPostLikes(data[0].likes));
  } catch (err) {
    dispatch(setViewingPostLikeLoading(false));
    dispatch(
      setViewingPostLikeError(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    );
  }
};

// Viewing Post Comments
export const onViewPostComments = (id) => async (dispatch) => {
  dispatch(setViewingPostCommentLoading(true));
  dispatch(setViewingPostCommentError(false));
  try {
    const { data } = await viewPostComments(id);
    dispatch(setViewingPostCommentLoading(false));
    dispatch(setViewingPostCommentError(false));
    dispatch(setPostComments(data[0].comments));
  } catch (err) {
    dispatch(setViewingPostCommentLoading(false));
    dispatch(
      setViewingPostCommentError(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    );
  }
};

export default userPostSlice.reducer;
