import React from 'react';
import { useDispatch } from 'react-redux';
import { createChannel, hideForm } from '../store/actions/channel';
import { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, IconButton, Typography, Box, Avatar, Grid, TextField } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  formContainer: {
    position: "absolute",
    background: theme.palette.primary.main,
    width: "20vw",
    height: "30vh",
    border: "thin solid black",
    color:"black",
    right: "35vw"
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
    <Grid container alignItems="center" justify="center" className={classes.formContainer}>
      <form onSubmit={handleSubmit}>
        <Grid container direction="column" justify="center" alignItems="center" alignItems="space-between">
          <TextField
            required
            id="outlined-required"
            label="Title"
            defaultValue="Enter a title"
            value={title}
            onChange={updateProperty(setTitle)}
          />
          <TextField
            required
            id="outlined-required"
            label="Topic"
            defaultValue="Enter a topic"
            variant="outlined"
            value={topic}
            onChange={updateProperty(setTopic)}
          />
          <Grid container direction="row">
            <button type="submit">Create Channel</button>
            <button type="button" onClick={() => dispatch(hideForm())}>
              Cancel
            </button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}

export default ChannelForm;
