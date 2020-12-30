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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments } from '@fortawesome/free-solid-svg-icons'
import { getUsers } from '../store/actions/user';


const useStyles = makeStyles((theme) => ({
  rightPanelParams: {
    width: "80vw",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly"
  },
}))

const Main = ({ needLogin }) => {
  const currentChannelId = useSelector(state => state.channel.currentChannel);
  const currentChannel = useSelector((state) => state.channel.oneChannel);
  const firstChannel = useSelector(state => state.channel.channelList)
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChannels());
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    if (firstChannel !== undefined && firstChannel.length && !currentChannel) {
        dispatch(setCurrentChannel(firstChannel[0].id))
    }
  }, );

  if (!firstChannel) return null;

  return (
    <div className="mainContainer">
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
                currentChannelId && firstChannel.length ?
                <Redirect to={`/channels/${firstChannel[0].id}`} /> :
                <Redirect to="/" />
            )
        }}
        />
        <Route path="/channels/:id">
        {currentChannelId ?
            <div className="mediaContent">
                <MainBanner className="banner"/>
                <MainChat className="mainChat"/>
            </div>
            :
            <div className="altRightPanel">
                <FontAwesomeIcon icon={faComments} size="6x"/>
                <div className="altText">Create a Channel to start chatting!</div>
            </div>
        }
        </Route>

        <Route exact path="/">
            <div className="altRightPanel">
                <FontAwesomeIcon icon={faComments} size="6x"/>
                <div className="altText">Create a Channel to start chatting!</div>
            </div>
        </Route>
        <Redirect to="/" needLogin={needLogin}/>
      </Box>
      <Box>
      </Box>
    </div>
  );
};

export default Main;
