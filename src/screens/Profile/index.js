/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import {useSelector} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import {
  Button,
  Container,
  Divider,
  // Modal,
  // Fade,
  // Backdrop,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Navbar from '../../components/Navbar';
// import PostGallery from '../../components/PostGallery';
import ProfileImgCrop from '../../components/ProfileImgCrop';

const useStyles = makeStyles(theme => ({
  profileIcon: {
    width: 120,
    height: 120,
    [theme.breakpoints.down('sm')]: {
      width: 60,
      height: 60,
    },
  },
  profileCont: {
    marginTop: 90,
  },
  mainBodyProfileImg: {
    margin: '0 100px',
    [theme.breakpoints.down('sm')]: {
      margin: 0,
    },
  },
  profileSide: {
    display: 'flex',
    justifyContent: 'center',
    // [theme.breakpoints.down('xs')]: {
    //   justifyContent: 'flex-start',
    // },
  },
  mainBodyCont: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  userName: {
    fontSize: 28,
    fontWeight: 300,
  },
  userDetails: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },

  editBtn: {
    marginRight: 30,
    marginLeft: 30,
    [theme.breakpoints.down('sm')]: {
      marginRight: 0,
      marginLeft: 0,
      marginTop: -15,
      marginBottom: 15,
    },
  },
  userFollowPost: {
    display: 'flex',
    marginTop: -20,
    marginBottom: -15,

    '& p': {
      marginRight: 30,
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: 0,
      // marginBottom: 15,
      justifyContent: 'center',
    },
  },
  userBio: {
    '& p': {
      marginBottom: -10,
      [theme.breakpoints.down('sm')]: {
        textAlign: 'center',
      },
    },
    // '& p:first-child': {
    //   content: '',
    //   textAlign: 'center',
    // },
  },
}));

const Profile = () => {
  // const [openModal, setOpenModal] = useState(false);

  const classes = useStyles();
  const {user} = useSelector(state => state.user);
  const history = useHistory();
  // const handleOpen = () => {
  //   setOpenModal(true);
  // };

  // const handleClose = () => {
  //   setOpenModal(false);
  // };

  const onProfileEditPress = () => {
    history.push('/profile/edit');
  };

  return (
    <div>
      <Navbar profileImg={user.profileImg} />
      <Container className={classes.profileCont}>
        <div className={classes.mainBodyCont}>
          <div className={classes.mainBodyProfileImg}>
            {/* <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={openModal}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={openModal}>
                <CropMedia />
              </Fade>
            </Modal> */}
            <ProfileImgCrop userProfileImg={user.profileImg} />
          </div>
          <div>
            <div className={classes.userDetails}>
              <h2 className={classes.userName}>{user.username}</h2>
              <Button
                variant="outlined"
                color="primary"
                className={classes.editBtn}
                onClick={onProfileEditPress}
              >
                Edit Profile
              </Button>
              <Button variant="outlined" color="primary">
                Settings
              </Button>
              <Button
                variant="outlined"
                color="primary"
                style={{marginTop: 15}}
                onClick={() => {
                  localStorage.removeItem('jwtToken');
                  history.replace('/signin');
                }}
              >
                LogOut
              </Button>
            </div>
            <div className={classes.userFollowPost}>
              <p>
                <b>6</b> Post
              </p>
              <Link to="/profile/followers">
                <p>
                  <b>{user.followers?.length}</b> Followers
                </p>
              </Link>
              <p>
                <Link to="/profile/following">
                  <b>{user.following?.length}</b> Following
                </Link>
              </p>
            </div>
            <div className={classes.userBio}>
              <p>
                <b>{user.name}</b>
              </p>
              <p>{user.bio}</p>
            </div>
          </div>
        </div>
        <Divider style={{marginTop: 40}} />
        {/* <PostGallery /> */}
      </Container>
    </div>
  );
};

export default Profile;
