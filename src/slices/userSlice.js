/* eslint-disable no-multi-assign */
/* eslint-disable no-underscore-dangle */
import { createSlice } from '@reduxjs/toolkit';
import io from 'socket.io-client';
import {
  getCurrentUserProfileApi,
  uploadprofileImg,
  currentprofileUpdate,
  getAllUser,
  searchUser,
} from '../api/user/user';
import { userAddFollow, userRemoveFollow } from '../api/user/userFollow';

const initialState = {
  socket: null,
  user: {},
  searchedUsers: [],
  initialFindFollowers: [], // the loaded initial users when page loads
  allFindFollowers: [], // when opening the dialog by clicking more peoples btn then store users by scrolling down
  // get all users Page loading
  getUsersPageCount: 1,
  searchUserPageCount: 1,
  loading: false,
  error: false,
  loadingFollow: false,
  errorFollow: false,
  getUsersPageCountLoading: false, // means find users error needs to be change later
  getUsersPageCountError: false,
  searchUserLoading: false,
  searchUserError: false,
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setInitialFindFollowers: (state, action) => {
      state.initialFindFollowers = action.payload;
      state.allFindFollowers = action.payload;
    },
    modifyFindFollowers: (state, action) => {
      state.allFindFollowers.push(...action.payload);
    },
    setProfileImg: (state, action) => {
      state.user.profileImg = action.payload;
    },
    setFollowing: (state, action) => {
      state.user.following = action.payload;
    },
    setUsersPageCount: (state, action) => {
      state.getUsersPageCount = Number(action.payload);
    },
    setSearchedUser: (state, action) => {
      state.searchedUsers = action.payload;
    },
    setSearchedUserPageCount: (state, action) => {
      state.searchUserPageCount = action.payload;
    },
    // Loadings and error
    setLoadingFollow: (state, action) => {
      state.loadingFollow = action.payload;
    },
    // Following error
    setLoadingError: (state, action) => {
      state.loadingError = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setUsersPageCountLoading: (state, action) => {
      state.getUsersPageCountLoading = action.payload;
    },
    setUsersPageCountError: (state, action) => {
      state.getUsersPageCountError = action.payload;
    },
    setSearchUserLoading: (state, action) => {
      state.searchUserLoading = action.payload;
    },
    setSearchedUserError: (state, action) => {
      state.searchUserError = action.payload;
    },
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
  },
});

export const {
  setUser,
  setInitialFindFollowers,
  modifyFindFollowers,
  setFollowing,
  setProfileImg,
  setUsersPageCount,
  setSearchedUser,
  setLoading,
  setError,
  setLoadingFollow,
  setLoadingError,
  setUsersPageCountLoading,
  setUsersPageCountError,
  setSearchUserLoading,
  setSearchedUserError,
  setSocket,
} = userSlice.actions;

export const getCurrentUserProfile = (history, location) => async (
  dispatch
) => {
  dispatch(setLoading(true));
  dispatch(setError(false));
  try {
    const { data } = await getCurrentUserProfileApi();
    dispatch(setLoading(false));
    dispatch(setError(false));
    dispatch(setUser(data));
    if (location?.pathname === '/signin' || location?.pathname === '/signup') {
      history?.replace('/');
    }
    // Starting up socket connection
    const socket = io(`${process.env.REACT_APP_API_ENDPOINT}socket`, {
      transport: ['websocket'],
    });
    dispatch(setSocket(socket));
    // history?.replace(`/`);
  } catch (err) {
    dispatch(setLoading(false));
    dispatch(
      setError(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    );
    console.log(err);
    history?.replace(`/signin`);
  }
};

export const onUploadprofileImg = (profileImgData) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(setError(false));
  try {
    const { data } = await uploadprofileImg(profileImgData);
    dispatch(setLoading(false));
    dispatch(setError(false));
    dispatch(setProfileImg(data.profileImg));
  } catch (err) {
    dispatch(setLoading(false));
    dispatch(
      setError(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    );
  }
};

export const onCurrentProfileUpdate = (updatedData, history) => async (
  dispatch
) => {
  dispatch(setLoading(true));
  dispatch(setError(false));
  try {
    const { data } = await currentprofileUpdate(updatedData);
    dispatch(setLoading(false));
    dispatch(setError(false));
    dispatch(setUser(data));
    history.push('/profile');
  } catch (err) {
    dispatch(setLoading(false));
    dispatch(
      setError(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    );
  }
};

// Find followers it is in the right side of home screen (In here we have two state one for initial find followers default shows in home screen, second for clicking show more butoon in the find followers to modify new state by scrolling down)
export const findFollowers = (page = 1, { isInitialLoad }) => async (
  dispatch
) => {
  // Decision maker for loading and error for both two state
  const loadingDecision = (loading, error) => {
    if (isInitialLoad) {
      dispatch(setLoading(loading));
      dispatch(setError(error));
    } else {
      dispatch(setUsersPageCountLoading(loading));
      dispatch(setUsersPageCountError(error));
    }
  };
  loadingDecision(true, false);
  try {
    const { data } = await getAllUser(page);
    loadingDecision(false, false);
    // If the user initial visiting the page
    if (isInitialLoad) {
      dispatch(setInitialFindFollowers(data.users));
      dispatch(setUsersPageCount(1));
    } else {
      // When the scrolling by clicking show more followers
      dispatch(modifyFindFollowers(data.users));
      dispatch(setUsersPageCount(data.page));
    }
  } catch (err) {
    loadingDecision(
      false,
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    );
  }
};

// Following user Add
export const onFollowingAdd = (followingData) => async (dispatch) => {
  dispatch(setLoadingFollow(true));
  dispatch(setLoadingError(false));
  try {
    const { data } = await userAddFollow(followingData);
    dispatch(setLoadingFollow(false));
    dispatch(setLoadingError(false));
    dispatch(setFollowing(data.following));
  } catch (err) {
    dispatch(setLoading(false));
    dispatch(
      setLoadingError(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    );
  }
};

// Following user Remove
export const onFollowRemove = (followId) => async (dispatch) => {
  dispatch(setLoadingFollow(true));
  dispatch(setLoadingError(false));
  try {
    const { data } = await userRemoveFollow(followId);
    dispatch(setLoadingFollow(false));
    dispatch(setLoadingError(false));
    dispatch(setFollowing(data.following));
  } catch (err) {
    dispatch(setLoading(false));
    dispatch(
      setLoadingError(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    );
  }
};

// eslint-disable-next-line no-unused-vars
export const onSearchUser = (searchTerm, page) => async (dispatch) => {
  dispatch(setSearchUserLoading(true));
  dispatch(setSearchedUserError(false));
  try {
    dispatch(setSearchUserLoading(false));
    dispatch(setSearchedUserError(false));
    if (searchTerm.trim() !== '') {
      const { data } = await searchUser(searchTerm);
      dispatch(setSearchedUser(data.users));
    } else {
      dispatch(setSearchedUser([])); // clearing autocomplete data
    }
  } catch (err) {
    dispatch(setSearchUserLoading(false));
    dispatch(
      setSearchedUserError(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      )
    );
  }
};

export default userSlice.reducer;
