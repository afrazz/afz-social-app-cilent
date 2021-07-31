/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserProfile } from './slices/userSlice';
import SignIn from './screens/Auth/Signin';
import SignUp from './screens/Auth/SignUp';
import Home from './screens/Home';
import Profile from './screens/Profile';
import EditProfile from './screens/EditProfile';
import UserFollowing from './screens/UserFollowing';
import UserFollowers from './screens/UserFollowers';
import Chat from './screens/Chat';

const App = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { socket } = useSelector((state) => state.user);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      dispatch(getCurrentUserProfile(history, location));
    } else {
      history.replace('/signin');
    }
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('userState', (state) => console.log('state', state));
    }
  }, [socket]);

  return (
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/signup' component={SignUp} />
      <Route path='/signin' component={SignIn} />
      <Route path='/chat' component={Chat} />
      <Route path='/profile' exact component={Profile} />
      <Route path='/profile/edit' component={EditProfile} />
      <Route path='/profile/following' component={UserFollowing} />
      <Route path='/profile/followers' component={UserFollowers} />
    </Switch>
  );
};

export default App;
