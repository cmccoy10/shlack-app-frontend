import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, IconButton, Typography, Box, Avatar, Grid, Paper } from "@material-ui/core";
import { useSelector } from 'react-redux';
// import ChannelList from './ChannelList';
// import GroupList from "./GroupList";

const useStyles = makeStyles((theme) => ({
  bannerContainer: {
    background: "white",
    borderTop: "thin solid #45515f",
    borderBottom: "thin solid #45515f",
    height: "5em",
    border: "thin solid black"
  },
  panelHeader: {
    background: "#303E4D",
  }
}));

const MainBanner = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.bannerContainer} >
      <p>Banner</p>
    </Grid>
  );
};

export default MainBanner;
