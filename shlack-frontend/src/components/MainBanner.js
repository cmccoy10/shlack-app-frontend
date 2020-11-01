import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, IconButton, Typography, Box, Avatar, Grid, Paper, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from "@material-ui/core";
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
import { getCurrentChannel, modifyChannel, deleteChannel } from '../store/actions/channel';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { logout } from '../store/actions/authentication';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  bannerContainer: {
    background: "white",
    borderTop: "thin solid #45515f",
    borderBottom: "thin solid #45515f",
    height: "5em",
    borderBottom: "thin solid #45515f",
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
    justifyContent: "flex-start"
  },
  closeButton: {
    marginLeft: "8em"
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.delete.main,
    color: "white"
  },
}));

const MainBanner = (props) => {
  const dispatch = useDispatch();

  // const { id } = useParams();
  // console.log("params id", id)
  // const paramsId = id;

  const channelId = useSelector((state) => state.channel.currentChannel);
  const currentChannel = useSelector((state) => state.channel.oneChannel);
  const [channelFormDisplay, setChannelFormDisplay] = React.useState(false);
  const [deleteFormDisplay, setDeleteFormDisplay] = React.useState(false);
  const [inputTitle, setInputTitle] = React.useState('');
  const [inputTopic, setInputTopic] = React.useState('');



  useEffect(() => {
    dispatch(getCurrentChannel(channelId))
  }, [channelId]);

  const handleChannelTitleChange = e => setInputTitle(e.target.value)
  const handleChannelTopicChange = e => setInputTopic(e.target.value)

  const handleChannelForm = () => {
    setChannelFormDisplay(true);
  };
  const handleChannelFormClose = () => {
    setChannelFormDisplay(false);
  };

  const handleChannelCreate = () => {
    dispatch(modifyChannel({
      id: channelId,
      title: inputTitle,
      topic: inputTopic,
    }))
    setChannelFormDisplay(false);
  }

  const handleDeleteForm = () => {
    setDeleteFormDisplay(true);
  };
  const handleDeleteFormClose = () => {
    setDeleteFormDisplay(false);
  };

  const handleChannelDelete = () => {
    dispatch(deleteChannel({
      id: channelId,
    }))
    setDeleteFormDisplay(false);
  }

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

  const handleLogOut = () => {
    dispatch(logout());
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
            <IconButton backgroundColor="white" onClick={handleChannelForm}>
              <EditIcon/>
            </IconButton>
          </ListItemIcon>
          <ListItemText primary="Edit Channel" />
        </ListItem>
        <ListItem >
          <ListItemIcon>
            <IconButton backgroundColor="white" onClick={handleDeleteForm}>
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
      <ListItem >
          <ListItemIcon>
            <Button color="secondary" onClick={handleLogOut}>Log Out</Button>
          </ListItemIcon>
        </ListItem>
    </div>
  );

  return (
    <Box>
      {currentChannel ?
      <Grid container className={classes.bannerContainer} >
        <Box flexGrow={1} >
          <Box className={classes.channel} display="flex" alignContent="center">
            <Box>
              <Typography variant="subtitle1">{currentChannel.title}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2">{currentChannel.topic}</Typography>
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

      :

      <Grid container className={classes.bannerContainer} >
        <Box flexGrow={1}>
          <Box className={classes.channel} display="flex" justifyContent="center">
            <Box>
              <Typography>Click on a channel on the left panel.</Typography>
            </Box>
          </Box>
        </Box>
        <Box className={classes.buttons}>
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
      }
      <Box>
        <Dialog open={channelFormDisplay} onClose={handleChannelFormClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Edit Your Channel</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To edit a channel, please enter ther channel's info here.
            </DialogContentText>
            <TextField
              error={inputTitle === ''}
              autoFocus
              margin="dense"
              id="title"
              label="Channel Title"
              type="text"
              fullWidth
              value={inputTitle}
              onChange={handleChannelTitleChange}
            />
            <TextField
              margin="dense"
              id="topic"
              label="Channel Topic"
              type="text"
              fullWidth
              value={inputTopic}
              onChange={handleChannelTopicChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleChannelFormClose} color="black">
              Cancel
            </Button>
            <Button onClick={handleChannelCreate} disabled={inputTitle === ''} color="black">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      <Box>
        <Dialog open={deleteFormDisplay} onClose={handleDeleteFormClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Delete Your Channel</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete your channel?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteFormClose} color="black">
              Cancel
            </Button>
            <Button
              onClick={handleChannelDelete}
              variant="contained"
              color="delete"
              className={classes.button}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default MainBanner;
