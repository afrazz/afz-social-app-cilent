/* eslint-disable react/display-name */
/* eslint-disable no-multi-assign */
/* eslint-disable no-underscore-dangle */
import { createSlice } from '@reduxjs/toolkit';
import {
  uploadWriteContentStory,
  getStoriedUsers,
  getUserStoryApi,
} from '../api/story/story';

const initialState = {
  textContentStories: [],
  mediaContentStories: [],
  storiedUsers: [],
  userStory: [],
  storiedUsersLoading: false,
  storiedUsersError: false,
  uploadStoryLoading: false,
  uploadContentError: false,
  uploadStoryError: false,
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setTextContentStories: (state, action) => {
      state.textContentStories = action.payload;
    },
    setMediaContentStories: (state, action) => {
      state.mediaContentStories = action.payload;
    },
    setStoriedUsers: (state, action) => {
      state.storiedUsers = action.payload;
    },
    setUserStory: (state, action) => {
      state.userStory = action.payload;
      // {
      //   content: () => (
      //     <div style={{ background: 'pink', padding: 20 }}>
      //       <h1 style={{ marginTop: '100%', marginBottom: 0 }}>🌝</h1>
      //       <h1 style={{ marginTop: 5 }}>A custom title can go here.</h1>
      //     </div>
      //   ),
      // },
    },
    setStoriedUserLoading: (state, action) => {
      state.storiedUsersLoading = action.payload;
    },
    setStoriedUserError: (state, action) => {
      state.storiedUsersError = action.payload;
    },
    setUploadStoryLoading: (state, action) => {
      state.uploadStoryLoading = action.payload;
    },
    setUploadStoryError: (state, action) => {
      state.uploadStoryError = action.payload;
    },
  },
});

export const {
  setTextContentStories,
  setStoriedUsers,
  setMediaContentStories,
  setUserStory,
  setUploadStoryLoading,
  setStoriedUserLoading,
  setUploadStoryError,
  setStoriedUserError,
} = userSlice.actions;

export const onUploadWriteContentStory = (storyData) => async (dispatch) => {
  dispatch(setUploadStoryLoading(true));
  dispatch(setUploadStoryError(false));
  try {
    const { data } = await uploadWriteContentStory(storyData);
    dispatch(setUploadStoryLoading(false));
    dispatch(setUploadStoryError(false));
    console.log(data);
  } catch (err) {
    dispatch(setUploadStoryLoading(false));
    dispatch(
      setUploadStoryError(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    );
  }
};

export const viewStoriedUser = () => async (dispatch) => {
  dispatch(setStoriedUserLoading(true));
  dispatch(setStoriedUserError(false));
  try {
    const { data } = await getStoriedUsers();
    console.log(data);
    dispatch(setStoriedUsers(data));
    dispatch(setStoriedUserLoading(false));
    dispatch(setStoriedUserError(false));
  } catch (err) {
    dispatch(setStoriedUserLoading(false));
    dispatch(
      setStoriedUserError(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    );
  }
};

export const viewUserStory = (userId) => async (dispatch) => {
  try {
    const { data } = await getUserStoryApi(userId);
    console.log('Story data', data);
    dispatch(setUserStory(data));
  } catch (err) {
    console.log(err);
  }
};

export default userSlice.reducer;
