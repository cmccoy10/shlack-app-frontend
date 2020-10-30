import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, IconButton, Typography, Box, Avatar, Grid } from "@material-ui/core";
import { useSelector } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import ChannelForm from './ChannelForm';
import { useDispatch } from 'react-redux';
import { showForm } from '../store/actions/channel';


const useStyles = makeStyles((theme) => ({
  panelHeader: {
    height: "3em",
    color: theme.typography.color
  }
}));

const ChannelList = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authentication.token);
  const formVisible = useSelector((state) => state.channel.formVisible);
  const classes = useStyles();
  return (
    <Grid container direction="row" justify="space-evenly" alignItems="center" className={classes.panelHeader}>
      <Grid item>
        <Typography variant="subtitle1" >
          Channels
        </Typography>
      </Grid>
      <Grid item>
        <IconButton hidden={formVisible} onClick={() => dispatch(showForm())}>
          <AddIcon/>
        </IconButton>
        {formVisible ? (
          <ChannelForm token={token} />
        ) : (
          null
      )}
      </Grid>
    </Grid>
  );
};

export default ChannelList;
