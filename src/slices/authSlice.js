import {createSlice} from '@reduxjs/toolkit';
import {getCurrentUserProfile} from './userSlice';
import loginApi from '../api/auth/login';
import registerApi from '../api/auth/register';

const initialState = {
  loading: false,
  error: false,
  userId: null,
};

const authUserSlice = createSlice({
  name: 'userLogin',
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    // setLogout: state => {
    //   state.userInfo = null;
    //   localStorage.removeItem('jwtToken');
    //   state.loading = false;
    //   state.error = false;
    // },
    // setUserProfile: (state, action) => {
    //   state.user = action.payload;
    // },
  },
});

export const {
  setUserId,
  setLoading,
  setError,
  // setLogout,
  // setUserProfile,
} = authUserSlice.actions;

export const loginUser = (loginInfo, history) => async dispatch => {
  dispatch(setLoading(true));
  dispatch(setError(false));
  try {
    const {data} = await loginApi(loginInfo);
    dispatch(setLoading(false));
    dispatch(setError(false));
    dispatch(setUserId(data.id));
    localStorage.setItem('jwtToken', data.token);
    dispatch(getCurrentUserProfile());
    history.replace('/');
  } catch (err) {
    dispatch(setLoading(false));
    dispatch(
      setError(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
      ),
    );
  }
};

export const registerUser = (registerInfo, history) => async dispatch => {
  dispatch(setLoading(true));
  dispatch(setError(false));
  try {
    const {data} = await registerApi(registerInfo);
    dispatch(setLoading(false));
    dispatch(setError(false));
    dispatch(setUserId(data.id));
    localStorage.setItem('jwtToken', data.token);
    dispatch(getCurrentUserProfile());
    history.replace(`/`);
  } catch (err) {
    dispatch(setLoading(false));
    dispatch(
      setError(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
      ),
    );
  }
};

// export const getUserDetails = id => async (dispatch, getState) => {
//   const {
//     userLogin: {userInfo},
//   } = getState();

//   const config = {
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${userInfo.token}`,
//     },
//   };

//   dispatch(setLoading(true));
//   dispatch(setError(false));
//   try {
//     const {data} = await axios.get(`/api/users/${id}`, config);
//     dispatch(setUserInfo(data));
//   } catch (err) {
//     dispatch(setLoading(false));
//     dispatch(
//       setError(
//         err.response && err.response.data.message
//           ? err.response.data.message
//           : err.message,
//       ),
//     );
//   }
// };

export default authUserSlice.reducer;
