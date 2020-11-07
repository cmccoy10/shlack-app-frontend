import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUp } from '../store/actions/authentication';
import { InputLabel, Input, Button, Box, Avatar, Grid, TextField, Typography } from "@material-ui/core";
import { FormControl } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  splashContainer: {
    width: "100%",
    height: "93vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  bodyContainer: {
    display: "flex",
    height: "auto",
    width: "auto",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column"
  }
}));

const SignUpForm = () => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const updateProperty = (callback) => (e) => {
    callback(e.target.value);
  };

  const handleSubmit = (e) => {
    if (!imgUrl) setImgUrl("https://icon-library.com/images/generic-profile-icon/generic-profile-icon-8.jpg")
    const newUser = {
      fullName,
      username,
      email,
      imgUrl,
      password,
      confirmPassword,
    };
    dispatch(signUp(newUser));
  };

  const classes = useStyles();
  return (
    <Box className={classes.splashContainer}>
      <Grid container className={classes.bodyContainer} direction="column" alignContent="space-between">

        <Grid item>
            <Typography variant="h3">Sign Up</Typography>
        </Grid>
        <Grid item>
          <Grid container className={classes.formContainer}>
            <FormControl>
              <Input
                type='text'
                placeholder='Full Name'
                value={fullName}
                onChange={updateProperty(setFullName)}
                required
              />
              <Input
                type='text'
                placeholder='Username'
                value={username}
                onChange={updateProperty(setUsername)}
                required
              />
              <Input
                type='email'
                placeholder='Email'
                value={email}
                onChange={updateProperty(setEmail)}
                required
              />
              <Input
                type='imgUrl'
                placeholder='Image Url'
                value={imgUrl}
                onChange={updateProperty(setImgUrl)}
                required
              />
              <Input
                type='password'
                placeholder='Password'
                value={password}
                onChange={updateProperty(setPassword)}
              />
              <Input
                type='password'
                placeholder='Confirm Password'
                value={confirmPassword}
                onChange={updateProperty(setConfirmPassword)}
              />
              </FormControl>
            <Button color="secondary" onClick={handleSubmit}>Sign Up</Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignUpForm;
