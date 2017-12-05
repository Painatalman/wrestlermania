import {
  FETCH_WRESTLERS,
  SAVE_WRESTLER,
  DELETE_WRESTLER,
  UPDATE_WRESTLER,
  TOGGLE_EDITING_WRESTLER,
  SET_WRANDOM_WRESTLER
} from '../actions/types.js';

/**
 * returns an object containing data
 * for the wrestler requested via its id
 * @param {Array} wrestlers a list of objects containing instances of wrestlers
 * @param {string} wrestlerId the id for the requested wrestler
 * @returns {Object} a new object containing all data on the specific wrestler
 **/
function getWrestlerData(wrestlers, wrestlerId) {
  return Object.assign(
    {},
    wrestlers.find((wrestler) => wrestler.id === wrestlerId)
  )
}

export default function(state = {
  wrestlers: [],
  editingWrestler: null
}, action) {
    switch(action.type) {
      // fetch and add wrestlers to state
      case FETCH_WRESTLERS:
        return {
          ...state,
          wrestlers: action.payload
        }
      case SAVE_WRESTLER:
        if (!action.payload.error) {
          // it became clearer this way
          const wrestlerObject = action.payload;

          return {
            ...state,
            wrestlers: [...state.wrestlers, wrestlerObject]
          }
        } else {
          return {
            ...state,
            error: 'An error occurred'
          }
        }
      case UPDATE_WRESTLER:
        if (!action.payload.error) {
          // it became clearer this way
          const updatedObject = action.payload.data;

          return {
            ...state,
            wrestlers: state.wrestlers.map(wrestler => {
              if(wrestler.id === updatedObject.id) {
                return Object.assign(wrestler, updatedObject);
              } else {
                return wrestler;
              }
            })
          }
        } else {
          return {
            ...state,
            error: 'An error occurred'
          }
        }
      case DELETE_WRESTLER:
        if (!action.payload.error) {
          // it became clearer this way
          const removedObjectId = action.payload.data;

          return {
            ...state,
            wrestlers: state.wrestlers.filter(wrestler => wrestler.id !== removedObjectId)
          }
        } else {
          return {
            ...state,
            error: 'An error occurred'
          }
        }
      case TOGGLE_EDITING_WRESTLER:
        const wrestlerId = action.payload.data;

        if (state.editingWrestler && state.editingWrestler.id === wrestlerId) {
          return {
            ...state,
            editingWrestler: null
          };
        } else {
          return {
            ...state,
            editingWrestler: getWrestlerData(state.wrestlers, wrestlerId)
          };
        }
      case SET_WRANDOM_WRESTLER:
        const currentWrestlerId = state.wrandomWrestler ?
          state.wrandomWrestler.id
          : null;
        const wrestlerLength = state.wrestlers.length;
        let wrandomWrestler;

        if (wrestlerLength > 1) {
          do {
            wrandomWrestler = getWrestlerData(
              state.wrestlers,
              state.wrestlers[
                Math.floor(Math.random() * wrestlerLength)
              ].id
            );
          } while (wrandomWrestler.id === currentWrestlerId);
        } else {
          wrandomWrestler = getWrestlerData(state.wrestlers, currentWrestlerId);
        }

        return {
          ...state,
          wrandomWrestler
        }

      default:
        return state;
    }
}
