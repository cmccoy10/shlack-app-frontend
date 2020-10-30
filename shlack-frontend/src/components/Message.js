import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, IconButton, Typography, Box, Avatar, Grid, Paper } from "@material-ui/core";
import { useSelector } from 'react-redux';


// const useStyles = makeStyles((theme) => ({
//   outerDiv: {
//     display: "flex",

//   }
// }));

const Message = (props) => {
  // const classes = useStyle();
  return (
    <Box display="flex" justifyContent="flex-start"> //outer div
      <Box display="flex" flexDirection="row"> //div containing content
        <Box> //avatar div
          <Avatar variant="rounded" alt="user icon" src="https://miro.medium.com/fit/c/262/262/1*hLKzSxjViHNOYdum_hkmwg.jpeg"/>
        </Box>
        <Box display="flex" flexDirection="column"> //message div
          <Box display="flex" flexDirection="row">//name and date
            <Box> //fullname
            </Box>
            <Box> //date

            </Box>
          </Box>
          <Box> //message

          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Message;
