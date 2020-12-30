import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, IconButton, Typography, Box, Avatar, Grid, Paper } from "@material-ui/core";
import { useSelector } from 'react-redux';
import moment from 'moment';
import "./Styles/Message.css"

const useStyles = makeStyles((theme) => ({
  messageBox: {
    paddingLeft: "2em",
    minHeight: "auto",
    cursor: "",
    "&:hover": {
        background: "#f8f8f8"
    },
  },
  messageContent: {
    padding: ".3em"
  },
  messageImg: {
    marginRight: ".5em",
    display: "flex",
    alignItems: "center",
  },
  messageBody: {
    minHeight: "auto"
  }
}));

const Message = (props) => {
  const message = props.message;
  const date = moment(message.createdAt).format('LT');
  const classes = useStyles();
  return (
    <Box className={classes.messageBox} display="flex" justifyContent="flex-start">
      <Box className={classes.messageContent} display="flex" flexDirection="row">
        <Box className={classes.messageImg}>
          <Avatar variant="rounded" alt="user icon" src={message.imgUrl}/>
        </Box>
        <Box display="flex" flexDirection="column">
          <Box display="flex" flexDirection="row" alignItems="flex-start">
            <Box className="messageFullName">
                {message.fullName}
            </Box>
            <Box className="messageDate">
                {date}
            </Box>
          </Box>
          <Box>
            <Typography >
              {message.body}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Message;
