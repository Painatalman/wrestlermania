import {
  SAVE_WRESTLER,
  DELETE_WRESTLER,
  UPDATE_WRESTLER,
  FETCH_WRESTLERS,
  TOGGLE_EDITING_WRESTLER
} from './types.js';

import firebase from '../firebase.js';

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
