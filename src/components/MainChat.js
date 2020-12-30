import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, IconButton, Box } from "@material-ui/core";
import { useContext } from "react";
import SocketContext from "../SocketContext";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useRef, useEffect, useState } from 'react';
import { apiUrl } from '../config/config';
import { setMessages } from '../store/actions/channelMessages';
import Message from './Message';
import SendIcon from '@material-ui/icons/Send';
import { USER_ID } from '../store/actions/authentication';
import "./Styles/MainChat.css"


const useStyles = makeStyles((theme) => ({
//   mainContainer: {
//     width: "100%",
//     height: "100%",
//     background: "#ffffff",
//   },
//   outerMessageContainer: {
//     height: "62vh",
//     overflow: "hidden",
//     position: "relative",
//     overflow: "hidden"

//   },
//   innerMessageContainer: {
//     display: "flex",
//     flexDirection: "column-reverse",
//     overflow: "scroll",
//     height: "100%",
//     width: "100%",
//     position:"absolute",
//   },
//   textContainer: {
//     height: "20vh",
//     width: "100%"
//   },
//   textBox: {
//     width: "95%",
//   },
  sendButton: {
    width: "5%"
  },
//   innerTextContainer: {
//     height: "100%",
//     width: "100%"
//   },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  margin: {
    margin: theme.spacing(1),
  },
}))

const MainChat = () => {
  const currentChannel = useSelector(state => state.channel.currentChannel);
  const oneChannel = useSelector(state => state.channel.oneChannel);
  const messages = useSelector(state => state.channelMessages[currentChannel]);
  const dispatch = useDispatch();
  const messageElement = useRef(null);
  const socket = useContext(SocketContext);
  const classes = useStyles();
  const [body, setBody] = useState("");





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
                `${apiUrl}/channels/${currentChannel}/messages`
            );
            if (!response.ok) {
                throw new Error("Response not okay");
            }
            const channel = await response.json();
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

  const handleEnter = async (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        onSend(body);
        setBody("");
    }
  }

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

  if (!oneChannel) {
    return null;
  }

  const reversedMessages = []
  for (let i = messages.length - 1; i >= 0; i--) {
      reversedMessages.push(messages[i])
  }

  return (
    <div className="mediaMainContainer">
      <div className="outerMessageContainer">
        <Box className="innerMessageContainer">
          {reversedMessages.map(message => {
            return (
              <Message key={message.id} message={message}/>
            )
          })}
        </Box>
      </div>
      <div className="textContainer">
          <form onSubmit={onSubmit}>
            <Box className="innerTextContainer">
              <Box className="textBox">
                <TextField
                  id="outlined-multiline-static"
                  multiline
                  rows={2}
                  fullWidth
                  color="secondary"
                  variant="outlined"
                  className={classes.margin}
                  onChange={onChange}
                  value={body}
                  placeholder={`Message ${oneChannel.title}`}
                  onKeyDown={handleEnter}
                />
              </Box >
              <Box className={classes.sendButton}>
                <IconButton type="submit" backgroundColor="white" disabled={body === ""}>
                  <SendIcon />
                </IconButton>
              </Box>
              </Box>
           </form>
      </div>
    </div>
  );
};

export default MainChat;
