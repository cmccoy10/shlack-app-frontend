import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, IconButton, Typography, Box, Avatar } from "@material-ui/core";
import { useSelector, useDispatch } from 'react-redux';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { removeToken, USER_IMG } from '../store/actions/authentication';



const useStyles = makeStyles((theme) => ({
  navbar: {
    fontFamily: theme.typography,
    background: theme.palette.secondary.main,
    fontSize: theme.typography.h3,
    color: "#FFFFFF",
    height: "7%"
  },
  navBox: {
    height: "7%"
  },
  title: {
    fontSize: theme.typography.h3,
    color: "#FFFFFF"
  },
  root1: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3.5),
    height: theme.spacing(3.5),
  },
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

const NavBar = () => {
  const token = useSelector((state) => state.authentication.token);
  const dispatch = useDispatch();
  const needLogin = useSelector((state) => !state.authentication.token);
  const imgUrl = window.localStorage.getItem(USER_IMG);

  const [open, setOpen] = React.useState(false);

  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
    dispatch(removeToken());
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const classes = useStyles();
  return (
    <>
      {needLogin ? (
      <AppBar position="static" className={classes.navbar}>
        <Box display="flex" justifyContent="flex-end" className={classes.navBox}>
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
          <div className={classes.root1}>
            <Avatar
            variant="rounded"
            className={classes.small}
            alt="user icon"
            src={imgUrl}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            />
          </div>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
        </Box>
      </AppBar>
      )
      }
    </>
  )
};

export default NavBar;
