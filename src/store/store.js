import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import AuthSlice from '../slices/authSlice';
import UserSlice from '../slices/userSlice';
import UserPostSlice from '../slices/userPostSlice';
import UserStorySlice from '../slices/userStorySlice';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

export default configureStore({
  composedEnhancer,
  reducer: {
    auth: AuthSlice,
    user: UserSlice,
    userPost: UserPostSlice,
    userStory: UserStorySlice,
  },
});
