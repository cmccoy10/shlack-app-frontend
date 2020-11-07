import React from 'react';
import MainLeftPanel from './MainLeftPanel';
import MainBanner from './MainBanner';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, Box, Avatar, Grid, Paper } from "@material-ui/core";
import MainChat from './MainChat';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
    height: "93vh",
    width: "100vw"
  },
  leftPanel: {
    display: "flex",
    margin: "0",
    width: "20%",
    height: "100%",
  },
  banner: {
    height: "10%",
    width: "80%"
  },
  rightPanelParams: {
    width: "80vw",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly"
  },
  rightPanel: {
    width: "80%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  mainChat: {
    height: "60%",
    width: "100%"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
}))

const Main = (props) => {
  const currentChannel = useSelector((state) => state.channel.oneChannel);
  const classes = useStyles();
  return (
    <Box className={classes.mainContainer}>
      <Box className={classes.leftPanel}>
        <MainLeftPanel className={classes.leftPanel}/>
      </Box>
      <Box className={classes.rightPanel}>
        <MainBanner className={classes.banner}/>
        <MainChat className={classes.mainChat}/>
      </Box>
      <Box>
      </Box>
    </Box>
  );
};

export default Main;
