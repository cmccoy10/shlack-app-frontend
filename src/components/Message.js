import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, IconButton, Typography, Box, Avatar, Grid, Paper } from "@material-ui/core";
import { useSelector } from 'react-redux';
import moment from 'moment';

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
    marginRight: ".5em"
  },
  messageFullName: {
    paddingRight: ".3em"
  },
  messageDate:{
    fontSize: ".8rem",
    marginTop: ".25em"
  },
  messageBody: {
    minHeight: "auto"
  }
}));

const Message = (props) => {
  const message = props.message;
  const date = moment(message.createdAt).format('hh:mm:ss')
  const classes = useStyles();
  return (
    <Box className={classes.messageBox} display="flex" justifyContent="flex-start">
      <Box className={classes.messageContent} display="flex" flexDirection="row">
        <Box className={classes.messageImg}>
          <Avatar variant="rounded" alt="user icon" src={message.imgUrl}/>
        </Box>
        <Box display="flex" flexDirection="column">
          <Box display="flex" flexDirection="row">
            <Box className={classes.messageFullName}>
              <Typography fontWeight="fontWeightBold">
                {message.fullName}
              </Typography>
            </Box>
            <Box>
              <Typography fontWeight="fontWeightLight" variant="subtitle2" className={classes.messageDate} >
                {date.slice(0,5)}
              </Typography>
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
