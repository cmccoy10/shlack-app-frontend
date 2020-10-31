import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, IconButton, Typography, Box, Avatar, Grid, Paper } from "@material-ui/core";
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import InfoIcon from '@material-ui/icons/Info';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { useEffect } from 'react';
import { getChannels } from '../store/actions/channel';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  bannerContainer: {
    background: "white",
    borderTop: "thin solid #45515f",
    borderBottom: "thin solid #45515f",
    height: "5em",
    border: "thin solid black"
  },
  panelHeader: {
    background: "#303E4D",
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  buttons: {
    display: "flex",
    direction: "row",
  },
  channel: {
    display: "flex",
    flexDirection: "column",
  },
  closeButton: {
    marginLeft: "8em"
  }
}));

const MainBanner = () => {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getChannels());
  // }, []);

  // const channelList = useSelector((state) => state.channel.channelList);
  // const channelId = useSelector((state) => state.channel.currentChannel);

  // useEffect(() => {

  // }, []);


  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [anchorEl, setAnchorEl] = React.useState(null);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    toggleDrawer("right", false);
  };


  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"

      onKeyDown={toggleDrawer(anchor, false)}
    >
      <IconButton className={classes.closeButton} backgroundColor="white" onClick={toggleDrawer(anchor, false)}>
        <CloseIcon/>
      </IconButton>
      <List>
        <ListItem >
          <ListItemIcon>
            <IconButton backgroundColor="white" >
              <PersonAddIcon/>
            </IconButton>
          </ListItemIcon>
          <ListItemText primary="Add Member" />
        </ListItem>
        <ListItem >
          <ListItemIcon>
            <IconButton backgroundColor="white" >
              <EditIcon/>
            </IconButton>
          </ListItemIcon>
          <ListItemText primary="Edit Channel" />
        </ListItem>
        <ListItem >
          <ListItemIcon>
            <IconButton backgroundColor="white" >
              <DeleteIcon/>
            </IconButton>
          </ListItemIcon>
          <ListItemText primary="Delete Channel" />
        </ListItem>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Edit Channel</MenuItem>
          <MenuItem onClick={handleClose}>Delete Channel</MenuItem>
        </Menu>
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem >
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Grid container className={classes.bannerContainer} >
      <Box flexGrow={1}>
        <Box className={classes.channel}>
          <Box>
            <Typography>title</Typography>
          </Box>
          <Box>
            <Typography>topic</Typography>
          </Box>
        </Box>
      </Box>
      <Box className={classes.buttons}>
        <IconButton backgroundColor="white" >
          <PersonAddIcon/>
        </IconButton>
        {['right'].map((anchor) => (
          <Box key={anchor} display="flex" alignContent="center">
            <Box display="flex" alignContent="center">
              <IconButton backgroundColor="white" onClick={toggleDrawer(anchor, true)}>
                <InfoIcon/>
              </IconButton>
            </Box>
            <SwipeableDrawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
              onOpen={toggleDrawer(anchor, true)}
            >
              {list(anchor)}
            </SwipeableDrawer>
          </Box>
        ))}
      </Box>
    </Grid>
  );
};

export default MainBanner;
