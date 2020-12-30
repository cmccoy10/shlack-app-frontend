import React from 'react';
import { useDispatch } from 'react-redux';
import { createChannel, hideForm } from '../store/actions/channel';
import { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Box, Avatar, Grid, TextField } from "@material-ui/core";


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

  const [channelFormDisplay, setChannelFormDisplay] = React.useState(false);

  const handleChannelTitleChange = e => setTitle(e.target.value)
  const handleChannelTopicChange = e => setTopic(e.target.value)

  const handleChannelForm = () => {
    setChannelFormDisplay(true);
  };
  const handleChannelFormClose = () => {
    setChannelFormDisplay(false);
  };
  const handleChannelCreate = () => {
    const payload = {
      title,
      topic,
    };
    dispatch(createChannel(payload));
    setChannelFormDisplay(false);
  }

//   const handleEnter = async (e) => {
//       console.log("keypressed")
//     if (e.key === "Enter" && !e.shiftKey) {
//         console.log("enter pressed")
//         const payload = {
//             title,
//             topic,
//           };
//           dispatch(createChannel(payload));
//           setChannelFormDisplay(false);
//     }
//   }

  const updateProperty = (callback) => (e) => {
    callback(e.target.value);
  };

  const classes = useStyles();
  return (
    <Dialog open={channelFormDisplay} onClose={handleChannelFormClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Create Your Channel</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter a Channel title and topic.
        </DialogContentText>
        <TextField
          error={title === ''}
          autoFocus
          margin="dense"
          id="channelName"
          label="Channel Name"
          type="text"
          fullWidth
          value={title}
          onChange={handleChannelTitleChange}
        //   onKeyDown={handleEnter}
        />
        <TextField
          margin="dense"
          id="channelAvatar"
          label="Channel Topic"
          type="text"
          fullWidth
          value={topic}
          onChange={handleChannelTopicChange}
        //   onKeyDown={handleEnter}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleChannelFormClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleChannelCreate} disabled={title === ''} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ChannelForm;
