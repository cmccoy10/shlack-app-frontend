import React from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import MoviesTable from './components/MoviesTable';
import Navigation from './components/Navigation';


const App = () => (
  <BrowserRouter>
    <Navigation />
    <Switch>
      <Route path='/' exact={true} component={MoviesTable} />
      <Route path='/login' exact={true} component={LoginForm} />
      <Route path='/signup' exact={true} component={SignUpForm} />
    </Switch>
  </BrowserRouter>
);

export default App;
