import React, { useState, useEffect, } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Route, Switch } from 'react-router';
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



const App = ({ needLogin, loadToken, socket }) => {
  const [loaded, setLoaded] = useState(false);

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
      <NavBar />
      <Switch>
        <ProtectedRoute path='/login' exact={true} needLogin={needLogin} component={LoginForm} />
        <ProtectedRoute path='/signup' exact={true} needLogin={needLogin} component={SignUpForm} />
        <PrivateRoute path="/" needLogin={needLogin} component={Main} />
        <PrivateRoute path="/channels/:channelId" needLogin={needLogin} component={Main} />
        <PrivateRoute path="/groups/:groupId" needLogin={needLogin} component={Main} />
        <Redirect to="/" needLogin={needLogin} component={Main}/>
      </Switch>
      </SocketContext.Provider>
    </Theme>
  </BrowserRouter>
)};

const AppContainer = () => {
  const needLogin = useSelector((state) => !state.authentication.token);
  const dispatch = useDispatch();
  return <App needLogin={needLogin} loadToken={() => dispatch(loadToken())} />;
};

export default AppContainer;
