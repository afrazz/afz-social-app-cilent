/* eslint-disable react/prop-types */
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useSelector, useDispatch} from 'react-redux';
import {useForm} from 'react-hook-form';
import {TextField, Button, CircularProgress} from '@material-ui/core';
import Navbar from '../../components/Navbar';
import {onCurrentProfileUpdate} from '../../slices/userSlice';
import ErrorMessage from '../../components/ErrorMessage';

const useStyles = makeStyles(theme => ({
  profileText: {
    fontSize: 20,
  },
  editContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: '#fff',
    width: '400px',
    marginBottom: 30,
    paddingBottom: 30,
    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
    borderRadius: '5px',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    '& div': {
      marginBottom: '10px',
      '& #standard-basic': {
        width: '330px',
        [theme.breakpoints.down('xs')]: {
          width: '95vw',
        },
      },
    },
  },
}));

const EditProfile = ({history}) => {
  const classes = useStyles();
  const {user, loading, error} = useSelector(state => state.user);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  // useEffect(() => {
  //   dispatch(getCurrentUserProfile());
  // }, []);

  const onSubmit = data => {
    console.log(data);
    dispatch(onCurrentProfileUpdate(data, history));
  };

  console.log(loading);
  return (
    <div>
      <Navbar profileImg={user.profileImg} style={{position: 'relative'}} />
      {
        // eslint-disable-next-line no-underscore-dangle
        user._id && (
          <div
            style={{display: 'flex', justifyContent: 'center', marginTop: 90}}
          >
            <form
              className={classes.editContainer}
              onSubmit={handleSubmit(onSubmit)}
            >
              <h1 className={classes.profileText}>Edit Profile</h1>
              {error && <ErrorMessage message={error} />}
              <div>
                <TextField
                  id="standard-basic"
                  label="Username"
                  autoFocus
                  {...register('username', {
                    required: true,
                    minLength: {
                      value: 3,
                    },
                  })}
                  defaultValue={user.username}
                />
                {errors?.username && errors.username.type === 'required' && (
                  <ErrorMessage message="You must enter your username" />
                )}
                {errors?.username && errors.username.type === 'minLength' && (
                  <ErrorMessage message="Your username must be at least 3 characters" />
                )}
              </div>
              <div>
                <TextField
                  id="standard-basic"
                  label="Name"
                  {...register('name')}
                  defaultValue={user.name}
                />
              </div>
              <div>
                <TextField
                  id="standard-basic"
                  label="Website"
                  {...register('website')}
                  defaultValue={user.website}
                />
              </div>
              <div>
                <TextField
                  id="standard-basic"
                  label="Bio"
                  multiline
                  rows={4}
                  inputProps={{maxLength: 200}}
                  {...register('bio')}
                  defaultValue={user.bio}
                />
              </div>
              <div>
                <TextField
                  id="standard-basic"
                  label="Phone number"
                  {...register('phoneNumber')}
                  defaultValue={user.phoneNumber}
                />
              </div>
              <div>
                <TextField
                  id="standard-basic"
                  label="Gender"
                  {...register('gender')}
                  defaultValue={user.gender}
                />
              </div>
              <Button color="primary" variant="contained" type="submit">
                {loading ? (
                  <CircularProgress color="#fff" size={25} />
                ) : (
                  'Update Changes'
                )}
              </Button>
            </form>
          </div>
        )
      }
    </div>
  );
};

export default EditProfile;
