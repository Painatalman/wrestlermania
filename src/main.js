import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {
  createStore,
  applyMiddleware 
  // compose
} from 'redux';
import thunk from 'redux-thunk';

import App from './components/App.js';

import reducers from './reducers';

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

// ReactDOM.render version of render
render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App name='Wrestlermania' description='Wrestler Mockups' />
  </Provider>,
  document.getElementById('app')
);
