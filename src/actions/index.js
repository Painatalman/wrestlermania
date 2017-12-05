import {
  SAVE_WRESTLER,
  DELETE_WRESTLER,
  UPDATE_WRESTLER,
  FETCH_WRESTLERS,
  TOGGLE_EDITING_WRESTLER,
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR
} from './types.js';

import firebase from '../firebase.js';

import { browserHistory } from 'react-router';

const wrestlersRef = firebase.database().ref('wrestlers');

export function saveWrestler(wrestlerObject) {

  return dispatch => {
    let newWrestlerIdRef = wrestlersRef.push();

    newWrestlerIdRef
      .set(wrestlerObject)
      .then(() => {
        dispatch({
          type: SAVE_WRESTLER,
          payload: {
            ...wrestlerObject,
            id: newWrestlerIdRef.getKey()
          }
        });
      })
      .catch((error) => {
        alert('error trying to contact server', error);
        dispatch({
          type: SAVE_WRESTLER,
          payload: {
            error: error
          }
        });
      });
  }

}

export function updateWrestler(updateObject) {
  return dispatch => {
    wrestlersRef
      .child(updateObject.id)
      .update(updateObject)
      .then(() => {
        dispatch({
          type: UPDATE_WRESTLER,
          payload: {
            data: updateObject
          }
        });
      })
      .catch((error) => {
        alert('error trying to contact server', error);
        dispatch({
          type: UPDATE_WRESTLER,
          payload: {
            error: error
          }
        });
      });
  }
}

export function deleteWrestler(removedObjectId) {
  return dispatch => {
    wrestlersRef
    .child(removedObjectId)
    .remove()
    .then(() => {
      dispatch({
        type: DELETE_WRESTLER,
        payload: {
          data: removedObjectId
        }
      });
    })
    .catch((error) => {
      // TODO: treat error
      alert('error trying to contact server', error);
      dispatch({
        type: DELETE_WRESTLER,
        payload: {
          error: error
        }
      });
    });
  }
}

export function fetchWrestlers() {
  return (dispatch) => {
    wrestlersRef.once('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          title: items[item].title,
          facts: items[item].facts,
          moves: items[item].moves,
          finishers: items[item].finishers,
          description: items[item].description
        });
      }

      dispatch({
        type: FETCH_WRESTLERS,
        payload: newState
      });

    });
  }
}

export function toggleEditingWrestler(wrestlerId) {
  return {
    type: TOGGLE_EDITING_WRESTLER,
    payload: {
      data: wrestlerId
    }
  }
}

export function authenticate(user) {
  return {
    type: AUTH_USER,
    payload: user
  }
}

export function unauthenticate() {
  return {
    type: UNAUTH_USER
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function login({ email, password }) {
  return function (dispatch) {
    // we can do any asynchronous request or whatever
    // it allows us to dispatch any type of action
    // check if the request is good or bad, for example
    // we are not limited to ONE dispatch, with Redux-thunk
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => {
        // if request is good
        // - update the state of authentication
        dispatch(authenticate(user));
        // - save the JWT token
        // localStorage.setItem('token', response.data.token);
        // - where? On localstorage
        // - redirect to HOME
        browserHistory.push('/');
      })
      .catch(() => {
        dispatch(authError('Bad Login Info'));
      });
  }
}

export function logout() {
  return function (dispatch) {
    firebase.auth().signOut()
      .then(() => {
        dispatch(unauthenticate());
        browserHistory.push('/');
      })
      .catch(() => {
        dispatch(authError('Bad Logout Info'));
      });
  }
}
