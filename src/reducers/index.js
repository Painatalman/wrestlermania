import { combineReducers } from 'redux';
import wrestlerReducer from './wrestlers';
import authenticationReducer from './authentication';

const rootReducer = combineReducers({
  wrestlers: wrestlerReducer,
  auth: authenticationReducer
});

export default rootReducer;
