import React, { useState, useEffect, } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import NavBar from './components/NavBar';
import {
  CssBaseline,
} from "@material-ui/core";
import Theme from './components/Theme';
import { ProtectedRoute, PrivateRoute } from './util.js/route-util';
import Main from './components/Main';
import { loadToken } from './store/actions/authentication';
import SocketContext from './SocketContext';
import { addMessage } from './store/actions/channelMessages';
import { addJoinedChannel } from "./store/actions/channel";
import { Route } from 'react-router-dom';
import { baseUrl } from './config/config';
import io from "socket.io-client";




const App = ({ needLogin, loadToken }) => {
  const [loaded, setLoaded] = useState(false);
  const currentChannel = useSelector(state => state.channel.currentChannel);
  const joinedChannels = useSelector(state => state.channel.joinedChannels);
  const dispatch = useDispatch();


  let socket = io.connect(baseUrl);

  useEffect(() => {
    socket.on('error', (error) => {
        console.error(error);
      });
    socket = io.connect(baseUrl);
  }, [currentChannel])



  // If current channel changes, it sends a join message to the server
  useEffect(() => {
    if (currentChannel) {
      console.log(`Joining ${currentChannel}`);
      socket.emit('join', currentChannel);
    }
  },[currentChannel, socket]);

  useEffect(() => {
    // Checks to see if there's not a current channel first
    if (!currentChannel) {
      return;
    }

    // Skips if we already have a listener
    if (joinedChannels.includes(currentChannel)) {
      return;
    }

    // Adds incoming message to the store
    socket.on(currentChannel, (message) => {
      console.log("incoming message", message)
      // If the current channel doesn't match the
      // channel the message belongs to, it doesn't
      // display
      dispatch(addMessage(message));
    });

    dispatch(addJoinedChannel(currentChannel));
  },[currentChannel, dispatch, joinedChannels, socket]);


  useEffect(() => {
    setLoaded(true);
    loadToken();
  }, []);

  if (!loaded) {
    return null;
  }
  return (
  <BrowserRouter>
    <CssBaseline />
    <Theme>
      <SocketContext.Provider value={socket}>
      <Switch>
        <ProtectedRoute path='/login' exact={true} needLogin={needLogin} component={LoginForm} />
        <ProtectedRoute path='/signup' exact={true} needLogin={needLogin} component={SignUpForm} />
        <PrivateRoute path="/" needLogin={needLogin} component={Main} />
        <PrivateRoute path="/channels/:id" needLogin={needLogin} component={Main} />
        <PrivateRoute path="/groups/:id" needLogin={needLogin} component={Main} />
        <Redirect to="/" needLogin={needLogin} component={Main}/>
      </Switch>
      </SocketContext.Provider>
    </Theme>
  </BrowserRouter>
)};

const AppContainer = ({ socket }) => {
  const needLogin = useSelector((state) => !state.authentication.token);
  const dispatch = useDispatch();
  return <App socket={socket} needLogin={needLogin} loadToken={() => dispatch(loadToken())} />;
};

export default AppContainer;
