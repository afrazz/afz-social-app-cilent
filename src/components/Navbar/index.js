/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import SearchIcon from '@material-ui/icons/Search';
import Avatar from '@material-ui/core/Avatar';
import ChatIcon from '@material-ui/icons/Chat';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SettingsIcon from '@material-ui/icons/Settings';
import HomeIcon from '@material-ui/icons/Home';
import Container from '@material-ui/core/Container';

import Autocomplete from '@material-ui/lab/Autocomplete';
// import Divider from '@material-ui/core/Divider'

import SideDrawer from '../SideDrawer';

import { onSearchUser } from '../../slices/userSlice';
import FollowBlock from '../../components/FollowBlock';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    position: 'relative',
    zIndex: 100000,
  },
  toolbar: {
    padding: 0,
  },
  title: {
    cursor: 'pointer',
  },
  profileIcon: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    background: '#ffc75f',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const PrimarySearchAppBar = ({ profileImg }) => {
  const classes = useStyles();
  const history = useHistory();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  const { searchedUsers } = useSelector((state) => state.user);

  const toggleDrawerHandler = (open) => {
    console.log(open);
    setDrawerOpen(open);
  };

  const titleClick = () => {
    history.push('/');
  };
  console.log(searchedUsers);
  return (
    <div className={classes.grow}>
      <AppBar position='fixed'>
        <Container>
          <SideDrawer
            open={drawerOpen}
            toggleDrawer={toggleDrawerHandler}
            // setUsersOpen={setUsersOpen}
          />
          <Toolbar className={classes.toolbar}>
            <Typography
              className={classes.title}
              variant='h6'
              noWrap
              onClick={titleClick}
            >
              AFZ_AD_GRAM
            </Typography>
            <div className={classes.search}>
              <Autocomplete
                id='custom-input-demo'
                options={searchedUsers}
                getOptionLabel={(option) => option.username}
                style={{ width: 250 }}
                renderInput={(params) => (
                  <div ref={params.InputProps.ref}>
                    <div className={classes.searchIcon}>
                      <SearchIcon />
                    </div>
                    <InputBase
                      placeholder='Search…'
                      classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                      }}
                      inputProps={{
                        ...params.inputProps,
                      }}
                      onChange={(e) => dispatch(onSearchUser(e.target.value))}
                    />
                  </div>
                )}
                renderOption={(option) => (
                  <>
                    <FollowBlock
                      userId={option._id}
                      username={option.username}
                      name={option.name}
                      profileImg={option.profileImg}
                      isfollowLabel={false}
                      key={option._id}
                    />
                    {/* <Divider /> */}
                  </>
                )}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                aria-label='show 17 new notifications'
                color='inherit'
              >
                <Badge badgeContent={17} color='secondary'>
                  <HomeIcon />
                </Badge>
              </IconButton>
              <IconButton
                aria-label='show 17 new notifications'
                color='inherit'
              >
                <Badge badgeContent={17} color='secondary'>
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                aria-label='show 4 new mails'
                color='inherit'
                onClick={() => history.push('/chat')}
              >
                <Badge badgeContent={4} color='secondary'>
                  <ChatIcon />
                </Badge>
              </IconButton>
              <IconButton color='inherit'>
                <PersonAddIcon />
              </IconButton>
              <IconButton color='inherit'>
                <SettingsIcon />
              </IconButton>
              <Link to='/profile'>
                <IconButton
                // edge="end"
                // aria-label="account of current user"
                // aria-controls={menuId}
                // aria-haspopup="true"
                // onClick={handleProfileMenuOpen}
                // color="inherit"
                >
                  <Avatar
                    alt='Profile image'
                    src={profileImg}
                    className={classes.profileIcon}
                  />
                </IconButton>
              </Link>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label='show more'
                onClick={() => toggleDrawerHandler(true)}
                color='inherit'
              >
                <Badge
                  color='secondary'
                  overlap='circle'
                  badgeContent=' '
                  variant='dot'
                >
                  <MenuOpenIcon />
                </Badge>
              </IconButton>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default PrimarySearchAppBar;
