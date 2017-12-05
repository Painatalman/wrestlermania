import React, { Component } from 'react';
import { BrowserRouter , Route } from 'react-router-dom';

import requireAuth from './requireAuth';

import WrestlersPage from './pages/WrestlersPage';
import WrandomWrestlerPage from './pages/WrandomWrestlerPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={WrandomWrestlerPage}/>
          <Route path="/generate" component={requireAuth(WrestlersPage)}/>
          <Route path="/login" component={LoginPage}/>
          <Route path="/logout" component={LogoutPage}/>
          <Route path="/about" component={AboutPage} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
