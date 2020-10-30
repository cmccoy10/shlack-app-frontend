import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, IconButton, Typography, Box, Avatar } from "@material-ui/core";
import { useSelector } from 'react-redux';


const useStyles = makeStyles((theme) => ({
  navbar: {
    fontFamily: theme.typography,
    background: theme.palette.secondary.main,
    fontSize: theme.typography.h3,
    color: "#FFFFFF"
  },
  title: {
    fontSize: theme.typography.h3,
    color: "#FFFFFF"
  },
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3.5),
    height: theme.spacing(3.5),
  },
}));


const NavBar = () => {
  const needLogin = useSelector((state) => !state.authentication.token);
  const classes = useStyles();
  return (
    <>
      {needLogin ? (
      <AppBar position="static" className={classes.navbar}>
        <Box display="flex" justifyContent="flex-end" >
          <Box display="flex" justifyContent="center" >
            <NavLink exact to='/login' className='is-active'>
                <Typography variant="h6" color="primary">
                  Log In
                </Typography>
            </NavLink>
            <NavLink exact to='/signup' className='is-active'>
              <Typography variant="h6" color="primary">
                Sign Up
              </Typography>
            </NavLink>
          </Box>
        </Box>
      </AppBar>)
      : (
      <AppBar position="static" className={classes.navbar}>
        <Box display="flex" justifyContent="flex-end" >
          <div className={classes.root}>
            <Avatar variant="rounded" className={classes.small} alt="user icon" src="https://miro.medium.com/fit/c/262/262/1*hLKzSxjViHNOYdum_hkmwg.jpeg" />
          </div>
        </Box>
      </AppBar>
      )
      }
    </>
  )
};

export default NavBar;
