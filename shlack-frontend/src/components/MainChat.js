import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, Box, Avatar, Grid, Paper, TextField } from "@material-ui/core";
import { useContext } from "react";
import SocketContext from "../SocketContext"

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
  },
  messageContainer: {
    height: "62vh",
    border: "thin solid black"
  },
  textContainer: {
    height: "20vh",
    border: "thin solid black"
  },
  textBox: {
    width: "50em"
  }
}))

const MainChat = () => {
  const socket = useContext(SocketContext);
  const classes = useStyles();
  return (
    <Grid container direction="column">
      <Grid item className={classes.messageContainer}>

      </Grid>
      <Grid item className={classes.textContainer}>
        <Grid container justify="center" alignItems="center">
          <Grid item className={classes.textBox}>
            <TextField
                id="outlined-multiline-static"
                multiline
                rows={2}
                fullWidth
                defaultValue="Default Value"
                variant="outlined"
              />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MainChat;
