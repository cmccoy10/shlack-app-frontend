import React, { useState, useEffect, } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter, useParams } from 'react-router-dom';
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
import { createMemoryHistory } from 'history';

const App = ({ needLogin, loadToken, socket }) => {
  const [loaded, setLoaded] = useState(false);
  const currentChannel = useSelector(state => state.channel.currentChannel);
  const joinedChannels = useSelector(state => state.channel.joinedChannels);
  const dispatch = useDispatch();

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
      // console.log(
      //   `Recieved new message for ${channel}: ${message}`
      // );
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

  // let { id } = useParams();
  // console.log(id)

  if (!loaded) {
    return null;
  }
  return (
  <BrowserRouter>
    <CssBaseline />
    <Theme>
      <SocketContext.Provider value={socket}>
      <NavBar />
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
