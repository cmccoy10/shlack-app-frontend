import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, IconButton, Typography, Box, Avatar } from "@material-ui/core";
import { useSelector } from 'react-redux';


const useStyles = makeStyles((theme) => ({
  sidePanel: {
    background: "#303E4D",
    width: "20vw",
    height: "100vh",
  },
  panelHeader: {
    display: "flex",
    borderTop: "thin solid #45515f",
    borderBottom: "thin solid #45515f",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "5em"
  }
}));

const MainLeftPanel = () => {
  const classes = useStyles();
  return (
    <div className={classes.sidePanel} >
      <Box className={classes.panelHeader}>
        <Typography variant="h6" color="primary">Shlack</Typography>
      </Box>
    </div>
  );
};

export default MainLeftPanel;
