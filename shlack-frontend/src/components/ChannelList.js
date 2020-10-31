import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Typography, Box, Avatar, Grid, List, ListItem, ListItemText, Divider} from "@material-ui/core";
import { useSelector } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import ChannelForm from './ChannelForm';
import { useDispatch } from 'react-redux';
import { getChannels, showForm, setCurrentChannel } from '../store/actions/channel';
import { useEffect } from 'react';
import { Route, useParams, Link } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
  panelHeader: {
    height: "3em",
    color: theme.typography.color,
    paddingLeft: "1em"
  },
  root: {
    width: '100%',
    maxWidth: 360,
  },
  channelDiv: {
    height: "5vh"
  },
  channelText: {
    color: "white",
    width: "17vw",
    height: "4vh"
  },
  addIcon: {
    color: "white"
  },
  navLink: {
    textDecoration: "none"
  }
}));

const ChannelList = () => {

  const dispatch = useDispatch();
  const token = useSelector((state) => state.authentication.token);
  const formVisible = useSelector((state) => state.channel.formVisible);
  const channels = useSelector((state) => state.channel.channelList);

  const joinChannel = (channel) => {
    dispatch(setCurrentChannel(channel));
  }

  useEffect(() => {
    dispatch(getChannels());
  }, []);

  const classes = useStyles();
  if (!channels) {
    return null;
  }

  return (
    <Grid container>
      <Grid container direction="row" justify="space-between" alignItems="center" className={classes.panelHeader}>
        <Grid item>
          <Typography variant="subtitle1" >
            Channels
          </Typography>
        </Grid>
        <Grid item>
          <IconButton backgroundColor="white" hidden={formVisible} onClick={() => dispatch(showForm())}>
            <AddIcon className={classes.addIcon}/>
          </IconButton>
          {formVisible ? (
            <ChannelForm token={token} />
          ) : (
            null
        )}
        </Grid>
      </Grid>
      <Grid container >
        <List component="nav" className={classes.root} aria-label="mailbox folders">
          {channels.map(channel => {
            return (
              <ListItem button key={channel.id} onClick={() => joinChannel(channel.id)} className={classes.channelDiv} >
                <Link to={`/channels/${channel.id}`} className={classes.navLink}>
                  <ListItemText className={classes.channelText} primary={`# ${channel.title}`} />
                  <Divider/>
                </Link>
              </ListItem>
            )
          })}
        </List>
      </Grid>
      <Grid container>
        <List component="nav" className={classes.root} aria-label="mailbox folders">

        </List>
      </Grid>
    </Grid>
  );
};

export default ChannelList;
