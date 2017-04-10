import React, { Component } from 'react';
import { BrowserRouter , Route } from 'react-router-dom';

import WrestlersPage from './pages/WrestlersPage';
import AboutPage from './pages/AboutPage';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={WrestlersPage}/>
          <Route path="/about" component={AboutPage}/>
        </div>
      </BrowserRouter>
    )
  }
}
