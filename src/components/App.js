import React, { Component } from 'react';
import { Router , Route } from 'react-router-dom';

import requireAuth from './requireAuth';

import WrestlersPage from './pages/WrestlersPage';
import WrandomWrestlerPage from './pages/WrandomWrestlerPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';

import history from '../history.js';

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Route exact path="/" component={WrandomWrestlerPage}/>
          <Route path="/generate" component={requireAuth(WrestlersPage)}/>
          <Route path="/login" component={LoginPage}/>
          <Route path="/logout" component={LogoutPage}/>
          <Route path="/about" component={AboutPage} />
        </div>
      </Router>
    )
  }
}

export default App;
