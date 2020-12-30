import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signUp } from '../store/actions/authentication';
import { InputLabel, Input, Button, Box, Avatar, Grid, TextField, Typography, AppBar } from "@material-ui/core";
import { FormControl } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import NavBar from './NavBar';
import "./Styles/Splash.css"
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStroopwafel, faAsterisk } from '@fortawesome/free-solid-svg-icons';


const useStyles = makeStyles((theme) => ({
    splashContainer: {
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      },
      bodyContainer: {
        display: "flex",
        height: "auto",
        width: "auto",
        flexDirection: "column",
        alignContent: "space-between"
      },
      formContainer: {
        display: "flex",
        flexDirection: "column"
      },
      loginContainer: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "2.9em"
      },
      textfield: {
        width: "100%",
      },
      formControl: {
        display: "flex",
        flexDirection: "column",
        height: "28em",
        justifyContent: "space-evenly"
      },
      buttonContainer: {
        display: "flex",
        flexDirection: "column",
      },
      signUpButton: {
        textTransform: "none",
        width: "100%",
        background: "#134B86",
        border: "1px solid #0c6ebe",
        color: "white" ,
        fontSize: "1.2em",
        fontWeight: "700",
        marginBottom: "1em"
      },
      demoButton: {
        textTransform: "none",
        width: "100%",
        fontSize: "1.2em",
        fontWeight: "700"
      },
      errorFont: {
        color: "red"
      },
}));

const SignUpForm = () => {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();

  const updateProperty = (callback) => (e) => {
    callback(e.target.value);
  };

  const handleSubmit = async (e) => {

    const reqImgUrl = imgUrl ? imgUrl : "https://icon-library.com/images/generic-profile-icon/generic-profile-icon-8.jpg";

    const newUser = {
      fullName,
      username,
      email,
      imgUrl: reqImgUrl,
      password,
      confirmPassword,
    };
    const response = await dispatch(signUp(newUser));
    if (response) {
        setErrors(response.error.errors);
    } else {
        // console.log("not response", response)
    }
  };

  const handleEnter = async (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        const reqImgUrl = imgUrl ? imgUrl : "https://icon-library.com/images/generic-profile-icon/generic-profile-icon-8.jpg";

        const newUser = {
            fullName,
            username,
            email,
            imgUrl: reqImgUrl,
            password,
            confirmPassword,
        };
        const response = await dispatch(signUp(newUser));
        if (response) {
            setErrors(response.error.errors);
        } else {
            // console.log("not response", response)
        }
    }
  }

  const classes = useStyles();
  return (
    <Box className="splashContainer">
      <AppBar elevation={0} position="static" className="navbarSplash">
        <div className="navBox">
          <div className="navBrand">
            <FontAwesomeIcon className="navIcon" color="#e01e5a" size="3x" icon={faStroopwafel} />
            <div>
                <span className="alternative">
                sh
                </span>
                <span className="monteserrat">
                l
                </span>
                <span className="alternative">
                    ack
                </span>
            </div>
          </div>
          <div className="appBarLinks">
            <div>Already have an account?</div>
            <NavLink exact to='/login' className="navLink">
              <div>
                Sign in
              </div>
            </NavLink>
          </div>
        </div>
      </AppBar>
      <Box className={classes.loginContainer}>
        <Box className={classes.bodyContainer}>
            <Box className={classes.bodyHeader}>
                <Box className="formHeader">
                    <div>Sign up for Shlack</div>
                </Box>
                {errors ?
                <ul className={classes.errorFont}>
                    {errors.map(error => {
                        return (
                            <li>{error.msg}</li>
                        )
                    })}
                </ul>
                :
                null
                }
            </Box>
            <Box>
                <Box className={classes.formContainer}>
                    <form className={classes.formControl}>
                    <TextField
                        type='text'
                        placeholder='Full Name'
                        value={fullName}
                        onChange={updateProperty(setFullName)}
                        required
                        size="small"
                        variant="outlined"
                        color="secondary"
                        className={classes.textfield}
                        onKeyDown={handleEnter}
                    />
                    <TextField
                        type='text'
                        placeholder='Username'
                        value={username}
                        onChange={updateProperty(setUsername)}
                        required
                        size="small"
                        variant="outlined"
                        color="secondary"
                        className={classes.textfield}
                        onKeyDown={handleEnter}
                    />
                    <TextField
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={updateProperty(setEmail)}
                        required
                        size="small"
                        variant="outlined"
                        color="secondary"
                        className={classes.textfield}
                        onKeyDown={handleEnter}
                    />
                    <TextField
                        type='imgUrl'
                        placeholder='Profile Image Url'
                        value={imgUrl}
                        onChange={updateProperty(setImgUrl)}
                        size="small"
                        variant="outlined"
                        color="secondary"
                        className={classes.textfield}
                        onKeyDown={handleEnter}
                    />
                    <TextField
                        type='password'
                        placeholder='Password'
                        value={password}
                        required
                        size="small"
                        onChange={updateProperty(setPassword)}
                        variant="outlined"
                        color="secondary"
                        className={classes.textfield}
                        onKeyDown={handleEnter}
                    />
                    <TextField
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        required
                        size="small"
                        onChange={updateProperty(setConfirmPassword)}
                        variant="outlined"
                        color="secondary"
                        className={classes.textfield}
                        onKeyDown={handleEnter}
                    />
                    <Box className={classes.buttonContainer}>
                        <Button onClick={handleSubmit} disableElevation className={classes.signUpButton}>Sign Up</Button>
                    </Box>
                    </form>
                </Box>
              </Box>
            </Box>
        </Box>
    </Box>
  );
};

export default SignUpForm;
