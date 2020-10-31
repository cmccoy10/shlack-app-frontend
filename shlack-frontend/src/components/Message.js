import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, IconButton, Typography, Box, Avatar, Grid, Paper } from "@material-ui/core";
import { useSelector } from 'react-redux';
import moment from 'moment';

// const useStyles = makeStyles((theme) => ({
//   outerDiv: {
//     display: "flex",

//   }
// }));

const Message = (props) => {
  const message = props.message;
  const date = moment(message.createdAt).format('hh:mm:ss')
  // const classes = useStyle();
  return (
    <Box display="flex" justifyContent="flex-start">
      <Box display="flex" flexDirection="row">
        <Box>
          <Avatar variant="rounded" alt="user icon" src="https://miro.medium.com/fit/c/262/262/1*hLKzSxjViHNOYdum_hkmwg.jpeg"/>
        </Box>
        <Box display="flex" flexDirection="column">
          <Box display="flex" flexDirection="row">
            <Box>
              {message.fullName}
            </Box>
            <Box>
              <Typography>
                {date}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography>
              {message.body}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Message;
