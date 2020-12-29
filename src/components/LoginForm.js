import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { login } from '../store/actions/authentication';
import { makeStyles } from "@material-ui/core/styles";
import { InputLabel, Input, Button, Box, Avatar, Grid, TextField, Typography, AppBar } from "@material-ui/core";
import { FormControl } from '@material-ui/core';
import NavBar from './NavBar';
import "./Styles/Splash.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel, faAsterisk } from '@fortawesome/free-solid-svg-icons'


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
    height: "17em",
    justifyContent: "space-evenly"
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
  },
  signInButton: {
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

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const token = useSelector((state) => state.authentication.token);
  const dispatch = useDispatch();


  const handleSubmit = async (e) => {
    const response = await dispatch(login(email, password));
    if (response) {
        setErrors(response.error.errors);
    }
  };

  const handleDemoSubmit = (e) => {
    dispatch(login("demo@example.com", "password"))
  }

  const updateProperty = (callback) => (e) => {
    callback(e.target.value);
  };

  const classes = useStyles();

  if (token) {
    return <Redirect to='/' />;
  }

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
            <div>New to Shlack?</div>
            <NavLink exact to='/signup' className="navLink">
              <div>
                Create an account
              </div>
            </NavLink>
          </div>
        </div>
      </AppBar>
        <Box className={classes.loginContainer}>
            <Box className={classes.bodyContainer}>
                <Box className={classes.bodyHeader}>
                    <Box className="formHeader">
                        <div>Sign in to Shlack</div>
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
                            placeholder='Email'
                            value={email}
                            required
                            size="small"
                            onChange={updateProperty(setEmail)}
                            variant="outlined"
                            color="secondary"
                            className={classes.textfield}
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
                        />
                        <Box className={classes.buttonContainer}>
                            <Button onClick={handleSubmit} disableElevation className={classes.signInButton}>Sign In with Email</Button>
                            <Button onClick={handleDemoSubmit} disableElevation className={classes.demoButton} variant="contained">Try a Demo</Button>
                        </Box>
                        </form>
                    </Box>
                </Box>
            </Box>
        </Box>
    </Box>

  );
};

export default LoginForm;
