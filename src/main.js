import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import thunk from 'redux-thunk';

import App from './components/App.js';

import reducer from './reducers';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

// ReactDOM.render version of render
render(
  <Provider store={createStore(reducer, enhancer)}>
    <App name='Wrestlermania' description='Wrestler Mockups' />
  </Provider>,
  document.getElementById('app')
);
