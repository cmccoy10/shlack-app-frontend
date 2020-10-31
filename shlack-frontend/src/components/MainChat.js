import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Form, Grid, Paper, TextField, IconButton } from "@material-ui/core";
import { useContext } from "react";
import SocketContext from "../SocketContext";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useRef, useEffect, useState } from 'react';
import { baseUrl } from '../config/config';
import { setMessages } from '../store/actions/channelMessages';
import Message from './Message';
import SendIcon from '@material-ui/icons/Send';
import { USER_ID } from '../store/actions/authentication';


const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
  },
  messageContainer: {
    height: "62vh",
    border: "thin solid black",
    overflow: "auto"
  },
  textContainer: {
    height: "20vh",
    border: "thin solid black"
  },
  textBox: {
    width: "50em"
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}))

const MainChat = () => {
  const currentChannel = useSelector(state => state.channel.currentChannel);
  const messages = useSelector(state => state.channelMessages[currentChannel]);
  const dispatch = useDispatch();
  const messageElement = useRef(null);
  const socket = useContext(SocketContext);
  const classes = useStyles();
  const [body, setBody] = useState("");
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  useEffect(() => {
    if (messageElement.current) {
        messageElement.current.scrollIntoView();
    }
  });

  useEffect(() => {
    // If there's no current channel, it returns
    if (!currentChannel) {
        return;
    }

    (async () => {
        try {
            const response = await fetch(
                `${baseUrl}/channels/${currentChannel}/messages`
            );
            if (!response.ok) {
                throw new Error("Response not okay");
            }
            const channel = await response.json();
            console.log(channel)
            dispatch(setMessages(channel.ChannelMessages, channel));
        } catch (e) {
            console.error(e);
        }
    })();
  }, [currentChannel, dispatch]);

  const onSubmit = async (e) => {
    e.preventDefault();
    onSend(body);
    setBody("");
  };

  const onSend = body => {
    const userId = window.localStorage.getItem(USER_ID)
    console.log(`Sending message ${body} for ${`A user's name`} to ${currentChannel}`);
    socket.emit(currentChannel, {
      userId,
      body
    });
  }

  const onChange = e => {
    setBody(e.target.value);
  }

  // If there's no current channel, it doesn't render anything
  if (!currentChannel) {
    return null;
  }

  if (!messages) {
    return null;
  }

  return (
    <Grid container direction="column">
      <Grid item className={classes.messageContainer}>
        {messages.map(message => {
          return (
            <Message key={message.id} message={message}/>
          )
        })}
      </Grid>
      <Grid item className={classes.textContainer}>
        <Grid container justify="center" alignItems="center">
          <form onSubmit={onSubmit}>
            <Grid item className={classes.textBox}>
              <TextField
                  id="outlined-multiline-static"
                  multiline
                  rows={2}
                  fullWidth
                  defaultValue="Default Value"
                  variant="outlined"
                  onChange={onChange}
                  value={body}
                />
              </Grid>
              <IconButton type="submit" backgroundColor="white">
                <SendIcon />
              </IconButton>
           </form>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MainChat;
