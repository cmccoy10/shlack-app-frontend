import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, IconButton, Typography, Box, Avatar, Grid } from "@material-ui/core";
import { useSelector } from 'react-redux';
import ChannelList from './ChannelList';
import GroupList from "./GroupList";
import { GitHub, LinkedIn } from '@material-ui/icons';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  sidePanel: {
    background: "#303E4D",
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
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
  },
  socialContainer: {
    paddingLeft: ".5em",
    paddingBottom: ".5em"
  },
  socialLinks: {
      textDecoration: "none",
      color: "white",
      paddingRight: ".3em",
  },
  small: {
    width: theme.spacing(3.8),
    height: theme.spacing(3.8),
  },
}));

const MainLeftPanel = () => {
  const classes = useStyles();
  return (
    <div className={classes.sidePanel} >
        <Box>
            <Box className={classes.panelHeader}>
                <Typography variant="h5" color="primary" fontWeight="800" >Shlack</Typography>
            </Box>
            <Box>
                <ChannelList />
            </Box>
        </Box>
      <Box className={classes.socialContainer}>
        <a href="https://github.com/cmccoy10" className={classes.socialLinks} >
            <GitHub className={classes.small}/>
        </a>
        <a href="https://www.linkedin.com/in/cole-mccoy-20665096/" className={classes.socialLinks} >
            <LinkedIn className={classes.small}/>
        </a>
      </Box>
      {/* <Box>
        <GroupList />
      </Box> */}
    </div>
  );
};

export default MainLeftPanel;
