import React from 'react';
import { useDispatch } from 'react-redux';
import { createChannel, hideForm } from '../store/actions/channel';
import { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, IconButton, Typography, Button, Box, Avatar, Grid, TextField } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  formContainer: {
    position: "absolute",
    background: theme.palette.primary.main,
    width: "25vw",
    height: "50vh",
    border: "thin solid black",
    color:"black",
    right: "35vw",
    bottom: "25vh",
    borderRadius: "5%"
  },
  formHeader: {
    color: "black",
    fontWeight: ""
  },
  formInputs: {
    paddingTop: "1.5em",
    paddingBottom: "1em"
  },
  margin: {
    margin: theme.spacing(1),
    backgroundColor: "#303E4D",
    color: theme.palette.primary.main
  },
}));


function ChannelForm(props) {
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title,
      topic,
    };
    dispatch(createChannel(payload));
  }

  const updateProperty = (callback) => (e) => {
    callback(e.target.value);
  };

  const classes = useStyles();
  return (
    <Grid container alignItems="stretch" alignItems="center" justify="center" className={classes.formContainer}>
      <form onSubmit={handleSubmit}>
        <Grid item>
          <Grid container direction="column" justify="center" alignItems="center" justify="space-between" alignContent="space-between">
            <Grid item>
              <Typography variant="h6" className={classes.formHeader}>
                New Channel
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                required
                label="Title"
                defaultValue="Enter a title"
                value={title}
                onChange={updateProperty(setTitle)}
                className={classes.formInputs}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Topic"
                defaultValue="Enter a topic"
                variant="outlined"
                value={topic}
                multiline
                rows={4}
                onChange={updateProperty(setTopic)}
                className={classes.formInputs}
              />
            </Grid>
            <Grid item direction="row">
              <Button className={classes.margin} variant="contained" size="small" type="submit">Create Channel</Button>
              <Button className={classes.margin} variant="contained" size="small" type="button" onClick={() => dispatch(hideForm())}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}

export default ChannelForm;
