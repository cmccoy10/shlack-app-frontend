import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, IconButton, Typography, Box, Grid, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField } from "@material-ui/core";
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InfoIcon from '@material-ui/icons/Info';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { useEffect } from 'react';
import { getCurrentChannel, modifyChannel, deleteChannel, addChannelMember } from '../store/actions/channel';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { logout, USER_ID } from '../store/actions/authentication';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { getUsers } from '../store/actions/user';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import "./Styles/MainBanner.css"


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
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  channelContainer: {
    paddingLeft: "1.3em"
  },
  closeButton: {
    marginLeft: "8em"
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.delete.main,
    color: "white"
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  memberAvatar: {
    width: theme.spacing(3.5),
    height: theme.spacing(3.5),
  },
  memberGroup: {
    width: '.5em',
    height: ".5em"
  },
}));

const MainBanner = (props) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const channelId = useSelector((state) => state.channel.currentChannel);
  const currentChannel = useSelector((state) => state.channel.oneChannel);
  const [channelFormDisplay, setChannelFormDisplay] = React.useState(false);
  const [deleteFormDisplay, setDeleteFormDisplay] = React.useState(false);
  const [inputTitle, setInputTitle] = React.useState('');
  const [inputTopic, setInputTopic] = React.useState('');
  const [member, setMember] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const userId = Number(localStorage.getItem(USER_ID))



  useEffect(() => {
      if (channelId) {
          dispatch(getCurrentChannel(channelId))
          dispatch(getUsers())
      }
  }, [channelId, dispatch]);

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
  const handleMemberInputChange = (event) => {
    setMember(Number(event.target.value) || '');
  };

  const handleMemberFormClick = () => {
    setOpen(true);
  };

  const handleMemberFormClose = () => {
    setOpen(false);
  };
  const handleMemberCreate = async() => {
    dispatch(addChannelMember({
      channelId: channelId,
      userId: member
    }));
    handleMemberFormClose();
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
            <IconButton disabled={currentChannel.ownerId !== userId} backgroundColor="white" onClick={handleMemberFormClick}>
              <PersonAddIcon/>
            </IconButton>
          </ListItemIcon>
          <ListItemText primary="Add Member" />
        </ListItem>
        <ListItem >
          <ListItemIcon>
            <IconButton disabled={currentChannel.ownerId !== userId} backgroundColor="white" onClick={handleChannelForm}>
              <EditIcon/>
            </IconButton>
          </ListItemIcon>
          <ListItemText primary="Edit Channel" />
        </ListItem>
        <ListItem >
          <ListItemIcon>
            <IconButton disabled={currentChannel.ownerId !== userId} backgroundColor="white" onClick={handleDeleteForm}>
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
    </div>
  );


  return (
    <Box >
      {currentChannel && channelId ?
      <Grid container className={classes.bannerContainer} >
        <Box className={classes.channel} flexGrow={1} justifyContent="center" alignItems="center">
          <Box justifyContent="center" className={classes.channelContainer}>
            <Box className="channelBannerTitle">
              {`#${currentChannel.title}`}
            </Box>
            <Box className="channelBannerTopic">
              {currentChannel.topic}
            </Box>
          </Box>
        </Box>
        <Box className={classes.buttons}>
          <IconButton backgroundColor="white" disabled>
          <AvatarGroup max={3} >
            {
              currentChannel.channelMembers.map(member => {
                return <Avatar key={member.id} alt={member.fullName} src={member.imgUrl} variant="rounded"/>
              })}

          </AvatarGroup>
          </IconButton>
          <IconButton backgroundColor="white" onClick={handleMemberFormClick}>
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
        </Box>
      </Grid>
      }
      <div>
        <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleMemberFormClose}>
          <DialogTitle>Add a member</DialogTitle>
          <DialogContent>
            <form className={classes.container}>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-dialog-select-label">Name</InputLabel>
                <Select
                  labelId="demo-dialog-select-label"
                  id="demo-dialog-select"
                  onChange={handleMemberInputChange}
                  input={<Input />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {users.map(user => {
                    return (
                    <MenuItem key={user.id} value={user.id}>
                      {user.fullName}
                    </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleMemberFormClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleMemberCreate} color="secondary" disabled={member === ''}>
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
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
