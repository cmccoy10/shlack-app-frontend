import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, IconButton, Typography, Box, Avatar, Grid } from "@material-ui/core";
import { useSelector } from 'react-redux';
import ChannelList from './ChannelList';
import GroupList from "./GroupList";

const useStyles = makeStyles((theme) => ({
  sidePanel: {
    background: "#303E4D",
    width: "100%",
    height: "100%"
  },
  panelHeader: {
    borderTop: "thin solid #45515f",
    borderBottom: "thin solid #45515f",
    height: "5em",
    paddingLeft: "1em",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  }
}));

const MainLeftPanel = () => {
  const classes = useStyles();
  return (
    <div className={classes.sidePanel} >
      <Box className={classes.panelHeader}>
        <Typography variant="h5" color="primary" fontWeight="800" >Shlack</Typography>
      </Box>
      <Box>
        <ChannelList />
      </Box>
      {/* <Box>
        <GroupList />
      </Box> */}
    </div>
  );
};

export default MainLeftPanel;
