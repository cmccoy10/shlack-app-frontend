import React from 'react';
import MainLeftPanel from './MainLeftPanel';
import MainBanner from './MainBanner';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, Box, Avatar, Grid, Paper } from "@material-ui/core";
import MainChat from './MainChat';
import { useSelector, useDispatch } from 'react-redux';
import "./Styles/Main.css";
import NavBar from './NavBar';
import { PrivateRoute } from '../util.js/route-util';
import { getChannels, setCurrentChannel } from '../store/actions/channel';
import { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  banner: {
    height: "10%",
    width: "80%"
  },
  rightPanelParams: {
    width: "80vw",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly"
  },
  mainChat: {
    height: "60%",
    width: "100%"
  },
}))

const Main = ({ needLogin }) => {
  const currentChannel = useSelector((state) => state.channel.oneChannel);
  const firstChannel = useSelector(state => state.channel.channelList)
  const classes = useStyles();
  const dispatch = useDispatch();


  useEffect(() => {
    if (firstChannel !== undefined && firstChannel.length && !currentChannel) {
        dispatch(setCurrentChannel(firstChannel[0].id))
        console.log("Current channel", currentChannel)
        return <Redirect to={`/channels/${firstChannel[0].id}`}/>
    }
  }, );

  if (!firstChannel) return null;

  return (
    <Box className="mainContainer">
      <NavBar />
      <Box className="leftPanel">
        <MainLeftPanel />
      </Box>
      <Box className="rightPanel">
      <Route
        exact
        path="/"
        render={() => {
            return (
                !currentChannel && firstChannel.length ?
                <Redirect to={`/channels/${firstChannel[0].id}`} /> :
                <Redirect to="/" />
            )
        }}
        />
        <Route path="/channels/:id">
            <MainBanner className={classes.banner}/>
            <MainChat className={classes.mainChat}/>
        </Route>
        <Route exact path="/">
            <MainBanner className={classes.banner}/>
        </Route>
      </Box>
      <Box>
      </Box>
    </Box>
  );
};

export default Main;
