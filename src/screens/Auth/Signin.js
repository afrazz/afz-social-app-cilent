/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Link} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import {loginUser} from '../../slices/authSlice';
import backgroundImg from '../../assets/background.jpg';
import ErrorMessage from '../../components/ErrorMessage';

const useStyles = makeStyles(theme => ({
  formContainer: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    backgroundImage: `linear-gradient(rgba(169, 116, 255, .9), rgba(169, 116, 255, .9)), url(${backgroundImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    // background: url('../../assets/background.jpg'),'linear-gradient(rgba(169, 116, 255, .9), rgba(169, 116, 255, .9))'
  },
  paper: {
    background: 'rgba(255,255,255, .5)',
    padding: '25px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '10px',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn({history}) {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const dispatch = useDispatch();
  const {loading, error} = useSelector(state => state.auth);
  const onSubmit = data => {
    dispatch(loginUser(data, history));
  };
  const classes = useStyles();
  return (
    <div className={classes.formContainer}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {error && <ErrorMessage message={error} />}
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              {...register('email', {
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                },
              })}
              style={{
                backgroundColor: 'transparent',
              }}
              inputProps={{
                style: {
                  WebkitBoxShadow: '0 0 0 1000px rgba(125,125,125, .1) inset',
                },
              }}
            />
            {errors?.email && errors.email.type === 'required' && (
              <ErrorMessage message="You must enter your email" />
            )}
            {errors?.email && errors.email.type === 'pattern' && (
              <ErrorMessage message="You must enter valid email address" />
            )}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register('password', {
                required: true,
                minLength: {
                  value: 8,
                },
              })}
              style={{
                backgroundColor: 'transparent',
              }}
              inputProps={{
                style: {
                  WebkitBoxShadow: '0 0 0 1000px rgba(125,125,125, .1) inset',
                },
              }}
            />
            {errors?.password && errors.password.type === 'required' && (
              <ErrorMessage message="You must enter your password" />
            )}
            {errors?.password && errors.password.type === 'minLength' && (
              <ErrorMessage message="Your password must be at least 8 characters" />
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {loading ? (
                <CircularProgress color="#fff" size={25} />
              ) : (
                'Sign In'
              )}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup" variant="body2">
                  Dont have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
}
