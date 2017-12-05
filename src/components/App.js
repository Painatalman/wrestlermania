import React, { Component } from 'react';
import { BrowserRouter , Route } from 'react-router-dom';

import requireAuth from './requireAuth';

import WrestlersPage from './pages/WrestlersPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={AboutPage}/>
          <Route path="/generate" component={requireAuth(WrestlersPage)}/>
          <Route path="/login" component={LoginPage}/>
          <Route path="/logout" component={LogoutPage}/>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
