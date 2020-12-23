import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Typography, Box, Avatar, Grid } from "@material-ui/core";
import { useSelector, useDispatch } from 'react-redux';
import { removeToken, USER_IMG } from '../store/actions/authentication';
import "./Styles/NavBar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel, faAsterisk } from '@fortawesome/free-solid-svg-icons'
import UserInfo from './modals/UserInfo';


const useStyles = makeStyles((theme) => ({
  navbar: {
    fontFamily: theme.typography,
    background: theme.palette.secondary.main,
    fontSize: theme.typography.h3,
    color: "#000",
    height: "100%",
    width: "100vw",
    borderBottom: "1px solid black"
  },
  navbarSplash: {
    fontSize: theme.typography.h3,
    color: "#000",
    height: "100%",
    width: "100vw",
    borderBottom: "1px solid black"
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
  navLink: {
    textDecoration: "none"
  },
  appBarLinks: {
    marginRight: "1em"
   }
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
      <AppBar elevation={0} position="static" className={classes.navbar}>
        <Box display="flex" justifyContent="flex-end" >
          <div className={classes.root1}>
              <UserInfo imgUrl={imgUrl}/>
            {/* <Avatar
            variant="rounded"
            className={classes.small}
            alt="user icon"
            src={imgUrl}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            /> */}
          </div>
        </Box>
      </AppBar>
    </>
  )
};

export default NavBar;
